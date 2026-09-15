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
  | "exercise"
  | "dashboard"
  | "places"
  | "favorites";

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  // 로그인 화면
  if (page === "login") {
    return (
      <Login
        onLoginSuccess={() => setPage("exercise")}
        onNavigateSignup={() => setPage("signup")}
      />
    );
  }

  // 회원가입 화면
  if (page === "signup") {
    return (
      <Signup
        onNavigateLogin={() => setPage("login")}
      />
    );
  }

  // 운동 정보
  if (page === "exercise") {
    return <ExerciseInfo />;
  }

  // 대시보드
  if (page === "dashboard") {
    return <Dashboard />;
  }

  // 주변 운동 장소
  if (page === "places") {
    return <NearbyPlaces />;
  }

  // 즐겨찾기
  if (page === "favorites") {
    return <Favorites />;
  }

  // 처음 화면
  return (
    <Landing
      onNavigateLogin={() => setPage("login")}
    />
  );
}