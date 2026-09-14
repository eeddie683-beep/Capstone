import { useState } from 'react'

const exercises = ['러닝', '걷기', '자전거', '등산', '수영']

export default function Dashboard() {
  const [exercise, setExercise] = useState('러닝')

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home"><span className="brand-mark">F</span>FitMap<span className="brand-dot">.</span></a>
        <p className="nav-label">MY ACTIVE DAY</p>
        <nav aria-label="주 메뉴">
          <a className="nav-active" href="#home"><span aria-hidden="true">⌂</span>대시보드</a>
          <a href="#exercise"><span aria-hidden="true">↗</span>운동 정보</a>
          <a href="#places"><span aria-hidden="true">◎</span>주변 운동 장소</a>
        </nav>
        <div className="sidebar-note"><span className="small-label">MOVE AT YOUR PACE</span><p>가까운 곳에서 시작하는<br />나만의 건강한 하루.</p></div>
      </aside>

      <div className="main-shell" id="home">
        <header className="topbar"><span>나의 운동 대시보드</span><span className="preview-tag">미리보기 · 예시 데이터</span></header>
        <main>
          <div className="page-heading"><div><p className="eyebrow">YOUR DAY, YOUR MOVE</p><h1>오늘은 어디서 운동할까요?</h1><p>날씨부터 주변 장소까지, 운동 전 필요한 정보를 한눈에 확인하세요.</p></div><span className="location">◎ 서울 중구 <small>예시 위치</small></span></div>

          <section className="hero-panel" aria-labelledby="hero-title">
            <div><span className="small-label">A LITTLE MOVE, A BETTER DAY</span><h2 id="hero-title">일상에 움직임을 더하는<br />가장 가까운 시작.</h2><p>나에게 맞는 운동을 고르고, 주변 운동 장소를 살펴보세요.</p><a className="primary-link" href="#exercise">오늘의 운동 선택하기 <span aria-hidden="true">↗</span></a></div>
            <div className="image-placeholder"><span aria-hidden="true">↗</span><p>운동 이미지 영역</p><small>기존 이미지 적용 예정</small></div>
          </section>

          <div className="section-heading"><h2>오늘의 운동 환경</h2><span>실시간 연동 전 · 화면 구성 예시</span></div>
          <section className="environment-grid" aria-label="날씨와 대기질 예시">
            <article className="card weather-card"><div className="card-heading"><h3>현재 날씨</h3><span>맑음</span></div><div className="temperature"><span>22<small>°C</small></span><span className="sun" aria-hidden="true">☀</span></div><p>체감온도 23°C</p><div className="weather-details"><span>습도 <b>45%</b></span><span>강수확률 <b>10%</b></span><span>풍속 <b>2 m/s</b></span></div></article>
            <article className="card"><div className="card-heading"><h3>대기질</h3><span className="status">좋음</span></div><p className="air-copy">미세먼지 걱정 없이<br /><strong>가볍게 움직이는 하루</strong></p><div className="air-details"><div><span>미세먼지 PM10</span><b>24 <small>μg/m³</small></b></div><div><span>초미세먼지 PM2.5</span><b>12 <small>μg/m³</small></b></div></div></article>
            <article className="card guide-card"><span className="small-label">BEFORE YOU MOVE</span><h3>운동 전,<br />환경부터 확인하세요.</h3><p>기온과 대기질을 확인하고<br />실내 또는 실외 운동을 계획해 보세요.</p><span className="guide-foot">날씨 · 대기질 · 주변 장소</span></article>
          </section>

          <div className="lower-grid">
            <section className="card" id="exercise"><div className="card-heading"><h2>오늘의 운동</h2><span>01 — SELECT</span></div><p className="section-description">어떤 운동을 하고 싶으세요?</p><div className="exercise-options" aria-label="운동 종류">{exercises.map((item) => <button type="button" key={item} aria-pressed={exercise === item} className={exercise === item ? 'selected' : ''} onClick={() => setExercise(item)}>{item}</button>)}</div><div className="exercise-summary"><span className="exercise-symbol" aria-hidden="true">↗</span><div><h3>{exercise} 선택 완료</h3><p>운동 강도, 시간, 거리 정보를 이곳에서 확인할 수 있어요.</p></div></div><div className="metric-grid">{['운동 강도', '운동 시간', '운동 거리'].map((label) => <div key={label}><span>{label}</span><b>—</b></div>)}</div></section>
            <section className="card" id="places"><div className="card-heading"><h2>주변 운동 장소</h2><span>02 — EXPLORE</span></div><p className="section-description">내 주변의 공원과 운동 시설을 찾아보세요.</p><div className="map-placeholder"><span className="map-pin" aria-hidden="true">◎</span><strong>우리 동네, 새로운 운동 장소</strong><p>위치 및 지도 연동 후 표시됩니다.</p></div><div className="place-types"><span>공원</span><span>산책로</span><span>체육관</span><span>체육센터</span></div></section>
          </div>
          <footer>FitMap <span>오늘의 작은 움직임이 내일의 나를 만듭니다.</span></footer>
        </main>
      </div>
    </div>
  )
}
