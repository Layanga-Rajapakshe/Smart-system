import React, { useState, useEffect } from 'react';
import { Input, Button, Image } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from '../../redux/api/employeeApiSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployeeSalary = () => {
  const { id: employeeId } = useParams();
  const navigate = useNavigate();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(employeeId);
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();

  const [salaryData, setSalaryData] = useState({
    agreed_basic: 0,
    re_allowance: 0,
    single_ot: 0,
    double_ot: 0,
    meal_allowance: 0,
  });

  useEffect(() => {
    if (employee) {
      setSalaryData({
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
    setSalaryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({ id: employeeId, ...salaryData }).unwrap();
      navigate(`/employee/${employeeId}`);
    } catch (err) {
      console.error('Failed to update salary details:', err);
    }
  };

  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee' },
    { label: 'Edit Salary', href: `/employee/edit-salary/${employeeId}`, isCurrentPage: true },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching employee data</div>;

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex-col flex items-center justify-center p-6 relative">
          <div className="text-center text-[25px] font-bold mb-6">Edit Employee Salary</div>
          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4 mb-4">
            <Input
              label="Agreed Basic"
              name="agreed_basic"
              type="number"
              value={salaryData.agreed_basic}
              onChange={handleChange}
            />
            <Input
              label="RE Allowance"
              name="re_allowance"
              type="number"
              value={salaryData.re_allowance}
              onChange={handleChange}
            />
            <Input
              label="Single OT"
              name="single_ot"
              type="number"
              value={salaryData.single_ot}
              onChange={handleChange}
            />
            <Input
              label="Double OT"
              name="double_ot"
              type="number"
              value={salaryData.double_ot}
              onChange={handleChange}
            />
            <Input
              label="Meal Allowance"
              name="meal_allowance"
              type="number"
              value={salaryData.meal_allowance}
              onChange={handleChange}
            />
            <Button type="submit" color="primary" disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update Salary'}
            </Button>
          </form>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <Image
            isBlurred
            className="w-full h-full object-cover"
            src="../../assets/images/companyRegister.png"
            alt="Salary Edit"
          />
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeSalary;
