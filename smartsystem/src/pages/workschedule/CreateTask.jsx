import React, { useState } from 'react';
import { Tabs, Tab, Card, CardBody, Image } from "@heroui/react";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import NonRepeatTask from './NonRepeatTask';
import RepeatTask from './RepeatTask';
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import image1 from "../../assets/images/background1.png";

const CreateTask = () => {
  const [selectedTab, setSelectedTab] = useState('non-repeat');
  
  const handleTabChange = (key) => {
    setSelectedTab(key);
  };
  
  const breadcrumbItems = [
    { label: 'My Tasks', href: '/mytasks', isCurrentPage: false },
    { label: 'Add New Task', href: '/newtask', isCurrentPage: true }
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
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-black">Add New Task</h1>
            </div>
            
            <div className="flex w-full flex-col">
              <Tabs 
                aria-label="Task types"
                classNames={{
                  tabList: "bg-white/50 p-2 rounded-lg",
                  tab: "data-[selected=true]:bg-primary-500/20 data-[selected=true]:text-primary-700"
                }}
              >
                <Tab 
                  key="non-repeat" 
                  title={
                    <div className="flex items-center gap-2">
                      <TbRepeatOff />
                      <span>One-Time Task</span>
                    </div>
                  }
                >
                  <Card className="bg-white/80 shadow-md border border-white/40">
                    <CardBody>
                      <NonRepeatTask />
                    </CardBody>
                  </Card>
                </Tab>
                <Tab 
                  key="repeat" 
                  title={
                    <div className="flex items-center gap-2">
                      <TbRepeat />
                      <span>Repeating Task</span>
                    </div>
                  }
                >
                  <Card className="bg-white/80 shadow-md border border-white/40">
                    <CardBody>
                      <RepeatTask />
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

export default CreateTask;