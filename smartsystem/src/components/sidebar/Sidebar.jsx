import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CompaniesDropdown from './CompaniesDropdown';
import SidebarItem from './SidebarItem';
import { FaBuilding } from "react-icons/fa6";
import { GrTask } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import { LuClipboardList } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { FaMoneyCheck } from "react-icons/fa";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { MdSupervisorAccount } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import SidebarMenu from './SidebarMenu';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const sidebarRef = useRef(null);
    const timeoutRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleMouseLeave = () => {
        // Set a timeout to close the sidebar after a delay
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // 300ms delay before closing
    };

    const handleMouseEnter = () => {
        // Clear the timeout if the mouse re-enters the sidebar before it closes
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleClickOutside = (event) => {
        // Close the sidebar if a click occurs outside of it
        if (sidebarRef.current && 
            !sidebarRef.current.contains(event.target) && 
            !event.target.closest('.navbar-brand')) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add event listener for detecting clicks outside
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            // Clear any pending timeouts when component unmounts
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Menu items categorized by roles
    const superAdminMenuItems = [
        { title: 'Company Manager', href: '/company', icon: <FaBuilding />, isActive: ['/company', '/companyregister', '/companyedit', '/companyview'].includes(location.pathname) },
        { title: 'Employee Manager', href: '/employee', icon: <BsFillPersonVcardFill />, isActive: ['/employee', '/employeeregister', '/employeeedit', '/employeeview'].includes(location.pathname) },
        { title: 'Role Manager', href: '/role', icon: <MdOutlinePersonAddAlt />, isActive: ['/role', '/roleregister', '/roleedit', '/roleview'].includes(location.pathname) },
    ];

    const adminMenuItems = [
        { title: 'Attendance ', href: '/attendance', icon: <LuClipboardList />, isActive: ['/attendance'].includes(location.pathname) },
    ];

    const supervisorMenuItems = [
        { title: 'My Supervisee List', href: '/superviseelist', icon: <MdSupervisorAccount />, isActive: ['/superviseelist', '/superviseedetails'].includes(location.pathname) },
        { title: 'My Supervisee Tasks', href: '/superviseetasks', icon: <FaTasks />, isActive: ['/superviseetasks', '/newtask'].includes(location.pathname) },
        { title: 'My Supervisee Leaves', href: '/leaveapproval', icon: <FaTasks />, isActive: ['/leaveapproval'].includes(location.pathname) },
    ];

    const ceoMenuItems = [
        { title: 'CEO Dashboard', href: '/ceodashboard', icon: <TbLayoutDashboard />, isActive: ['/ceodashboard'].includes(location.pathname) },
    ];

    const employeeMenuItems = [
        { title: 'My Dashboard', href: '/dashboard', icon: <TbLayoutDashboard />, isActive: ['/dashboard'].includes(location.pathname) },
        { title: 'Smart Weekly Plan', href: '/mytasks', icon: <GrTask />, isActive: ['/mytasks'].includes(location.pathname) },
        { title: 'My Salary History', href: '/salary-history/1', icon: <GrTask />, isActive: ['/salary-history/1'].includes(location.pathname) },
        { title: 'Leave Dashboard', href: '/leaveprofile', icon: <GrTask />, isActive: ['/leaveprofile'].includes(location.pathname) },
         { title: 'Request Management', href: '/requestDashboard', icon: <GrTask />, isActive: ['/requestDashboard'].includes(location.pathname) },
    ];

    const seniorAccountantMenuItems = [
        { title: 'Employee Salary Details', href: '/employeesalarylist', icon: <FaMoneyCheck />, isActive: ['/employeesalarylist'].includes(location.pathname) },
        { title: 'Payroll Summary', href: '/payrollsummary', icon: <GiTakeMyMoney />, isActive: ['/payrollsummary'].includes(location.pathname) },
        { title: 'Monthly Summary', href: '/monthlysalarysummary', icon: <FaEdit />, isActive: ['/monthlysalarysummary'].includes(location.pathname) },
    ];

    const meetingMinuteMenuItems = [
        { title: 'Meeting List', href: '/meetingList', icon: <FaMoneyCheck />, isActive: ['/meetingList'].includes(location.pathname) },
        { title: 'Meetings', href: '/createMeetings', icon: <FaMoneyCheck />, isActive: ['/createMeetings'].includes(location.pathname) },
    ];

    const kpiMenuItems = [
        { title: 'KPI Home', href: '/KPIWelcome', icon: <FaMoneyCheck />, isActive: ['/KPIWelcom'].includes(location.pathname) },
        { title: 'KPI Dashboard', href: '/KPIdashboard', icon: <FaMoneyCheck />, isActive: ['/KPIdashboard'].includes(location.pathname) },
        { title: 'KPI Parameter Details', href: '/kpidetails', icon: <FaMoneyCheck />, isActive: ['/kpidetails'].includes(location.pathname) },
        { title: 'Employee Performance', href: '/employeesOverall', icon: <uClipboardList />, isActive: ['/employeesOverall'].includes(location.pathname) },
        
    ];

    return (
        <>
            {/* Sidebar Toggle Button
            <button
                className={`fixed top-4 z-50 p-2 bg-indigo-600/80 backdrop-filter backdrop-blur-md text-white rounded-md shadow-lg transition-all duration-300 ease-in-out hover:bg-indigo-700/90 ${
                    isOpen ? 'left-64' : 'left-4'
                }`}
                onClick={toggleSidebar}
            >
                {isOpen ? "×" : "☰"}
            </button> */}

            {/* Sidebar Component with Glassmorphism */}
            <div
                ref={sidebarRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`fixed top-0 left-0 h-full w-64 z-40 backdrop-filter backdrop-blur-md bg-white/20 dark:bg-gray-900/40 text-black dark:text-white transform transition-transform duration-300 ease-in-out shadow-xl border-r border-white/20 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {isOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                <div className="flex flex-col h-full overflow-y-auto">
                    {/* Header with logo */}
                    <div className="p-6 border-b border-white/20 bg-gray-300/30 backdrop-blur-md">
                        <div className="font-bold text-2xl text-black dark:text-white">Smart System</div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
                            Business management solutions
                        </p>
                    </div>

                    {/* Collapsible Menus */}
                    <div className="py-4 px-4">
                        <SidebarMenu title="Super Admin Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {superAdminMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>

                        <SidebarMenu title="Company Admin Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {adminMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>

                        <SidebarMenu title="Supervisor Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {supervisorMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>

                        <SidebarMenu title="CEO Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {ceoMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>

                        <SidebarMenu title="Employee Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {employeeMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>

                        <SidebarMenu title="Senior Accountant Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {seniorAccountantMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>

                        <SidebarMenu title="Meeting Minute Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {meetingMinuteMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>

                        <SidebarMenu title="KPI Menu">
                            <nav className="flex-grow">
                                <ul className="space-y-1">
                                    {kpiMenuItems.map((item, index) => (
                                        <li key={index} className={`rounded-md overflow-hidden`}>
                                            <SidebarItem {...item} />
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </SidebarMenu>
                    </div>

                    {/* Footer area */}
                    <div className="mt-auto border-t border-white/20 p-4 bg-gray-300/50">
                        <div className="flex space-x-4 justify-center mb-4">
                            <a href="https://twitter.com" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="https://facebook.com" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <div className="text-center text-gray-600 dark:text-gray-400 text-xs">
                            &copy; {new Date().getFullYear()} Smart System
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;