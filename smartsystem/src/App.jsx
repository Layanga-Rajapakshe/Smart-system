import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './App.css'
import Login from './pages/auth/Login'
import Sidebar from './components/sidebar/Sidebar'
import Company from './pages/super_admin/company'
import Employee from './pages/super_admin/employee'

export default function App() {
  return (
    <div>
        <div className='main-content'>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

                <Sidebar>
                  <Routes>
                    <Route path="/company" element={<Company />} />
                    <Route path="/employee" element={<Employee />} />
                  </Routes>
                </Sidebar>
            
        </div>
        <Footer />
    </div>
  )
}
