import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Breadcrumbs,
  BreadcrumbItem,
  Badge,
  Chip,
  Tooltip,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";

const PermissionRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  // Fetch permission request data
  useEffect(() => {
    const fetchPermissionRequest = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/permissions/${id}`);
        setRequest(response.data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch permission request: ${err.response?.data?.error || err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPermissionRequest();
  }, [id]);

  // Handle request status update (approve/reject)
  const handleUpdateStatus = async (status) => {
    setActionLoading(true);
    try {
      const response = await axios.put(`/api/permissions/${id}/status`, { status });
      setRequest(response.data);
      onClose();
    } catch (err) {
      setError(`Failed to update status: ${err.response?.data?.error || err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle delete request
  const handleDeleteRequest = async () => {
    setActionLoading(true);
    try {
      await axios.delete(`/api/permissions/${id}`);
      navigate('/permissions/my-requests', { 
        state: { message: 'Permission request deleted successfully' } 
      });
    } catch (err) {
      setError(`Failed to delete request: ${err.response?.data?.error || err.message}`);
      setActionLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color for badges
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  // Get permission display name
  const getPermissionLabel = (permissionValue) => {
    const permissionMap = {
      'create_employee': 'Create Employee',
      'create_role': 'Create Role',
      'assign_role': 'Assign Role',
      'update_role': 'Update Role',
      'get_roles_permission': 'View Role Permissions',
      'view_employee_details': 'View Employee Details',
      'update_employee': 'Update Employee',
      'delete_employee': 'Delete Employee',
      'manage_companies': 'Manage Companies',
      'create_employees': 'Create Employees',
      'assign_roles': 'Assign Roles',
      'manage_company_financials': 'Manage Company Financials',
      'access_employee_salary_details': 'Access Salary Details',
      'generate_reports': 'Generate Reports',
      'approve_budget': 'Approve Budget',
      'send_company_messages': 'Send Company Messages',
      'manage_circulars': 'Manage Circulars',
      'create_meeting': 'Create Meeting',
      'update_meeting': 'Update Meeting'
    };
    
    return permissionMap[permissionValue] || permissionValue;
  };

  // Determine if user can edit this request
  const canEdit = request && request.status === 'pending' && 
                 request.requestedBy?._id === localStorage.getItem('userId'); // Assuming user ID is stored in localStorage

  // Determine if user can approve/reject this request
  // This would typically be based on user roles/permissions
  const canApprove = request && request.status === 'pending';

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
              Permission Requests
            </BreadcrumbItem>
            <BreadcrumbItem>
              Request Details
            </BreadcrumbItem>
          </Breadcrumbs>
        </div>

        <div className="flex items-center">
          <Button
            variant="flat"
            color="default"
            startContent={<Icon icon="lucide:arrow-left" width="16" height="16" />}
            onPress={() => navigate(-1)}
            size="md"
            className="font-medium"
          >
            Back
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-20">
          <div className="flex flex-col items-center gap-2">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <span className="text-base text-default-600">Loading request details...</span>
          </div>
        </div>
      ) : error ? (
        <div className="bg-danger-50 text-danger p-4 rounded-md">
          <div className="flex items-center">
            <Icon icon="lucide:alert-triangle" width="20" height="20" className="mr-2" />
            <span>{error}</span>
          </div>
        </div>
      ) : request ? (
        <Card className="w-full shadow-md" radius="md">
          <CardHeader className="flex flex-col gap-2 px-6 py-4 bg-primary-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Icon icon="lucide:shield" 
                      width="24" 
                      height="24" 
                      className="text-primary mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-primary">
                    Permission Request Details
                  </h1>
                  <p className="text-default-600 mt-1 text-base">
                    Request ID: {request._id}
                  </p>
                </div>
              </div>
              <Badge color={getStatusColor(request.status)} size="lg" variant="flat">
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-default-500 mb-1">Permission</h3>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:key" width="18" height="18" className="text-primary" />
                    <span className="text-lg font-medium">{getPermissionLabel(request.permission)}</span>
                  </div>
                  <span className="text-xs text-default-500 mt-1 block">{request.permission}</span>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-default-500 mb-1">Requested By</h3>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:user" width="18" height="18" className="text-primary" />
                    <span className="text-base">
                      {request.requestedBy?.name || 'Unknown User'}
                      {request.requestedBy?.email && ` (${request.requestedBy.email})`}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-default-500 mb-1">Request Timeline</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:calendar" width="16" height="16" className="text-primary" />
                      <span className="text-sm">Requested on: {formatDate(request.requestDate)}</span>
                    </div>
                    
                    {request.approvalDate && (
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:check-circle" width="16" height="16" className={
                          request.status === 'approved' ? 'text-success' : 'text-danger'
                        } />
                        <span className="text-sm">
                          {request.status === 'approved' ? 'Approved' : 'Rejected'} on: {formatDate(request.approvalDate)}
                        </span>
                      </div>
                    )}
                    
                    {request.expiryDate && (
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:clock" width="16" height="16" className="text-warning" />
                        <span className="text-sm">Expires on: {formatDate(request.expiryDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {request.approvedBy && (
                  <div>
                    <h3 className="text-sm font-medium text-default-500 mb-1">Approved/Rejected By</h3>
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:user-check" width="18" height="18" className="text-primary" />
                      <span className="text-base">
                        {request.approvedBy?.name || 'Unknown User'}
                        {request.approvedBy?.email && ` (${request.approvedBy.email})`}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-default-500 mb-1">Request Details</h3>
                  <Card className="bg-default-50 border-1 border-default-200">
                    <CardBody className="p-4">
                      <div className="whitespace-pre-wrap text-base">{request.details}</div>
                    </CardBody>
                  </Card>
                </div>
                
                {request.additionalInfo && Object.keys(request.additionalInfo).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-default-500 mb-1">Additional Information</h3>
                    <Card className="bg-default-50 border-1 border-default-200">
                      <CardBody className="p-4">
                        <pre className="whitespace-pre-wrap font-mono text-sm overflow-auto max-h-40">
                          {JSON.stringify(request.additionalInfo, null, 2)}
                        </pre>
                      </CardBody>
                    </Card>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-end gap-3 mt-8">
              {canEdit && (
                <>
                  <Button
                    variant="flat"
                    color="danger"
                    startContent={<Icon icon="lucide:trash-2" width="16" height="16" />}
                    onPress={() => {
                      setActionType('delete');
                      onOpen();
                    }}
                    size="md"
                  >
                    Delete Request
                  </Button>
                  
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Icon icon="lucide:edit" width="16" height="16" />}
                    onPress={() => navigate(`/permissions/edit/${request._id}`)}
                    size="md"
                  >
                    Edit Request
                  </Button>
                </>
              )}
              
              {canApprove && (
                <>
                  <Button
                    color="danger"
                    variant="flat"
                    startContent={<Icon icon="lucide:x" width="16" height="16" />}
                    onPress={() => {
                      setActionType('reject');
                      onOpen();
                    }}
                    size="md"
                  >
                    Reject
                  </Button>
                  
                  <Button
                    color="success"
                    startContent={<Icon icon="lucide:check" width="16" height="16" />}
                    onPress={() => {
                      setActionType('approve');
                      onOpen();
                    }}
                    size="md"
                  >
                    Approve
                  </Button>
                </>
              )}
            </div>
          </CardBody>
        </Card>
      ) : (
        <div className="text-center my-20">
          <Icon icon="lucide:file-question" width="48" height="48" className="mx-auto mb-4 text-default-400" />
          <h3 className="text-xl font-medium text-default-600 mb-2">Permission request not found</h3>
          <p className="text-default-500">The requested permission request could not be found.</p>
          <Button
            color="primary"
            variant="flat"
            startContent={<Icon icon="lucide:arrow-left" width="16" height="16" />}
            onPress={() => navigate("/permissions/my-requests")}
            size="md"
            className="mt-4"
          >
            Back to Requests
          </Button>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent>
          {actionType === 'delete' && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:alert-triangle" className="text-danger" width="22" height="22" />
                  <span>Delete Permission Request</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to delete this permission request for{" "}
                  <strong>{request && getPermissionLabel(request.permission)}</strong>?
                </p>
                <p className="text-default-500 text-sm">
                  This action cannot be undone. The request will be permanently removed from the system.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleDeleteRequest}
                  isLoading={actionLoading}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
          
          {actionType === 'approve' && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:check-circle" className="text-success" width="22" height="22" />
                  <span>Approve Permission Request</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to approve this permission request for{" "}
                  <strong>{request && getPermissionLabel(request.permission)}</strong>?
                </p>
                <p className="text-default-500 text-sm">
                  This will grant the requested permission to the user until the expiry date (if specified).
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="success"
                  onPress={() => handleUpdateStatus('approved')}
                  isLoading={actionLoading}
                >
                  Approve
                </Button>
              </ModalFooter>
            </>
          )}
          
          {actionType === 'reject' && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:x-circle" className="text-danger" width="22" height="22" />
                  <span>Reject Permission Request</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to reject this permission request for{" "}
                  <strong>{request && getPermissionLabel(request.permission)}</strong>?
                </p>
                <p className="text-default-500 text-sm">
                  The user will not be granted the requested permission.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => handleUpdateStatus('rejected')}
                  isLoading={actionLoading}
                >
                  Reject
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PermissionRequestDetail;