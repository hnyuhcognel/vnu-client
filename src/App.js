import React, { useState } from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Authentication from './features/Authentication/pages/Authentication'
import HomePage from './pages/HomePage'

function App() {
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem('token') ? true : false
  )
  const handleIsSignedIn = () => {
    setIsSignedIn(true)
  }
  const handleIsSignedOut = () => {
    setIsSignedIn(false)
  }

  return (
    <>
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
    </>
  )
}

export default App
