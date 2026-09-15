import './Landing.scss'

const features = ['실시간 위치 확인', '날씨 & 대기질 분석', '맞춤형 운동 정보', '주변 운동 장소 탐색', '즐겨찾기', '운동 기록 관리']

export default function Landing() {
  return (
    <div className="landing">
      <header className="landing-header">
        <a className="landing-logo" href="#intro">FitMap</a>
        <nav aria-label="랜딩페이지 메뉴">
          <a href="#intro">서비스 소개</a>
          <a href="#features">주요 기능</a>
          <a href="#how-it-works">이용 방법</a>
        </nav>
        <span className="placeholder-label">로그인 / 회원가입 영역</span>
      </header>

      <main className="landing-main">
        <section className="landing-hero" id="intro" aria-labelledby="intro-title">
          <div className="landing-container">
            <p className="section-label">01 · 메인 소개 구역</p>
            <h1 id="intro-title">서비스 메인 문구 영역</h1>
            <p className="placeholder-copy">서비스 소개 및 설명 문구</p>
            <div className="placeholder-actions">시작하기 / 서비스 둘러보기 버튼 영역</div>
            <div className="landing-stats" aria-label="서비스 통계 자리"><span>통계 영역 1</span><span>통계 영역 2</span><span>통계 영역 3</span></div>
            <div className="wireframe preview-placeholder">대시보드 미리보기 이미지 영역</div>
          </div>
        </section>

        <section className="landing-section" id="features" aria-labelledby="features-title">
          <div className="landing-container">
            <p className="section-label">02 · 주요 기능 구역</p>
            <h2 id="features-title">주요 기능 소개 영역</h2>
            <div className="landing-grid feature-grid">{features.map((feature) => <article className="wireframe feature-placeholder" key={feature}><h3>{feature}</h3><p>아이콘 / 기능 설명 영역</p></article>)}</div>
          </div>
        </section>

        <section className="landing-section tinted" id="how-it-works" aria-labelledby="steps-title">
          <div className="landing-container">
            <p className="section-label">03 · 이용 방법 구역</p>
            <h2 id="steps-title">3단계 이용 안내 영역</h2>
            <div className="landing-grid">{['위치 권한 허용', '날씨 & 장소 분석', '운동 시작'].map((step, index) => <div className="step-placeholder" key={step}><span className="step-number">{index + 1}</span><h3>{step}</h3><p>단계별 설명 영역</p></div>)}</div>
          </div>
        </section>

        <section className="landing-section" aria-labelledby="reviews-title">
          <div className="landing-container">
            <p className="section-label">04 · 사용자 후기 구역</p>
            <h2 id="reviews-title">사용자 후기 영역</h2>
            <div className="landing-grid">{[1, 2, 3].map((item) => <div className="wireframe review-placeholder" key={item}>후기 카드 {item}<p>평점 / 후기 내용 / 사용자 정보</p></div>)}</div>
          </div>
        </section>

        <section className="landing-section cta-placeholder" aria-labelledby="cta-title">
          <div className="landing-container"><p className="section-label">05 · 시작하기 구역</p><h2 id="cta-title">서비스 시작 안내 영역</h2><p className="placeholder-copy">가입 유도 문구</p><div className="placeholder-actions">무료로 시작하기 / 로그인 버튼 영역</div></div>
        </section>
      </main>

      <footer className="landing-footer"><div className="landing-container footer-layout"><div><strong>FitMap</strong><p>06 · 푸터 구역</p></div><div>서비스 소개 / 지원 / 약관 링크 영역</div><div className="footer-bottom">저작권 / 사용 API 표기 영역</div></div></footer>
    </div>
  )
}

