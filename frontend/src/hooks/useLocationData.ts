import { useEffect, useState } from 'react'
import type { Coordinates } from '../types/location'
import type { Weather } from '../types/weather'
import type { Place } from '../types/place'
import { getWeather } from '../api/weather'
import { getPlaces, getRegion } from '../api/kakao'

type Result<T> = { data: T | null; loading: boolean; error: string | null }
const empty = <T,>(): Result<T> => ({ data: null, loading: false, error: null })
export function useLocationData(coordinates: Coordinates | null, exercise: string) {
  const [weather, setWeather] = useState<Result<Weather>>(empty)
  const [region, setRegion] = useState<Result<{ address: string }>>(empty)
  const [places, setPlaces] = useState<Result<Place[]>>(empty)
  useEffect(() => {
    const controller = new AbortController()
    if (!coordinates) { setWeather(empty()); setRegion(empty()); return }
    const run = async <T,>(request: Promise<T>, set: (result: Result<T>) => void) => {
      set({ data: null, loading: true, error: null })
      try { const data = await request; if (!controller.signal.aborted) set({ data, loading: false, error: null }) }
      catch (error) { if (!controller.signal.aborted) set({ data: null, loading: false, error: error instanceof Error ? error.message : '조회 실패' }) }
    }
    void run(getWeather(coordinates, controller.signal), setWeather)
    void run(getRegion(coordinates, controller.signal), setRegion)
    return () => controller.abort()
  }, [coordinates])
  useEffect(() => {
    const controller = new AbortController()
    if (!coordinates) { setPlaces(empty()); return }
    setPlaces({ data: null, loading: true, error: null })
    getPlaces(coordinates, exercise, controller.signal).then(data => {
      if (!controller.signal.aborted) setPlaces({ data, loading: false, error: null })
    }).catch(error => { if (!controller.signal.aborted) setPlaces({ data: null, loading: false, error: error.message ?? '장소 조회 실패' }) })
    return () => controller.abort()
  }, [coordinates, exercise])
  return { weather, region, places }
}
