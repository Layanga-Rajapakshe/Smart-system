import React, { useState } from "react";
import {
  CircularProgress,
  Chip,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Select,
  SelectItem,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { Calendar } from "@heroui/react"; // Import the Calendar component
import { Link } from "@heroui/react"; // Import Link component for the drawer
import LeaveRequestModal from "../../components/Leave/LeaveRequestModal"; // Import the modal component

const LeaveProfile = ({ employee }) => {
  const { takenLeaves, totalLeaves, leaveRecords } = employee;

  // Pagination settings
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Leave filter state (default to "All")
  const [filter, setFilter] = useState("All");

  // Calculate the percentage of leaves taken
  const leavePercentage = Math.round((takenLeaves / totalLeaves) * 100);
  const remainingLeaves = totalLeaves - takenLeaves;

  // Sort leaves from earliest to latest
  const sortedLeaves = leaveRecords.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Filter leave records based on status
  const filteredLeaves =
    filter === "All"
      ? sortedLeaves
      : sortedLeaves.filter((leave) => leave.status === filter);

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeaves = filteredLeaves.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Drawer functions
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Modal control for leave request form
  const { isOpen: isLeaveModalOpen, onOpen: onOpenLeaveModal, onOpenChange: onOpenLeaveModalChange } = useDisclosure();

  // State for success message
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);

  const handleLeaveRequestSubmit = () => {
    // This function simulates submitting the leave request
    setIsRequestSuccessful(true);
    setTimeout(() => setIsRequestSuccessful(false), 3000); // Hide the success message after 3 seconds
  };

  return (
    <div className="flex flex-col items-center bg-white p-4 space-y-6">
      {/* Card for Calendar, CircularProgress, and Chip components */}
      <div className="w-full max-w-5xl border-gray-200 rounded-lg p-1 mb-2">
        <div className="w-full flex justify-center items-center space-x-6">
          {/* Calendar Component on the Left */}
          <div className="w-1/4">
            <Calendar
              showMonthAndYearPickers
              aria-label="Date (Show Month and Year Picker)"
            />
          </div>

          {/* Centered Text and Description */}
          <div className="flex flex-col items-center justify-center w-1/4">
            <p className="text-xl font-semibold text-gray-700 mb-2">
              Leave Overview
            </p>
            <p className="text-sm text-gray-500">Track your leave usage and status</p>
          </div>

          {/* Circular Progress and Text Components on the Right */}
          <div className="flex flex-col items-center space-y-3 w-1/4 mt-4">
            <CircularProgress
              value={leavePercentage}
              strokeWidth={5}
              showValueLabel={true}
              classNames={{
                svg: "w-44 h-44",
                indicator: "stroke-indigo-500",
                track: "stroke-gray-300",
                value: "text-4xl font-bold text-gray-800",
              }}
            />
            <div className="flex space-x-4">
              <Chip
                variant="bordered"
                classNames={{
                  base: "border-gray-300",
                  content: "text-gray-800 font-semibold",
                }}
              >
                {takenLeaves} of {totalLeaves} Leaves Taken
              </Chip>
              <Chip
                variant="bordered"
                classNames={{
                  base: "border-gray-300",
                  content: "text-gray-800 font-semibold",
                }}
              >
                {remainingLeaves} Leaves Remaining
              </Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Link to open the Drawer */}
      <Link
        isExternal
        showAnchorIcon
        onClick={onOpen}
      >
        Open Leave Details
      </Link>

      {/* Drawer Implementation */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              {/* Drawer Header */}
              <DrawerHeader className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-gray-800">Leave Policies & Details</h3>
                <p className="text-sm text-gray-500">
                  Gain insights into your leave records and company policies.
                </p>
              </DrawerHeader>

              {/* Drawer Body */}
              <DrawerBody>
                <p className="text-base text-gray-700 mb-4">
                  At [Company Name], we value your well-being and work-life balance. Our leave policies are designed to provide you with adequate time for rest and personal needs while ensuring smooth business operations.
                </p>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">Leave Records</h4>
                  <p className="text-base text-gray-700">
                    Below, you will find detailed information about your leave requests, including both approved and pending statuses. You can track your leave history, approval dates, and remaining balance for the year.
                  </p>

                  <h4 className="text-lg font-semibold text-gray-800">Company Leave Policy Overview</h4>
                  <p className="text-base text-gray-700">
                    Our leave policies are outlined as follows:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Annual leave: You are entitled to [X] days of paid annual leave each year.</li>
                    <li>Sick leave: [X] days of sick leave are provided annually with required documentation for extended leave.</li>
                    <li>Special leave: In case of emergencies or personal needs, special leave can be requested subject to approval.</li>
                  </ul>

                  
                </div>
              </DrawerBody>

              {/* Drawer Footer with Action Buttons */}
              <DrawerFooter className="space-x-4">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onOpenLeaveModal}>
                  Request Leave
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Leave History Table */}
      <div className="w-full max-w-5xl border border-gray-200 shadow-lg rounded-lg mb-4 relative">
        <div className="absolute top-4 right-4 flex items-center space-x-6">
          {/* Leave Filter Dropdown (Increased width for a single line) */}
          <Select
            label="Filter by Status"
            className="w-56"
            selectedKeys={[filter]}
            onChange={(e) => setFilter(e.target.value)}
          >
            {["All", "Approved", "Pending"].map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </Select>

          {/* Request Leave Button */}
          <Button color="primary" variant="solid" size="lg" onClick={onOpenLeaveModal}>
            Request Leave
          </Button>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2 p-4">
          Leave History
        </h3>

        <Table>
          <TableHeader>
            <TableColumn>Date</TableColumn>
            <TableColumn>Leave Start</TableColumn>
            <TableColumn>No of Days</TableColumn>
            <TableColumn>Reason</TableColumn>
            <TableColumn>Leave Approved By</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            {currentLeaves.length > 0 ? (
              currentLeaves.map((leave, index) => (
                <TableRow key={index}>
                  <TableCell>{leave.date}</TableCell>
                  <TableCell>{leave.leaveStart}</TableCell>
                  <TableCell>{leave.noOfDays}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{leave.approvedBy || "Pending"}</TableCell>
                  <TableCell>
                    <Chip
                      variant="bordered"
                      classNames={{
                        base:
                          leave.status === "Approved"
                            ? "border-green-400"
                            : "border-yellow-400",
                        content:
                          leave.status === "Approved"
                            ? "text-green-600"
                            : "text-yellow-600",
                      }}
                    >
                      {leave.status}
                    </Chip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Centered at Bottom */}
        <div className="flex justify-center mt-4">
          <Pagination
            showControls
            initialPage={1}
            total={Math.ceil(filteredLeaves.length / itemsPerPage)}
            onChange={paginate}
          />
        </div>
      </div>

      {/* Success Message */}
      {isRequestSuccessful && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-lg shadow-lg">
          <p>Leave request submitted successfully!</p>
        </div>
      )}

      {/* Leave Request Modal */}
      <LeaveRequestModal isOpen={isLeaveModalOpen} onOpenChange={onOpenLeaveModalChange} onSubmit={handleLeaveRequestSubmit} />
    </div>
  );
};
// Sample usage
const sampleEmployee = {
  takenLeaves: 8,
  totalLeaves: 20,
  leaveRecords: [
    {
      date: "2023-10-01",
      leaveStart: "2023-09-30",
      noOfDays: 2,
      reason: "Medical",
      approvedBy: "Manager A",
      status: "Approved",
    },
    {
      date: "2023-09-15",
      leaveStart: "2023-09-14",
      noOfDays: 1,
      reason: "Vacation",
      approvedBy: "Manager B",
      status: "Pending",
    },
    {
      date: "2023-08-05",
      leaveStart: "2023-08-04",
      noOfDays: 2,
      reason: "Family Emergency",
      approvedBy: "Manager C",
      status: "Approved",
    },
    {
      date: "2023-07-20",
      leaveStart: "2023-07-19",
      noOfDays: 2,
      reason: "Sick",
      approvedBy: "Manager D",
      status: "Approved",
    },
    {
      date: "2023-06-18",
      leaveStart: "2023-06-17",
      noOfDays: 1,
      reason: "Personal",
      approvedBy: "Manager E",
      status: "Approved",
    },
    {
      date: "2023-05-01",
      leaveStart: "2023-04-30",
      noOfDays: 3,
      reason: "Holiday",
      approvedBy: "Manager F",
      status: "Pending",
    },
  ],
};

export default function App() {
  return <LeaveProfile employee={sampleEmployee} />;
}
