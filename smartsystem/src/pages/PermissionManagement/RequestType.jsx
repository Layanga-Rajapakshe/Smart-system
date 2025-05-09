import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Breadcrumbs,
  BreadcrumbItem,
  Chip,
  Alert,
  Tooltip,
} from "@heroui/react";

const RequestTypeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    requestType: '',
    permission: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // List of available permissions based on your backend enum
  const permissionOptions = [
    { value: 'create_employee', label: 'Create Employee', description: 'Permission to create new employees in the system' },
    { value: 'create_role', label: 'Create Role', description: 'Permission to create new roles' },
    { value: 'assign_role', label: 'Assign Role', description: 'Permission to assign roles to employees' },
    { value: 'update_role', label: 'Update Role', description: 'Permission to modify existing roles' },
    { value: 'get_roles_permission', label: 'View Role Permissions', description: 'Permission to view role permissions' },
    { value: 'view_employee_details', label: 'View Employee Details', description: 'Permission to access employee information' },
    { value: 'update_employee', label: 'Update Employee', description: 'Permission to modify employee data' },
    { value: 'delete_employee', label: 'Delete Employee', description: 'Permission to remove employees from the system' },
    { value: 'manage_companies', label: 'Manage Companies', description: 'Permission to create and modify company data' },
    { value: 'create_employees', label: 'Create Employees', description: 'Permission to add multiple employees' },
    { value: 'assign_roles', label: 'Assign Roles', description: 'Permission to assign multiple roles' },
    { value: 'manage_company_financials', label: 'Manage Company Financials', description: 'Permission to manage financial data' },
    { value: 'access_employee_salary_details', label: 'Access Salary Details', description: 'Permission to view salary information' },
    { value: 'generate_reports', label: 'Generate Reports', description: 'Permission to create system reports' },
    { value: 'approve_budget', label: 'Approve Budget', description: 'Permission to approve departmental budgets' },
    { value: 'send_company_messages', label: 'Send Company Messages', description: 'Permission to send company-wide communications' },
    { value: 'manage_circulars', label: 'Manage Circulars', description: 'Permission to create and manage circulars' },
    { value: 'create_meeting', label: 'Create Meeting', description: 'Permission to schedule meetings' },
    { value: 'update_meeting', label: 'Update Meeting', description: 'Permission to modify meeting details' },
  ];

  // Fetch request type data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchRequestType = async () => {
        setFetchLoading(true);
        try {
          const response = await axios.get(`/api/request / ${ id }`);
          setFormData({
            requestType: response.data.requestType,
            permission: response.data.permission,
          });
          setError(null);
        } catch (err) {
          setError(`Failed to fetch request type: ${ err.response?.data?.message || err.message }`);
        } finally {
          setFetchLoading(false);
        }
      };
      fetchRequestType();
    }
  }, [id, isEditMode]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEditMode) {
        await axios.put(`/api/request / ${ id }`, formData);
        setSuccess('Request type updated successfully!');
      } else {
        await axios.post('/api/request/', formData);
        setSuccess('Request type created successfully!');
        // Clear form data if creating new request type
        setFormData({
          requestType: '',
          permission: '',
        });
      }

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate('/requestDashboard');
      }, 1500);
    } catch (err) {
      setError(`Error: ${ err.response?.data?.message || 'Something went wrong' }`);
    } finally {
      setLoading(false);
    }
  };

  // Get current permission details
  const selectedPermission = permissionOptions.find(option => option.value === formData.permission);

  return (
    <div className="max-w-5xl mx-auto px-6 py-6">
      {/* Top navigation bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Tooltip content="Return to Dashboard">
            <Button
              isIconOnly
              variant="light"
              size="md"
              className="mr-4"
              onPress={() => navigate("/requestDashboard")}
            >
              <Icon icon="lucide:layout-dashboard" width="22" height="22" />
            </Button>
          </Tooltip>

          <Breadcrumbs size="md" className="text-sm">
            <BreadcrumbItem href="/requestDashboard">
              Dashboard
            </BreadcrumbItem>

            <BreadcrumbItem>
              {isEditMode ? "Edit Request Type" : "Create Request Type"}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div className="flex items-center">
          <Button
            variant="flat"
            color="default"
            startContent={<Icon icon="lucide:arrow-left" width="16" height="16" />}
            onPress={() => navigate("/requestDashboard")}
            size="md"
            className="font-medium"
          >
            Back to List
          </Button>
        </div>
      </div>

      <Card className="w-full shadow-md" radius="md">
        <CardHeader className="flex flex-col gap-2 px-6 py-4 bg-primary-50">
          <div className="flex items-center">
            <Icon icon={isEditMode ? "lucide:edit-3" : "lucide:plus-circle"}
              width="24"
              height="24"
              className="text-primary mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {isEditMode ? "Edit Request Type" : "Create New Request Type"}
              </h1>
              <p className="text-default-600 mt-1 text-base">
                {isEditMode
                  ? "Update the details of an existing request type in the system."
                  : "Create a new request type with specific permissions for your organization."}
              </p>
            </div>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="px-6 py-6">
          {fetchLoading && (
            <div className="flex justify-center my-8">
              <div className="flex flex-col items-center gap-2">
                <span className="loading loading-spinner loading-md text-primary"></span>
                <span className="text-base text-default-600">Loading request type data...</span>
              </div>
            </div>
          )}

          {!fetchLoading && (
            <>
              {error && (
                <Alert className="mb-4 text-base" color="danger">
                  <div className="flex items-center">
                    <Icon icon="lucide:alert-circle" width="18" height="18" className="mr-2" />
                    {error}
                  </div>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 text-base" color="success">
                  <div className="flex items-center">
                    <Icon icon="lucide:check-circle" width="18" height="18" className="mr-2" />
                    {success}
                  </div>
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Input
                  isRequired
                  label="Request Type Name"
                  labelPlacement="outside"
                  placeholder="Enter a descriptive name for this request type"
                  value={formData.requestType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, requestType: value }))
                  }
                  description="Must be unique across all request types"
                  size="md"
                  className="text-base"
                  startContent={
                    <Icon icon="lucide:tag" width="18" height="18" className="text-default-400" />
                  }
                />

                <Select
                  isRequired
                  label="Permission"
                  labelPlacement="outside"
                  placeholder="Select a permission"
                  selectedKeys={formData.permission ? [formData.permission] : []}
                  onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    setFormData((prev) => ({ ...prev, permission: selected }));
                  }}
                  size="md"
                  className="text-base"
                  startContent={
                    <Icon icon="lucide:shield" width="18" height="18" className="text-default-400" />
                  }
                >
                  {permissionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} textValue={option.label}>
                      <div className="flex flex-col">
                        <span className="text-sm">{option.label}</span>
                        <span className="text-tiny text-default-500">{option.value}</span>
                      </div>
                    </SelectItem>
                  ))}
                </Select>

                {selectedPermission && (
                  <Card className="bg-default-50 border-1 border-primary-100 mb-3">
                    <CardBody className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Icon icon="lucide:info" width="18" height="18" className="text-primary" />
                        <span className="font-semibold text-base">Permission Details</span>
                      </div>
                      <p className="text-sm mb-3">{selectedPermission.description}</p>
                      <div className="flex gap-2">
                        <Chip size="sm" variant="flat" color="primary" className="text-sm">
                          <Icon icon="lucide:key" className="mr-1" width="14" height="14" />
                          {selectedPermission.value}
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Action button positioned at the right side */}
                <div className="flex justify-end mt-6">
                  <Button
                    type="submit"
                    color="primary"
                    size="md"
                    startContent={<Icon icon="lucide:save" width="18" height="18" />}
                    isLoading={loading}
                    className="font-medium text-base px-6 py-2"
                  >
                    {isEditMode ? "Update Request Type" : "Create Request Type"}
                  </Button>
                </div>
              </Form>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default RequestTypeForm;