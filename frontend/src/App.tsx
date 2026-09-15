// import Landing from './pages/Landing'
// import './App.css'

// export default function App() {
//   return <Landing />
// }

import Dashboard from './pages/Dashboard'
import ExerciseInfo from './pages/ExerciseInfo'
import NearbyPlaces from './pages/NearbyPlaces'
import Favorites from './pages/Favorites'
import './App.css'

export default function App() {
  switch (window.location.pathname.replace(/\/+$/, '') || '/') {
    case '/exercise':
      return <ExerciseInfo />
    case '/places':
      return <NearbyPlaces />
    case '/favorites':
      return <Favorites />
    default:
      return <Dashboard />
  }
}
