import React from 'react';
import { Card, CardBody, Image, Tabs, Tab, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider } from "@heroui/react";
import { IoRefresh, IoGridOutline, IoListOutline, IoSettings, IoNotifications, IoEllipsisVertical, IoAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import GreetingCard from './GreetingCard';
import TimeDateCard from './TimeDateCard';
import KPICard from './KPICard';
import LeavesSummaryCard from './LeavesSummaryCard';
import WorkScheduleCard from './WorkscheduleCard';
import MyScheduleCard from './MyScheduleCard';
import AttendanceCard from './AttendaceCard';
import MyMeetingsCard from './MyMeetingsCard';
import backgroundImage from "../../assets/images/background1.png";

const MyDashboard = () => {
  const navigate = useNavigate();

  const handleCustomize = () => {
    navigate('/customize-dashboard');
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image
          src={backgroundImage}
          alt="Dashboard Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      </div>

      {/* Dashboard Header */}
      <div className="relative z-10 w-full bg-white/80 backdrop-blur-md shadow-md border-b border-white/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">My Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome to your personal workspace</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                isIconOnly 
                variant="light" 
                aria-label="Refresh" 
                className="text-gray-600"
              >
                <IoRefresh />
              </Button>
              <Tabs 
                aria-label="View options" 
                size="sm" 
                radius="full"
                classNames={{
                  tabList: "bg-gray-100/80 p-1",
                  tab: "data-[selected=true]:bg-white data-[selected=true]:shadow-sm"
                }}
              >
                <Tab key="grid" title={<IoGridOutline />} />
                <Tab key="list" title={<IoListOutline />} />
              </Tabs>
              <Divider orientation="vertical" className="h-6 mx-2" />
              <Button 
                isIconOnly 
                variant="light" 
                aria-label="Notifications" 
                className="text-gray-600"
              >
                <IoNotifications />
              </Button>
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly 
                    variant="light" 
                    aria-label="More options" 
                    className="text-gray-600"
                  >
                    <IoEllipsisVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dashboard actions">
                  <DropdownItem key="customize" startContent={<IoSettings />} onPress={handleCustomize}>
                    Customize Dashboard
                  </DropdownItem>
                  <DropdownItem key="refresh">Refresh Data</DropdownItem>
                  <DropdownItem key="export">Export View</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div className="relative z-10 container mx-auto px-4 py-5 md:hidden">
        <div className="grid grid-cols-1 gap-4">
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-4">
            <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
              <CardBody>
                <GreetingCard />
              </CardBody>
            </Card>
            <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
              <CardBody>
                <TimeDateCard />
              </CardBody>
            </Card>
          </div>
          
          {/* Add New Button */}
          <div className="flex justify-end my-2">
            <Button 
              color="primary" 
              variant="flat" 
              endContent={<IoAdd />}
              className="px-4 py-2"
            >
              Add Widget
            </Button>
          </div>
          
          {/* Tabs for Mobile */}
          <Tabs 
            aria-label="Dashboard sections"
            fullWidth
            classNames={{
              tabList: "bg-white/80 rounded-xl p-1 shadow-sm border border-white/40",
              tab: "data-[selected=true]:bg-primary-500/20 data-[selected=true]:text-primary-700"
            }}
          >
            <Tab key="overview" title="Overview">
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
                  <CardBody>
                    <KPICard />
                  </CardBody>
                </Card>
                <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
                  <CardBody>
                    <LeavesSummaryCard />
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab key="schedule" title="Schedule">
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
                  <CardBody>
                    <MyScheduleCard />
                  </CardBody>
                </Card>
                <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
                  <CardBody>
                    <WorkScheduleCard />
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab key="meetings" title="Meetings">
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
                  <CardBody>
                    <MyMeetingsCard />
                  </CardBody>
                </Card>
              </div>
            </Tab>
            <Tab key="attendance" title="Attendance">
              <div className="grid grid-cols-1 gap-4 mt-2">
                <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow border border-white/40">
                  <CardBody>
                    <AttendanceCard />
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="relative z-10 hidden md:block container mx-auto px-6 py-6">
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-black">Dashboard Overview</h2>
            <Button 
              color="primary" 
              variant="flat" 
              endContent={<IoAdd />}
              className="px-4 py-2"
            >
              Add Widget
            </Button>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            {/* Top Row */}
            <div className="col-span-8">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full border border-white/40">
                <CardBody>
                  <GreetingCard />
                </CardBody>
              </Card>
            </div>
            <div className="col-span-3">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full border border-white/40">
                <CardBody>
                  <TimeDateCard />
                </CardBody>
              </Card>
            </div>
            <div className="col-span-1">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full overflow-hidden border border-white/40">
                <CardBody className="p-0">
                  <Image
                    src="https://i.pravatar.cc/150"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    removeWrapper
                  />
                </CardBody>
              </Card>
            </div>

            {/* Middle Row */}
            <div className="col-span-6">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full border border-white/40">
                <CardBody>
                  <KPICard />
                </CardBody>
              </Card>
            </div>
            <div className="col-span-6">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full border border-white/40">
                <CardBody>
                  <LeavesSummaryCard />
                </CardBody>
              </Card>
            </div>

            {/* Bottom Row */}
            <div className="col-span-4">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full border border-white/40">
                <CardBody>
                  <MyScheduleCard />
                </CardBody>
              </Card>
            </div>
            <div className="col-span-4">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full border border-white/40">
                <CardBody>
                  <WorkScheduleCard />
                </CardBody>
              </Card>
            </div>
            <div className="col-span-4">
              <Card className="bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow h-full border border-white/40">
                <CardBody>
                  <MyMeetingsCard />
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;