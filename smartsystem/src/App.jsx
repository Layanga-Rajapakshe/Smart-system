import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import Login from './pages/auth/Login'

export default function App() {
  return (
    <div>
        <Navbar />
        <div className='main-content'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
        <Footer />
    </div>
  )
}
