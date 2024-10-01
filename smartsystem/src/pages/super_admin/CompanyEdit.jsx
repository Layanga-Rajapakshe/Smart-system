import React, { useState, useEffect } from 'react';
import { useGetCompanyQuery, useUpdateCompanyMutation } from '../../redux/api/companyApiSlice';
import image1 from '../../assets/images/companyEdit.jpeg';
import { Input, Button, Image, CircularProgress } from '@nextui-org/react';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useParams, useNavigate } from 'react-router-dom';

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
      navigate(`/company/${companyId}`);
    } catch (err) {
      console.error('Failed to update company:', err);
    }
  };

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

          <div className="text-center text-[25px] font-bold mb-6 z-10">Company Edit</div>

          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4 mb-4 z-10">
            <Input
              variant="bordered"
              label="Company Name"
              name="c_name"
              value={companyData.c_name}
              onChange={handleChange}
            />

            <div className="font-semibold mt-4">Address</div>
            <Input
              variant="bordered"
              label="Street"
              name="address.street"
              value={companyData.address.street}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Number"
              name="address.number"
              value={companyData.address.number}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Lane"
              name="address.lane"
              value={companyData.address.lane}
              onChange={handleChange}
            />

            <Input
              variant="bordered"
              label="Phone Number"
              name="p_number"
              value={companyData.p_number}
              onChange={handleChange}
            />

            <Button type="submit" color="primary" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Company'}
            </Button>
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

export default CompanyEdit;