import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CompaniesDropdown from './CompaniesDropdown';
import SidebarItem from './SidebarItem';
import { FaBuilding } from "react-icons/fa6";
import { BsFillPersonVcardFill } from "react-icons/bs";
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const adminMenuItems = [
        { title: 'Companies Menu', href: '/company', icon: <FaBuilding/>, isActive: ['/company', '/companyregister', '/companyedit', '/companyview'].includes(location.pathname) },
        { title: 'Admin Menu', href: '/admin', icon: <BsFillPersonVcardFill/>, isActive: location.pathname === '/admin' },
    ];

    return (
        <>
            <button
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
                onClick={toggleSidebar}
            >
                {isOpen ? "×" : "☰"}
            </button>
            
            <div className={`w-56 bg-white text-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
                <div className="flex flex-col h-full overflow-y-scroll">
                    <div className="flex gap-8 justify-center py-6 px-4">
                        <CompaniesDropdown />
                    </div>


                    <SidebarMenu title=" Super Admin Menu">
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