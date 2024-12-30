import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CompaniesDropdown from './CompaniesDropdown';
import SidebarItem from './SidebarItem';
import { FaBuilding } from "react-icons/fa6";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { MdSupervisorAccount } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const superAdminMenuItems = [
        { title: 'Companies Menu', href: '/company', icon: <FaBuilding/>, isActive: ['/company', '/companyregister', '/companyedit', '/companyview'].includes(location.pathname) },
        { title: 'Employee Menu', href: '/employee', icon: <BsFillPersonVcardFill/>, isActive: ['/employee', '/employeeregister', '/employeeedit', '/employeeview'].includes(location.pathname) },
        { title: 'Role Menu', href: '/role', icon: <MdOutlinePersonAddAlt/>, isActive: ['/role', '/roleregister', '/roleedit', '/roleview'].includes(location.pathname) },
    ];

    const adminMenuItems = [
        {title: 'Attendance Menu', href: '/attendance', icon: <SlCalender/>, isActive: ['/attendance'].includes(location.pathname)},
    ]

    const supervisorMenuItems = [
        {title: 'Supervisee List', href: '/superviseelist', icon: <MdSupervisorAccount/>, isActive: ['/superviseelist','/superviseedetails'].includes(location.pathname)},
        {title: 'Supervisee Tasks', href: '/superviseetasks', icon: <FaTasks/>, isActive: ['/superviseetasks','/newtask'].includes(location.pathname)},
    ]

    const ceoMenuItems = [
        {title: 'CEO Dashboard', href: '/ceodashboard', icon: <TbLayoutDashboard/>, isActive: ['/ceodashboard'].includes(location.pathname)},
    ]

    const employeeMenuItems = [
        {title: 'My Dashboard', href: '/dashboard', icon: <TbLayoutDashboard/>, isActive: ['/dashboard'].includes(location.pathname)},
    ]

    const seniorAccountantMenuItems = [
        {title: 'Employee Salary Details', href: '/employeesalarylist', icon: <TbLayoutDashboard/>, isActive: ['/employeesalarylist'].includes(location.pathname)},
        {title: 'View Salary', href: '/viewsalary', icon: <TbLayoutDashboard/>, isActive: ['/viewsalary'].includes(location.pathname)},
        {title: 'Edit Salary', href: '/editsalary', icon: <TbLayoutDashboard/>, isActive: ['/editsalary'].includes(location.pathname)},
    ]


    return (
        <>
            <button
                className={`fixed top-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden ${isOpen ? 'left-60' : 'left-4'}`}
                onClick={toggleSidebar}
            >
                {isOpen ? "×" : "☰"}
            </button>
            
            <div className={`fixed top-0 left-0 h-full w-56 z-50 bg-background text-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}>
                <div className="flex flex-col h-full overflow-y-scroll">
                    <div className="flex gap-8 justify-center py-6 px-4">
                        <CompaniesDropdown />
                    </div>

                    <SidebarMenu title="Super Admin Menu">
                        <nav className="flex-grow">
                            <ul>
                                {superAdminMenuItems.map((item, index) => (
                                    <li key={index}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>

                    <SidebarMenu title="Company Admin Menu">
                        <nav className="flex-grow">
                            <ul>
                                {adminMenuItems.map((item, index) => (
                                    <li key={index}>
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
                                    <li key={index}>
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
                                    <li key={index}>
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
                                    <li key={index}>
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
                                    <li key={index}>
                                        <SidebarItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </SidebarMenu>
                    
                    <div className="p-5 mt-auto">
                        <div className="flex items-center">
                            <img
                                src="/api/placeholder/32/32"
                                alt="User"
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <span>John Doe</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
