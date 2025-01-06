import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, } from "@nextui-org/react";
import DailyTask from "./DailyTask";
import WeeklyTask from "./WeeklyTask";
import MonthlyTask from "./MonthlyTask";
import { useNavigate } from 'react-router-dom';
import { Button } from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import OneTimeTask from "./OneTimeTask";

export default function MyTasks() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/newtask');
  }
  
  const breadcrumbItems = [
    { label: 'My Tasks', href: '/mytasks', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="container rounded-lg px-4">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>My Tasks</h1>
            <Button onClick={handleClick} color="primary" variant='flat' endContent={<IoAdd />}>
              Add New Task
            </Button>
          </div>
    <div className="flex w-full flex-col">
      <Tabs >
      <Tab value="Onetime" title='Onetime'>Onetime
          <Card>
            <CardBody>
              <OneTimeTask />
            </CardBody>
          </Card>
        </Tab>
        <Tab value="daily" title='Daily'>Daily
          <Card>
            <CardBody>
              <DailyTask />
            </CardBody>
          </Card>
        </Tab>
        <Tab value="weekly" title='Weekly'>Weekly
        <Card>
            <CardBody>
              <WeeklyTask />
            </CardBody>
          </Card>
        </Tab>
        <Tab value="monthly" title='Monthly'>Monthly
        <Card>
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
  );
}
