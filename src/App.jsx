import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login'
import Register from './features/auth/Register'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import AddSkill from './pages/AddSkill'
import Dashboard from './components/Dashboard'
import { login } from './features/auth/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Footer from './components/Footer'
import Explore from './pages/Explore'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/add-skill" element={<AddSkill />} />
        <Route path="/dashboard" element = {<Dashboard/>}/>
        <Route path="/explore" element = {<Explore/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
