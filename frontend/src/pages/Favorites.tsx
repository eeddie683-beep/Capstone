import "./Favorites.scss";
import Sidebar from "../components/layout/Sidebar";

const favoritePlaces = [
{
id: 1,
name: "핏니스 헬스장",
type: "헬스장",
address: "경기도 양평군 양평읍 중앙로",
distance: "1.2 km",
rating: "4.8",
time: "06:00 - 24:00",
status: "운동하기 좋아요",
icon: "🏋️",
},
{
id: 2,
name: "양평 국민체육센터",
type: "체육관",
address: "경기도 양평군 양평읍 체육공원길",
distance: "2.4 km",
rating: "4.6",
time: "09:00 - 22:00",
status: "실내 운동 추천",
icon: "🏊",
},
{
id: 3,
name: "양평 생활체육공원",
type: "공원",
address: "경기도 양평군 양평읍 공원로",
distance: "3.1 km",
rating: "4.7",
time: "06:00 - 22:00",
status: "운동하기 좋아요",
icon: "🌳",
},
{
id: 4,
name: "스포츠센터 A",
type: "운동시설",
address: "경기도 양평군 강상면 스포츠로",
distance: "3.8 km",
rating: "4.5",
time: "07:00 - 23:00",
status: "실내 운동 추천",
icon: "⚽",
},
{
id: 5,
name: "파크 골프장",
type: "운동시설",
address: "경기도 양평군 양서면 공원길",
distance: "5.2 km",
rating: "4.6",
time: "08:00 - 18:00",
status: "운동하기 좋아요",
icon: "⛳",
},
{
id: 6,
name: "양평 러닝파크",
type: "공원",
address: "경기도 양평군 양서면 강변로",
distance: "5.8 km",
rating: "4.9",
time: "24시간",
status: "운동하기 좋아요",
icon: "🏃",
},
];

export default function Favorites() {
return (
<div className="favorites-page">
    <Sidebar />
    <aside className="favorites-sidebar legacy-favorites-sidebar">
    <div className="favorites-logo">
      <span>⌁</span>
      FitMap
    </div>

    <div className="sidebar-menu">
      <div className="sidebar-title">MENU</div>

      <button className="sidebar-item">
        <span>⌂</span>
        대시보드
      </button>

      <button className="sidebar-item">
        <span>♡</span>
        운동 정보
      </button>

      <button className="sidebar-item">
        <span>⌖</span>
        주변 장소
      </button>

      <button className="sidebar-item active">
        <span>★</span>
        즐겨찾기
      </button>

      <button className="sidebar-item">
        <span>⚙</span>
        설정
      </button>
    </div>

    <div className="sidebar-user">
      <div className="user-circle">김</div>

      <div>
        <strong>김민수</strong>
        <span>일반 회원</span>
      </div>
    </div>
  </aside>

  <main className="favorites-main">

    <header className="favorites-header">
      <div>
        <h1>즐겨찾기</h1>
        <p>내가 저장한 운동 장소를 한눈에 확인하세요.</p>
      </div>

      <div className="header-user">
        <span>안녕하세요, 김민수님 👋</span>

        <button type="button">
          🔔
        </button>
      </div>
    </header>

    <section className="favorites-content">

      <div className="favorites-top">
        <div>
          <h2>내 즐겨찾기</h2>
          <span>
            {favoritePlaces.length}개의 장소가 저장되어 있습니다.
          </span>
        </div>

        <div className="favorites-actions">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="시설명을 검색하세요"
            />
          </div>

          <select defaultValue="latest">
            <option value="latest">최신순</option>
            <option value="distance">거리순</option>
            <option value="rating">평점순</option>
            <option value="name">이름순</option>
          </select>

        </div>
      </div>

      <div className="category-tabs">
        <button className="category active">
          전체
        </button>

        <button className="category">
          헬스장
        </button>

        <button className="category">
          체육관
        </button>

        <button className="category">
          공원
        </button>

        <button className="category">
          운동시설
        </button>
      </div>

      <div className="favorite-grid">

        {favoritePlaces.map((place) => (
          <article
            className="favorite-card"
            key={place.id}
          >

            <div className="place-image">

              <span className="place-icon">
                {place.icon}
              </span>

              <button
                className="favorite-star"
                type="button"
                aria-label="즐겨찾기 삭제"
              >
                ★
              </button>

            </div>

            <div className="place-info">

              <div className="place-title">

                <div>
                  <span className="place-type">
                    {place.type}
                  </span>

                  <h3>
                    {place.name}
                  </h3>
                </div>

                <span className="rating">
                  ★ {place.rating}
                </span>

              </div>

              <p className="place-address">
                📍 {place.address}
              </p>

              <div className="place-details">
                <span>
                  📏 {place.distance}
                </span>

                <span>
                  🕐 {place.time}
                </span>
              </div>

              <div className="place-status">
                <span>●</span>
                {place.status}
              </div>

              <div className="card-buttons">
                <button type="button">
                  상세보기
                </button>

                <button type="button">
                  길찾기
                </button>
              </div>

            </div>

          </article>
        ))}

      </div>

    </section>

  </main>

</div>
);
}
