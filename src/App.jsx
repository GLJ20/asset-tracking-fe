import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPg from './pages/LandingPg'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import NavBar from './components/NavBar'
import Dashboard from './pages/Dashboard'
import AddAsset from './pages/AddAsset'
import AssetDetails from './pages/AssetDetails'
import EditAsset from './pages/EditAsset'
import AddLog from './pages/AddLog'


const App = () => {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<LandingPg />}/>
        <Route path= '/signin' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/assets/:assetid' element={<AssetDetails/>}/>
        <Route path='/addasset' element={<AddAsset/>}/>
        <Route path='/edit/:assetid' element={<EditAsset />}/>
        <Route path='/assets/:assetid/addlog' element={<AddLog />}/>
      </Routes>
    </>
  )
}

export default App