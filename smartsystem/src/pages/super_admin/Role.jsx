import React from 'react';
import { Button, Image, Card } from "@heroui/react";
import { IoAdd } from "react-icons/io5";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import RoleList from './RoleList';
import { useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/background1.png';

const Role = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/roleregister');
  }

  const breadcrumbItems = [
    { label: 'Role Menu', href: '/role', isCurrentPage: true }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
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

      {/* List Card Container */}
      <div className="relative z-10 w-full max-w-6xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-black">Role List</h1>
              <Button 
                onPress={handleClick} 
                color="primary" 
                variant="flat" 
                size="lg"
                endContent={<IoAdd />}
                className="px-4"
              >
                New Role
              </Button>
            </div>
            
            <div className="w-full">
              <RoleList />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Role;