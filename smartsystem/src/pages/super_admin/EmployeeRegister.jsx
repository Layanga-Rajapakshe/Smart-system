import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Select, SelectItem } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { 
  useCreateEmployeeMutation,
  useGetCurrentUserQuery 
} from '../../redux/api/employeeApiSlice';
import { useGetRolesQuery } from '../../redux/api/roleApiSlice';
import { useGetCompaniesQuery } from '../../redux/api/companyApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const { data: roles, isError: rolesError } = useGetRolesQuery();
  const { data: companies, isError: companiesError } = useGetCompaniesQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const [hasPermission, setHasPermission] = useState(false);

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    hired_date: '',
    post: '',
    role: '',
    status: 'active',
    age: '',
    company: '',
    supervisor: '',
    agreed_basic: 0,
    re_allowance: 0,
    single_ot: 0,
    double_ot: 0,
    meal_allowance: 0,
  });

  const [errors, setErrors] = useState({});

  // Check permissions when component mounts
  useEffect(() => {
    if (currentUser?.role?.permissions) {
      setHasPermission(currentUser.role.permissions.includes('create_employee'));
      
      // If user has no permission, redirect
      if (!currentUser.role.permissions.includes('create_employee')) {
        toast.error("You don't have permission to create employees");
        navigate('/employee');
      }
      
      // Set company automatically if user belongs to a company
      if (currentUser.company) {
        setEmployeeData(prev => ({
          ...prev,
          company: currentUser.company
        }));
      }
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setEmployeeData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!employeeData.name.trim()) newErrors.name = 'Name is required';
    if (!employeeData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(employeeData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!employeeData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (employeeData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!employeeData.role) newErrors.role = 'Role is required';
    if (!employeeData.company) newErrors.company = 'Company is required';
    
    // Numeric validations
    if (employeeData.age && (isNaN(employeeData.age) || employeeData.age <= 0)) {
      newErrors.age = 'Age must be a positive number';
    }
    
    // Salary validations
    const salaryFields = ['agreed_basic', 're_allowance', 'single_ot', 'double_ot', 'meal_allowance'];
    salaryFields.forEach(field => {
      if (employeeData[field] && (isNaN(employeeData[field]) || employeeData[field] < 0)) {
        newErrors[field] = 'Must be a non-negative number';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasPermission) {
      toast.error("You don't have permission to create employees");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      // Convert numeric fields
      const numericFields = ['age', 'agreed_basic', 're_allowance', 'single_ot', 'double_ot', 'meal_allowance'];
      const formattedData = {
        ...employeeData,
        ...Object.fromEntries(
          numericFields.map(field => [field, Number(employeeData[field]) || 0])
        )
      };

      const response = await createEmployee(formattedData).unwrap();
      toast.success("Employee registered successfully");
      navigate(`/employee/${response._id}`);
    } catch (err) {
      const errorMessage = err?.data?.message || "Failed to register employee";
      toast.error(errorMessage);
      
      // Handle specific backend errors
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee' },
    { label: 'Employee Register', href: '/employeeregister', isCurrentPage: true },
  ];

  if (!hasPermission) {
    return null; // Or a permission denied component
  }

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex h-screen overflow-hidden">
        {/* Left Section - Form */}
        <div className="flex-1 flex-col flex items-center justify-center p-6 relative">
          <div className="md:hidden absolute inset-0 z-0">
            <Image
              isBlurred
              className="w-full h-full object-cover"
              src="https://nextui.org/gradients/docs-right.png"
              alt="Background image"
            />
          </div>

          <div className="text-center text-[25px] font-bold mb-6 z-10">Employee Register</div>

          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4 mb-4 z-10 overflow-y-auto">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <Input
                label="Name"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
                isRequired
                errorMessage={errors.name}
                isInvalid={!!errors.name}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={employeeData.email}
                onChange={handleChange}
                isRequired
                errorMessage={errors.email}
                isInvalid={!!errors.email}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                value={employeeData.password}
                onChange={handleChange}
                isRequired
                errorMessage={errors.password}
                isInvalid={!!errors.password}
              />
              <Input
                label="Age"
                name="age"
                type="number"
                value={employeeData.age}
                onChange={handleChange}
                errorMessage={errors.age}
                isInvalid={!!errors.age}
              />
              <Input
                label="Birthday"
                name="birthday"
                type="date"
                value={employeeData.birthday}
                onChange={handleChange}
              />
            </div>

            {/* Employment Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Employment Information</h3>
              <Input
                label="Hired Date"
                name="hired_date"
                type="date"
                value={employeeData.hired_date}
                onChange={handleChange}
              />
              <Input
                label="Post"
                name="post"
                value={employeeData.post}
                onChange={handleChange}
              />
              <select
              className="w-full p-2 rounded border border-gray-300"
              value={employeeData.role}
              onChange={handleSelectChange('role')}
            >
              <option value="">Select Role</option>
              {!rolesError && roles?.map((role) => (
                <option key={role._id} value={role._id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && <span className="text-red-500 text-sm">{errors.role}</span>}

            <select
              className="w-full p-2 rounded border border-gray-300"
              value={employeeData.status}
              onChange={handleSelectChange('status')}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="w-full p-2 rounded border border-gray-300"
              value={employeeData.company}
              onChange={handleSelectChange('company')}
            >
              <option value="">Select Company</option>
              {!companiesError && companies?.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.c_name}
                </option>
              ))}
            </select>
            {errors.company && <span className="text-red-500 text-sm">{errors.company}</span>}

            </div>

            {/* Compensation Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Compensation</h3>
              <Input
                label="Agreed Basic Salary"
                name="agreed_basic"
                type="number"
                value={employeeData.agreed_basic}
                onChange={handleChange}
                errorMessage={errors.agreed_basic}
                isInvalid={!!errors.agreed_basic}
              />
              <Input
                label="RE Allowance"
                name="re_allowance"
                type="number"
                value={employeeData.re_allowance}
                onChange={handleChange}
                errorMessage={errors.re_allowance}
                isInvalid={!!errors.re_allowance}
              />
              <Input
                label="Single OT Rate"
                name="single_ot"
                type="number"
                value={employeeData.single_ot}
                onChange={handleChange}
                errorMessage={errors.single_ot}
                isInvalid={!!errors.single_ot}
              />
              <Input
                label="Double OT Rate"
                name="double_ot"
                type="number"
                value={employeeData.double_ot}
                onChange={handleChange}
                errorMessage={errors.double_ot}
                isInvalid={!!errors.double_ot}
              />
              <Input
                label="Meal Allowance"
                name="meal_allowance"
                type="number"
                value={employeeData.meal_allowance}
                onChange={handleChange}
                errorMessage={errors.meal_allowance}
                isInvalid={!!errors.meal_allowance}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              color="primary"
              isLoading={isCreating}
              className="mt-6"
            >
              {isCreating ? 'Registering...' : 'Register Employee'}
            </Button>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              isBlurred
              className="w-full h-full object-cover"
              src={image1}
              alt="Register page image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;  