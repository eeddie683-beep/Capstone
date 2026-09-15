import { useState, type ReactNode } from 'react'
import dashboardStyles from './Dashboard.scss?inline'

type IconName = 'home' | 'pin' | 'activity' | 'map' | 'star' | 'history' | 'user' | 'settings' | 'refresh' | 'bell' | 'run' | 'walk' | 'bike' | 'mountain' | 'swim' | 'drop' | 'wind' | 'heart' | 'building' | 'sun'

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

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const exercises: { name: string; icon: IconName }[] = [{ name: '러닝', icon: 'run' }, { name: '걷기', icon: 'walk' }, { name: '자전거', icon: 'bike' }, { name: '등산', icon: 'mountain' }, { name: '수영', icon: 'swim' }]
const places: { name: string; type: string; distance: string; icon: IconName; action?: boolean }[] = [
  { name: '충정공원 산책로', type: '산책로', distance: '1.2km', icon: 'mountain' },
  { name: '불암산 둘레길', type: '등산', distance: '2.3km', icon: 'mountain', action: true },
  { name: '노원구민체육센터', type: '체육관', distance: '2.8km', icon: 'building' },
]

export default function Dashboard() {
  const [exercise, setExercise] = useState('러닝')
  return <><style>{dashboardStyles}</style><div className="dashboard">
    <aside className="side">
      <a className="logo" href="/">
        <Icon name="activity" size={24} />
        <strong>FitMap</strong>
      </a>
      <nav aria-label="주 메뉴">
        <a href="/"><Icon name="home" />홈</a>
        <a className="active" href="/#weather"><Icon name="pin" />내 위치 / 날씨</a>
        <a href="/exercise"><Icon name="activity" />운동 정보</a>
        <a href="/places"><Icon name="map" />주변 장소</a>
        <a href="/favorites"><Icon name="star" />즐겨찾기</a>
      </nav>
      <div className="profile"><span className="avatar">김</span><div><b>김민수</b><small>사용자 계정</small></div><button aria-label="설정"><Icon name="settings" size={15} /></button></div>
    </aside>

    <main id="top" className="content">
      <header className="welcome"><div><h1>안녕하세요, 김민수님 👋</h1><p><Icon name="pin" size={12} /> 서울특별시 노원구 <span>• 위치 확인됨</span></p></div><div className="header-actions"><button><Icon name="refresh" size={14} /> 새로고침</button><button className="square" aria-label="알림"><Icon name="bell" size={16} /></button></div></header>

      <div className="dashboard-grid">
        <section id="weather" className="weather panel violet">
          <div className="weather-head"><div><p><Icon name="pin" size={12} /> 서울 노원구</p><h2>현재 날씨</h2></div><span className="sun-icon"><Icon name="sun" size={26} /></span></div>
          <div className="temp">24<sup>°C</sup></div><p className="feels">체감 25°C · 맑음</p>
          <div className="weather-stats"><div><Icon name="drop" /><b>58%</b><small>습도</small></div><div><Icon name="drop" /><b>10%</b><small>강수확률</small></div><div><Icon name="wind" /><b>3m/s</b><small>풍속</small></div><div><Icon name="sun" /><b>높음</b><small>자외선</small></div></div>
        </section>

        <section id="exercise" className="exercise-select panel"><h2>운동 선택</h2><div className="chips">{exercises.map(({ name, icon }) => <button className={exercise === name ? 'selected' : ''} onClick={() => setExercise(name)} key={name}><Icon name={icon} size={15} />{name}</button>)}</div></section>

        <section className="air panel"><div className="title-row"><h2><span className="title-icon"><Icon name="wind" size={14} /></span> 대기질 정보</h2><span className="good">전체 좋음</span></div><p className="updated">오늘의 측정 기반 분석</p><div className="air-values"><div><Icon name="activity" /><small>미세먼지 PM10</small><strong>15 <em>㎍/㎥</em></strong><span>좋음</span></div><div><Icon name="activity" /><small>초미세먼지 PM2.5</small><strong>8 <em>㎍/㎥</em></strong><span>좋음</span></div><div><Icon name="activity" /><small>오존 (O₃)</small><strong>0.08 <em>ppm</em></strong><span className="normal">보통</span></div></div></section>

        <section className="recommend panel"><div className="title-row"><h2>러닝 운동 정보</h2><span className="level">● 강도: 보통</span></div><p className="updated">오늘의 추천 기반 분석</p><div className="recommend-stats"><div><Icon name="history" /><small>추천 운동 시간</small><b>18:00 ~ 20:00</b></div><div><Icon name="drop" /><small>예상 칼로리</small><b>280 ~ 350 kcal</b></div><div><Icon name="activity" /><small>추천 거리</small><b>5 ~ 8 km</b></div></div><div className="caution"><b>⚠ 주의사항</b><p>• 자외선 지수가 높아 자외선 차단제 필수</p><p>• 충분한 수분 섭취 권장 (300ml당 200ml)</p><p>• 18시 이전 야외 활동 자제 권장</p></div></section>

        <section id="places" className="places panel"><div className="title-row"><h2><span className="title-icon"><Icon name="pin" size={14} /></span> 주변 운동 장소</h2><button className="more">전체보기 ›</button></div><div className="place-list">{places.map(place => <article key={place.name}><span className="place-icon"><Icon name={place.icon} /></span><div><h3>{place.name}</h3><p><span>{place.type}</span><span>무료</span></p><small><Icon name="pin" size={11} />{place.distance}</small></div><button className={place.action ? 'go' : ''} aria-label={place.action ? `${place.name} 보기` : `${place.name} 즐겨찾기`}>{place.action ? '◆' : <Icon name="heart" size={15} />}</button></article>)}</div></section>
      </div>
    </main>
  </div></>
}
