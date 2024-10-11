import React from 'react'
import { useNavigate } from 'react-router-dom';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import SuperviseesList from './SuperviseesList';

const Supervisees = () => {
    const navigate = useNavigate();
    
    const breadcrumbItems = [
      { label: 'My Supervisees List', href: '/superviseelist', isCurrentPage: true }
    ];
  return (
    <div>
        <GeneralBreadCrumb items={breadcrumbItems} />
        <div className="container rounded-lg px-4">
          <div className="flex flex-col">
          <div className='flex justify-between'>
            <h1 className='text-2xl font-bold'>My Supervisees List</h1>
          </div>
          <div className='py-2'><SuperviseesList /></div>
          </div>
        </div>
      
    </div>
  )
}

export default Supervisees
