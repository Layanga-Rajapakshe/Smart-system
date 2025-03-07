import React, { useState, useEffect } from 'react';
import { useGetCompanyQuery } from '../../redux/api/companyApiSlice';
import { Input, Image, CircularProgress, Button } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useParams, useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/background1.png';

const CompanyView = () => {
  const { id: companyId } = useParams();
  const navigate = useNavigate();
  const { data: company, isLoading, isError } = useGetCompanyQuery(companyId);
  const [companyData, setCompanyData] = useState({
    c_name: '',
    address: {
      street: '',
      number: '',
      lane: '',
    },
    p_number: '',
    employees: [],
  });

  const breadcrumbItems = [
    { label: 'Companies Menu', href: '/company' },
    { label: 'Company View', href: `/companyview/${companyId}`, isCurrentPage: true },
  ];

  useEffect(() => {
    if (company) {
      setCompanyData({
        c_name: company.c_name,
        address: company.address,
        p_number: company.p_number,
        employees: company.employees,
      });
    }
  }, [company]);

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <CircularProgress aria-label='Loading' />
    </div>
  );
  
  if (isError) return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-red-50 rounded-lg text-red-600">
        Error fetching company data
      </div>
    </div>
  );

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
      <div className="relative z-10 w-full max-w-2xl mx-auto mt-20">
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-black text-center mb-6">Company View</h1>
            
            <form className="flex flex-col w-full gap-4 mb-4">
              <Input
                variant="bordered"
                label="Company Name"
                type="text"
                value={companyData.c_name}
                readOnly
                className="mb-2"
              />

              <div className="font-semibold mt-2">Address</div>
              <Input
                variant="bordered"
                label="Street"
                type="text"
                value={companyData.address.street}
                readOnly
                className="mb-2"
              />
              <Input
                variant="bordered"
                label="Number"
                type="text"
                value={companyData.address.number}
                readOnly
                className="mb-2"
              />
              <Input
                variant="bordered"
                label="Lane"
                type="text"
                value={companyData.address.lane}
                readOnly
                className="mb-2"
              />

              <Input
                variant="bordered"
                label="Phone Number"
                type="text"
                value={companyData.p_number}
                readOnly
                className="mb-4"
              />
              
              <div className="flex justify-between mt-4">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => navigate('/company')}
                >
                  Back to List
                </Button>
                <Button
                  color="primary"
                  onPress={() => navigate(`/companyedit/${companyId}`)}
                >
                  Edit Company
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;