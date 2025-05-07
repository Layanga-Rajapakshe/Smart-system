import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import {
  useGetEmployeeQuery,
  useGetEmployeesQuery,
} from '../../redux/api/employeeApiSlice';
import { useGetRolesQuery } from '../../redux/api/roleApiSlice';
import { useGetCompaniesQuery } from '../../redux/api/companyApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, CircularProgress, Image, Select, SelectItem, Card, Checkbox } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/background1.png';
import { toast } from 'react-hot-toast';

const EmployeeEdit = () => {
  const { id: employeeId } = useParams();
  const navigate = useNavigate();

  const { data: employee, isLoading, isError } = useGetEmployeeQuery(employeeId);
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: companiesData, isLoading: companiesLoading } = useGetCompaniesQuery();
  const { data: employeesData, isLoading: employeesLoading } = useGetEmployeesQuery();
  
  // State for tracking update process
  const [isUpdating, setIsUpdating] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    name: '',
    birthday: '',
    userId: '',
    hired_date: '',
    post: '',
    role: '',
    status: '',
    age: '',
    avatar: '',
    email: '',
    company: '',
    supervisor: '',
    supervisees: [],
    agreed_basic: 0,
    re_allowance: 0,
    single_ot: 0,
    double_ot: 0,
    meal_allowance: 0,
    isEPF: false,
  });

  const breadcrumbItems = [
    { label: 'Employees Menu', href: '/employee' },
    { label: 'Employee Edit', href: `/employee/edit/${employeeId}`, isCurrentPage: true },
  ];

  useEffect(() => {
    if (employee) {
      setEmployeeData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (checked) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      isEPF: checked,
    }));
  };

  // Update employee using Axios instead of Redux mutation
  const updateEmployeeWithAxios = async (employeeData) => {
    setIsUpdating(true);
    try {
      // Get token from localStorage or wherever you store it
      const token = localStorage.getItem('token'); // Adjust based on your auth setup
      
      const response = await axios.put(
        `/api/employees/${employeeId}`, 
        employeeData,
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
      const errorMessage = error.response?.data?.message || error.message || "Failed to update employee";
      throw new Error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployeeWithAxios(employeeData);
      toast.success('Employee updated successfully!');
      navigate(`/employeeview/${employeeId}`);
      window.location.reload();
    } catch (error) {
      toast.error(error?.message || "Failed to update employee. Please try again.");
    }
  };

  if (isLoading) return <CircularProgress aria-label="Loading" />;
  if (isError) return <div>Error fetching employee data</div>;

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
      <div className="relative z-10 w-full max-w-4xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h3 className="text-2xl font-bold text-center text-black mb-6">Employee Edit</h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Personal Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={employeeData.name}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="User ID"
                  name="userId"
                  value={employeeData.userId}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                  readOnly
                />
                <Input
                  label="Birthday"
                  name="birthday"
                  value={employeeData.birthday}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Age"
                  name="age"
                  value={employeeData.age}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Avatar"
                  name="avatar"
                  value={employeeData.avatar}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
              </div>
            </div>

            {/* Employment Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Employment Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Hired Date"
                  name="hired_date"
                  value={employeeData.hired_date}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Post"
                  name="post"
                  value={employeeData.post}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Select 
                  label="Role"
                  name="role"
                  value={employeeData.role}
                  defaultSelectedKeys={employeeData.role ? [employeeData.role] : []}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                >
                  {rolesData &&
                    rolesData.map((role) => (
                      <SelectItem key={role._id} value={role._id}>
                        {role.name}
                      </SelectItem>
                    ))}
                </Select>
                <Input
                  label="Status"
                  name="status"
                  value={employeeData.status}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Select
                  label="Company"
                  name="company"
                  value={employeeData.company}
                  defaultSelectedKeys={employeeData.company ? [employeeData.company] : []}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                >
                  {companiesData &&
                    companiesData.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.c_name}
                      </SelectItem>
                    ))}
                </Select>
                <Select
                  label="Supervisor"
                  name="supervisor"
                  value={employeeData.supervisor}
                  defaultSelectedKeys={employeeData.supervisor ? [employeeData.supervisor] : []}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                >
                  {employeesData &&
                    employeesData.map((employee) => (
                      <SelectItem key={employee._id} value={employee._id}>
                        {employee.name}
                      </SelectItem>
                    ))}
                </Select>
              </div>
            </div>

            {/* Compensation Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Compensation Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="Agreed Basic"
                  name="agreed_basic"
                  type="number"
                  value={employeeData.agreed_basic}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="RE Allowance"
                  name="re_allowance"
                  type="number"
                  value={employeeData.re_allowance}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Single OT"
                  name="single_ot"
                  type="number"
                  value={employeeData.single_ot}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Double OT"
                  name="double_ot"
                  type="number"
                  value={employeeData.double_ot}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Meal Allowance"
                  name="meal_allowance"
                  type="number"
                  value={employeeData.meal_allowance}
                  onChange={handleChange}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <div className="flex items-center h-full">
                  <Checkbox
                    isSelected={employeeData.isEPF}
                    onValueChange={handleCheckboxChange}
                    color="primary"
                    className="py-2"
                  >
                    <span className="ml-2">EPF Eligible</span>
                  </Checkbox>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                color="primary" 
                isDisabled={isUpdating}
                size="lg"
                className="px-8"
              >
                {isUpdating ? 'Updating...' : 'Update Employee'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeEdit;