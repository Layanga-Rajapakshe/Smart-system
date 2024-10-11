import React from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import SuperviseeTaskOverview from './SuperviseeTaskOverview';
import SuperviseeData from './SuperviseeData';

// Assuming there should be a different component for rendering supervisee details
const SuperviseeInfo = () => {
  return (
    <div className="h-32 rounded-lg bg-gray-100">
      {/* Add supervisee details content here */}
      <p>Supervisee Information goes here</p>
    </div>
  );
};

const SuperviseeDetails = () => {
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Supervisee Details', href: '/superviseedetails', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="container rounded-lg px-4">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">Supervisee Details</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="lg:col-span-2">
              <SuperviseeData />
            </div>
            <div className="h-32 rounded-lg">
              <SuperviseeTaskOverview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperviseeDetails;
