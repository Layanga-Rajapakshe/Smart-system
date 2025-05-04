import React, { useState, useMemo } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Input, Select, SelectItem, Button, Chip, Pagination, Card, CardBody, CardHeader
} from "@heroui/react";
import { 
  FileText, Filter, Search, Download, ArrowLeft, 
  AlertCircle, Calendar, Clock 
} from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const LeaveHistoryPage = ({ employee }) => {
  const { leaveRecords = [] } = employee || {};

  // State for filtering and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Memoized filtered and paginated leave records
  const filteredLeaves = useMemo(() => {
    return leaveRecords.filter(leave => {
      const matchesSearch = leave.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatDate(leave.leaveStart).toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || leave.status === statusFilter;
      const matchesType = typeFilter === "all" || leave.reason === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [leaveRecords, searchTerm, statusFilter, typeFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const paginatedLeaves = filteredLeaves.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Status color mapping
  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "success";
      case "Pending": return "warning";
      case "Rejected": return "danger";
      default: return "default";
    }
  };

  // Export function (mock implementation)
  const handleExportLeaves = () => {
    console.log("Exporting leave records...");
    // Implement actual export logic here
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <RouterLink to="/leaveprofile">
            <Button variant="light" startContent={<ArrowLeft />}>
              Back to Leave Profile
            </Button>
          </RouterLink>
          <h1 className="text-2xl font-bold text-gray-800">Leave History</h1>
        </div>
        <Button 
          color="primary" 
          variant="bordered" 
          startContent={<Download />} 
          onClick={handleExportLeaves}
        >
          Export History
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6 shadow-md">
        <CardBody>
          <div className="flex space-x-4">
            <Input
              type="text"
              label="Search"
              startContent={<Search size={18} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3"
            />
            <Select
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              startContent={<Filter size={18} />}
              className="w-1/4"
            >
              <SelectItem key="all" value="all">All Statuses</SelectItem>
              <SelectItem key="Approved" value="Approved">Approved</SelectItem>
              <SelectItem key="Pending" value="Pending">Pending</SelectItem>
              <SelectItem key="Rejected" value="Rejected">Rejected</SelectItem>
            </Select>
            <Select
              label="Leave Type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              startContent={<FileText size={18} />}
              className="w-1/4"
            >
              <SelectItem key="all" value="all">All Types</SelectItem>
              <SelectItem key="Vacation" value="Vacation">Vacation</SelectItem>
              <SelectItem key="Medical" value="Medical">Medical</SelectItem>
              <SelectItem key="Personal" value="Personal">Personal</SelectItem>
              <SelectItem key="Family Emergency" value="Family Emergency">Family Emergency</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Leave History Table */}
      <Card className="shadow-md">
        <CardBody>
          <Table 
            aria-label="Leave history table" 
            selectionMode="single"
            className="w-full"
          >
            <TableHeader>
              <TableColumn>Leave Dates</TableColumn>
              <TableColumn>Type</TableColumn>
              <TableColumn>Duration</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Approval Details</TableColumn>
            </TableHeader>
            <TableBody 
              emptyContent={
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <AlertCircle size={40} className="mb-4" />
                  <p>No leave records found</p>
                </div>
              }
            >
              {paginatedLeaves.map((leave, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-500" />
                      <span>{formatDate(leave.leaveStart)} - {formatDate(getEndDate(leave.leaveStart, leave.noOfDays))}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip color="secondary" variant="flat">
                      {leave.reason}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-gray-500" />
                      <span>{leave.noOfDays} day{leave.noOfDays > 1 ? 's' : ''}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip color={getStatusColor(leave.status)} variant="flat">
                      {leave.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-gray-700">Approved by: {leave.approvedBy || 'N/A'}</p>
                      <p className="text-xs text-gray-500">
                        Request Date: {formatDate(leave.date)}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              color="primary"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

// Helper functions (same as in Leave Profile)
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

const getEndDate = (startDateString, days) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + days - 1);
  return endDate.toISOString().split('T')[0];
};

export default function App() {
  const sampleEmployee = {
    leaveRecords: [
      // Use the same leaveRecords from the previous example
      {
        date: "2023-12-15",
        leaveStart: "2024-01-10",
        noOfDays: 2,
        reason: "Vacation",
        approvedBy: "Manager B",
        status: "Approved",
      },
      {
        "date": "2024-04-05",
        "leaveStart": "2024-04-10",
        "noOfDays": 5,
        "reason": "Medical",
        "approvedBy": "Manager Y",
        "status": "Approved"
      },
      {
        "date": "2024-05-01",
        "leaveStart": "2024-05-03",
        "noOfDays": 2,
        "reason": "Family Emergency",
        "approvedBy": "Manager Z",
        "status": "Rejected"
      },
      {
        "date": "2024-06-12",
        "leaveStart": "2024-06-14",
        "noOfDays": 2,
        "reason": "Personal",
        "approvedBy": "Manager A",
        "status": "Pending"
      }
      // ... (rest of the leave records)
    ]
  };

  return <LeaveHistoryPage employee={sampleEmployee} />;
}