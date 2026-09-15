import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { baseTime, parseWeather, toGrid, type WeatherItem } from './weather.ts'

type Config = { KAKAO_REST_API_KEY?: string; KMA_SERVICE_KEY?: string }
type Next = () => void
class ApiError extends Error {
  status: number
  constructor(status: number, message: string) { super(message); this.status = status }
}

async function upstream<T>(url: URL, headers?: Record<string, string>): Promise<T> {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(12000) })
  if (!response.ok) throw new ApiError(502, `외부 API 요청이 거절되었습니다 (${response.status}). 서버의 인증키와 활용 승인을 확인하세요.`)
  try { return await response.json() as T } catch { throw new ApiError(502, 'API 응답을 읽을 수 없습니다. 인증키와 서비스 활용 승인을 확인하세요.') }
}

async function kma(config: Config, lat: number, lon: number, kind: 'observation' | 'forecast') {
  if (!config.KMA_SERVICE_KEY) throw new ApiError(503, '기상청 API 인증키가 아직 설정되지 않았습니다.')
  const { nx, ny } = toGrid(lat, lon)
  if (nx < 1 || nx > 149 || ny < 1 || ny > 253) throw new ApiError(400, '기상청 예보 지원 지역 밖입니다.')
  const endpoint = kind === 'observation' ? 'getUltraSrtNcst' : 'getVilageFcst'
  const base = baseTime(kind)
  const url = new URL(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/${endpoint}`)
  url.search = new URLSearchParams({ serviceKey: config.KMA_SERVICE_KEY, dataType: 'JSON', pageNo: '1', numOfRows: '1000', base_date: base.date, base_time: base.time, nx: String(nx), ny: String(ny) }).toString()
  const data = await upstream<{ response?: { header?: { resultCode: string }; body?: { items?: { item?: WeatherItem[] } } } }>(url)
  if (data.response?.header?.resultCode !== '00') throw new ApiError(502, '기상청 자료를 조회하지 못했습니다. 잠시 후 다시 시도하거나 인증키 활용 승인을 확인하세요.')
  const items = data.response?.body?.items?.item
  if (!Array.isArray(items) || !items.length) throw new ApiError(502, '기상청에서 아직 해당 시각의 자료를 제공하지 않습니다.')
  return { items: items as WeatherItem[], base }
}

export function createApiHandler(config: Config) {
  return async (req: IncomingMessage, res: ServerResponse, next: Next) => {
    const request = new URL(req.url ?? '/', 'http://localhost')
    if (!request.pathname.startsWith('/api/fitmap/')) return next()
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    try {
      if (req.method !== 'GET') throw new ApiError(405, 'GET 요청만 지원합니다.')
      const route = request.pathname.slice('/api/fitmap/'.length)
      if (!['weather', 'region', 'places'].includes(route)) throw new ApiError(404, '존재하지 않는 API입니다.')
      const lat = Number(request.searchParams.get('lat'))
      const lon = Number(request.searchParams.get('lon'))
      if (!request.searchParams.get('lat') || !request.searchParams.get('lon') || !Number.isFinite(lat) || !Number.isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) throw new ApiError(400, '유효한 위치 좌표가 필요합니다.')
      let result: unknown
      if (route === 'weather') {
        const [observation, forecast] = await Promise.allSettled([kma(config, lat, lon, 'observation'), kma(config, lat, lon, 'forecast')])
        if (observation.status === 'rejected') throw observation.reason
        result = { ...parseWeather(observation.value.items, forecast.status === 'fulfilled' ? forecast.value.items : []), observedAt: `${observation.value.base.date} ${observation.value.base.time}`, warning: forecast.status === 'rejected' ? '강수확률과 하늘상태 예보를 불러오지 못했습니다.' : null }
      } else {
        if (!config.KAKAO_REST_API_KEY) throw new ApiError(503, '카카오 REST API 키가 아직 설정되지 않았습니다.')
        const url = new URL(route === 'region' ? 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json' : 'https://dapi.kakao.com/v2/local/search/keyword.json')
        url.searchParams.set('x', String(lon))
        url.searchParams.set('y', String(lat))
        if (route === 'places') {
          const queries: Record<string, string> = { '러닝': '공원', '걷기': '산책로', '자전거': '자전거공원', '등산': '등산로', '수영': '수영장' }
          url.searchParams.set('query', queries[request.searchParams.get('exercise') ?? ''] ?? '공원')
          url.searchParams.set('radius', '10000')
          url.searchParams.set('sort', 'distance')
          url.searchParams.set('size', '3')
        }
        const data = await upstream<{ documents: Record<string, string>[] }>(url, { Authorization: `KakaoAK ${config.KAKAO_REST_API_KEY}` })
        if (!Array.isArray(data.documents)) throw new ApiError(502, '카카오 장소 응답 형식이 올바르지 않습니다.')
        if (route === 'region') {
          const region = data.documents.find(item => item.region_type === 'H') ?? data.documents[0]
          result = { address: region?.address_name ?? '주소 정보 없음' }
        } else {
          result = data.documents.map((item: Record<string, string>) => ({ id: item.id, name: item.place_name, category: item.category_name, address: item.road_address_name || item.address_name, distance: item.distance === '' || item.distance == null ? null : Number(item.distance), url: /^https?:\/\/place\.map\.kakao\.com\//.test(item.place_url) ? item.place_url : null }))
        }
      }
      res.end(JSON.stringify(result))
    } catch (error) {
      res.statusCode = error instanceof ApiError ? error.status : 502
      res.end(JSON.stringify({ error: error instanceof ApiError ? error.message : '외부 API 연결이 지연되거나 실패했습니다. 다시 시도해 주세요.' }))
    }
  }
}

export function fitmapApi(config: Config): Plugin {
  const handler = createApiHandler(config)
  return {
    name: 'fitmap-local-api',
    configureServer(server) { server.middlewares.use(handler) },
    configurePreviewServer(server) { server.middlewares.use(handler) },
  }
}
