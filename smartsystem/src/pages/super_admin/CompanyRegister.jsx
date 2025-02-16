import React, { useState } from 'react';
import { Input, Button, Image } from "@heroui/react";
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useCreateCompanyMutation } from '../../redux/api/companyApiSlice'; 
import { toast } from 'react-hot-toast';

const CompanyRegister = () => {
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const [companyName, setCompanyName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [lane, setLane] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCompanyData = {
      c_name: companyName,
      address: {
        street,
        number,
        lane,
      },
      p_number: phoneNumber,
    };
    
    try {
      await createCompany(newCompanyData).unwrap();
      toast.success("New Company Registered Successfully");
      // Clear form fields after successful submission
      setCompanyName("");
      setStreet("");
      setNumber("");
      setLane("");
      setPhoneNumber("");
    } catch (err) {
      toast.error(err?.data?.message || "Company Registration Failed");
    }
  };

  const breadcrumbItems = [
    { label: 'Companies Menu', href: '/company' },
    { label: 'Company Register', href: '/companyregister', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className='flex h-screen overflow-hidden'>
        <div className='flex-1 flex-col flex items-center justify-center p-6 relative'>
          <div className='md:hidden absolute inset-0 z-0'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src="https://nextui.org/gradients/docs-right.png"
              alt='Register page background'
            />
          </div>

          <div className='text-center text-[25px] font-bold mb-6 z-10'>Company Register</div>

          <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-4 mb-4 z-10'>
            <Input
              variant='bordered'
              label='Company Name'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />

            <div className='mt-4'>
              <div className='text-[16px] font-semibold mb-2'>Address</div>
              <Input
                variant='bordered'
                label='Street'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <Input
                variant='bordered'
                label='Street Number'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
              <Input
                variant='bordered'
                label='Lane'
                value={lane}
                onChange={(e) => setLane(e.target.value)}
                required
              />
            </div>

            <Input
              variant='bordered'
              label='Phone Number'
              type='tel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="\d{10}"
              description="Enter a valid 10-digit phone number"
            />

            <Button type='submit' color='primary' disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </div>

        <div className='hidden md:flex flex-1 items-center justify-center p-6'>
          <div className='w-full h-full flex items-center justify-center'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src={image1}
              alt='Register page image'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegister;