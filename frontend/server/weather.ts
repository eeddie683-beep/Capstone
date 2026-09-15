export function toGrid(latitude: number, longitude: number) {
  const rad = Math.PI / 180
  const re = 6371.00877 / 5
  const slat1 = 30 * rad
  const slat2 = 60 * rad
  const sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) /
    Math.log(Math.tan(Math.PI / 4 + slat2 / 2) / Math.tan(Math.PI / 4 + slat1 / 2))
  const sf = Math.pow(Math.tan(Math.PI / 4 + slat1 / 2), sn) * Math.cos(slat1) / sn
  const ro = re * sf / Math.pow(Math.tan(Math.PI / 4 + 38 * rad / 2), sn)
  const ra = re * sf / Math.pow(Math.tan(Math.PI / 4 + latitude * rad / 2), sn)
  const theta = (longitude - 126) * rad * sn
  return { nx: Math.floor(ra * Math.sin(theta) + 43.5), ny: Math.floor(ro - ra * Math.cos(theta) + 136.5) }
}

function stamp(date: Date) {
  const iso = date.toISOString()
  return { date: iso.slice(0, 10).replaceAll('-', ''), time: iso.slice(11, 13) + '00' }
}

export function baseTime(kind: 'observation' | 'forecast', now = new Date()) {
  // Work in UTC fields after shifting to KST, independent of the server timezone.
  const date = new Date(now.getTime() + 9 * 3600_000 - (kind === 'observation' ? 40 : 70) * 60_000)
  if (kind === 'forecast') {
    const hour = date.getUTCHours()
    const base = Math.floor((hour - 2) / 3) * 3 + 2
    date.setUTCHours(base, 0, 0, 0)
  }
  return stamp(date)
}

export type WeatherItem = {
  category: string
  obsrValue?: string
  fcstValue?: string
  fcstDate?: string
  fcstTime?: string
}

export function parseWeather(observed: WeatherItem[], forecast: WeatherItem[], now = new Date()) {
  const current = new Date(now.getTime() + 9 * 3600_000).toISOString()
  const target = current.slice(0, 10).replaceAll('-', '') + current.slice(11, 13) + '00'
  const times = [...new Set(forecast.map(item => `${item.fcstDate}${item.fcstTime}`))].sort()
  const selected = times.find(time => time >= target)
  const predictions = forecast.filter(item => `${item.fcstDate}${item.fcstTime}` === selected)
  const value = (items: WeatherItem[], category: string, key: 'obsrValue' | 'fcstValue') => {
    const raw = items.find(item => item.category === category)?.[key]
    const number = raw === undefined || raw.trim() === '' ? NaN : Number(raw)
    return Number.isFinite(number) && number > -900 ? number : null
  }
  const temperature = value(observed, 'T1H', 'obsrValue')
  const humidity = value(observed, 'REH', 'obsrValue')
  const wind = value(observed, 'WSD', 'obsrValue')
  const precipitation = value(predictions, 'POP', 'fcstValue')
  const rain = value(observed, 'PTY', 'obsrValue')
  const sky = value(predictions, 'SKY', 'fcstValue')
  const rainLabels: Record<number, string> = { 1: '비', 2: '비/눈', 3: '눈', 4: '소나기', 5: '빗방울', 6: '빗방울/눈날림', 7: '눈날림' }
  return {
    temperature, humidity, wind, precipitation,
    condition: rain !== null && rain > 0 ? rainLabels[rain] ?? '강수' : ({ 1: '맑음', 3: '구름많음', 4: '흐림' } as Record<number, string>)[sky ?? -1] ?? '하늘상태 미제공',
    forecastAt: selected ?? null,
  }
}
