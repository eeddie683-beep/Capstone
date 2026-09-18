import type { Weather } from '../types/weather'
import type { AirQuality } from '../types/airQuality'
import type { UvIndex } from '../types/uv'

const defaults: Record<string, { minutes: number; kcalPerMinute: number }> = {
  '러닝': { minutes: 40, kcalPerMinute: 9 },
  '걷기': { minutes: 50, kcalPerMinute: 4 },
  '자전거': { minutes: 60, kcalPerMinute: 7 },
  '등산': { minutes: 90, kcalPerMinute: 7 },
  '수영': { minutes: 45, kcalPerMinute: 8 },
}

export function dailyExerciseRecommendation(exercise: string, weather: Weather | null, air: AirQuality | null, uv: UvIndex | null) {
  const base = defaults[exercise] ?? defaults['러닝']
  if (!weather) return { minutes: null, intensity: '계산 중', calories: null, time: '날씨 확인 중', message: '현재 위치의 날씨를 불러오고 있습니다.' }
  let minutes = base.minutes
  let intensity = '보통'
  let time = '17:00 ~ 19:00'
  const reasons: string[] = []
  const outdoor = exercise !== '수영'
  const badAir = [air?.pm10.grade, air?.pm25.grade].some(grade => grade?.includes('나쁨'))
  const rainy = (weather.precipitation ?? 0) >= 60 || /비|눈|소나기/.test(weather.condition)

  if (weather.temperature != null && (weather.temperature <= 0 || weather.temperature >= 33)) {
    minutes = Math.min(minutes, 20); intensity = '낮음'; reasons.push('기온이 운동하기에 부담스러운 수준입니다.')
  } else if (weather.temperature != null && (weather.temperature < 5 || weather.temperature >= 30)) {
    minutes = Math.min(minutes, 30); intensity = '낮음'; reasons.push('기온을 고려해 운동 강도를 낮췄습니다.')
  }
  if (weather.temperature != null && weather.temperature >= 27) time = '06:00 ~ 08:00'
  if (outdoor && rainy) { minutes = Math.min(minutes, 20); intensity = '낮음'; time = '실내 운동 권장'; reasons.push('강수 가능성이 있어 야외 운동 시간을 줄였습니다.') }
  if (outdoor && (weather.wind ?? 0) >= 8) { minutes = Math.min(minutes, 30); intensity = '낮음'; reasons.push('바람이 강해 안전에 주의해야 합니다.') }
  if (outdoor && (uv?.value ?? 0) >= 6) { minutes = Math.min(minutes, 35); time = '18:00 ~ 20:00'; reasons.push(`자외선이 ${uv?.grade} 단계여서 해가 약한 시간을 권장합니다.`) }
  if (outdoor && badAir) { minutes = Math.min(minutes, 20); intensity = '낮음'; time = '실내 운동 권장'; reasons.push('미세먼지가 나빠 야외 운동을 권장하지 않습니다.') }

  return { minutes, intensity, calories: Math.round(minutes * base.kcalPerMinute), time, message: reasons.length ? reasons.join(' ') : '오늘은 야외 운동하기 무난한 날씨입니다.' }
}
