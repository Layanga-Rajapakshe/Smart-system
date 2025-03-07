import React, { useState, useEffect } from 'react';
import { useGetCompanyQuery, useUpdateCompanyMutation } from '../../redux/api/companyApiSlice';
import { Input, Button, Image, CircularProgress } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useParams, useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/background1.png';
import toast from 'react-hot-toast';

const CompanyEdit = () => {
  const { id: companyId } = useParams();
  const navigate = useNavigate();
  const { data: company, isLoading, isError } = useGetCompanyQuery(companyId);
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  const [companyData, setCompanyData] = useState({
    c_name: '',
    address: {
      street: '',
      number: '',
      lane: '',
    },
    p_number: '',
  });

  const breadcrumbItems = [
    { label: 'Companies Menu', href: '/company' },
    { label: 'Company Edit', href: `/company/edit/${companyId}`, isCurrentPage: true },
  ];

  useEffect(() => {
    if (company) {
      setCompanyData({
        c_name: company.c_name,
        address: company.address,
        p_number: company.p_number,
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCompanyData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setCompanyData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompany({ id: companyId, ...companyData }).unwrap();
      navigate(`/companyview/${companyId}`);
      toast.success('Company updated successfully');
    } catch (err) {
      toast.error('Error updating company');
    }
  };

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
            <h1 className="text-2xl font-bold text-black text-center mb-6">Company Edit</h1>
            
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 mb-4">
              <Input
                variant="bordered"
                label="Company Name"
                name="c_name"
                value={companyData.c_name}
                onChange={handleChange}
                className="mb-2"
              />

              <div className="font-semibold mt-2">Address</div>
              <Input
                variant="bordered"
                label="Street"
                name="address.street"
                value={companyData.address.street}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                variant="bordered"
                label="Number"
                name="address.number"
                value={companyData.address.number}
                onChange={handleChange}
                className="mb-2"
              />
              <Input
                variant="bordered"
                label="Lane"
                name="address.lane"
                value={companyData.address.lane}
                onChange={handleChange}
                className="mb-2"
              />

              <Input
                variant="bordered"
                label="Phone Number"
                name="p_number"
                value={companyData.p_number}
                onChange={handleChange}
                className="mb-4"
              />
              
              <div className="flex justify-between mt-4">
                <Button
                  color="default"
                  variant="flat"
                  onPress={() => navigate('/company')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Company'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyEdit;