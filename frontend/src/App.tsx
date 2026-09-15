import { useState } from "react";

// import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import ExerciseInfo from "./pages/ExerciseInfo";
import NearbyPlaces from "./pages/NearbyPlaces";
import Favorites from "./pages/Favorites";

import "./App.css";

type Page =
  | "landing"
  | "login"
  | "signup"
  | "dashboard"
  | "exercise"
  | "places"
  | "favorites";

export default function App() {
  const initialPath =
    window.location.pathname.replace(/\/+$/, "") || "/";

  const getInitialPage = (): Page => {
    switch (initialPath) {
      case "/login":
        return "login";

      case "/signup":
        return "signup";

      case "/dashboard":
        return "dashboard";

      case "/exercise":
        return "exercise";

      case "/places":
        return "places";

      case "/favorites":
        return "favorites";

      default:
        // 테스트 기간에는 기본 진입 화면을 대시보드로 사용합니다.
        return "dashboard";
    }
  };

  const [page, setPage] = useState<Page>(getInitialPage());
  const navigate = (nextPage: Page) => {
    window.history.pushState({}, "", nextPage === "landing" ? "/" : `/${nextPage}`);
    setPage(nextPage);
  };

  // 로그인
  if (page === "login") {
    return (
      <Login
        onLoginSuccess={() => navigate("dashboard")}
        onNavigateSignup={() => navigate("signup")}
      />
    );
  }

  // 회원가입
  if (page === "signup") {
    return (
      <Signup
        onNavigateLogin={() => navigate("login")}
      />
    );
  }

  // 대시보드
  if (page === "dashboard") {
    return <Dashboard />;
  }

  // 운동 정보
  if (page === "exercise") {
    return <ExerciseInfo />;
  }

  // 주변 운동 장소
  if (page === "places") {
    return <NearbyPlaces />;
  }

  // 즐겨찾기
  if (page === "favorites") {
    return <Favorites />;
  }

  // 기존 랜딩 페이지 진입 코드
  // return <Landing />;
  return <Dashboard />;
}
