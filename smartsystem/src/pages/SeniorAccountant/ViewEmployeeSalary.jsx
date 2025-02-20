<<<<<<< Updated upstream
import React from 'react';
import { Table, Image } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/companyRegister.png';
=======
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@heroui/react";
import { IoArrowBack } from "react-icons/io5";
>>>>>>> Stashed changes

const EmployeeSalaryDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        const response = await fetch(`/api/employees/${employeeId}`);
        if (!response.ok) {
          throw new Error('Employee not found');
        }
        const data = await response.json();
        setEmployee(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 min-h-[400px] pt-8">
        <div className="text-lg text-danger">{error}</div>
        <Button color="primary" variant="light" onClick={handleBack}>
          <IoArrowBack className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <Button 
          color="primary" 
          variant="light" 
          onClick={handleBack}
          startContent={<IoArrowBack />}
        >
          Back to List
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold">Employee Salary Details</h2>
          <div className="text-small text-default-500">
            Employee ID: {employee.employeeId}
          </div>
        </CardHeader>
        
        <CardBody className="px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <img 
                    src={employee.avatar} 
                    alt={employee.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-small text-default-500">{employee.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Salary Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-small text-default-500">Basic Salary</p>
                  <p className="font-medium">${employee.basicSalary?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-small text-default-500">RE Allowance</p>
                  <p className="font-medium">${employee.reAllowance?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Overtime Rates Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Overtime Rates</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-small text-default-500">Single OT Rate</p>
                  <p className="font-medium">${employee.singleOt}/hr</p>
                </div>
                <div>
                  <p className="text-small text-default-500">Double OT Rate</p>
                  <p className="font-medium">${employee.doubleOt}/hr</p>
                </div>
              </div>
            </div>

            {/* Allowances Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Allowances</h3>
              <div>
                <p className="text-small text-default-500">Meal Allowance</p>
                <p className="font-medium">${employee.mealAllowance}/day</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeSalaryDetails;