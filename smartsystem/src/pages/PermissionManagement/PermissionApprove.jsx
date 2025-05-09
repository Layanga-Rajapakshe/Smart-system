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
  Divider,
  Tabs,
  Tab,
  Badge,
  Textarea,
  Avatar
} from '@heroui/react';

const RequestApprovalDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  
  // View Details Modal
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Approval/Rejection Modal
  const [statusDialog, setStatusDialog] = useState(false);
  const [statusAction, setStatusAction] = useState('');
  const [comment, setComment] = useState('');
  const [processingStatus, setProcessingStatus] = useState(false);
  
  // Success notification state
  const [successModal, setSuccessModal] = useState({
    open: false,
    message: '',
    title: ''
  });
  
  const navigate = useNavigate();

  // Fetch all requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/permission/');
      setRequests(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch requests. Please try again later.');
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filter requests based on search term and tab
  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      (request.details?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.requestedBy?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.requestType?.requestType?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedTab === 'all') return matchesSearch;
    return matchesSearch && request.status === selectedTab;
  });

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle view details
  const handleView = (request) => {
    setSelectedRequest(request);
    setViewDetailsDialog(true);
  };

  // Close view details dialog
  const handleCloseViewDialog = () => {
    setViewDetailsDialog(false);
    setSelectedRequest(null);
  };

  // Open status change dialog
  const handleStatusAction = (request, action) => {
    setSelectedRequest(request);
    setStatusAction(action);
    setComment('');
    setStatusDialog(true);
  };

  // Close status dialog
  const handleCloseStatusDialog = () => {
    setStatusDialog(false);
    setSelectedRequest(null);
    setStatusAction('');
    setComment('');
  };

  // Submit status change
  const handleStatusSubmit = async () => {
    setProcessingStatus(true);
    
    try {
      await axios.put(`/api/permission/${selectedRequest._id}/status`, {
        status: statusAction,
        comment: comment
      });
      
      fetchRequests();
      handleCloseStatusDialog();
      
      // Show success modal
      setSuccessModal({
        open: true,
        title: 'Success',
        message: `Request ${statusAction === 'approved' ? 'approved' : 'rejected'} successfully.`
      });
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || `Failed to ${statusAction} request`}`);
    } finally {
      setProcessingStatus(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModal({ ...successModal, open: false });
  };

  // Format timestamp for better readability
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'lucide:check-circle';
      case 'rejected': return 'lucide:x-circle';
      case 'pending': return 'lucide:clock';
      default: return 'lucide:help-circle';
    }
  };

  // Handle tab change
  const handleTabChange = (key) => {
    setSelectedTab(key);
    setPage(0); // Reset to first page when changing tabs
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Card className="shadow-md">
        <CardBody className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <Icon icon="lucide:clipboard-check" className="text-primary" width={28} height={28} />
                Request Approval Dashboard
              </h1>
              <p className="text-default-500">
                Review and manage employee permission requests
              </p>
            </div>
            <Button 
              color="primary"
              onPress={fetchRequests}
              startContent={<Icon icon="lucide:refresh-cw" />}
            >
              Refresh Data
            </Button>
          </div>

          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search by requester, details or request type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="flex-1"
            />
          </div>

          {error && (
            <Alert color="danger" className="mb-4">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:alert-circle" />
                {error}
              </div>
            </Alert>
          )}

          <Tabs 
            selectedKey={selectedTab} 
            onSelectionChange={handleTabChange}
            className="mb-4"
          >
            <Tab key="all" title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:layers" />
                All Requests
                <Badge size="sm" content={requests.length} color="default" />
              </div>
            }/>
            <Tab key="pending" title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:clock" />
                Pending
                <Badge size="sm" content={requests.filter(r => r.status === 'pending').length} color="warning" />
              </div>
            }/>
            <Tab key="approved" title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:check-circle" />
                Approved
                <Badge size="sm" content={requests.filter(r => r.status === 'approved').length} color="success" />
              </div>
            }/>
            <Tab key="rejected" title={
              <div className="flex items-center gap-2">
                <Icon icon="lucide:x-circle" />
                Rejected
                <Badge size="sm" content={requests.filter(r => r.status === 'rejected').length} color="danger" />
              </div>
            }/>
          </Tabs>

          {loading ? (
            <div className="flex justify-center py-8">
              <CircularProgress aria-label="Loading requests" />
            </div>
          ) : (
            <Table
              aria-label="Requests approval table"
              bottomContent={
                <div className="flex justify-between items-center px-2 py-2">
                  <div className="text-small text-default-400">
                    Showing {filteredRequests.length > 0 ? page * rowsPerPage + 1 : 0}-
                    {Math.min((page + 1) * rowsPerPage, filteredRequests.length)} of {filteredRequests.length} requests
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
                      isDisabled={(page + 1) * rowsPerPage >= filteredRequests.length}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              }
            >
              <TableHeader>
                <TableColumn>REQUESTER</TableColumn>
                <TableColumn>REQUEST TYPE</TableColumn>
                <TableColumn>DETAILS</TableColumn>
                <TableColumn>REQUESTED ON</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn align="center">ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No requests found">
                {filteredRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((request) => (
                    <TableRow key={request._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar 
                            size="sm" 
                            name={request.requestedBy?.name || 'User'} 
                            radius="full" 
                          />
                          <div>
                            <div>{request.requestedBy?.name || 'Unknown User'}</div>
                            <div className="text-tiny text-default-400">{request.requestedBy?.email || ''}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip size="sm" variant="flat" color="primary">
                          {request.requestType?.requestType || 'Unknown Type'}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="truncate max-w-xs" title={request.details}>
                          {request.details}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(request.requestDate)}</TableCell>
                      <TableCell>
                        <Chip 
                          size="sm" 
                          variant="flat" 
                          color={getStatusColor(request.status)}
                          startContent={<Icon icon={getStatusIcon(request.status)} width={14} />}
                        >
                          {request.status?.charAt(0).toUpperCase() + request.status?.slice(1)}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Tooltip content="View details">
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light"
                              onPress={() => handleView(request)}
                            >
                              <Icon icon="lucide:eye" />
                            </Button>
                          </Tooltip>
                          
                          {request.status === 'pending' && (
                            <>
                              <Tooltip content="Approve request">
                                <Button 
                                  isIconOnly 
                                  size="sm" 
                                  variant="light"
                                  color="success"
                                  onPress={() => handleStatusAction(request, 'approved')}
                                >
                                  <Icon icon="lucide:check" />
                                </Button>
                              </Tooltip>
                              
                              <Tooltip content="Reject request">
                                <Button 
                                  isIconOnly 
                                  size="sm" 
                                  variant="light"
                                  color="danger"
                                  onPress={() => handleStatusAction(request, 'rejected')}
                                >
                                  <Icon icon="lucide:x" />
                                </Button>
                              </Tooltip>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>

      {/* View Details Modal */}
      <Modal 
        isOpen={viewDetailsDialog} 
        onClose={handleCloseViewDialog}
        size="2xl"
      >
        <ModalContent>
          {selectedRequest && (
            <>
              <ModalHeader className="flex gap-2 items-center">
                <Icon icon="lucide:file-text" />
                Request Details
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Status Badge */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      {selectedRequest.requestType?.requestType || 'Unknown Request Type'}
                    </h3>
                    <Chip 
                      size="md" 
                      variant="flat" 
                      color={getStatusColor(selectedRequest.status)}
                      startContent={<Icon icon={getStatusIcon(selectedRequest.status)} width={16} />}
                    >
                      {selectedRequest.status?.charAt(0).toUpperCase() + selectedRequest.status?.slice(1)}
                    </Chip>
                  </div>
                  
                  <Divider />
                  
                  {/* Requester Information */}
                  <div className="bg-default-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium mb-3 flex items-center gap-2">
                      <Icon icon="lucide:user" className="text-default-600" />
                      Requester Information
                    </h4>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar 
                        size="md" 
                        name={selectedRequest.requestedBy?.name || 'User'} 
                        radius="full" 
                      />
                      <div>
                        <div className="font-medium">{selectedRequest.requestedBy?.name || 'Unknown User'}</div>
                        <div className="text-sm text-default-500">{selectedRequest.requestedBy?.email || ''}</div>
                        <div className="text-sm text-default-500">
                          {selectedRequest.requestedBy?.department || ''} 
                          {selectedRequest.requestedBy?.department && selectedRequest.requestedBy?.position ? ' • ' : ''} 
                          {selectedRequest.requestedBy?.position || ''}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Request Details */}
                  <div>
                    <h4 className="text-md font-medium mb-2 flex items-center gap-2">
                      <Icon icon="lucide:align-left" className="text-default-600" />
                      Request Details
                    </h4>
                    <div className="bg-default-50 p-4 rounded-lg whitespace-pre-wrap">
                      {selectedRequest.details}
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  {selectedRequest.additionalInfo && Object.keys(selectedRequest.additionalInfo).length > 0 && (
                    <div>
                      <h4 className="text-md font-medium mb-2 flex items-center gap-2">
                        <Icon icon="lucide:info" className="text-default-600" />
                        Additional Information
                      </h4>
                      <div className="bg-default-50 p-4 rounded-lg">
                        <ul className="list-disc list-inside">
                          {Object.entries(selectedRequest.additionalInfo).map(([key, value]) => (
                            <li key={key} className="mb-1">
                              <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span> {
                                typeof value === 'object' ? JSON.stringify(value) : value.toString()
                              }
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Timestamps Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:calendar" className="text-default-400" />
                      <span className="text-sm text-default-400">Requested on:</span>
                      <span>{formatDate(selectedRequest.requestDate)}</span>
                    </div>
                    
                    {selectedRequest.approvalDate && (
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:calendar-check" className="text-default-400" />
                        <span className="text-sm text-default-400">Processed on:</span>
                        <span>{formatDate(selectedRequest.approvalDate)}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Approval Information */}
                  {selectedRequest.approvedBy && (
                    <div className="border-t pt-4 mt-2">
                      <h4 className="text-md font-medium mb-2 flex items-center gap-2">
                        <Icon icon="lucide:shield" className="text-default-600" />
                        Processed By
                      </h4>
                      <div className="flex items-center gap-3">
                        <Avatar 
                          size="sm" 
                          name={selectedRequest.approvedBy?.name || 'Approver'} 
                          radius="full" 
                        />
                        <div>
                          <div className="font-medium">{selectedRequest.approvedBy?.name || 'Unknown Approver'}</div>
                          <div className="text-sm text-default-500">{selectedRequest.approvedBy?.position || ''}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                {selectedRequest.status === 'pending' && (
                  <>
                    <Button 
                      color="success"
                      startContent={<Icon icon="lucide:check" />}
                      onPress={() => {
                        handleCloseViewDialog();
                        handleStatusAction(selectedRequest, 'approved');
                      }}
                    >
                      Approve
                    </Button>
                    <Button 
                      color="danger"
                      startContent={<Icon icon="lucide:x" />}
                      onPress={() => {
                        handleCloseViewDialog();
                        handleStatusAction(selectedRequest, 'rejected');
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button color="primary" onPress={handleCloseViewDialog}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Status Change Modal */}
      <Modal 
        isOpen={statusDialog} 
        onClose={handleCloseStatusDialog}
        size="md"
      >
        <ModalContent>
          <ModalHeader className="flex gap-2 items-center">
            <Icon 
              icon={statusAction === 'approved' ? 'lucide:check-circle' : 'lucide:x-circle'} 
              className={statusAction === 'approved' ? 'text-success' : 'text-danger'} 
            />
            {statusAction === 'approved' ? 'Approve Request' : 'Reject Request'}
          </ModalHeader>
          <ModalBody>
            <p className="mb-4">
              {statusAction === 'approved' 
                ? 'Are you sure you want to approve this request? This will grant the requested permission to the employee.'
                : 'Are you sure you want to reject this request?'
              }
            </p>
            
            <div className="bg-default-50 p-3 rounded-lg mb-4">
              <h4 className="text-sm font-medium mb-2">Request Information:</h4>
              <div className="mb-2">
                <div className="text-sm font-medium">Type:</div>
                <div>{selectedRequest?.requestType?.requestType || 'Unknown Type'}</div>
              </div>
              <div className="mb-2">
                <div className="text-sm font-medium">From:</div>
                <div>{selectedRequest?.requestedBy?.name || 'Unknown User'}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Permission:</div>
                <div className="text-sm">{selectedRequest?.requestType?.permission || 'Unknown Permission'}</div>
              </div>
            </div>
            
            <Textarea
              label="Comment (Optional)"
              placeholder="Add a comment for this decision (visible to the requester)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={handleCloseStatusDialog}>
              Cancel
            </Button>
            <Button 
              color={statusAction === 'approved' ? 'success' : 'danger'}
              onPress={handleStatusSubmit}
              isLoading={processingStatus}
              startContent={!processingStatus && (
                <Icon icon={statusAction === 'approved' ? 'lucide:check' : 'lucide:x'} />
              )}
            >
              {processingStatus ? 'Processing...' : (statusAction === 'approved' ? 'Approve' : 'Reject')}
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
    </div>
  );
};

export default RequestApprovalDashboard;