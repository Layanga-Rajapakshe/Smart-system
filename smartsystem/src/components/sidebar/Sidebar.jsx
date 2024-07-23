import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Companies_dropdown from './Companies_dropdown';
import Sidebar_Item from './Sidebar_Item';
import { FaBuilding } from "react-icons/fa6";
import { BsFillPersonVcardFill } from "react-icons/bs";
import Sidebar_Menu from './Sidebar_Menu';

const Sidebar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const adminMenuItems = [
        { title: 'Companies Menu', href: '/company', icon: <FaBuilding/>, isActive: location.pathname === '/company' },
        { title: 'Employee Menu', href: '/employee', icon: <BsFillPersonVcardFill/>, isActive: location.pathname === '/employee' },
    ];

    return (
        <>
            <button
                className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
                onClick={toggleSidebar}
            >
                {isOpen ? "×" : "☰"}
            </button>
            
            <div className={`fixed inset-y-0 left-0 z-40 w-48 bg-white text-black transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
                <div className="flex flex-col h-full">
                    <div className="flex=grow gap-8 justify-items-center py-6 px-4">
                        <Companies_dropdown />
                    </div>


                    <Sidebar_Menu title="Admin Menu">
                    <nav className="flex-grow">
                        <ul>
                            {adminMenuItems.map((item, index) => (
                                <li key={index}>
                                    <Sidebar_Item {...item} />
                                </li>
                            ))}
                        </ul>
                    </nav>
                    </Sidebar_Menu>
                    
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