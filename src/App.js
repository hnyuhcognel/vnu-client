import React from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Authentication from './features/Authentication/pages/Authentication'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Authentication />} />
        <Route exact path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
