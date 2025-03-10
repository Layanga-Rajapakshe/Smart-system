import React, { useState } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Badge, Table, TableHeader, TableColumn,
  TableBody, TableRow, TableCell, Avatar, Chip, Select, SelectItem, Pagination
} from "@heroui/react";

const leaveRequestsData = [
  {
    id: 1,
    employeeName: "Liam Green",
    avatar: "https://i.pravatar.cc/300?u=a049581f4e29026703d",
    role: "Software Engineer",
    status: "Pending",
    leaveType: "Sick Leave",
    startDate: "2024-02-22",
    endDate: "2024-02-24",
    reason: "Migraine and exhaustion",
    isRead: false,
  },
  {
    id: 2,
    employeeName: "Olivia Taylor",
    avatar: "https://i.pravatar.cc/300?u=a053581f4e29026708d",
    role: "Product Designer",
    status: "Approved",
    leaveType: "Vacation Leave",
    startDate: "2024-03-12",
    endDate: "2024-03-18",
    reason: "Vacation with friends",
    isRead: true,
  },
  {
    id: 3,
    employeeName: "Ethan Clark",
    avatar: "https://i.pravatar.cc/300?u=a046581f4e29026706e",
    role: "Project Manager",
    status: "Pending",
    leaveType: "Casual Leave",
    startDate: "2024-02-27",
    endDate: "2024-02-28",
    reason: "Urgent personal matters",
    isRead: false,
  },
  {
    id: 4,
    employeeName: "Mia Harris",
    avatar: "https://i.pravatar.cc/300?u=a048581f4e29026702d",
    role: "HR Manager",
    status: "Approved",
    leaveType: "Maternity Leave",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    reason: "Pregnancy",
    isRead: true,
  },
  {
    id: 5,
    employeeName: "James White",
    avatar: "https://i.pravatar.cc/300?u=a051581f4e29026710d",
    role: "HR Manager",
    status: "Pending",
    leaveType: "Paternity Leave",
    startDate: "2024-05-10",
    endDate: "2024-05-12",
    reason: "Birth of a child",
    isRead: true,
  },
  {
    id: 6,
    employeeName: "Charlotte King",
    avatar: "https://i.pravatar.cc/300?u=a050581f4e29026711c",
    role: "HR Manager",
    status: "Approved",
    leaveType: "Annual Leave",
    startDate: "2024-06-05",
    endDate: "2024-06-15",
    reason: "Travel abroad",
    isRead: true,
  },
  {
    id: 7,
    employeeName: "Lily Brown",
    avatar: "https://i.pravatar.cc/300?u=a055581f4e29026712f",
    role: "HR Manager",
    status: "Rejected",
    leaveType: "Urgent Leave",
    startDate: "2024-04-10",
    endDate: "2024-04-15",
    reason: "Family emergency",
    isRead: true,
  },
  {
    id: 8,
    employeeName: "Benjamin Lee",
    avatar: "https://i.pravatar.cc/300?u=a047581f4e29026704a",
    role: "HR Manager",
    status: "Approved",
    leaveType: "Sick Leave",
    startDate: "2024-03-01",
    endDate: "2024-03-03",
    reason: "Severe cold",
    isRead: false,
  },


  ];
  export default function LeaveApprovalPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedLeave, setSelectedLeave] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState(leaveRequestsData);
    const [filter, setFilter] = useState("All");
  
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;  // Set how many items you want to show per page (10 for All)
  
    const handleOpenModal = (leave) => {
      setSelectedLeave(leave);
      onOpen();
      setLeaveRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === leave.id ? { ...req, isRead: true } : req
        )
      );
    };
  
    const handleApproval = (status) => {
      setLeaveRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === selectedLeave.id ? { ...req, status } : req
        )
      );
      onOpenChange();
    };
  
    const handleFilterChange = (selected) => {
      setFilter(selected.currentKey);
      setCurrentPage(1); // Reset to the first page when filter changes
    };
  
    // Filter leave requests based on selected filter
    const filteredRequests = leaveRequests.filter((leave) => {
      switch (filter) {
        case "Unread":
          return !leave.isRead;
        case "Approved":
        case "Rejected":
        case "Pending":
          return leave.status === filter;
        case "All": // "All" filter should show all leave requests
        default:
          return true;
      }
    });
  
    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    // Calculate total pages dynamically based on filtered data
    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Leave Requests for Approval</h2>
  
          {/* Filter Dropdown */}
          <Select
            className="max-w-xs"
            label="Filter by Status"
            placeholder="Select a status"
            selectedKey={filter}
            onSelectionChange={handleFilterChange}
          >
            {["All", "Unread", "Approved", "Rejected", "Pending"].map((status) => (
              <SelectItem key={status}>{status}</SelectItem>
            ))}
          </Select>
        </div>
  
        {/* Leave Requests Table */}
        <Table>
          <TableHeader>
            <TableColumn>Employee</TableColumn>
            <TableColumn>Leave Type</TableColumn>
            <TableColumn>Dates</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {currentItems.map((leave) => (
              <TableRow
                key={leave.id}
                className={!leave.isRead ? "bg-blue-100 cursor-pointer" : "cursor-pointer"}
                onClick={() => handleOpenModal(leave)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar src={leave.avatar} />
                    <div>
                      <p className="font-medium">{leave.employeeName}</p>
                      <p className="text-sm text-gray-500">{leave.role}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{leave.startDate} - {leave.endDate}</TableCell>
                <TableCell>
                  <Chip
                    color={leave.status === "Pending" ? "warning" : leave.status === "Approved" ? "success" : "danger"}
                  >
                    {leave.status}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            showControls
            currentPage={currentPage}
            total={totalPages}
            onPageChange={paginate}
          />
        </div>
  
        {/* Leave Details Modal */}
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
          <ModalContent>
            {selectedLeave && (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Leave Request Details
                </ModalHeader>
                <ModalBody>
                  <div className="flex items-center gap-3">
                    <Avatar src={selectedLeave.avatar} size="lg" />
                    <div>
                      <p className="text-lg font-medium">{selectedLeave.employeeName}</p>
                      <p className="text-gray-500">{selectedLeave.role}</p>
                    </div>
                  </div>
                  <p><strong>Leave Type:</strong> {selectedLeave.leaveType}</p>
                  <p><strong>Dates:</strong> {selectedLeave.startDate} to {selectedLeave.endDate}</p>
                  <p><strong>Reason:</strong> {selectedLeave.reason}</p>
                  <p>
                    <strong>Status:</strong>
                    <Badge
                      color={selectedLeave.status === "Pending" ? "warning" : selectedLeave.status === "Approved" ? "success" : "danger"}
                      className="ml-2"
                    >
                      {selectedLeave.status}
                    </Badge>
                  </p>
                </ModalBody>
                <ModalFooter>
                  {selectedLeave.status === "Pending" && (
                    <>
                      <Button color="danger" variant="flat" onPress={() => handleApproval("Rejected")}>
                        Reject
                      </Button>
                      <Button color="success" onPress={() => handleApproval("Approved")}>
                        Approve
                      </Button>
                    </>
                  )}
                  <Button onPress={onOpenChange}>Close</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }