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
        <div className="container rounded-lg px-4">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Employee List</h1>
          </div>
          <div className='py-2'><Employeelist /></div>
          </div>
        </div>
    </div>
  )
}

export default Employee

