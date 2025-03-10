import React from "react";
import { Tabs, Tab, Card, CardBody, Button, Image } from "@heroui/react";
import { IoAdd } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import DailyTask from "./DailyTask";
import WeeklyTask from "./WeeklyTask";
import MonthlyTask from "./MonthlyTask";
import OneTimeTask from "./OneTimeTask";
import image1 from "../../assets/images/background1.png";

const SmartWeeklyPlanner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/newtask');
  }
  
  const breadcrumbItems = [
    { label: 'Smart Weekly Planner', href: '/smartplanner', isCurrentPage: true }
  ];

  return (
    <div className="relative min-h-screen p-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image
          src={image1}
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Breadcrumb with better positioning */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20">
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">Smart Weekly Planner</h1>
              <Button 
                onClick={handleClick} 
                color="primary" 
                variant="flat" 
                endContent={<IoAdd />}
                className="px-4 py-2"
              >
                Add New Task
              </Button>
            </div>
            
            <div className="flex w-full flex-col">
              <Tabs 
                aria-label="Task categories"
                classNames={{
                  tabList: "bg-white/50 p-2 rounded-lg",
                  tab: "data-[selected=true]:bg-primary-500/20 data-[selected=true]:text-primary-700"
                }}
              >
                <Tab key="onetime" title="One-time">
                  <Card className="bg-white/80 shadow-md border border-white/40">
                    <CardBody>
                      <OneTimeTask />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="daily" title="Daily">
                  <Card className="bg-white/80 shadow-md border border-white/40">
                    <CardBody>
                      <DailyTask />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="weekly" title="Weekly">
                  <Card className="bg-white/80 shadow-md border border-white/40">
                    <CardBody>
                      <WeeklyTask />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="monthly" title="Monthly">
                  <Card className="bg-white/80 shadow-md border border-white/40">
                    <CardBody>
                      <MonthlyTask />
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWeeklyPlanner;