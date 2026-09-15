import type { Coordinates } from '../types/location'

export async function requestApi<T>(path: string, coordinates: Coordinates, signal: AbortSignal, extra: Record<string, string> = {}): Promise<T> {
  const query = new URLSearchParams({ lat: String(coordinates.latitude), lon: String(coordinates.longitude), ...extra })
  const response = await fetch(`/api/fitmap/${path}?${query}`, { signal })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error ?? '데이터를 불러오지 못했습니다.')
  return data as T
}
