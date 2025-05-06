import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSendComplaintMutation } from "../../redux/api/salaryCalculationApiSlice"; // Import the mutation hook

const SalaryComplaintForm = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  
  // Replace the manual API call with the mutation hook
  const [sendComplaint, { isLoading, error }] = useSendComplaintMutation();

  const [formData, setFormData] = useState({
    employeeId: "",
    payPeriod: "",
    expectedAmount: "",
    actualAmount: "",
    description: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format the complaint text to include all relevant information
      const complaintText = `
        Salary Discrepancy Report:
        Pay Period: ${formData.payPeriod}
        Expected Amount: $${formData.expectedAmount}
        Actual Amount: $${formData.actualAmount}
        Category: ${formData.category}
        
        Details: ${formData.description}
      `;
      
      // Send the complaint using the mutation hook
      await sendComplaint({
        userId: formData.employeeId, // Using employeeId as userId
        text: complaintText
      }).unwrap();
      
      // Reset form and show success message
      setSubmitted(true);
      setFormData({
        employeeId: "",
        payPeriod: "",
        expectedAmount: "",
        actualAmount: "",
        description: "",
        category: "",
      });
    } catch (err) {
      // Error handling is now managed by the mutation hook
      console.error("Failed to submit complaint:", err);
    }
  };

  const handleBack = () => {
    navigate('/salary-history/1');
  };

  const issueCategories = [
    { value: "basic_salary", label: "Basic Salary" },
    { value: "overtime", label: "Overtime Payment" },
    { value: "allowances", label: "Allowances" },
    { value: "deductions", label: "Deductions" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <Button
          color="primary"
          variant="light"
          onPress={handleBack}
          startContent={<IoArrowBack />}
        >
          Back
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold">Report Salary Discrepancy</h2>
        </CardHeader>

        <CardBody className="px-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="text-lg text-success">
                Your salary discrepancy report has been submitted successfully.
              </div>
              <p className="text-default-500">
                An accountant will review your case and contact you soon.
              </p>
              <Button color="primary" onClick={() => setSubmitted(false)}>
                Submit Another Report
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Employee ID"
                  placeholder="Enter your employee ID"
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeId: e.target.value })
                  }
                  isRequired
                />

                <Input
                  label="Pay Period"
                  type="month"
                  placeholder="Select pay period"
                  value={formData.payPeriod}
                  onChange={(e) =>
                    setFormData({ ...formData, payPeriod: e.target.value })
                  }
                  isRequired
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Expected Amount"
                  type="number"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={formData.expectedAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, expectedAmount: e.target.value })
                  }
                />

                <Input
                  label="Actual Amount"
                  type="number"
                  placeholder="0.00"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  value={formData.actualAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, actualAmount: e.target.value })
                  }
                />
              </div>

              <Select
                label="Issue Category"
                placeholder="Select the type of issue"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                isRequired
              >
                {issueCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </Select>

              <Textarea
                label="Description of the Issue"
                placeholder="Please describe the salary discrepancy in detail..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                minRows={4}
                isRequired
              />

              {error && (
                <div className="text-danger text-small">
                  {error.data?.error || "An error occurred while submitting your report."}
                </div>
              )}

              <div className="flex justify-end gap-3">
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                >
                  Submit Report
                </Button>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default SalaryComplaintForm;