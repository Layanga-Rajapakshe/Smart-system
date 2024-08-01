import React, { useState } from 'react'
import { Input, Button, Image } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const EmployeeRegister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle login logic here
      console.log("Email:", email);
      console.log("Password:", password);
    };
  
    const breadcrumbItems = [
      { label: 'Employee Menu', href: '/employee' },
      { label: 'Employee Register', href: '/employeeregister', isCurrentPage: true }
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

          <div className='text-center text-[25px] font-bold mb-6'>Employee Register</div>

          <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 mb-4'>
            <Input
              variant='bordered'
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default EmployeeRegister
