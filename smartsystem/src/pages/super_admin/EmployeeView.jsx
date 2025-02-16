import React, { useState, useEffect } from 'react';
import { useGetEmployeeQuery } from '../../redux/api/employeeApiSlice';
import { useParams } from 'react-router-dom';
import { Input, Image, CircularProgress } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/companyRegister.png';

const EmployeeView = () => {
  const { id: employeeId } = useParams();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(employeeId);

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
    { label: 'Employee View', href: `/employee/${employeeId}`, isCurrentPage: true },
  ];

  useEffect(() => {
    if (employee) {
      setEmployeeData(employee);
    }
  }, [employee]);

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

          <div className="text-center text-[25px] font-bold mb-6 z-10">Employee View</div>

          <form className="flex flex-col w-full max-w-md gap-4 mb-4 z-10 overflow-auto">
            <Input variant="bordered" label="Name" type="text" value={employeeData.name} readOnly />
            <Input variant="bordered" label="Birthday" type="text" value={employeeData.birthday} readOnly />
            <Input variant="bordered" label="User ID" type="text" value={employeeData.userId} readOnly />
            <Input variant="bordered" label="Hired Date" type="text" value={employeeData.hired_date} readOnly />
            <Input variant="bordered" label="Post" type="text" value={employeeData.post} readOnly />
            <Input variant="bordered" label="Role" type="text" value={employeeData.role} readOnly />
            <Input variant="bordered" label="Status" type="text" value={employeeData.status} readOnly />
            <Input variant="bordered" label="Age" type="text" value={employeeData.age} readOnly />
            <Input variant="bordered" label="Email" type="text" value={employeeData.email} readOnly />
            <Input variant="bordered" label="Company" type="text" value={employeeData.company} readOnly />
            <Input variant="bordered" label="Supervisor" type="text" value={employeeData.supervisor} readOnly />
            <Input variant="bordered" label="Agreed Basic" type="text" value={employeeData.agreed_basic} readOnly />
            <Input variant="bordered" label="Re-allowance" type="text" value={employeeData.re_allowance} readOnly />
            <Input variant="bordered" label="Single OT" type="text" value={employeeData.single_ot} readOnly />
            <Input variant="bordered" label="Double OT" type="text" value={employeeData.double_ot} readOnly />
            <Input variant="bordered" label="Meal Allowance" type="text" value={employeeData.meal_allowance} readOnly />
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

export default EmployeeView;
