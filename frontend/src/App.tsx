import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

type Page = "landing" | "login" | "signup";

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  // 로그인 화면
  if (page === "login") {
    return (
      <Login
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

  // 처음 화면
  return (
    <Landing
      onNavigateLogin={() => setPage("login")}
    />
  );
}