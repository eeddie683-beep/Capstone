import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";

import "./App.css";

type Page = "landing" | "login" | "signup" | "dashboard";

export default function App() {
  const initialPath = window.location.pathname.replace(/\/+$/, "") || "/";
  const initialPage: Page = initialPath === "/login" ? "login" : initialPath === "/signup" ? "signup" : initialPath === "/dashboard" ? "dashboard" : "landing";
  const [page, setPage] = useState<Page>(initialPage);

  // 로그인 화면
  if (page === "login") {
    return (
      <Login
        onLoginSuccess={() => setPage("dashboard")}
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

  if (page === "dashboard") {
    return <Dashboard />;
  }

  return <Landing />;
}


// export default function App() {
//   switch (window.location.pathname.replace(/\/+$/, "") || "/") {
//     case "/exercise":
//       return <ExerciseInfo />;

//     case "/places":
//       return <NearbyPlaces />;

//     case "/favorites":
//       return <Favorites />;

//     default:
//       return <Dashboard />;
//   }
// }
