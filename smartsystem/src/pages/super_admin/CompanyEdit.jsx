import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useGetCompanyQuery } from '../../redux/api/companyApiSlice';
import { Input, Button, Image, CircularProgress, Card } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useParams, useNavigate } from 'react-router-dom';
import image1 from '../../assets/images/background1.png';
import { toast } from 'react-hot-toast';

const CompanyEdit = () => {
  const { id: companyId } = useParams();
  const navigate = useNavigate();
  const { data: company, isLoading, isError } = useGetCompanyQuery(companyId);
  
  // State for tracking update process
  const [isUpdating, setIsUpdating] = useState(false);

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

  // Update company using Axios instead of Redux mutation
  const updateCompanyWithAxios = async (companyData) => {
    setIsUpdating(true);
    try {
      // Get token from localStorage or wherever you store it
      const token = localStorage.getItem('token'); // Adjust based on your auth setup
      
      const response = await axios.put(
        `/api/company/${companyId}`, 
        companyData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include auth token if needed
          }
        }
      );
      
      return response.data;
    } catch (error) {
      // Handle error and rethrow for the calling function to catch
      const errorMessage = error.response?.data?.message || error.message || "Failed to update company";
      throw new Error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCompanyWithAxios(companyData);
      toast.success('Company updated successfully!');
      navigate(`/companyview/${companyId}`);
      window.location.reload();
    } catch (error) {
      toast.error(error?.message || "Failed to update company. Please try again.");
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
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
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

      {/* Form Card Container */}
      <div className="relative z-10 w-full max-w-2xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h3 className="text-2xl font-bold text-center text-black mb-6">Company Edit</h3>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Company Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Company Information</div>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Company Name"
                  name="c_name"
                  value={companyData.c_name}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                
                <Input
                  label="Phone Number"
                  name="p_number"
                  value={companyData.p_number}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
              </div>
            </div>

            {/* Address Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Address Information</div>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Street"
                  name="address.street"
                  value={companyData.address.street}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Number"
                    name="address.number"
                    value={companyData.address.number}
                    onChange={handleChange}
                    variant="bordered"
                    fullWidth
                    className="py-2"
                  />
                  
                  <Input
                    label="Lane"
                    name="address.lane"
                    value={companyData.address.lane}
                    onChange={handleChange}
                    variant="bordered"
                    fullWidth
                    className="py-2"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-between pt-4">
              <Button 
                color="default"
                variant="flat"
                onPress={() => navigate('/company')}
                size="lg"
                className="px-6"
              >
                Cancel
              </Button>
              
              <Button 
                type="submit" 
                color="primary" 
                isDisabled={isUpdating}
                size="lg"
                className="px-8"
              >
                {isUpdating ? 'Updating...' : 'Update Company'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CompanyEdit;