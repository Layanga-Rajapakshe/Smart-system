import React from 'react'
import {Button} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import RoleList from './RoleList';
import { useNavigate } from 'react-router-dom';

const Role = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/roleregister');
  }
    const breadcrumbItems = [
        { label: 'Role Menu', href: '/role', isCurrentPage: true }
      ];
  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
        <div className="container rounded-lg px-4">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>Role List</h1>
            <Button onClick={handleClick} color="primary" variant='flat' endContent={<IoAdd />}>
              New Role
            </Button>
          </div>
          <div className='py-2'><RoleList /></div>
          </div>
        </div>
    </div>
  )
}

export default Role
