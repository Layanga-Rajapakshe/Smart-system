import React from 'react'
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const Dashboard = () => {
    const breadcrumbItems = [
        { label: 'CEO Dashboard', href: '/ceodashboard', isCurrentPage: true }
      ];

  return (
    <div>
        <GeneralBreadCrumb items={breadcrumbItems} />
        <div className="container rounded-lg px-4">
            <h1 className='text-2xl font-bold'>CEO Dashboard</h1>
            <div className='py-2'></div>
        </div>
    </div>
  )
}

export default Dashboard
