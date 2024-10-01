import React, { useState } from 'react';
import { Input, Button, Image, Select, SelectItem } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useCreateEmployeeMutation } from '../../redux/api/employeeApiSlice';
import { useGetRolesQuery } from '../../redux/api/roleApiSlice';
import { useGetCompaniesQuery } from '../../redux/api/companyApiSlice';
import { useNavigate } from 'react-router-dom';

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [createEmployee, { isLoading: isCreating }] = useCreateEmployeeMutation();
  const { data: roles } = useGetRolesQuery();
  const { data: companies } = useGetCompaniesQuery();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    birthday: '',
    userId: '',
    hired_date: '',
    post: '',
    role: '',
    status: 'active',
    age: '',
    email: '',
    password: '',
    company: '',
    agreed_basic: 0,
    re_allowance: 0,
    single_ot: 0,
    double_ot: 0,
    meal_allowance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation can be added here
    if (!employeeData.name || !employeeData.email || !employeeData.password) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      const newEmployee = await createEmployee(employeeData).unwrap();
      navigate(`/employee/${newEmployee._id}`);
    } catch (err) {
      console.error('Failed to create employee:', err);
    }
  };

  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee' },
    { label: 'Employee Register', href: '/employeeregister', isCurrentPage: true },
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
              alt='Background image'
            />
          </div>

          <div className='text-center text-[25px] font-bold mb-6 z-10'>Employee Register</div>

          <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-4 mb-4 z-10 overflow-y-auto'>
            <Input
              label="Name"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Birthday"
              name="birthday"
              type="date"
              value={employeeData.birthday}
              onChange={handleChange}
            />
            <Input
              label="User ID"
              name="userId"
              value={employeeData.userId}
              onChange={handleChange}
            />
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
            <Select
              label="Role"
              name="role"
              value={employeeData.role}
              onChange={(value) => handleSelectChange('role', value)}
            >
              {roles?.map(role => (
                <SelectItem key={role._id} value={role._id}>{role.name}</SelectItem>
              ))}
            </Select>
            <Select
              label="Status"
              name="status"
              value={employeeData.status}
              onChange={(value) => handleSelectChange('status', value)}
            >
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </Select>
            <Input
              label="Age"
              name="age"
              type="number"
              value={employeeData.age}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={employeeData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={employeeData.password}
              onChange={handleChange}
              required
            />
            <Select
              label="Company"
              name="company"
              value={employeeData.company}
              onChange={(value) => handleSelectChange('company', value)}
            >
              {companies?.map(company => (
                <SelectItem key={company._id} value={company._id}>{company.name}</SelectItem>
              ))}
            </Select>
            <Input
              label="Agreed Basic"
              name="agreed_basic"
              type="number"
              value={employeeData.agreed_basic}
              onChange={handleChange}
            />
            <Input
              label="RE Allowance"
              name="re_allowance"
              type="number"
              value={employeeData.re_allowance}
              onChange={handleChange}
            />
            <Input
              label="Single OT"
              name="single_ot"
              type="number"
              value={employeeData.single_ot}
              onChange={handleChange}
            />
            <Input
              label="Double OT"
              name="double_ot"
              type="number"
              value={employeeData.double_ot}
              onChange={handleChange}
            />
            <Input
              label="Meal Allowance"
              name="meal_allowance"
              type="number"
              value={employeeData.meal_allowance}
              onChange={handleChange}
            />

            {/* Ensure the button is placed outside the form's overflow handling */}
            <div className='mt-4'>
              <Button type='submit' color='primary' disabled={isCreating}>
                {isCreating ? 'Registering...' : 'Register Employee'}
              </Button>
            </div>
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

export default EmployeeRegister;
