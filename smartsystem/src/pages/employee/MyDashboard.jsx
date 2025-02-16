import React from 'react';
import { Card, CardBody, Image } from "@heroui/react";
import GreetingCard from './GreetingCard';
import TimeDateCard from './TimeDateCard';
import KPICard from './KPICard';
import LeavesSummaryCard from './LeavesSummaryCard';
import WorkScheduleCard from './WorkscheduleCard';
import MyScheduleCard from './MyScheduleCard';
import AttendanceCard from './AttendaceCard';
import MyMeetingsCard from './MyMeetingsCard';

const MyDashboard = () => {
  return (
    <div>
    <div className="container mx-auto px-4 py-5 md:hidden">
      {/* Greeting and Time/Date Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <GreetingCard />
        </div>
        <div>
          <TimeDateCard />
        </div>
      </div>

      {/* KPI and Leaves Summary Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 pt-5">
        <div className="lg:col-span-2">
          <KPICard />
        </div>
        <div>
          <LeavesSummaryCard />
        </div>
      </div>

      {/* My Schedule and Work Schedule Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 pt-5">
        <div>
          <MyScheduleCard />
        </div>
        <div>
          <WorkScheduleCard />
        </div>
      </div>
      </div>

    
  <div
    class="hidden md:flex h-screen w-full flex-col items-center justify-center rounded-lg p-6"
  >
    <div class="grid h-full w-full grid-cols-10 grid-rows-5 gap-4">
      <div class="col-span-4 row-span-3 rounded-3xl "><LeavesSummaryCard/></div>
      <div class="col-span-5 row-span-1 rounded-3xl "><GreetingCard/></div>
      <div class="col-span-1 row-span-1 rounded-3xl "><
        Image
        src="https://i.pravatar.cc/150"
        className='w-full h-full items-center justify-center'
      /></div>
      <div class="col-span-2 row-span-2 rounded-3xl "><TimeDateCard/></div>
      <div class="col-span-4 row-span-2 rounded-3xl "><MyScheduleCard /></div>
      <div class="col-span-4 row-span-2 rounded-3xl "><WorkScheduleCard /></div>
      <div class="col-span-6 row-span-2 rounded-3xl"><KPICard/></div>
    </div>
  </div>
  </div>
  );
};

export default MyDashboard;
