import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/auth/Login'
import Sidebar from './components/sidebar/Sidebar'
import Company from './pages/super_admin/company'
import Employee from './pages/super_admin/employee'

export default function App() {
  const location = useLocation();
  const showSidebar = ['/company', '/employee'].includes(location.pathname);

  return (
    <div>
      {showSidebar ? (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <NavBar />
            <div className="p-4 overflow-auto flex-1">
              <Routes>
                <Route path="/company" element={<Company />} />
                <Route path="/employee" element={<Employee />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
      )}
      <Footer />
    </div>
  )
}
