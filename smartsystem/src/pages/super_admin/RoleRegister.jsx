import React, { useState } from 'react';
import { Input, Button, Image } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const RoleRegister = () => {
    const [companyName, setCompanyName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle registration logic here
      console.log("Company Name:", companyName);
      console.log("Address:", address);
      console.log("Phone Number:", phoneNumber);
    };
  
    const breadcrumbItems = [
      { label: 'Role Menu', href: '/role' },
      { label: 'Role Register', href: '/roleregister', isCurrentPage: true }
    ];
  
    return (
      <div>
        <GeneralBreadCrumb items={breadcrumbItems} />
        <div className='flex h-screen overflow-hidden'>
          <div className='flex-1 flex-col flex items-center justify-center p-6'>
            <div className='md:hidden absolute left-0 right-0 bottom-0 top-0 z-0'>
              <Image
                isBlurred
                className='w-full h-screen/2 fill-inherit'
                src="https://nextui.org/gradients/docs-right.png"
                alt='Login page image'
              />
            </div>
  
            <div className='text-center text-[25px] font-bold mb-6'>Role Register</div>
  
            <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 mb-4'>
              <Input
                variant='bordered'
                label='Company Name'
                type='text'
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <Input
                variant='bordered'
                label='Address'
                type='text'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Input
                variant='bordered'
                label='Phone Number'
                type='tel'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
  
              <Button type='submit' variant='flat' color='primary'>
                Register
              </Button>
            </form>
  
          </div>
  
          <div className='hidden md:flex flex-1 items-center justify-center p-6'>
            <div className='w-full h-full flex items-center justify-center'>
              <Image
                isBlurred
                className='w-full h-full object-fill'
                src={image1}
                alt='Register page image'
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default RoleRegister
