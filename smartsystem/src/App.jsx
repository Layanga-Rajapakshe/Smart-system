/*import React from 'react'
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
                <Route path="/companyedit" element={<CompanyEdit />} />
                <Route path='/companyview' element={<CompanyView />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/employeeregister" element={<EmployeeRegister />} />
                <Route path="/employeeedit" element={<EmployeeEdit />} />
                <Route path='/employeeview' element={<EmployeeView />} />
                <Route path='/attendance' element={<Attendance />} />
                <Route path="/superviseelist" element={<Supervisees />} />
                <Route path="/superviseetasks" element={<Tasks />} />
                <Route path="/newtask" element={<AddTask />} />
                <Route path="/superviseedetails" element={<SuperviseeDetails />} />
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
*/




import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Sidebar from './components/sidebar/Sidebar';
import Company from './pages/super_admin/company';
import Employee from './pages/super_admin/employee';
import CompanyRegister from './pages/super_admin/CompanyRegister';
import CompanyEdit from './pages/super_admin/CompanyEdit';
import CompanyView from './pages/super_admin/CompanyView';
import EmployeeRegister from './pages/super_admin/EmployeeRegister';
import EmployeeView from './pages/super_admin/EmployeeView';
import EmployeeEdit from './pages/super_admin/EmployeeEdit';
import Attendance from './pages/admin/Attendance';
import Supervisees from './pages/supervisor/Supervisees';
import Tasks from './pages/supervisor/Tasks';
import AddTask from './pages/supervisor/AddTask';
import SuperviseeDetails from './pages/supervisor/SuperviseeDetails';
import Salary_Dash from './pages/SeniorAccountant/Salary_Dash'; // Import Salary_Dash component

export default function App() {
  const location = useLocation();

  // Pages where Sidebar and Navbar should be hidden
  const hideSidebarAndNavbar = ['/login', '/', '/NotFound'].includes(location.pathname);

  return (
    <div>
      {!hideSidebarAndNavbar ? (
        <div className="flex h-screen">
          <Sidebar /> {/* Sidebar for all pages except login, home, and NotFound */}
          <div className="flex flex-1 flex-col">
            <NavBar /> {/* Navbar */}
            <div className="p-4 overflow-auto flex-1">
              <Routes>
                <Route path="/" element={<Home />} /> {/* Home page */}
                <Route path="/login" element={<Login />} /> {/* Login page */}
                <Route path="/company" element={<Company />} /> {/* Company management */}
                <Route path="/companyregister" element={<CompanyRegister />} /> {/* Register a company */}
                <Route path="/companyedit" element={<CompanyEdit />} /> {/* Edit a company */}
                <Route path='/companyview' element={<CompanyView />} /> {/* View company details */}
                <Route path="/employee" element={<Employee />} /> {/* Employee management */}
                <Route path="/employeeregister" element={<EmployeeRegister />} /> {/* Register an employee */}
                <Route path="/employeeedit" element={<EmployeeEdit />} /> {/* Edit an employee */}
                <Route path='/employeeview' element={<EmployeeView />} /> {/* View employee details */}
                <Route path='/attendance' element={<Attendance />} /> {/* Attendance page */}
                <Route path="/superviseelist" element={<Supervisees />} /> {/* List supervisees */}
                <Route path="/superviseetasks" element={<Tasks />} /> {/* Supervisees' tasks */}
                <Route path="/newtask" element={<AddTask />} /> {/* Add new task */}
                <Route path="/superviseedetails" element={<SuperviseeDetails />} /> {/* Supervisee details */}
                <Route path="/salaryDash" element={<Salary_Dash />} /> {/* Salary Dashboard */}
                <Route path="*" element={<Navigate to="/NotFound" />} /> {/* Catch-all route to NotFound */}
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/NotFound" element={<NotFound />} /> {/* NotFound page */}
          <Route path="*" element={<Navigate to="/NotFound" />} /> {/* Catch-all route */}
        </Routes>
      )}
      <Toaster /> {/* Toaster for notifications */}
      {!hideSidebarAndNavbar && <Footer />} {/* Footer displayed on all pages except login, home, and NotFound */}
    </div>
  );
}


