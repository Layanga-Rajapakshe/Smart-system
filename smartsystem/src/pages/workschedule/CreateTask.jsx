import React, { useState } from 'react';
import { Tabs, Tab, Card } from "@nextui-org/react";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import NonRepeatTask from './NonRepeatTask';
import RepeatTask from './RepeatTask';

const CreateTask = () => {
  const [selectedTab, setSelectedTab] = useState('non-repeat');

  const handleTabChange = (key) => {
    setSelectedTab(key);
  };

  return (
    <div>
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
  );
};

export default CreateTask;
