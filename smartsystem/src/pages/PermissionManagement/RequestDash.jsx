import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Input,
  Chip,
  Tooltip,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  CircularProgress,
  Alert,
  Divider
} from '@heroui/react';

const RequestDashboard = () => {
  const [requestTypes, setRequestTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // Success notification state
  const [successModal, setSuccessModal] = useState({
    open: false,
    message: '',
    title: ''
  });
  
  // New state for view details modal
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // New state for edit modal
  const [editDialog, setEditDialog] = useState(false);
  const [editFormData, setEditFormData] = useState({
    requestType: '',
    permission: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  
  // Available permissions (you can modify this based on your application needs)
  const availablePermissions = [
    "create_employee",
    "create_role",
    "assign_role",
    "update_role",
    "get_roles_permission",
    "view_employee_details",
    "update_employee",
    "delete_employee",
    "manage_companies",
    "create_employees",
    "assign_roles",
    "manage_company_financials",
    "access_employee_salary_details",
    "generate_reports",
    "approve_budget",
    "send_company_messages",
    "manage_circulars",
    "create_meeting",
    "update_meeting"
  ];
  
  const navigate = useNavigate();

  // Fetch all request types
  const fetchRequestTypes = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/request/');
      setRequestTypes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch request types. Please try again later.');
      console.error('Error fetching request types:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequestTypes();
  }, []);

  // Filter request types based on search term
  const filteredRequestTypes = requestTypes.filter(
    request => request.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
               request.permission.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Delete request type
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/request/${deleteId}`);
      fetchRequestTypes();
      setSuccessModal({
        open: true,
        title: 'Success',
        message: 'Request type deleted successfully'
      });
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || 'Failed to delete request type'}`);
    } finally {
      setOpenDeleteDialog(false);
      setDeleteId(null);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal({ ...successModal, open: false });
  };

  // Format timestamp for better readability
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  // Navigate to create page
  const handleCreate = () => {
    navigate('/requestDashboard/requestCreate');
  };

  // Open view details dialog
  const handleView = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/request/${id}`);
      setSelectedRequest(response.data);
      setViewDetailsDialog(true);
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || 'Failed to fetch request details'}`);
    } finally {
      setLoading(false);
    }
  };

  // Close view details dialog
  const handleCloseViewDialog = () => {
    setViewDetailsDialog(false);
    setSelectedRequest(null);
  };

  // Open edit dialog
  const handleEdit = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/request/${id}`);
      setEditFormData({
        _id: response.data._id,
        requestType: response.data.requestType,
        permission: response.data.permission
      });
      setEditDialog(true);
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || 'Failed to fetch request details for editing'}`);
    } finally {
      setLoading(false);
    }
  };

  // Close edit dialog
  const handleCloseEditDialog = () => {
    setEditDialog(false);
    setEditFormData({
      requestType: '',
      permission: ''
    });
    setFormErrors({});
  };

  // Handle form input changes
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Handle select change specifically for the Select component
  const handleSelectChange = (value, name) => {
    setEditFormData({
      ...editFormData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // Validate edit form
  const validateEditForm = () => {
    const errors = {};
    
    if (!editFormData.requestType.trim()) {
      errors.requestType = 'Request type is required';
    }
    
    if (!editFormData.permission) {
      errors.permission = 'Permission is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit edit form
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEditForm()) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      await axios.put(`/api/request/${editFormData._id}`, {
        requestType: editFormData.requestType,
        permission: editFormData.permission
      });
      
      fetchRequestTypes();
      handleCloseEditDialog();
      
      // Show success modal
      setSuccessModal({
        open: true,
        title: 'Success',
        message: 'Request type updated successfully'
      });
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || 'Failed to update request type'}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card className="p-6">
        <CardBody>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Request Type Management</h1>
            <Button 
              color="primary"
              onPress={handleCreate}
              startContent={<Icon icon="lucide:plus" />}
            >
              Create New Request Type
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search by name or permission..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="flex-1"
            />
            <Button 
              variant="bordered"
              onPress={fetchRequestTypes}
              startContent={<Icon icon="lucide:refresh-cw" />}
            >
              Refresh
            </Button>
          </div>

          {error && (
            <Alert color="danger" className="mb-4">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <CircularProgress />
            </div>
          ) : (
            <Table
              aria-label="Request types table"
              bottomContent={
                <div className="flex justify-between items-center px-2 py-2">
                  <div className="text-small text-default-400">
                    Total {filteredRequestTypes.length} request types
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="flat" 
                      onPress={() => setPage(Math.max(0, page - 1))}
                      isDisabled={page === 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      size="sm" 
                      variant="flat" 
                      onPress={() => setPage(page + 1)}
                      isDisabled={(page + 1) * rowsPerPage >= filteredRequestTypes.length}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              }
            >
              <TableHeader>
                <TableColumn>REQUEST TYPE</TableColumn>
                <TableColumn>PERMISSION</TableColumn>
                <TableColumn>CREATED</TableColumn>
                <TableColumn>UPDATED</TableColumn>
                <TableColumn align="center">ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredRequestTypes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((requestType) => (
                    <TableRow key={requestType._id}>
                      <TableCell>{requestType.requestType}</TableCell>
                      <TableCell>
                        <Chip size="sm" variant="flat">
                          {requestType.permission}
                        </Chip>
                      </TableCell>
                      <TableCell>{formatDate(requestType.createdAt)}</TableCell>
                      <TableCell>{formatDate(requestType.updatedAt)}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Tooltip content="View details">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light"
                              onPress={() => handleView(requestType._id)}
                            >
                              <Icon icon="lucide:eye" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Edit">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light"
                              onPress={() => handleEdit(requestType._id)}
                            >
                              <Icon icon="lucide:edit" />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Delete">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light"
                              color="danger"
                              onPress={() => handleDeleteClick(requestType._id)}
                            >
                              <Icon icon="lucide:trash" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <ModalContent>
          <ModalHeader className="flex gap-2 items-center">
            <Icon icon="lucide:trash" className="text-danger" />
            Confirm Deletion
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this request type? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button color="danger" onPress={confirmDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={successModal.open} onClose={handleCloseSuccessModal}>
        <ModalContent>
          <ModalHeader className="flex gap-2 items-center">
            <Icon icon="lucide:check-circle" className="text-success" />
            {successModal.title}
          </ModalHeader>
          <ModalBody>
            {successModal.message}
          </ModalBody>
          <ModalFooter>
            <Button color="success" onPress={handleCloseSuccessModal}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* View Details Modal */}
      <Modal 
        isOpen={viewDetailsDialog} 
        onClose={handleCloseViewDialog}
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex gap-2 items-center">
            <Icon icon="lucide:eye" />
            Request Type Details
          </ModalHeader>
          <ModalBody>
            {selectedRequest && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedRequest.requestType}
                  </h3>
                  <Chip>{selectedRequest.permission}</Chip>
                </div>
                
                <Divider />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:calendar" className="text-default-400" />
                    <span className="text-sm text-default-400">Created:</span>
                    <span>{formatDate(selectedRequest.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:clock" className="text-default-400" />
                    <span className="text-sm text-default-400">Updated:</span>
                    <span>{formatDate(selectedRequest.updatedAt)}</span>
                  </div>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="flat"
              startContent={<Icon icon="lucide:edit" />}
              onPress={() => {
                handleCloseViewDialog();
                if (selectedRequest) handleEdit(selectedRequest._id);
              }}
            >
              Edit
            </Button>
            <Button color="primary" onPress={handleCloseViewDialog}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal 
        isOpen={editDialog} 
        onClose={handleCloseEditDialog}
        size="md"
      >
        <ModalContent>
          <form onSubmit={handleEditSubmit}>
            <ModalHeader className="flex gap-2 items-center">
              <Icon icon="lucide:edit" />
              Edit Request Type
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4 py-2">
                <Input
                  label="Request Type"
                  name="requestType"
                  value={editFormData.requestType}
                  onChange={handleEditFormChange}
                  isRequired
                  errorMessage={formErrors.requestType}
                  isInvalid={!!formErrors.requestType}
                />
                
                <Select
                  label="Permission"
                  selectedKeys={editFormData.permission ? [editFormData.permission] : []}
                  onSelectionChange={(keys) => {
                    const selectedValue = Array.from(keys)[0];
                    handleSelectChange(selectedValue, 'permission');
                  }}
                  isRequired
                  errorMessage={formErrors.permission}
                  isInvalid={!!formErrors.permission}
                >
                  {availablePermissions.map((permission) => (
                    <SelectItem key={permission} value={permission}>
                      {permission}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={handleCloseEditDialog}>
                Cancel
              </Button>
              <Button 
                color="primary" 
                type="submit"
                isLoading={submitting}
                startContent={!submitting && <Icon icon="lucide:save" />}
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RequestDashboard;