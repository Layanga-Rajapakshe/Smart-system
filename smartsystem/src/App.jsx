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
import RoleView from './pages/super_admin/RoleView';

// Employee Pages
import MyDashboard from './pages/employee/MyDashboard';
import LeaveStatus from './pages/employee/LeaveStatus';
import LeaveRequest from './pages/employee/LeaveRequest';
import WorkSchedule from './pages/employee/WorkSchedule';

// Admin Pages
import Attendance from './pages/admin/Attendance';
import AttendanceView from './pages/admin/ViewAttendance';

// Supervisor Pages
import Supervisees from './pages/supervisor/Supervisees';
import Tasks from './pages/supervisor/Tasks';
import AddTask from './pages/supervisor/AddTask';
import SuperviseeDetails from './pages/supervisor/SuperviseeDetails';

// Work Schedule Pages
import CreateTask from './pages/workschedule/CreateTask';
import RepeatTask from './pages/workschedule/RepeatTask';
import NonRepeatTask from './pages/workschedule/NonRepeatTask';
import MyTasks from './pages/workschedule/MyTasks';

// CEO Pages
import Dashboard from './pages/ceo/Dashboard';

// Medical Claim Pages
import MedicalClaimProfile from './pages/MedicalClaim/MedicalClaimProfile';

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
import KPIWelcom from "./pages/KPI/KPIWelcom";
import KPIDashboard from './pages/KPI/KPIDashboard';
import KPIOverallDetails from "./pages/KPI/KPIOverallDetails";
import EmployeePerformance from "./pages/KPI/EmployeePerformance";
import CEOKpiSettingPage from "./pages/KPI/CEOKpiSettingPage";
import AddParameter from "./pages/KPI/Add_Parameter";
import DetailsParameter from "./pages/KPI/ParameterDetails";

// Meeting Pages
import MeetingHome from "./pages/MeetingMinute/MeetingHome";
import Meetings from "./pages/MeetingMinute/Meetings";
import Notifications from './pages/MeetingMinute/Notifications';
import NotificationList from './pages/MeetingMinute/NotificationList';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/ProtectedRoute';

export default function App() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const shouldHideSidebarAndNavbar = ['/login', '/', '/NotFound'].includes(location.pathname);

  return (
    <div>
      {!shouldHideSidebarAndNavbar ? (
        <div className="flex h-screen">
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div 
            className="flex flex-1 flex-col"
            style={{ 
              marginLeft: isOpen ? '14rem' : '0',
              width: isOpen ? 'calc(100% - 14rem)' : '100%' 
            }}
          >
            <NavBar />
            <div className="p-4 overflow-auto flex-1">
              <Routes>
                <Route element={<PrivateRoute />} >
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
                {/* <Route path="/roleview/:id" element={<RoleView />} /> */}
                
                {/* Admin Routes */}
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/viewattendance/:userId/:month" element={<AttendanceView />} />
                
                {/* Supervisor Routes */}
                <Route path="/superviseelist" element={<Supervisees />} />
                <Route path="/superviseetasks" element={<Tasks />} />
                <Route path="/superviseedetails" element={<SuperviseeDetails />} />
                
                {/* Employee Routes */}
                <Route path="/dashboard" element={<MyDashboard />} />
                <Route path="/leaverequest" element={<LeaveRequest />} />
                <Route path="/leavestatus" element={<LeaveStatus />} />
                <Route path="/schedule" element={<WorkSchedule />} />
                <Route path="/medicalclaimprofile" element={<MedicalClaimProfile />} />
                <Route path='/salarycomplaint' element={<SalaryComplaintForm />} />
                
                {/* Work Schedule Routes */}
                <Route path="/newtask" element={<CreateTask />} />
                <Route path="/mytasks" element={<MyTasks />} />
                
                {/* CEO Routes */}
                <Route path="/ceodashboard" element={<Dashboard />} />
                
                {/* Accountant Routes */}
                <Route path='/employeesalarylist' element={<EmployeeSalaryList />} />
                <Route path='/viewsalary/:id' element={<ViewEmployeeSalary />} />
                <Route path="/editsalary/:id" element={<EditEmployeeSalary />} />
                <Route path="/salary-history/:id" element={<EmployeeSalaryHistory />} />
                <Route path='/payrollsummary' element={<PayrollSummaryPage />} />
                <Route path='/payrolldetails/:id' element={<EmployeeDetailsView />} />
                <Route path='/monthlysalarysummary' element={<MonthlySalarySummaryPage />} />
                
                {/* KPI Routes */}
                <Route path="/KPIWelcom" element={<KPIWelcom />} />
                <Route path="/KPIdashboard" element={<KPIDashboard />} />
                <Route path="/kpi-overall-details" element={<KPIOverallDetails />} />
                <Route path="/employee-performance" element={<EmployeePerformance />} />
                <Route path="/KpiSetting" element={<CEOKpiSettingPage />} />
                <Route path="/add-parameter" element={<AddParameter />} />
                <Route path="/detail-parameter" element={<DetailsParameter />} />
                
                {/* Meeting Routes */}
                <Route path="/meetingHome" element={<MeetingHome />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/notificationsList" element={<NotificationList />} />
                </ Route>
                
                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/NotFound" />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route element={<PrivateRoute/>}>
          <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/NotFound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/NotFound" />} />
        </Routes>
      )}
      <Toaster />
      {!shouldHideSidebarAndNavbar && <Footer />}
    </div>
  );
}