import { useState, type ReactNode } from 'react'
import nearbyPlacesStyles from './NearbyPlaces.scss?inline'
import Sidebar from '../components/layout/Sidebar'

/**
 * 주변 운동 장소 페이지
 *
 * - 대시보드(Dashboard.tsx)와 같은 사이드바/레이아웃 톤을 맞추기 위해, 같은 방식으로
 *   아이콘을 인라인 SVG로 그리고 스타일을 `?inline`으로 불러와 <style> 태그로 주입했습니다.
 *   (아직 Sidebar.tsx / Header.tsx 공용 컴포넌트가 비어있어서, Dashboard.tsx가 쓰는 것과
 *   같은 방식으로 이 페이지도 사이드바를 직접 그립니다.)
 * - 지도 영역은 카카오맵 API를 붙이기 전 자리만 잡아둔 자리표시자(placeholder)입니다.
 *   실제 연동 시 `.map-placeholder` 부분을 카카오맵 컴포넌트로 교체하고,
 *   `src/api/kakao.ts`에 지도/장소 검색 로직을 작성하면 됩니다. (이번 작업에선 연결 안 함)
 * - 장소 목록도 아직 더미 데이터입니다. 실제 데이터는 Kakao Local API 연동 후
 *   `src/types/place.ts` 타입에 맞춰 API 응답으로 교체하면 됩니다.
 */

type IconName = 'home' | 'pin' | 'activity' | 'map' | 'star' | 'refresh' | 'bell' | 'heart' | 'building' | 'mountain' | 'tree' | 'track' | 'settings' | 'layers'

const paths: Record<IconName, ReactNode> = {
  home: <><path d="M3 11 12 3l9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  activity: <path d="M3 12h4l2.2-7 4.1 14 2.2-7H21" />,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15m6-12v15" /></>,
  star: <path d="m12 3 2.7 5.6 6.3.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.5l6.3-.9Z" />,
  refresh: <><path d="M20 7v5h-5" /><path d="M19 12a7 7 0 1 0-2 5" /></>,
  bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />,
  building: <><path d="M4 21V5l8-3v19M12 8h8v13M8 7v2m0 3v2m0 3v2m8-7v2m0 3v2M2 21h20" /></>,
  mountain: <path d="m2 20 7-12 3 5 3-4 7 11Z" />,
  tree: <><circle cx="12" cy="9" r="6" /><path d="M12 15v6" /></>,
  track: <><ellipse cx="12" cy="12" rx="9" ry="6.5" /><ellipse cx="12" cy="12" rx="3.6" ry="2.4" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M19 5l-2 2M7 17l-2 2" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></>,
}

function Icon({ name, size = 18, filled = false }: { name: IconName; size?: number; filled?: boolean }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

type Category = '전체' | '실내' | '실외'

type Place = {
  name: string
  facility: '공원' | '산책로' | '체육관' | '체육센터' | '운동장'
  category: '실내' | '실외'
  distance: string
  address: string
  icon: IconName
}

// TODO: Kakao Local API 연동 후 실제 검색 결과로 교체 예정. 지금은 화면 구성용 더미 데이터입니다.
const places: Place[] = [
  { name: '중랑천 산책로', facility: '산책로', category: '실외', distance: '1.2km', address: '서울 노원구 공릉동', icon: 'mountain' },
  { name: '불암산 둘레길', facility: '산책로', category: '실외', distance: '2.3km', address: '서울 노원구 중계동', icon: 'mountain' },
  { name: '노원구민체육센터', facility: '체육센터', category: '실내', distance: '2.8km', address: '서울 노원구 노원로', icon: 'building' },
  { name: '상계근린공원', facility: '공원', category: '실외', distance: '0.9km', address: '서울 노원구 상계동', icon: 'tree' },
  { name: '노원구립체육관', facility: '체육관', category: '실내', distance: '3.1km', address: '서울 노원구 동일로', icon: 'building' },
  { name: '노원구민운동장', facility: '운동장', category: '실외', distance: '2.0km', address: '서울 노원구 초안산로', icon: 'track' },
]

const filters: Category[] = ['전체', '실내', '실외']

export default function NearbyPlaces() {
  const [filter, setFilter] = useState<Category>('전체')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const filteredPlaces = filter === '전체' ? places : places.filter((place) => place.category === filter)

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  return (
    <>
      <style>{nearbyPlacesStyles}</style>
      <div className="dashboard">
        <Sidebar />

        <main className="content">
          <header className="welcome">
            <div>
              <h1>주변 운동 장소</h1>
              <p><Icon name="pin" size={12} /> 서울특별시 노원구 <span>• 현재 위치 기준</span></p>
            </div>
            <div className="header-actions">
              <button><Icon name="refresh" size={14} /> 새로고침</button>
              <button className="square" aria-label="알림"><Icon name="bell" size={16} /></button>
            </div>
          </header>

          <div className="places-layout">
            <section className="map-panel panel">
              <div className="map-placeholder">
                <span className="map-placeholder-icon"><Icon name="map" size={28} /></span>
                <p>카카오맵 영역</p>
                <small>Kakao Map API 연동 예정 — 지금은 화면 자리만 잡아둔 상태입니다</small>
              </div>
              <button type="button" className="locate-button">
                <Icon name="pin" size={14} /> 현재 위치로 이동
              </button>
            </section>

            <section className="list-panel panel">
              <div className="title-row">
                <h2><span className="title-icon"><Icon name="layers" size={14} /></span> 장소 목록</h2>
                <div className="filter-chips" role="group" aria-label="장소 필터">
                  {filters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={filter === item ? 'selected' : ''}
                      aria-pressed={filter === item}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <p className="list-note">※ 주변 운동 장소에는 추천 점수나 순위를 사용하지 않습니다.</p>

              <div className="place-grid">
                {filteredPlaces.map((place) => {
                  const isFavorited = favorites.has(place.name)
                  return (
                    <article key={place.name}>
                      <span className="place-icon"><Icon name={place.icon} /></span>
                      <div>
                        <h3>{place.name}</h3>
                        <p><span>{place.facility}</span><span className={place.category === '실내' ? 'indoor' : 'outdoor'}>{place.category}</span></p>
                        <small><Icon name="pin" size={11} />{place.distance} · {place.address}</small>
                      </div>
                      <button
                        type="button"
                        className={isFavorited ? 'favorited' : ''}
                        aria-pressed={isFavorited}
                        aria-label={isFavorited ? `${place.name} 즐겨찾기 해제` : `${place.name} 즐겨찾기 추가`}
                        onClick={() => toggleFavorite(place.name)}
                      >
                        <Icon name="heart" size={15} filled={isFavorited} />
                      </button>
                    </article>
                  )
                })}

                {filteredPlaces.length === 0 && (
                  <p className="empty-note">해당 조건의 장소가 아직 없어요.</p>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
