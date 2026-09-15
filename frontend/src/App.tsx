import { useState } from "react";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import ExerciseInfo from "./pages/ExerciseInfo";
import NearbyPlaces from "./pages/NearbyPlaces";
import Favorites from "./pages/Favorites";

import "./App.css";

// type Page = "landing" | "login" | "signup";

// export default function App() {
//   const [page, setPage] = useState<Page>("landing");

//   // 로그인 화면
//   if (page === "login") {
//     return (
//       <Login
//         onNavigateSignup={() => setPage("signup")}
//       />
//     );
//   }

//   // 회원가입 화면
//   if (page === "signup") {
//     return (
//       <Signup
//         onNavigateLogin={() => setPage("login")}
//       />
//     );
//   }

//   return (
//     <Landing
//       onNavigateLogin={() => setPage("login")}
//       onNavigateSignup={() => setPage("signup")}
//     />
//   );
// }


export default function App() {
  switch (window.location.pathname.replace(/\/+$/, "") || "/") {
    case "/exercise":
      return <ExerciseInfo />;

    case "/places":
      return <NearbyPlaces />;

    case "/favorites":
      return <Favorites />;

    default:
      return <Dashboard />;
  }
}