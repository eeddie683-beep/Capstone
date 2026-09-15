import { requestApi } from './client'
import type { Coordinates } from '../types/location'
import type { Weather } from '../types/weather'
export const getWeather = (coordinates: Coordinates, signal: AbortSignal) => requestApi<Weather>('weather', coordinates, signal)
