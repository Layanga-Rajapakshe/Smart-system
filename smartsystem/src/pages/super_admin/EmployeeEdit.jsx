import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Select, Checkbox } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from '../../redux/api/employeeApiSlice';
import { useGetRolesQuery } from '../../redux/api/roleApiSlice';
import { useGetCompaniesQuery } from '../../redux/api/companyApiSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeEdit = () => {
  const { id: employeeId } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(employeeId);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
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
    company: '',
    agreed_basic: 0,
    re_allowance: 0,
    single_ot: 0,
    double_ot: 0,
    meal_allowance: 0,
  });

  useEffect(() => {
    if (employee) {
      setEmployeeData({
        name: employee.name,
        birthday: new Date(employee.birthday).toISOString().split('T')[0],
        userId: employee.userId,
        hired_date: new Date(employee.hired_date).toISOString().split('T')[0],
        post: employee.post,
        role: employee.role,
        status: employee.status,
        age: employee.age,
        email: employee.email,
        company: employee.company,
        agreed_basic: employee.agreed_basic,
        re_allowance: employee.re_allowance,
        single_ot: employee.single_ot,
        double_ot: employee.double_ot,
        meal_allowance: employee.meal_allowance,
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({ id: employeeId, ...employeeData }).unwrap();
      navigate(`/employee/${employeeId}`);
    } catch (err) {
      console.error('Failed to update employee:', err);
    }
  };

  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee' },
    { label: 'Employee Edit', href: `/employee/edit/${employeeId}`, isCurrentPage: true }
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching employee data</div>;

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

          <div className='text-center text-[25px] font-bold mb-6 z-10'>Employee Edit</div>

          <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-4 mb-4 z-10'>
            <Input
              label="Name"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
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
              onChange={handleChange}
            >
              {roles?.map(role => (
                <Select.Option key={role._id} value={role._id}>{role.name}</Select.Option>
              ))}
            </Select>
            <Select
              label="Status"
              name="status"
              value={employeeData.status}
              onChange={handleChange}
            >
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
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
            />
            <Select
              label="Company"
              name="company"
              value={employeeData.company}
              onChange={handleChange}
            >
              {companies?.map(company => (
                <Select.Option key={company._id} value={company._id}>{company.name}</Select.Option>
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

            <Button type='submit' color='primary' disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Employee'}
            </Button>
          </form>
        </div>

        <div className='hidden md:flex flex-1 items-center justify-center p-6'>
          <div className='w-full h-full flex items-center justify-center'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src={image1}
              alt='Edit page image'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;