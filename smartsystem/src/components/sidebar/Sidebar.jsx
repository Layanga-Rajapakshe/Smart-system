import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import Companies_dropdown from './Companies_dropdown';
import Sidebar_Item from './Sidebar_Item';

const Sidebar = () => {
    const pathname = useParams();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const superAdminMenuItems = [
      {  title: 'Companies', href: '/company' , icon: '🏢', isActive: pathname === '/company' },
    ];

  return (
    <>
     <button
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? "x" :  "M" }
      </button>

      <div className={`fixed inset-y-0 left-0 z-40 w-6 text-black transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex gap-8 items-center px-6 py-6">
            <Companies_dropdown />
          </div>

          <nav className="flex-grow">
            <ul>
              {superAdminMenuItems.map((item, index) => (
                <li key={index}>
                  <Sidebar_Item {...item} />
                </li>
              ))}
            </ul>
          </nav>

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
  )
}

export default Sidebar
