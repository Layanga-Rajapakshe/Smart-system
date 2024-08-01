import React from 'react'
import Employeelist from './EmployeeList';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const Employee = () => {
  
  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        <div className="h-32 rounded-lg lg:col-span-2">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Employee List</h1>
          </div>
          <div className='py-2'><Employeelist /></div>
          </div>
        </div>
        <div className="h-32 rounded-lg bg-gray-200"></div>
      </div>
    </div>
  )
}

export default Employee

