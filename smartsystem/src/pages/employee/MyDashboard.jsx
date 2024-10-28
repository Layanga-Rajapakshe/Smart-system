import React from 'react'
import { Card, CardBody } from '@nextui-org/react';
import GreetingCard from './GreetingCard';
import TimeDateCard from './TimeDateCard';

const MyDashboard = () => {

    return (
    <div>
        <div className="container rounded-lg px-4">
            <div className='flex flex-col'>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 pt-5 items-center">
              <div className="rounded-lg lg:col-span-2"><GreetingCard /></div>
              <div className="rounded-lg "><TimeDateCard/></div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 pt-5">
              <div className="h-32 rounded-lg bg-gray-200 lg:col-span-2"></div>
              <div className="h-32 rounded-lg bg-gray-200"></div>
            </div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 pt-5">
              <div className="h-32 rounded-lg bg-gray-200"></div>
              <div className="h-32 rounded-lg bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 pt-5">
              <div className="h-32 rounded-lg bg-gray-200"></div>
              <div className="h-32 rounded-lg bg-gray-200"></div>
            </div>
        </div>
    </div>
  )
}

export default MyDashboard
