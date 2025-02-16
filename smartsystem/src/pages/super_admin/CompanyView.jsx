import React, { useState, useEffect } from 'react';
import { useGetCompanyQuery } from '../../redux/api/companyApiSlice';
import image1 from '../../assets/images/companyEdit.jpeg';
import { Input, Image, CircularProgress } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useParams } from 'react-router-dom';

const CompanyView = () => {
  const { id: companyId } = useParams();
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
    { label: 'Company View', href: `/company/${companyId}`, isCurrentPage: true },
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

  if (isLoading) return <CircularProgress aria-label='Loading' />;
  if (isError) return <div>Error fetching company data</div>;

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex-col flex items-center justify-center p-6 relative">
          <div className="md:hidden absolute inset-0 z-0">
            <Image
              isBlurred
              className="w-full h-full object-cover"
              src="https://nextui.org/gradients/docs-right.png"
              alt="Background image"
            />
          </div>

          <div className="text-center text-[25px] font-bold mb-6 z-10">Company View</div>

          <form className="flex flex-col w-full max-w-md gap-4 mb-4 z-10">
            <Input
              variant="bordered"
              label="Company Name"
              type="text"
              value={companyData.c_name}
              readOnly
            />

            <div className="font-semibold mt-4">Address</div>
            <Input
              variant="bordered"
              label="Street"
              type="text"
              value={companyData.address.street}
              readOnly
            />
            <Input
              variant="bordered"
              label="Number"
              type="text"
              value={companyData.address.number}
              readOnly
            />
            <Input
              variant="bordered"
              label="Lane"
              type="text"
              value={companyData.address.lane}
              readOnly
            />

            <Input
              variant="bordered"
              label="Phone Number"
              type="text"
              value={companyData.p_number}
              readOnly
            />
          </form>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              isBlurred
              className="w-full h-full object-cover"
              src={image1}
              alt="Edit page image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;