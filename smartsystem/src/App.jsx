import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/sidebar/Sidebar';

// Basic Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';

// Super Admin Pages
import Company from './pages/super_admin/company';
import CompanyRegister from './pages/super_admin/CompanyRegister';
import CompanyEdit from './pages/super_admin/CompanyEdit';
import CompanyView from './pages/super_admin/CompanyView';
import Employee from './pages/super_admin/employee';
import EmployeeRegister from './pages/super_admin/EmployeeRegister';
import EmployeeView from './pages/super_admin/EmployeeView';
import EmployeeEdit from './pages/super_admin/EmployeeEdit';
import Role from './pages/super_admin/Role';
import RoleRegister from './pages/super_admin/RoleRegister';
import RoleEdit from './pages/super_admin/RoleEdit';

// Employee Pages
import MyDashboard from './pages/employee/MyDashboard';
import LeaveHistory from './pages/LeaveManagement/LeaveHistory';
import LeaveProfile from './pages/LeaveManagement/LeaveProfile';
import WorkSchedule from './pages/employee/WorkSchedule';

// Admin Pages
import Attendance from './pages/admin/Attendance';
import AttendanceView from './pages/admin/ViewAttendance';

// Supervisor Pages
import Supervisees from './pages/supervisor/Supervisees';
import Tasks from './pages/supervisor/Tasks';
import SuperviseeDetails from './pages/supervisor/SuperviseeDetails';
import LeaveApproval from './pages/LeaveManagement/LeaveApproval';

// Accountant Pages
import EmployeeSalaryList from './pages/SeniorAccountant/EmployeeSalaryList';
import ViewEmployeeSalary from './pages/SeniorAccountant/ViewEmployeeSalary';
import EditEmployeeSalary from './pages/SeniorAccountant/EditEmployeeSalary';
import PayrollSummaryPage from './pages/SeniorAccountant/PayrollSummaryPage';
import EmployeeDetailsView from './pages/SeniorAccountant/EmployeeDetailsView';
import MonthlySalarySummaryPage from './pages/SeniorAccountant/MonthlySalarySummaryPage';

// Salary Pages
import EmployeeSalaryHistory from './pages/Salary/EmployeeSalaryHistory';
import SalaryComplaintForm from './pages/Salary/SalaryComplaintForm';

// KPI Pages
import KPIDashboard from './pages/KPI/KPIDashboard';
import EmployeePerformance from './pages/KPI/EmployeePerformance';
import KPIWelcome from './pages/KPI/KPIWelcome';
import EmployeesOverall from './pages/KPI/KPIOverallDetails';
import KPIDetails from './pages/KPI/ParameterDetails';

// Meeting Pages
import MeetingHome from "./pages/MeetingMinute/MeetingHome";
import Meetings from "./pages/MeetingMinute/Meetings";
import Notifications from './pages/MeetingMinute/Notifications';
import NotificationList from './pages/MeetingMinute/NotificationList';

//Permission Management
import PermissionApproval from "./pages/PermissionManagement/PermissionApprove";
import PermissionRequests from "./pages/PermissionManagement/PermissionRequest";
import RequestType from "./pages/PermissionManagement/RequestType";

// Protected Routes
import ProtectedRoute from './components/ProtectedRoute';
import MyTasks from './pages/workschedule/MyTasks';
import OneTimeTask from './pages/workschedule/OneTimeTask';
import CreateTask from './pages/workschedule/CreateTask';
import MyProfile from './pages/employee/MyProfile';


export default function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const shouldHideSidebarAndNavbar = ['/login', '/', '/NotFound'].includes(location.pathname);

  // Create a transition style function to handle smooth content adjustment
  const getContentStyle = () => {
    return {
      marginLeft: isOpen ? '16rem' : '0', // Slightly larger margin to prevent overlap
      width: isOpen ? 'calc(100% - 16rem)' : '100%',
      transition: 'all 0.3s ease-in-out',
    };
  };

  return (
    <div className="h-screen flex-col">
      {!shouldHideSidebarAndNavbar && <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
      
      <div className="flex flex-col" style={getContentStyle()}>
        {!shouldHideSidebarAndNavbar && <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />}
        
        <div className="p-4 overflow-auto flex-1">
          <Routes>
            <Route element={<ProtectedRoute />}>
            
              {/* Common Routes */}
              <Route path="/" element={<Home />} />
              
              {/* Super Admin Routes */}
              <Route path="/company" element={<Company />} />
              <Route path="/companyregister" element={<CompanyRegister />} />
              <Route path="/companyedit/:id" element={<CompanyEdit />} />
              <Route path="/companyview/:id" element={<CompanyView />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/employeeregister" element={<EmployeeRegister />} />
              <Route path="/employeeedit/:id" element={<EmployeeEdit />} />
              <Route path="/employeeview/:id" element={<EmployeeView />} />
              <Route path="/role" element={<Role />} />
              <Route path="/roleregister" element={<RoleRegister />} />
              <Route path="/roleedit/:id" element={<RoleEdit />} />
              
              {/* Admin Routes */}
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/viewattendance/:userId/:month" element={<AttendanceView />} />
              
              {/* Supervisor Routes */}
              <Route path="/superviseelist" element={<Supervisees />} />
              <Route path="/superviseetasks" element={<Tasks />} />
              <Route path="/superviseedetails" element={<SuperviseeDetails />} />
              <Route path="/leaveapproval" element={<LeaveApproval />} />
              
              {/* Employee Routes */}
              <Route path="/dashboard" element={<MyDashboard />} />
              <Route path="/leaveprofile" element={<LeaveProfile />} />
              <Route path="/leavehistory" element={<LeaveHistory />} />
              <Route path="/schedule" element={<WorkSchedule />} />
              <Route path='/mytasks' element={<MyTasks />} />
              <Route path='/newtask' element={<CreateTask />} />
              <Route path='/myprofile' element={<MyProfile />} />
              
              {/* Accountant Routes */}
              <Route path="/employeesalarylist" element={<EmployeeSalaryList />} />
              <Route path="/viewsalary/:id" element={<ViewEmployeeSalary />} />
              <Route path="/editsalary/:id" element={<EditEmployeeSalary />} />
              <Route path="/salary-history/:id" element={<EmployeeSalaryHistory />} />
              <Route path="/payrollsummary" element={<PayrollSummaryPage />} />
              <Route path="/payrolldetails/:userId/:month" element={<EmployeeDetailsView />} />
              <Route path="/monthlysalarysummary" element={<MonthlySalarySummaryPage />} />
              <Route path="/salarycomplaint" element={<SalaryComplaintForm />} />
              
              {/* KPI Routes */}
              <Route path='/kpiwelcome' element={<KPIWelcome />} />
              <Route path="/kpidashboard" element={<KPIDashboard />} />
              <Route path="/employee_performance" element={<EmployeePerformance />} />
              <Route path="/employeesOverall" element={<EmployeesOverall />} />
              <Route path="/kpidetails" element={<KPIDetails />} />

              {/* Meeting Routes */}
              <Route path="/meetingHome" element={<MeetingHome />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/notificationsList" element={<NotificationList />} />

              {/*Permission Management*/}
              <Route path="/permissionapprove" element={<PermissionApproval />}/>
              <Route path="/permissionrequests" element={<PermissionRequests />}/>
              <Route path="/requestType" element={<RequestType />}/>
            </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/NotFound" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/NotFound" />} />
          </Routes>
        </div>
      </div>

      <Toaster />
      {!shouldHideSidebarAndNavbar && <Footer />}
    </div>
  );
}
