import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Spinner
} from "@heroui/react";
import { IoArrowBack } from "react-icons/io5";
import {useNavigate} from "react-router-dom";

const mockEmployeeData = {
  employeeId: "EMP001",
  name: "John Doe",
  email: "john.doe@company.com",
  avatar: "/api/placeholder/150/150",
  basicSalary: 75000,
  reAllowance: 1200,
  singleOt: 45,
  doubleOt: 90,
  mealAllowance: 25
};

const EmployeeSalaryDetails = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for employee ID 1
        setEmployee(mockEmployeeData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
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
          onPress={handleBack}
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