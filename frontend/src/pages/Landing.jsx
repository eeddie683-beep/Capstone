import './Landing.scss'

const features = [
  '실시간 위치 확인',
  '날씨 & 대기질 분석',
  '맞춤형 운동 정보',
  '주변 운동 장소 탐색',
  '즐겨찾기',
  '운동 기록 관리'
]

const steps = [
  {
    title: '위치 권한 허용',
    description: (
      <>
        브라우저의 위치 권한을
        <br />
        허용하면 자동으로 현재
        <br />
        위치를 감지합니다.
      </>
    )
  },
  {
    title: '날씨 & 장소 분석',
    description: (
      <>
        실시간 날씨·대기질과
        <br />
        주변 운동 장소를 자동으로
        <br />
        분석해 불러옵니다.
      </>
    )
  },
  {
    title: '운동 시작!',
    description: (
      <>
        맞춤 운동 정보를 바탕으로
        <br />
        최적의 장소에서
        <br />
        운동을 시작하세요.
      </>
    )
  }
]

export default function Landing() {
  return (
    <div className="landing">

      <header className="landing-header">

        <a className="landing-logo" href="#intro">
          FitMap
        </a>

        <nav aria-label="랜딩페이지 메뉴">
          <a href="#intro">서비스 소개</a>
          <a href="#features">주요 기능</a>
          <a href="#how-it-works">이용 방법</a>
        </nav>

        <a
          className="placeholder-label"
          href="/login"
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          로그인 / 회원가입
        </a>

      </header>


      <main className="landing-main">

        {/* 메인 소개 */}
        <section
          className="landing-hero"
          id="intro"
          aria-labelledby="intro-title"
        >
          <div className="landing-container">

            <p className="section-label">
              01 · 메인 소개 구역
            </p>

            <h1 id="intro-title">
              내 위치에서 시작하는
              <br />
              스마트 운동가이드
            </h1>

            <p className="placeholder-copy">
              현재 위치의 날씨·대기질을 실시간으로 분석하고
              <br />
              주변 운동 장소와 맞춤형 운동 정보를 한 번에 제공합니다.
            </p>

            <div
              className="action-buttons-group"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '32px'
              }}
            >
              <a
                href="/dashboard"
                className="placeholder-actions"
              >
                지금 내 위치에서 시작하기
              </a>

              <a
                href="#features"
                className="placeholder-actions"
              >
                서비스 둘러보기
              </a>
            </div>

            <div className="wireframe preview-placeholder">
              대시보드 미리보기 이미지 영역
            </div>

          </div>
        </section>


        {/* 주요 기능 */}
        <section
          className="landing-section"
          id="features"
          aria-labelledby="features-title"
        >
          <div className="landing-container">

            <p className="section-label">
              02 · 주요 기능 구역
            </p>

            <h2 id="features-title">
              FitMap이 제공하는 모든 것
            </h2>

            <div className="landing-grid feature-grid">

              {features.map((feature) => (
                <article
                  className="wireframe feature-placeholder"
                  key={feature}
                >
                  <h3>{feature}</h3>
                  <p>아이콘 / 기능 설명 영역</p>
                </article>
              ))}

            </div>

          </div>
        </section>


        {/* 이용 방법 */}
        <section
          className="landing-section tinted"
          id="how-it-works"
          aria-labelledby="steps-title"
        >
          <div className="landing-container">

            <p className="section-label">
              03 · 이용 방법 구역
            </p>

            <h2 id="steps-title">
              3단계 이용 안내 영역
            </h2>

            <div className="landing-grid">

              {steps.map((step, index) => (
                <div
                  className="step-placeholder"
                  key={step.title}
                >
                  <span className="step-number">
                    {index + 1}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </div>
              ))}

            </div>

          </div>
        </section>


        {/* 시작하기 */}
        <section
          className="landing-section cta-placeholder"
          aria-labelledby="cta-title"
        >
          <div className="landing-container">

            <p className="section-label">
              04 · 시작하기 구역
            </p>

            <h2 id="cta-title">
              지금 바로 시작해보세요
            </h2>

            <p className="placeholder-copy">
              위치 권한 하나만 허용하면 나머지는 FitMap이 알아서 해드립니다.
              <br />
              오늘의 날씨와 최적의 운동 장소를 지금 확인해보세요.
            </p>

            <div
              className="action-buttons-group"
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              <a
                href="/signup"
                className="placeholder-actions"
              >
                무료로 시작하기
              </a>

              <a
                href="/login"
                className="placeholder-actions"
              >
                로그인
              </a>
            </div>

          </div>
        </section>

      </main>


      <footer className="landing-footer">

        <div className="landing-container footer-layout">

          <div>
            <strong>FitMap</strong>
            <p>05 · 푸터 구역</p>
          </div>

          <div>
            서비스 소개 / 지원 / 약관 링크 영역
          </div>

          <div className="footer-bottom">
            저작권 / 사용 API 표기 영역
          </div>

        </div>

      </footer>

    </div>
  )
}