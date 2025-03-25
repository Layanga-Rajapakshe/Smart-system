import React from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Table, TableHeader, TableColumn,
  TableBody, TableRow, TableCell, Avatar, Chip, Select, SelectItem, 
  Pagination, Input, Card, CardBody, CardHeader, Divider
} from "@heroui/react";
import { Icon } from "@iconify/react";

// Enhanced sample leave requests data
const leaveRequestsData = [
  {
    id: 1,
    employeeName: "Liam Green",
    avatar: "https://i.pravatar.cc/300?u=a049581f4e29026703d",
    role: "Software Engineer",
    department: "Engineering",
    status: "Pending",
    leaveType: "Sick Leave",
    startDate: "2024-02-22",
    endDate: "2024-02-24",
    reason: "Temporary health concerns requiring rest and recovery",
    isRead: false,
    contactInfo: "+1 (555) 123-4567"
  },
  {
    id: 2,
    employeeName: "Emma Rodriguez",
    avatar: "https://i.pravatar.cc/300?u=a049581f4e29026704e",
    role: "Product Manager",
    department: "Product Strategy",
    status: "Approved",
    leaveType: "Annual Leave",
    startDate: "2024-03-15",
    endDate: "2024-03-25",
    reason: "Planned family vacation and personal rest",
    isRead: true,
    contactInfo: "+1 (555) 987-6543"
  },
  {
    id: 3,
    employeeName: "Raj Patel",
    avatar: "https://i.pravatar.cc/300?u=a049581f4e29026705f",
    role: "Data Scientist",
    department: "Business Intelligence",
    status: "Rejected",
    leaveType: "Personal Leave",
    startDate: "2024-04-01",
    endDate: "2024-04-03",
    reason: "Professional development workshop postponement",
    isRead: true,
    contactInfo: "+1 (555) 246-8135"
  }
];

const LEAVE_STATUSES = ["All", "Unread", "Approved", "Rejected", "Pending"];
const ITEMS_PER_PAGE = 5;

