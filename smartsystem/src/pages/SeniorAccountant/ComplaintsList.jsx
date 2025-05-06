import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Pagination,
  Spinner,
  Input,
  Select,
  SelectItem
} from "@heroui/react";
import { IoSearch, IoEye, IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGetChatHistoryQuery } from "../../redux/api/salaryCalculationApiSlice";

const ComplaintsList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const rowsPerPage = 10;

  // Query to fetch all complaints
  const { data, isLoading, refetch } = useGetChatHistoryQuery();

  // Filter complaints based on search and status
  const filteredComplaints = data?.complaints?.filter(complaint => {
    const matchesSearch = searchTerm === "" || 
      complaint.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint._id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredComplaints.length / rowsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleViewComplaint = (complaintId) => {
    navigate(`/complaints/${complaintId}`);
  };

  const handleResolveComplaint = async (complaintId) => {
    try {
      await updateStatus({
        complaintId,
        status: "Resolved"
      }).unwrap();
      refetch(); // Refresh the complaints list
    } catch (error) {
      console.error("Failed to update complaint status:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  // Get the first message content (subject) for display
  const getComplaintSubject = (complaint) => {
    if (!complaint.messages || complaint.messages.length === 0) return "No details";
    return complaint.messages[0].text.split('\n')[0].substring(0, 50) + 
      (complaint.messages[0].text.length > 50 ? "..." : "");
  };

  const renderStatusChip = (status) => {
    let color = "default";
    
    switch (status) {
      case "Open":
        color = "warning";
        break;
      case "In Progress":
        color = "primary";
        break;
      case "Resolved":
        color = "success";
        break;
      default:
        color = "default";
    }
    
    return <Chip color={color} variant="flat">{status}</Chip>;
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 py-4">
          <h2 className="text-xl font-bold">Salary Complaints</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Input
              placeholder="Search by ID or employee..."
              startContent={<IoSearch />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              placeholder="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-40"
            >
              <SelectItem key="all" value="all">All Statuses</SelectItem>
              <SelectItem key="Open" value="Open">Open</SelectItem>
              <SelectItem key="In Progress" value="In Progress">In Progress</SelectItem>
              <SelectItem key="Resolved" value="Resolved">Resolved</SelectItem>
            </Select>
          </div>
        </CardHeader>

        <CardBody className="px-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner size="lg" />
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="text-center py-12 text-default-500">
              No complaints found matching your criteria.
            </div>
          ) : (
            <>
              <Table aria-label="Complaints table">
                <TableHeader>
                  <TableColumn>COMPLAINT ID</TableColumn>
                  <TableColumn>EMPLOYEE ID</TableColumn>
                  <TableColumn>SUBJECT</TableColumn>
                  <TableColumn>SUBMITTED</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn width={200}>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {paginatedComplaints.map((complaint) => (
                    <TableRow key={complaint._id}>
                      <TableCell className="font-medium">#{complaint._id.slice(-6)}</TableCell>
                      <TableCell>{complaint.userId}</TableCell>
                      <TableCell>{getComplaintSubject(complaint)}</TableCell>
                      <TableCell>{formatDate(complaint.createdAt)}</TableCell>
                      <TableCell>{renderStatusChip(complaint.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            color="primary" 
                            variant="flat" 
                            startContent={<IoEye />}
                            onClick={() => handleViewComplaint(complaint._id)}
                          >
                            View
                          </Button>
                          {complaint.status !== "Resolved" && (
                            <Button 
                              color="success" 
                              variant="flat" 
                              startContent={<IoCheckmarkCircle />}
                              onClick={() => handleResolveComplaint(complaint._id)}
                              isLoading={isUpdating}
                            >
                              Resolve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-center py-4">
                <Pagination
                  total={totalPages}
                  page={page}
                  onChange={setPage}
                />
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ComplaintsList;