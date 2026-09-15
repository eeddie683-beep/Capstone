export type Weather = {
  temperature: number | null
  humidity: number | null
  wind: number | null
  precipitation: number | null
  condition: string
  observedAt: string
  forecastAt: string | null
  warning: string | null
}
