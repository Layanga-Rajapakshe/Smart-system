import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, User, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Badge } from '@nextui-org/react';
import { CiSearch } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import { useLogoutMutation } from '../redux/api/authApiSlice';
import ModeToggle from './modetoggle/ModeToggle';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
      toast.success('Logout Success');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <div className="hidden lg:block">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<CiSearch size={18} />}
              type="search"
              variant='bordered'
            />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className='cursor-pointer px-4'>
                <Badge content="99+" shape="circle" color="danger" size='sm' variant='shadow'>
                  <IoNotifications size={24} />
                </Badge>
              </div>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Notifications"
              color='default'
              variant='faded'
            >
              <DropdownItem key="notification1">Notification 1</DropdownItem>
              <DropdownItem key="notification2">Notification 2</DropdownItem>
              <DropdownItem key="notification3">Notification 3</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className='cursor-pointer px-4'>
                <Badge content="99+" shape="circle" color="danger" size='sm' variant='shadow'>
                  <FaRegMessage size={24} />
                </Badge>
              </div>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Messages"
              color='default'
              variant='faded'
            >
              <DropdownItem key="message1">Message 1</DropdownItem>
              <DropdownItem key="message2">Message 2</DropdownItem>
              <DropdownItem key="message3">Message 3</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User   
                name={userInfo.name || "Jane Doe"}
                description="Product Designer"
                className='cursor-pointer'
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">My Profile</DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        <div className="md:hidden flex items-center">
          <Dropdown placement="bottom-end" isOpen={isDropdownOpen} onOpenChange={toggleDropdown}>
            <DropdownTrigger>
              <User   
                name="Jane Doe"
                description="Product Designer"
                className='cursor-pointer'
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                }}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="More Options" variant="flat">
              <DropdownItem key="search">
                <Input
                  classNames={{
                    base: "w-full h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<CiSearch size={18} />}
                  type="search"
                  variant='bordered'
                />
              </DropdownItem>
              <DropdownItem key="toggle">
                <ModeToggle />
              </DropdownItem>
              <DropdownItem key="notifications">
                <Badge content="99+" shape="circle" color="danger" size='sm' variant='solid'>
                  Notifications
                </Badge>
              </DropdownItem>
              <DropdownItem key="messages">
                <Badge content="99+" shape="circle" color="danger" size='sm' variant='solid'>
                  Messages
                </Badge>
              </DropdownItem>
              <DropdownItem key="profile">My Profile</DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
