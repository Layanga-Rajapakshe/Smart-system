import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, User, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Badge, Button } from "@heroui/react";
import { CiSearch } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { RiDashboardLine } from "react-icons/ri";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHelp } from "react-icons/md";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutMutation } from '../redux/api/authApiSlice';
import ModeToggle from './modetoggle/ModeToggle';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth) || {};

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout Success');
    } catch (error) {
      toast.error(error?.message || 'Logout failed');
    }
  };

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const userName = userInfo?.name || "Guest User";
  const userRole = userInfo?.role || "N/A";
  const userAvatar = userInfo?.avatar || "https://i.pravatar.cc/150";

  return (
    <Navbar className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md py-2">
      {/* Logo and Brand */}
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <div className="flex items-center gap-2">
            {/* You can replace this with your actual logo */}
            <div className="font-bold text-xl text-white">SMART SYSTEM</div>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Main Navigation - Desktop Only */}
      <NavbarContent className="hidden lg:flex" justify="center">
        <div className="flex gap-4">
          <Link to="/dashboard" className="flex items-center gap-1 text-white/90 hover:text-white transition px-3 py-2">
            <RiDashboardLine size={18} />
            <span>Dashboard</span>
          </Link>
          <Link to="/company" className="flex items-center gap-1 text-white/90 hover:text-white transition px-3 py-2">
            <HiOutlineOfficeBuilding size={18} />
            <span>Companies</span>
          </Link>
          <Link to="/reports" className="flex items-center gap-1 text-white/90 hover:text-white transition px-3 py-2">
            <IoSettingsOutline size={18} />
            <span>Reports</span>
          </Link>
          <Link to="/help" className="flex items-center gap-1 text-white/90 hover:text-white transition px-3 py-2">
            <MdOutlineHelp size={18} />
            <span>Support</span>
          </Link>
        </div>
      </NavbarContent>

      {/* User Utilities - Desktop */}
      <NavbarContent as="div" className="items-center" justify="end">
        <div className="hidden md:flex items-center gap-2">

          <ModeToggle />

          {/* Notifications */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="text-white">
                <Badge content="5" shape="circle" color="danger" size="sm" variant="shadow">
                  <IoNotifications size={20} />
                </Badge>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications"
              className="w-80"
            >
              <DropdownItem key="notification_header" className="font-bold" textValue="Recent Notifications">
                Recent Notifications
              </DropdownItem>
              <DropdownItem key="notification1" description="2 minutes ago" textValue="New company registered">
                New company registered
              </DropdownItem>
              <DropdownItem key="notification2" description="1 hour ago" textValue="Report generated">
                Report generated
              </DropdownItem>
              <DropdownItem key="notification3" description="Today, 9:30 AM" textValue="System update available">
                System update available
              </DropdownItem>
              <DropdownItem key="view_all" className="text-primary" textValue="View all notifications">
                View all notifications
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Messages */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="text-white">
                <Badge content="3" shape="circle" color="danger" size="sm" variant="shadow">
                  <FaRegMessage size={18} />
                </Badge>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Messages"
              className="w-80"
            >
              <DropdownItem key="message_header" className="font-bold" textValue="Recent Messages">
                Recent Messages
              </DropdownItem>
              <DropdownItem key="message1" description="Can you help with..." textValue="John Smith">
                John Smith
              </DropdownItem>
              <DropdownItem key="message2" description="Invoice approved" textValue="Finance Team">
                Finance Team
              </DropdownItem>
              <DropdownItem key="message3" description="Meeting reminder" textValue="Admin">
                Admin
              </DropdownItem>
              <DropdownItem key="view_all_messages" className="text-primary" textValue="View all messages">
                View all messages
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* User Profile */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                name={userName}
                description={userRole}
                className="cursor-pointer"
                avatarProps={{
                  src: userAvatar,
                  className: "border-2 border-white/30",
                }}
                classNames={{
                  name: "text-white",
                  description: "text-white/70",
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem key="profile">My Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="help">Help & Support</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Dropdown placement="bottom-end" isOpen={isDropdownOpen} onOpenChange={toggleDropdown}>
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Mobile Navigation">
              <DropdownItem key="search">
                <Input
                  placeholder="Search..."
                  size="sm"
                  startContent={<CiSearch size={18} />}
                  type="search"
                  variant="bordered"
                  className="w-full"
                />
              </DropdownItem>
              <DropdownItem key="dashboard" startContent={<RiDashboardLine size={18} />}>
                Dashboard
              </DropdownItem>
              <DropdownItem key="companies" startContent={<HiOutlineOfficeBuilding size={18} />}>
                Companies
              </DropdownItem>
              <DropdownItem key="reports" startContent={<IoSettingsOutline size={18} />}>
                Reports
              </DropdownItem>
              <DropdownItem key="support" startContent={<MdOutlineHelp size={18} />}>
                Support
              </DropdownItem>
              <DropdownItem key="divider" className="h-px bg-gray-200 my-1" />
              <DropdownItem key="notifications" startContent={<IoNotifications size={18} />}>
                Notifications <Badge content="5" color="danger" size="sm" className="ml-auto" />
              </DropdownItem>
              <DropdownItem key="messages" startContent={<FaRegMessage size={18} />}>
                Messages <Badge content="3" color="danger" size="sm" className="ml-auto" />
              </DropdownItem>
              <DropdownItem key="profile">My Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="theme" className="cursor-default">
                <ModeToggle />
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;