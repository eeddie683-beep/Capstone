import { requestApi } from './client'
import type { Coordinates } from '../types/location'
import type { UvIndex } from '../types/uv'

export const getUvIndex = (coordinates: Coordinates, signal: AbortSignal) =>
  requestApi<UvIndex>('uv', coordinates, signal)
