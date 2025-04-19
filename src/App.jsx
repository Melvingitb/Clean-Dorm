import { useEffect, useState } from 'react';
import Form from './components/Form.jsx'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Chores from './pages/Chores.jsx'
import House from './pages/House.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';


import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './components/firebase';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  if (!authChecked) return <div>Loading...</div>;

  return (
    <>
      <Routes>
        <Route path="/" element={ <Login isLoggedIn={isLoggedIn} /> } />
        <Route path="/chores" element={ <PrivateRoute isLoggedIn={isLoggedIn}><Chores /></PrivateRoute> } />
        <Route path="/house" element={ <PrivateRoute isLoggedIn={isLoggedIn}><House /></PrivateRoute> } />
      </Routes>
    </>
  )
}

export default App
