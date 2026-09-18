import { requestApi } from './client'
import type { Coordinates } from '../types/location'
import type { Place } from '../types/place'
export const getRegion = (coordinates: Coordinates, signal: AbortSignal) => requestApi<{ address: string }>('region', coordinates, signal)
export const getPlaces = (coordinates: Coordinates, exercise: string, signal: AbortSignal, limit?: number) => requestApi<Place[]>('places', coordinates, signal, { exercise, ...(limit ? { limit: String(limit) } : {}) })
