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
const [page, setPage] = useState<Page>("favorites");

if (page === "login") {
return (
<Login
onLoginSuccess={() => setPage("exercise")}
onNavigateSignup={() => setPage("signup")}
/>
);
}

if (page === "signup") {
return (
<Signup
onNavigateLogin={() => setPage("login")}
/>
);
}

if (page === "exercise") {
return <ExerciseInfo />;
}

if (page === "dashboard") {
return <Dashboard />;
}

if (page === "places") {
return <NearbyPlaces />;
}

if (page === "favorites") {
return <Favorites />;
}

  // 랜딩 페이지
  return <Landing />;
}
