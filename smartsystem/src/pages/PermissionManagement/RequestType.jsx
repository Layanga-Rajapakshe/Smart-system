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
  Textarea,
  DatePicker
} from "@heroui/react";

const PermissionRequestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    permission: '',
    details: '',
    additionalInfo: {},
    expiryDate: null
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

  // Fetch permission request data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchPermissionRequest = async () => {
        setFetchLoading(true);
        try {
          const response = await axios.get(`/api/permission/${id}`);
          setFormData({
            permission: response.data.permission,
            details: response.data.details,
            additionalInfo: response.data.additionalInfo || {},
            expiryDate: response.data.expiryDate ? new Date(response.data.expiryDate) : null
          });
          setError(null);
        } catch (err) {
          setError(`Failed to fetch permission request: ${err.response?.data?.error || err.message}`);
        } finally {
          setFetchLoading(false);
        }
      };
      fetchPermissionRequest();
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

  // Handle additional info change (JSON object)
  const handleAdditionalInfoChange = (e) => {
    try {
      const parsedValue = e.target.value ? JSON.parse(e.target.value) : {};
      setFormData(prevData => ({
        ...prevData,
        additionalInfo: parsedValue
      }));
    } catch (err) {
      // If not valid JSON, store as string to be validated later
      setFormData(prevData => ({
        ...prevData,
        additionalInfo: { text: e.target.value }
      }));
    }
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData(prevData => ({
      ...prevData,
      expiryDate: date
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Prepare data for submission
      const requestData = {
        permission: formData.permission,
        details: formData.details,
        additionalInfo: formData.additionalInfo,
        expiryDate: formData.expiryDate
      };

      if (isEditMode) {
        await axios.put(`/api/permission/${id}`, requestData);
        setSuccess('Permission request updated successfully!');
      } else {
        await axios.post('/api/permission', requestData);
        setSuccess('Permission request created successfully!');
        // Clear form data if creating new request
        setFormData({
          permission: '',
          details: '',
          additionalInfo: {},
          expiryDate: null
        });
      }

      // Redirect after a short delay to show success message
      setTimeout(() => {
        navigate('/permissions/my-requests');
      }, 1500);
    } catch (err) {
      setError(`Error: ${err.response?.data?.error || 'Something went wrong'}`);
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
              onPress={() => navigate("/dashboard")}
            >
              <Icon icon="lucide:layout-dashboard" width="22" height="22" />
            </Button>
          </Tooltip>
          
          <Breadcrumbs size="md" className="text-sm">
            <BreadcrumbItem href="/dashboard">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem href="/permissions/my-requests">
              My Permission Requests
            </BreadcrumbItem>
            <BreadcrumbItem>
              {isEditMode ? "Edit Request" : "New Request"}
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <div className="flex items-center">
          <Button
            variant="flat"
            color="default"
            startContent={<Icon icon="lucide:arrow-left" width="16" height="16" />}
            onPress={() => navigate("/permissions/my-requests")}
            size="md"
            className="font-medium"
          >
            Back to My Requests
          </Button>
        </div>
      </div>

      <Card className="w-full shadow-md" radius="md">
        <CardHeader className="flex flex-col gap-2 px-6 py-4 bg-primary-50">
          <div className="flex items-center">
            <Icon icon={isEditMode ? "lucide:edit-3" : "lucide:shield-plus"} 
                  width="24" 
                  height="24" 
                  className="text-primary mr-3" />
            <div>
              <h1 className="text-2xl font-bold text-primary">
                {isEditMode ? "Edit Permission Request" : "Request New Permission"}
              </h1>
              <p className="text-default-600 mt-1 text-base">
                {isEditMode
                  ? "Update your pending permission request."
                  : "Submit a request for additional system permissions."}
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
                <span className="text-base text-default-600">Loading request data...</span>
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
                <Select
                  isRequired
                  label="Permission Type"
                  labelPlacement="outside"
                  placeholder="Select the permission you need"
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
                  isDisabled={isEditMode && formData.status !== 'pending'}
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

                <Textarea
                  isRequired
                  label="Request Details"
                  labelPlacement="outside"
                  placeholder="Explain why you need this permission and how it will help you in your role"
                  value={formData.details}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, details: value }))
                  }
                  minRows={4}
                  maxRows={8}
                  size="md"
                  className="text-base"
                  startContent={
                    <Icon icon="lucide:file-text" width="18" height="18" className="text-default-400 mt-2" />
                  }
                  isDisabled={isEditMode && formData.status !== 'pending'}
                />

                <Textarea
                  label="Additional Information (Optional)"
                  labelPlacement="outside"
                  placeholder="Any additional context or information in JSON format if required"
                  value={
                    typeof formData.additionalInfo === 'object' && Object.keys(formData.additionalInfo).length > 0
                      ? JSON.stringify(formData.additionalInfo, null, 2)
                      : ''
                  }
                  onChange={handleAdditionalInfoChange}
                  minRows={3}
                  maxRows={6}
                  size="md"
                  className="text-base font-mono"
                  startContent={
                    <Icon icon="lucide:code" width="18" height="18" className="text-default-400 mt-2" />
                  }
                  description="Optional JSON data that may be required for specific permission types"
                  isDisabled={isEditMode && formData.status !== 'pending'}
                />

                <DatePicker
                  label="Expiry Date (Optional)"
                  labelPlacement="outside"
                  placeholder="Select when this permission should expire (if temporary)"
                  value={formData.expiryDate}
                  onChange={handleDateChange}
                  size="md"
                  className="text-base"
                  startContent={
                    <Icon icon="lucide:calendar" width="18" height="18" className="text-default-400" />
                  }
                  description="Leave blank for permanent permission requests"
                  isDisabled={isEditMode && formData.status !== 'pending'}
                  minDate={new Date()} // Can't select dates in the past
                />

                {/* Action buttons positioned at the right side */}
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="flat"
                    color="default"
                    size="md"
                    onPress={() => navigate("/permissions/my-requests")}
                    className="font-medium text-base px-6 py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    size="md"
                    startContent={<Icon icon={isEditMode ? "lucide:refresh-cw" : "lucide:send"} width="18" height="18" />}
                    isLoading={loading}
                    className="font-medium text-base px-6 py-2"
                    isDisabled={isEditMode && formData.status !== 'pending'}
                  >
                    {isEditMode ? "Update Request" : "Submit Request"}
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

export default PermissionRequestForm;