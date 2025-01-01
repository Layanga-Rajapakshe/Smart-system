import React from 'react'
import {Button} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import Employeelist from './EmployeeList';
import { useNavigate } from 'react-router-dom';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const Employee = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/employeeregister');
  }

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
            <Button onClick={handleClick} color="primary" variant='flat' endContent={<IoAdd />}>
              New Employee
            </Button>
          </div>
          <div className='py-2'><Employeelist /></div>
          </div>
        </div>
    </div>
  )
}

export default Employee

