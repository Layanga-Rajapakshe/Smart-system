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

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        // Close the sidebar if a click occurs outside of it
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Add and clean up the event listener for detecting clicks outside
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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
    ];

    const ceoMenuItems = [
        { title: 'CEO Dashboard', href: '/ceodashboard', icon: <TbLayoutDashboard />, isActive: ['/ceodashboard'].includes(location.pathname) },
    ];

    const employeeMenuItems = [
        { title: 'My Dashboard', href: '/dashboard', icon: <TbLayoutDashboard />, isActive: ['/dashboard'].includes(location.pathname) },
        { title: 'Smart Weekly Plan', href: '/mytasks', icon: <GrTask />, isActive: ['/mytasks'].includes(location.pathname) },
    ];

    const seniorAccountantMenuItems = [
        { title: 'Salary Details', href: '/employeesalarylist', icon: <FaMoneyCheck />, isActive: ['/employeesalarylist'].includes(location.pathname) },
        { title: 'View Salary', href: '/viewsalary', icon: <GiTakeMyMoney />, isActive: ['/viewsalary'].includes(location.pathname) },
        { title: 'Edit Salary', href: '/editsalary', icon: <FaEdit />, isActive: ['/editsalary'].includes(location.pathname) },
    ];

    const meetingMinuteMenuItems = [
        { title: 'Meeting Home', href: '/meetingHome', icon: <FaMoneyCheck />, isActive: ['/meetingHome'].includes(location.pathname) },
        { title: 'Meetings', href: '/meetings', icon: <FaMoneyCheck />, isActive: ['/meetings'].includes(location.pathname) },
    ];

    const kpiMenuItems = [
        { title: 'KPI Home', href: '/KPIWelcom', icon: <FaMoneyCheck />, isActive: ['/KPIWelcom'].includes(location.pathname) },
        { title: 'KPI Dashboard', href: '/KPIdashboard', icon: <FaMoneyCheck />, isActive: ['/KPIdashboard'].includes(location.pathname) },
    ];

    return (
        <>
            {/* Sidebar Toggle Button */}
            <button
                className={`fixed top-4 z-50 p-2 bg-gray-800 text-white rounded-md transition-all duration-300 ease-in-out ${
                    isOpen ? 'left-56' : 'left-4'
                }`}
                onClick={toggleSidebar}
            >
                {isOpen ? "×" : "☰"}
            </button>

            {/* Sidebar Component */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-56 z-40 bg-background text-black transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}


                <div className="flex flex-col h-full overflow-y-scroll">
                    {/* Companies Dropdown */}
                  { /* <div className="flex gap-8 justify-center py-6 px-4">
                        <CompaniesDropdown />
                    </div>*/}

                    {/* Conditional Rendering of Menus */}
                    <SidebarMenu title="Super Admin Menu">
                        <nav className="flex-grow">
                            <ul>
                                {superAdminMenuItems.map((item, index) => (
                                    <li key={index} className={` rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title={"Company Admin Menu"}>
                        <nav className="flex-grow">
                            <ul>
                                {adminMenuItems.map((item, index) => (
                                    <li key={index} className={`rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title="Supervisor Menu">
                        <nav className="flex-grow">
                            <ul>
                                {supervisorMenuItems.map((item, index) => (
                                    <li key={index} className={` rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title="CEO Menu">
                        <nav className="flex-grow">
                            <ul>
                                {ceoMenuItems.map((item, index) => (
                                    <li key={index} className={` rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title="Employee Menu">
                        <nav className="flex-grow">
                            <ul>
                                {employeeMenuItems.map((item, index) => (
                                    <li key={index} className={` rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title="Senior Accountant Menu">
                        <nav className="flex-grow">
                            <ul>
                                {seniorAccountantMenuItems.map((item, index) => (
                                    <li key={index} className={` rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title="Meeting Minute Menu">
                        <nav className="flex-grow">
                            <ul>
                                {meetingMinuteMenuItems.map((item, index) => (
                                    <li key={index} className={` rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title="KPI Menu">
                        <nav className="flex-grow">
                            <ul>
                                {kpiMenuItems.map((item, index) => (
                                    <li key={index} className={` rounded-md `}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>
                    
                </div>
            </div>
        </>
    );
};

export default Sidebar;