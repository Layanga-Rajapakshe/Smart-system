import React from 'react'
import { Card, CardBody } from '@nextui-org/react';
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
        <div className="container rounded-lg px-4">
            <div className='flex flex-col'>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 pt-5 items-center">
              <div className="rounded-lg lg:col-span-2"><GreetingCard /></div>
              <div className="rounded-lg "><TimeDateCard/></div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 pt-5 items-center">
              <div className="rounded-lg lg:col-span-2"><KPICard /></div>
              <div className="rounded-lg "><LeavesSummaryCard /></div>
            </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 pt-5 items-center">
              <div className="rounded-lg"><MyScheduleCard /></div>
              <div className="rounded-lg"><WorkScheduleCard /></div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 pt-5 items-center">
              <div className="rounded-lg"><AttendanceCard /></div>
              <div className="rounded-lg"><MyMeetingsCard /></div>
            </div>
        </div>
    </div>
  )
}

export default MyDashboard
