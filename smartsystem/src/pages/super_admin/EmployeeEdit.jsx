import React, { useState, useEffect } from 'react';
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from '../../redux/api/employeeApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Button, CircularProgress, Image } from '@nextui-org/react';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/companyRegister.png';

const EmployeeEdit = () => {
  const { id: employeeId } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(employeeId);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: companiesData, isLoading: companiesLoading } = useGetCompaniesQuery();
  const { data: employeesData, isLoading: employeesLoading } = useGetEmployeesQuery();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({ id: employeeId, ...employeeData }).unwrap();
      navigate(`/employee/${employeeId}`); // Redirect to the Employee View page
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  if (isLoading) return <CircularProgress aria-label="Loading" />;
  if (isError) return <div>Error fetching employee data</div>;

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

          <div className="text-center text-[25px] font-bold mb-6 z-10">Employee Edit</div>

          <form className="flex flex-col w-full max-w-md gap-4 mb-4 z-10 overflow-auto" onSubmit={handleSubmit}>
            <Input
              variant="bordered"
              label="Name"
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Birthday"
              type="text"
              name="birthday"
              value={employeeData.birthday}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="User ID"
              type="text"
              name="userId"
              value={employeeData.userId}
              onChange={handleChange}
              readOnly
            />
            <Input
              variant="bordered"
              label="Hired Date"
              type="text"
              name="hired_date"
              value={employeeData.hired_date}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Post"
              type="text"
              name="post"
              value={employeeData.post}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Role"
              type="text"
              name="role"
              value={employeeData.role}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Status"
              type="text"
              name="status"
              value={employeeData.status}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Age"
              type="text"
              name="age"
              value={employeeData.age}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Email"
              type="text"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Company"
              type="text"
              name="company"
              value={employeeData.company}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Supervisor"
              type="text"
              name="supervisor"
              value={employeeData.supervisor}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Agreed Basic"
              type="number"
              name="agreed_basic"
              value={employeeData.agreed_basic}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Re-allowance"
              type="number"
              name="re_allowance"
              value={employeeData.re_allowance}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Single OT"
              type="number"
              name="single_ot"
              value={employeeData.single_ot}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Double OT"
              type="number"
              name="double_ot"
              value={employeeData.double_ot}
              onChange={handleChange}
            />
            <Input
              variant="bordered"
              label="Meal Allowance"
              type="number"
              name="meal_allowance"
              value={employeeData.meal_allowance}
              onChange={handleChange}
            />
            <div>
            <Button type="submit" color="primary" isDisabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </Button>
            </div>
          </form>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              isBlurred
              className="w-full h-full object-cover"
              src={image1}
              alt="Employee Avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
