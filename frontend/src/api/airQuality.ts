import { requestApi } from './client'
import type { Coordinates } from '../types/location'
import type { AirQuality } from '../types/airQuality'

export const getAirQuality = (coordinates: Coordinates, signal: AbortSignal) =>
  requestApi<AirQuality>('air-quality', coordinates, signal)
