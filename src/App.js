import React, { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Authentication from './features/Authentication/pages/Authentication'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem('token') ? true : false
  )
  const handleIsSignedIn = () => {
    setIsSignedIn(true)
    console.log("App ~ isSignedIn", isSignedIn)
  }
  const handleIsSignedOut = () => {
    setIsSignedIn(false)
    console.log("App ~ isSignedIn", isSignedIn)
  }
  // localStorage.getItem('token') && setIsSignedIn(true)

  return (
    <Router>
      <Routes>
        <Route path='/login' element={
          isSignedIn
            ?
            <Navigate to='/' />
            :
            <Authentication handleIsSignedIn={handleIsSignedIn} />
        } />
        <Route exact path='/' element={!isSignedIn ? <Navigate to='/login' /> : <HomePage handleIsSignedOut={handleIsSignedOut} isSignedIn={isSignedIn} />} />
      </Routes>
    </Router>
  )
}

export default App
