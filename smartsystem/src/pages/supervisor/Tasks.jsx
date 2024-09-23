import React from 'react'
import { useNavigate } from 'react-router-dom';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import TasksList from './TasksList';

const Tasks = () => {
  const navigate = useNavigate();
    
  const breadcrumbItems = [
    { label: 'Supervisees Task List', href: '/superviseetasks', isCurrentPage: true }
  ];
return (
  <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="container rounded-lg px-4">
        <div className="flex flex-col">
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>Supervisees Task List</h1>
        </div>
        <div className='py-2'><TasksList /></div>
        </div>
      </div>
    
  </div>
)
}

export default Tasks
