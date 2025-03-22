import React, { useState, useEffect } from 'react';
import { Navbar, NavbarBrand, NavbarContent, User, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Badge, Button } from "@heroui/react";
import { IoNotifications } from "react-icons/io5";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutMutation } from '../redux/api/authApiSlice';
import { useGetNotificationsQuery, useMarkNotificationsAsReadMutation } from '../redux/api/notificationApiSlice';
import ModeToggle from './modetoggle/ModeToggle';

const NavBar = ({ isOpen, setIsOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  // Fetch notifications using the API slice
  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    refetch: refetchNotifications
  } = useGetNotificationsQuery();

  // Mark notifications as read mutation
  const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

  const { userInfo } = useSelector((state) => state.auth) || {};

  // Prepare notifications for display
  const notifications = notificationsData?.notifications || [];
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

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

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientX < 50) { // Detect if mouse is near the left edge (50px)
        toggleSidebar(true);
      }
    };

    const handleMouseLeave = () => {
      toggleSidebar(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Set up polling for notifications
    const notificationInterval = setInterval(() => {
      refetchNotifications();
    }, 30000); // Poll every 30 seconds

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(notificationInterval);
    };
  }, [refetchNotifications]);

  // Function to toggle sidebar
  const toggleSidebar = () => setIsOpen(true);

  // Handle opening notification dropdown - mark notifications as read
  const handleNotificationOpen = async () => {
    if (unreadCount > 0) {
      try {
        await markNotificationsAsRead().unwrap();
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
  };

  // Format notification time
  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString();
  };

  const userName = userInfo?.name || "Guest User";
  const userRole = userInfo?.role || "N/A";
  const userAvatar = userInfo?.avatar || "https://i.pravatar.cc/150";

  return (
    <Navbar className="backdrop-blur-md bg-white/60 border-b border-white/10 shadow-lg text-white py-2 sticky top-0 z-50">
      {/* Logo and Brand */}
      <NavbarContent justify="start">
        <NavbarBrand
          className="mr-4 cursor-pointer"
          onClick={toggleSidebar}
          onMouseEnter={toggleSidebar}
        >
          <div className="flex items-center gap-2">
            <div className="font-bold text-xl text-black hover:text-gray-700 transition-colors duration-300">Smart System</div>
          </div>
        </NavbarBrand>
      </NavbarContent>

      {/* Main Navigation - Desktop Only */}
      <NavbarContent className="hidden lg:flex" justify="center">
        <div className="flex gap-4">
          <Link to="/dashboard" className="text-black/90 hover:black-white hover:bg-white/10 transition rounded-lg px-3 py-2">
            <span>Dashboard</span>
          </Link>
          <Link to="/company" className="text-black/90 hover:black-white hover:bg-white/10 transition rounded-lg px-3 py-2">
            <span>Companies</span>
          </Link>
          <Link to="/employee_performance" className="text-black/90 hover:black-white hover:bg-white/10 transition rounded-lg px-3 py-2">
            <span>KPI Performance</span>
          </Link>
          <Link to="/help" className="text-black/90 hover:black-white hover:bg-white/10 transition rounded-lg px-3 py-2">
            <span>Support</span>
          </Link>
        </div>
      </NavbarContent>

      {/* User Utilities - Desktop */}
      <NavbarContent as="div" className="items-center" justify="end">
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />

          {/* Notifications */}
          <Dropdown
            placement="bottom-end"
            onOpenChange={handleNotificationOpen}
          >
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="text-black relative group">
                {unreadCount > 0 ? (
                  <Badge content={unreadCount} shape="circle" color="danger" size="sm" variant="shadow">
                    <IoNotifications size={20} />
                  </Badge>
                ) : (
                  <IoNotifications size={20} />
                )}
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300"></div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications"
              className="w-80 bg-white/90 backdrop-blur-md dark:bg-gray-900/90"
            >
              <DropdownItem key="notification_header" className="font-bold" textValue="Recent Notifications">
                Recent Notifications
              </DropdownItem>

              {isLoadingNotifications ? (
                <DropdownItem key="loading" textValue="Loading notifications...">
                  Loading notifications...
                </DropdownItem>
              ) : notifications.length === 0 ? (
                <DropdownItem key="no_notifications" textValue="No notifications">
                  No notifications
                </DropdownItem>
              ) : (
                notifications.slice(0, 5).map((notification, index) => (
                  <DropdownItem
                    key={`notification-${index}`}
                    description={formatNotificationTime(notification.createdAt)}
                    textValue={notification.message}
                    className={!notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                  >
                    {notification.message}
                  </DropdownItem>
                ))
              )}

              {notifications.length > 5 && (
                <DropdownItem
                  key="view_all"
                  className="text-primary"
                  textValue="View all notifications"
                  onPress={() => navigate('/notifications')}
                >
                  View all notifications ({notifications.length})
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>

          {/* User Profile with Glassmorphism */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="cursor-pointer hover:bg-black/20 backdrop-blur-md rounded-lg px-2 py-1 transition-all duration-300">
                <User
                  name={userName}
                  description={userRole}
                  avatarProps={{
                    src: userAvatar,
                    className: "border-2 border-white/30",
                  }}
                  classNames={{
                    name: "text-black",
                    description: "text-black/70",
                  }}
                />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" className="bg-white/90 backdrop-blur-md dark:bg-gray-900/90">
              <DropdownItem key="profile" onPress={() => navigate('/myprofile')}>My Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="help">Help & Support</DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Mobile Menu with Glassmorphism */}
        <div className="md:hidden">
          <Dropdown placement="bottom-end" isOpen={isDropdownOpen} onOpenChange={toggleDropdown}>
            <DropdownTrigger>
              <Button isIconOnly variant="light" className="text-black bg-black/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Mobile Navigation" className="bg-white/90 backdrop-blur-md dark:bg-gray-900/90 w-72">
              <DropdownItem key="dashboard">Dashboard</DropdownItem>
              <DropdownItem key="companies">Companies</DropdownItem>
              <DropdownItem key="kpi_performance" onPress={() => navigate('/employee_performance')}>KPI Performance</DropdownItem>
              <DropdownItem key="support">Support</DropdownItem>
              <DropdownItem key="divider" className="h-px bg-black-200 dark:bg-gray-700 my-1" />
              <DropdownItem key="notifications" onClick={handleNotificationOpen}>
                Notifications {unreadCount > 0 && (
                  <Badge content={unreadCount} color="danger" size="sm" className="ml-auto" />
                )}
              </DropdownItem>
              <DropdownItem key="profile">My Profile</DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem key="theme" className="cursor-default">
                <ModeToggle />
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={handleLogout}>
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
