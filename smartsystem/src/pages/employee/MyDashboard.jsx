import React from 'react'
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import DashboardCard from './DashboardCard';

const MyDashboard = () => {
  const breadcrumbItems = [
    { label: 'My Dashboard', href: '/dashboard', isCurrentPage: true }
  ];

    return (
    <div>
        <GeneralBreadCrumb items={breadcrumbItems} />
        <div className="container rounded-lg px-4">
            <h1 className='text-2xl font-bold'>My Dashboard</h1>
            <DashboardCard />
        </div>
    </div>
  )
}

export default MyDashboard
