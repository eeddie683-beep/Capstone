import test from 'node:test'
import assert from 'node:assert/strict'
import { baseTime, parseWeather, toGrid } from './weather.ts'
import { createApiHandler } from './api.ts'
import type { IncomingMessage, ServerResponse } from 'node:http'

test('Seoul coordinates convert to the expected KMA grid', () => {
  assert.deepEqual(toGrid(37.5665, 126.978), { nx: 60, ny: 127 })
})

test('KST base dates cross midnight and forecast publication boundaries', () => {
  assert.deepEqual(baseTime('observation', new Date('2026-09-14T15:20:00Z')), { date: '20260914', time: '2300' })
  assert.deepEqual(baseTime('forecast', new Date('2026-09-14T17:30:00Z')), { date: '20260914', time: '2300' })
  assert.deepEqual(baseTime('forecast', new Date('2026-09-14T18:10:00Z')), { date: '20260915', time: '0200' })
})

test('preserves zero, negative temperatures, decimals, and missing fields', () => {
  const weather = parseWeather([{ category: 'T1H', obsrValue: '-3.2' }, { category: 'REH', obsrValue: '0' }, { category: 'WSD', obsrValue: '-999' }], [
    { category: 'POP', fcstValue: '0', fcstDate: '20260915', fcstTime: '1000' },
    { category: 'SKY', fcstValue: '1', fcstDate: '20260915', fcstTime: '1000' },
  ], new Date('2026-09-15T01:15:00Z'))
  assert.equal(weather.temperature, -3.2)
  assert.equal(weather.humidity, 0)
  assert.equal(weather.wind, null)
  assert.equal(weather.precipitation, 0)
  assert.equal(weather.condition, '맑음')
  assert.equal(parseWeather([], []).temperature, null)
})

async function call(url: string, config = {}) {
  let text = ''
  const response = { statusCode: 200, setHeader() {}, end(value: string) { text = value } }
  await createApiHandler(config)({ url, method: 'GET' } as IncomingMessage, response as unknown as ServerResponse, () => {})
  return { status: response.statusCode, data: JSON.parse(text) }
}

test('invalid coordinates and missing keys fail clearly without upstream calls', async () => {
  assert.equal((await call('/api/fitmap/weather?lat=bad&lon=127')).status, 400)
  assert.equal((await call('/api/fitmap/weather?lat=37.5&lon=127')).status, 503)
  assert.equal((await call('/api/fitmap/places?lat=37.5&lon=127')).status, 503)
  assert.equal((await call('/api/fitmap/unknown?lat=37.5&lon=127')).status, 404)
})

test('Kakao requests attach server key, encode query and normalize results', async () => {
  const original = globalThis.fetch
  globalThis.fetch = (async (input, options) => {
    const url = new URL(String(input))
    assert.equal(url.origin, 'https://dapi.kakao.com')
    assert.equal(url.searchParams.get('query'), '수영장')
    assert.equal((options?.headers as Record<string, string>).Authorization, 'KakaoAK test-only')
    return new Response(JSON.stringify({ documents: [{ id: '1', place_name: '테스트 수영장', category_name: '운동 > 수영장', address_name: '테스트 주소', distance: '1200', place_url: 'https://place.map.kakao.com/1' }] }))
  }) as typeof fetch
  try {
    const result = await call('/api/fitmap/places?lat=37.5&lon=127&exercise=수영', { KAKAO_REST_API_KEY: 'test-only' })
    assert.equal(result.status, 200)
    assert.equal(result.data[0].distance, 1200)
    assert.equal(JSON.stringify(result.data).includes('test-only'), false)
  } finally { globalThis.fetch = original }
})
