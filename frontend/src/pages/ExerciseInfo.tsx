import "./ExerciseInfo.scss";

const hourlyData = [
  {
    time: "아침",
    temp: "18°C",
    air: "좋음",
    uv: "낮음",
    status: "매우 좋음",
  },
  {
    time: "오전",
    temp: "22°C",
    air: "좋음",
    uv: "보통",
    status: "좋음",
  },
  {
    time: "오후",
    temp: "26°C",
    air: "보통",
    uv: "높음",
    status: "보통",
  },
  {
    time: "저녁",
    temp: "21°C",
    air: "좋음",
    uv: "낮음",
    status: "매우 좋음",
  },
  {
    time: "밤",
    temp: "18°C",
    air: "좋음",
    uv: "낮음",
    status: "좋음",
  },
];

export default function ExerciseInfo() {
  return (
    <div className="exercise-page">

      {/* =========================
          왼쪽 사이드바
      ========================= */}
      <aside className="exercise-sidebar">

        <div className="exercise-logo">
          <span>✦</span>
          FitMap
        </div>

        <nav className="exercise-nav">

          <button>
            <span>⌂</span>
            대시보드
          </button>

          <button className="active">
            <span>♧</span>
            운동 정보
          </button>

          <button>
            <span>⌖</span>
            주변 운동 장소
          </button>

          <button>
            <span>♡</span>
            즐겨찾기
          </button>

        </nav>

        <div className="sidebar-bottom">

          <button>
            <span>⚙</span>
            설정
          </button>

          <div className="user-box">
            <div className="user-avatar">김</div>

            <div>
              <strong>김민수</strong>
              <p>일반 회원</p>
            </div>
          </div>

        </div>
      </aside>


      {/* =========================
          메인
      ========================= */}
      <main className="exercise-main">

        {/* 헤더 */}
        <header className="exercise-header">

          <div>
            <p className="page-label">
              FitMap Exercise
            </p>

            <h1>
              운동 정보
            </h1>

            <p className="page-description">
              현재 운동환경과 오늘의 러닝 정보를 확인해보세요.
            </p>
          </div>

          <button className="location-button">
            ⌖ 현재 위치
          </button>

        </header>


        {/* =================================================
            현재 운동환경 + 시간대별 운동환경
            왼쪽 / 오른쪽 배치
        ================================================= */}
        <div className="environment-row">

          {/* =========================
              현재 운동환경
          ========================= */}
          <section className="current-section">

            <div className="section-title">

              <div>
                <h2>
                  현재 운동환경
                </h2>

                <p>
                  현재 위치의 운동 환경을 확인하세요.
                </p>
              </div>

              <span className="good-badge">
                ● 운동하기 좋음
              </span>

            </div>


            <div className="current-card">

              {/* 현재 날씨 */}
              <div className="weather-main">

                <div className="weather-icon">
                  ☀
                </div>

                <div>

                  <p>
                    현재 기온
                  </p>

                  <strong>
                    24<span>°C</span>
                  </strong>

                  <small>
                    맑음
                  </small>

                </div>

              </div>


              {/* 환경 정보 */}
              <div className="environment-grid">

                <div className="environment-item">

                  <span>
                    습도
                  </span>

                  <strong>
                    58%
                  </strong>

                  <em>
                    적정
                  </em>

                </div>


                <div className="environment-item">

                  <span>
                    미세먼지
                  </span>

                  <strong>
                    좋음
                  </strong>

                  <em>
                    낮음
                  </em>

                </div>


                <div className="environment-item">

                  <span>
                    자외선
                  </span>

                  <strong>
                    보통
                  </strong>

                  <em>
                    주의
                  </em>

                </div>


                <div className="environment-item">

                  <span>
                    풍속
                  </span>

                  <strong>
                    3 m/s
                  </strong>

                  <em>
                    적정
                  </em>

                </div>

              </div>


              {/* 운동 가능 여부 */}
              <div className="exercise-message">

                <span>
                  ✓
                </span>

                현재 야외 운동하기 좋은 환경입니다.

              </div>

            </div>

          </section>


          {/* =========================
              시간대별 운동환경
          ========================= */}
          <section className="hourly-section">

            <div className="section-title">

              <div>

                <h2>
                  시간대별 운동환경
                </h2>

                <p>
                  오늘 하루 중 운동하기 좋은 시간을 확인하세요.
                </p>

              </div>

            </div>


            <div className="hourly-card">

              {hourlyData.map((item, index) => (

                <div
                  className={`hourly-item ${
                    index === 3 ? "recommended" : ""
                  }`}
                  key={item.time}
                >

                  {/* 추천 표시 */}
                  {index === 3 && (
                    <span className="recommended-label">
                      추천
                    </span>
                  )}


                  {/* 시간 */}
                  <strong>
                    {item.time}
                  </strong>


                  {/* 날씨 */}
                  <div className="hourly-weather">
                    ☀
                  </div>


                  {/* 기온 */}
                  <b>
                    {item.temp}
                  </b>


                  {/* 미세먼지 */}
                  <div className="hourly-info">

                    <span>
                      미세먼지
                    </span>

                    <b>
                      {item.air}
                    </b>

                  </div>


                  {/* 자외선 */}
                  <div className="hourly-info">

                    <span>
                      자외선
                    </span>

                    <b>
                      {item.uv}
                    </b>

                  </div>


                  {/* 운동 상태 */}
                  <div className="fitness-status">
                    {item.status}
                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>


        {/* =========================
            오늘의 러닝 정보
        ========================= */}
        <section className="running-section">

          <div className="section-title">

            <div>

              <h2>
                오늘의 러닝 정보
              </h2>

              <p>
                현재 환경을 기준으로 추천하는 운동 정보입니다.
              </p>

            </div>

          </div>


          <div className="running-card">

            {/* 운동 시간 */}
            <div className="running-item">

              <div className="running-icon">
                ◷
              </div>

              <div>

                <span>
                  추천 운동 시간
                </span>

                <strong>
                  40~60분
                </strong>

              </div>

            </div>


            {/* 추천 거리 */}
            <div className="running-item">

              <div className="running-icon">
                ⌁
              </div>

              <div>

                <span>
                  추천 거리
                </span>

                <strong>
                  5~8 km
                </strong>

              </div>

            </div>


            {/* 칼로리 */}
            <div className="running-item">

              <div className="running-icon">
                ♨
              </div>

              <div>

                <span>
                  예상 소모 칼로리
                </span>

                <strong>
                  280~350 kcal
                </strong>

              </div>

            </div>


            {/* 오늘의 추천 */}
            <div className="running-recommendation">

              <span>
                오늘의 추천
              </span>

              <strong>
                가벼운 러닝을 추천해요.
              </strong>

              <p>
                현재 기온과 미세먼지를 고려하면
                야외 러닝에 적합합니다.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}