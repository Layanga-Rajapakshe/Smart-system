import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import SuperviseesList from './SuperviseesList';
import image1 from "../../assets/images/background1.png";

const Supervisees = () => {
    const navigate = useNavigate();
    
    const breadcrumbItems = [
      { label: 'My Supervisees List', href: '/superviseelist', isCurrentPage: true }
    ];

  return (
    <div className="relative min-h-screen p-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image
          src={image1}
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Breadcrumb with better positioning */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20">
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">My Supervisees List</h1>
            </div>
            <div className="py-2">
              <SuperviseesList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supervisees;