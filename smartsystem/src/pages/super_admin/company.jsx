import React from 'react'
import {Button} from "@heroui/react";
import { IoAdd } from "react-icons/io5";
import CompanyList from './CompanyList';
import { useNavigate } from 'react-router-dom';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const Company = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/companyregister');
  }
  
  const breadcrumbItems = [
    { label: 'Companies Menu', href: '/company', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
        <div className="container rounded-lg px-4">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Company List</h1>
            <Button onClick={handleClick} color="primary" variant='flat' endContent={<IoAdd />}>
              New Company
            </Button>
          </div>
          <div className='py-2'><CompanyList /></div>
          </div>
        </div>
    </div>
  )
}

export default Company

