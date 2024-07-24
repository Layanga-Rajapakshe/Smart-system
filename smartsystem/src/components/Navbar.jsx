import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, User, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Switch, Badge, Button } from '@nextui-org/react';
import { CiSearch } from "react-icons/ci";
import { LuSunMedium } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";

const NavBar = () => {
  return (
    <Navbar isBordered >
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
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
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">

      <Switch
        defaultSelected
        size="lg"
        color="primary"
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <LuSunMedium className={className} />
          ) : (
            <LuMoon className={className} />
          )
        }
      />

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
        <DropdownItem key="notification1">notification1</DropdownItem>
        <DropdownItem key="notification2">notification2</DropdownItem>
        <DropdownItem key="notification3">notification3</DropdownItem>
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
        <DropdownItem key="message1">message1</DropdownItem>
        <DropdownItem key="message2">message2</DropdownItem>
        <DropdownItem key="message3">message3</DropdownItem>
      </DropdownMenu>
    </Dropdown>

        <Dropdown placement="bottom-end">
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
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default NavBar;
