import React, { useState } from 'react';
import { Tabs, Tab, Card } from "@heroui/react";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import NonRepeatTask from './NonRepeatTask';
import RepeatTask from './RepeatTask';  
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";


const CreateTask = () => {
  const [selectedTab, setSelectedTab] = useState('non-repeat');

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  const breadcrumbItems = [
    { label: 'My Tasks', href: '/mytasks', isCurrentPage: true },
    { label: 'Add New Task', href: '/newtask', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="container rounded-lg px-4">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Add New Task</h1>
          </div>
      <div className="flex w-full flex-col items-center p-6">
        <Tabs
          color='primary'
          size="lg"
          value={selectedTab}
          onChange={handleTabChange}
        >
          <Tab
            key="non-repeat"
            title={
              <div className="flex items-center space-x-2">
                <TbRepeatOff />
                <span>One-Time Task</span>
              </div>
            }
          >
            <Card>
              <NonRepeatTask />
            </Card>
          </Tab>
          <Tab
            key="repeat"
            title={
              <div className="flex items-center space-x-2">
                <TbRepeat />
                <span>Repeating Task</span>
              </div>
            }
          >
            <Card>
              <RepeatTask />
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  </div>
</div>
  );
};

export default CreateTask;