export default function LeaveManagementDashboard() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [leaveRequests, setLeaveRequests] = React.useState(leaveRequestsData);
  const [selectedLeave, setSelectedLeave] = React.useState(null);
  const [filter, setFilter] = React.useState("All");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Comprehensive filtering logic (same as previous implementation)
  const filteredRequests = React.useMemo(() => {
    return leaveRequests.filter(leave => {
      const matchesStatus = 
        filter === "All" 
          ? true 
          : filter === "Unread" 
            ? !leave.isRead 
            : leave.status === filter;
      
      const matchesSearch = 
        leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leave.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [leaveRequests, filter, searchQuery]);

  // Pagination logic
  const paginatedRequests = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRequests, currentPage]);

  // Leave request action handler
  const handleLeaveAction = (status) => {
    setLeaveRequests(prev => 
      prev.map(req => 
        req.id === selectedLeave.id 
          ? { ...req, status, isRead: true } 
          : req
      )
    );
    onOpenChange();
  };

  // Status chip renderer
  const renderStatusChip = (status) => {
    const colorMap = {
      Pending: "warning",
      Approved: "success",
      Rejected: "danger"
    };
    const iconMap = {
      Pending: "lucide:clock",
      Approved: "lucide:check-circle",
      Rejected: "lucide:x-circle"
    };
    return (
      <Chip 
        color={colorMap[status] || "default"} 
        startContent={<Icon icon={iconMap[status]} width={16} />}
        variant="flat"
        className="capitalize font-medium"
      >
        {status}
      </Chip>
    );
  };

  // Leave statistics calculator
  const leaveStats = React.useMemo(() => ({
    total: leaveRequests.length,
    pending: leaveRequests.filter(l => l.status === "Pending").length,
    approved: leaveRequests.filter(l => l.status === "Approved").length,
    rejected: leaveRequests.filter(l => l.status === "Rejected").length
  }), [leaveRequests]);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard Header */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Leave Management Dashboard</h1>
              <p className="text-gray-500 mt-2">
                Comprehensive overview and management of employee leave requests
              </p>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              icon="lucide:users"
              label="Total Requests" 
              value={leaveStats.total} 
              color="blue"
            />
            <StatCard 
              icon="lucide:clock"
              label="Pending" 
              value={leaveStats.pending} 
              color="yellow"
            />
            <StatCard 
              icon="lucide:check-circle"
              label="Approved" 
              value={leaveStats.approved} 
              color="green"
            />
            <StatCard 
              icon="lucide:x-circle"
              label="Rejected" 
              value={leaveStats.rejected} 
              color="red"
            />
          </div>
        </div>

        {/* Leave Requests Section */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
              <Input
                type="text"
                placeholder="Search employees, departments, or leave types"
                startContent={<Icon icon="lucide:search" width={18} />}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-grow"
                variant="bordered"
                size="md"
              />
              <Select
                label="Status Filter"
                selectedKeys={[filter]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  setFilter(selected);
                  setCurrentPage(1);
                }}
                className="w-64"
                variant="bordered"
                size="md"
              >
                {LEAVE_STATUSES.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Leave Requests Table */}
            <Table 
              aria-label="Leave requests table" 
              selectionMode="single"
              onRowAction={(key) => {
                const leave = leaveRequests.find(l => l.id === Number(key));
                setSelectedLeave(leave);
                onOpen();
              }}
              classNames={{
                table: "border border-gray-200 rounded-lg",
                th: "bg-gray-100 text-gray-600 uppercase font-bold",
              }}
            >
              <TableHeader>
                <TableColumn>EMPLOYEE</TableColumn>
                <TableColumn>LEAVE TYPE</TableColumn>
                <TableColumn>DATES</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No leave requests found">
                {paginatedRequests.map(leave => (
                  <TableRow 
                    key={leave.id} 
                    className={!leave.isRead ? "bg-blue-50" : ""}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar src={leave.avatar} size="md" />
                        <div>
                          <p className="font-semibold text-gray-800">{leave.employeeName}</p>
                          <p className="text-sm text-gray-500">{leave.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:calendar" className="text-gray-400" width={16} />
                        <span className="text-sm">{leave.startDate} - {leave.endDate}</span>
                      </div>
                    </TableCell>
                    <TableCell>{renderStatusChip(leave.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <Pagination
                total={Math.ceil(filteredRequests.length / ITEMS_PER_PAGE)}
                page={currentPage}
                onChange={setCurrentPage}
                color="primary"
                showControls
                variant="light"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leave Request Details Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        size="2xl"
        backdrop="blur"
      >
        <ModalContent>
          {selectedLeave && (
            <>
              <ModalHeader className="flex flex-col">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-800">Leave Request Details</h2>
                  {renderStatusChip(selectedLeave.status)}
                </div>
              </ModalHeader>
              <Divider />
              <ModalBody className="py-6">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar src={selectedLeave.avatar} size="lg" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{selectedLeave.employeeName}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedLeave.role} • {selectedLeave.department}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-gray-700">
                  <DetailRow 
                    icon="lucide:briefcase" 
                    label="Leave Type" 
                    value={selectedLeave.leaveType} 
                  />
                  <DetailRow 
                    icon="lucide:calendar" 
                    label="Duration" 
                    value={`${selectedLeave.startDate} - ${selectedLeave.endDate}`} 
                  />
                  <DetailRow 
                    icon="lucide:file-text" 
                    label="Reason" 
                    value={selectedLeave.reason} 
                    isMultiline 
                  />
                  <DetailRow 
                    icon="lucide:phone" 
                    label="Contact" 
                    value={selectedLeave.contactInfo} 
                  />
                </div>
              </ModalBody>
              <Divider />
              <ModalFooter>
                {selectedLeave.status === "Pending" && (
                  <>
                    <Button 
                      color="danger" 
                      variant="flat" 
                      startContent={<Icon icon="lucide:x-circle" />}
                      onPress={() => handleLeaveAction("Rejected")}
                    >
                      Reject
                    </Button>
                    <Button 
                      color="success" 
                      startContent={<Icon icon="lucide:check-circle" />}
                      onPress={() => handleLeaveAction("Approved")}
                    >
                      Approve
                    </Button>
                  </>
                )}
                <Button variant="light" onPress={onOpenChange}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-${color}-50 border border-${color}-100 rounded-lg p-4 shadow-sm`}>
      <div className="flex items-center">
        <div className={`p-2.5 rounded-lg bg-${color}-100 mr-4`}>
          <Icon icon={icon} width={24} className={`text-${color}-600`} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value, isMultiline = false }) {
  return (
    <div className="flex items-start gap-3">
      <Icon icon={icon} className="text-gray-400 mt-1" width={20} />
      <div>
        <span className="font-medium text-gray-600 mr-2">{label}:</span>
        {isMultiline ? (
          <p className="text-gray-700 mt-1">{value}</p>
        ) : (
          <span className="text-gray-700">{value}</span>
        )}
      </div>
    </div>
  );
}