import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/auth/Login'
import Sidebar from './components/sidebar/Sidebar'
import Company from './pages/super_admin/company'
import Employee from './pages/super_admin/employee'
import CompanyRegister from './pages/super_admin/CompanyRegister'
import CompanyEdit from './pages/super_admin/CompanyEdit'
import CompanyView from './pages/super_admin/CompanyView'
import EmployeeRegister from './pages/super_admin/EmployeeRegister'
import EmployeeView from './pages/super_admin/EmployeeView'
import EmployeeEdit from './pages/super_admin/EmployeeEdit'
import Attendance from './pages/admin/Attendance'
import Supervisees from './pages/supervisor/Supervisees'
import Tasks from './pages/supervisor/Tasks'
import AddTask from './pages/supervisor/AddTask'
import SuperviseeDetails from './pages/supervisor/SuperviseeDetails'
import Dashboard from './pages/ceo/Dashboard'
import Role from './pages/super_admin/Role'
import RoleRegister from './pages/super_admin/RoleRegister'
import RoleEdit from './pages/super_admin/RoleEdit'
import ViewAttendance from './pages/admin/ViewAttendance'
import MyDashboard from './pages/employee/MyDashboard'

export default function App() {
  const location = useLocation();
  const notShowSidebar = ['/login','/'].includes(location.pathname);

  return (
    <div>
      { !notShowSidebar ? (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <NavBar />
            <div className="p-4 overflow-auto flex-1">
              <Routes>
                <Route path="/company" element={<Company />} />
                <Route path="/companyregister" element={<CompanyRegister />} />
                <Route path="/companyedit/:id" element={<CompanyEdit />} />
                <Route path='/companyview/:id' element={<CompanyView />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/employeeregister" element={<EmployeeRegister />} />
                <Route path="/employeeedit/:id" element={<EmployeeEdit />} />
                <Route path='/employeeview/:id' element={<EmployeeView />} />
                <Route path='/role' element={<Role />} />
                <Route path='/roleregister' element={<RoleRegister />} />
                <Route path="/roleedit/:id" element={<RoleEdit />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/viewattendence' element={<ViewAttendance />} />
                <Route path="/superviseelist" element={<Supervisees />} />
                <Route path="/superviseetasks" element={<Tasks />} />
                <Route path="/newtask" element={<AddTask />} />
                <Route path="/superviseedetails" element={<SuperviseeDetails />} />
                <Route path="/ceodashboard" element={<Dashboard />} />
                <Route path="/dashboard" element={<MyDashboard />} />
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
      <Toaster />
      <Footer />
    </div>
  )
}
