import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPg from './pages/LandingPg'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'



const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPg />}/>
        <Route path= '/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
    </>
  )
}

export default App