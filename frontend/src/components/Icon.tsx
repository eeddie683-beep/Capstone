import type { ReactNode } from 'react'
import './Icon.scss'

export type IconName = 'home' | 'pin' | 'activity' | 'map' | 'star' | 'history' | 'user' | 'settings' | 'refresh' | 'bell' | 'run' | 'walk' | 'bike' | 'mountain' | 'swim' | 'drop' | 'wind' | 'heart' | 'building' | 'sun'

const paths: Record<IconName, ReactNode> = {
  home: <><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  activity: <path d="M3 12h4l2.2-7 4.1 14 2.2-7H21" />, map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15m6-12v15" /></>,
  star: <path d="m12 3 2.7 5.6 6.3.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.5l6.3-.9Z" />, history: <><path d="M4 5v5h5" /><path d="M5.5 17a8 8 0 1 0-.8-9" /><path d="M12 7v5l3 2" /></>,
  user: <><circle cx="12" cy="8" r="3" /><path d="M5 21c0-4 3-7 7-7s7 3 7 7" /></>, settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" /></>,
  refresh: <><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 0-2 5" /></>, bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  run: <><circle cx="14" cy="4" r="2" /><path d="m9 21 2-6 3 2 2 4M8 13l3-5 4 2 3 3M11 8 7 9" /></>, walk: <><circle cx="12" cy="4" r="2" /><path d="m10 21 1-7-3-3 2-4 4 1 2 4 3 1M11 14l4 7" /></>, bike: <><circle cx="6" cy="17" r="4" /><circle cx="18" cy="17" r="4" /><path d="m6 17 4-7 4 7h-4l3-9h3" /></>, mountain: <path d="m2 20 7-12 3 5 3-4 7 11Z" />, swim: <><path d="M2 17c2 2 4 2 6 0s4-2 6 0 4 2 8 0M2 21c2 2 4 2 6 0s4-2 6 0 4 2 8 0" /><circle cx="16" cy="7" r="2" /><path d="m4 14 6-4 4 3 5-2" /></>,
  drop: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />, wind: <><path d="M3 8h11c4 0 4-5 1-5-2 0-3 1-3 2M3 12h16M3 16h11c4 0 4 5 1 5-2 0-3-1-3-2" /></>, heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />, building: <><path d="M4 21V5l8-3v19M12 8h8v13M8 7v2m0 3v2m0 3v2m8-7v2m0 3v2M2 21h20" /></>, sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M19 5l-1.5 1.5m-11 11L5 19" /></>,
}

export default function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

