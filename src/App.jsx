import Form from './components/Form.jsx'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Chores from './pages/Chores.jsx'
import House from './pages/House.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/chores" element={ <Chores /> } />
        <Route path="/house" element={ <House /> } />
      </Routes>
    </>
  )
}

export default App
