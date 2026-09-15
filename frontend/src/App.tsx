import { useState } from "react";

import Landing from "./pages/Landing";
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
        return "landing";
    }
  };

  const [page, setPage] = useState<Page>(getInitialPage());

  // 로그인
  if (page === "login") {
    return (
      <Login
        onLoginSuccess={() => setPage("dashboard")}
        onNavigateSignup={() => setPage("signup")}
      />
    );
  }

  // 회원가입
  if (page === "signup") {
    return (
      <Signup
        onNavigateLogin={() => setPage("login")}
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

  // 랜딩 페이지
  return <Landing />;
}