export type AirMetric = {
  value: number | null
  grade: string
}

export type AirQuality = {
  stationName: string
  measuredAt: string | null
  overallGrade: string
  pm10: AirMetric
  pm25: AirMetric
  ozone: AirMetric
}
