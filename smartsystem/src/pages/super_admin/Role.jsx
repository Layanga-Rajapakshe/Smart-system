import React from 'react'
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import RoleList from './RoleList';

const Role = () => {
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
          </div>
          <div className='py-2'><RoleList /></div>
          </div>
        </div>
    </div>
  )
}

export default Role
