import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Spinner
} from "@heroui/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSalaryParametersQuery } from "../../redux/api/salarymanagementApiSlice";
import toast from "react-hot-toast";

const EmployeeSalaryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get employee ID from URL parameters
  
  // Use RTK Query hook to fetch salary data for the specific employee
  const { 
    data: employeeData, 
    isLoading, 
    isError, 
    error 
  } = useGetSalaryParameterByIdQuery(id);

  const handleBack = () => {
    navigate(-1);
  };

  // Handle API errors
  useEffect(() => {
    if (isError) {
      toast.error(`Error fetching employee data: ${error?.data?.message || "Unknown error"}`);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 min-h-[400px] pt-8">
        <div className="text-lg text-danger">
          {error?.data?.message || "Failed to load employee data"}
        </div>
        <Button color="primary" variant="light" onClick={handleBack}>
          <IoArrowBack className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  // Check if we have employee data
  if (!employeeData || !employeeData.salaryParameter) {
    return (
      <div className="flex flex-col items-center gap-4 min-h-[400px] pt-8">
        <div className="text-lg text-danger">Employee not found</div>
        <Button color="primary" variant="light" onClick={handleBack}>
          <IoArrowBack className="mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  const employee = employeeData.salaryParameter;

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
            Employee ID: {employee.userId}
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
                    src={employee.avatar || "https://via.placeholder.com/40"} 
                    alt={employee.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-small text-default-500">{employee.email || "Not available"}</p>
                    <p className="text-small text-default-500">Role: {employee.role || "Not specified"}</p>
                    <p className="text-small text-default-500">Post: {employee.post || "Not specified"}</p>
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
                  <p className="font-medium">${employee.agreed_basic?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-small text-default-500">RE Allowance</p>
                  <p className="font-medium">${employee.re_allowance?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Overtime Rates Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Overtime Rates</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-small text-default-500">Single OT Rate</p>
                  <p className="font-medium">${employee.single_ot}/hr</p>
                </div>
                <div>
                  <p className="text-small text-default-500">Double OT Rate</p>
                  <p className="font-medium">${employee.double_ot}/hr</p>
                </div>
              </div>
            </div>

            {/* Allowances Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Allowances</h3>
              <div>
                <p className="text-small text-default-500">Meal Allowance</p>
                <p className="font-medium">${employee.meal_allowance}/day</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeSalaryDetails;