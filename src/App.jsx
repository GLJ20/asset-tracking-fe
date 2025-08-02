import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPg from './pages/LandingPg'

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