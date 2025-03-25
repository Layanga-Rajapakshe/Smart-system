import React, { useState, useEffect } from "react";
import {
  CircularProgress, Badge, Button, Table, TableHeader, TableColumn, TableBody,
  TableRow, TableCell, Pagination, Select, SelectItem, Drawer, DrawerContent,
  DrawerHeader, DrawerBody, DrawerFooter, useDisclosure, Calendar, Link,
  Card, CardBody, CardHeader, Tabs, Tab, Progress, Tooltip,
  Divider, Avatar
} from "@heroui/react";
import { Calendar as CalendarIcon, FileText, Clock, AlertCircle, CheckCircle, User, Briefcase, ArrowRight } from "lucide-react";
import { Link as RouterLink } from "react-router-dom"; // Assuming you use React Router
import LeaveRequestModal from "../../components/Leave/LeaveRequestModal"; // Make sure path is correct

const LeaveProfile = ({ employee }) => {
  // Destructure employee data with default values for safety
  const {
    name = "Employee",
    department = "Department",
    position = "Position",
    joinDate = "Unknown",
    takenLeaves = 0,
    totalLeaves = 20,
    leaveRecords = [],
    avatar = null
  } = employee || {};

  const [selectedTab, setSelectedTab] = useState("overview");
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const [upcomingLeaves, setUpcomingLeaves] = useState([]);

  // Drawer and modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isLeaveModalOpen,
    onOpen: onOpenLeaveModal,
    onOpenChange: onOpenLeaveModalChange
  } = useDisclosure();

  // Calculated values
  const leavePercentage = Math.round((takenLeaves / totalLeaves) * 100);
  const remainingLeaves = totalLeaves - takenLeaves;

  useEffect(() => {
    // Filter upcoming leaves (leaves with future dates)
    const today = new Date();
    const upcoming = leaveRecords
      .filter(leave => new Date(leave.leaveStart) > today)
      .sort((a, b) => new Date(a.leaveStart) - new Date(b.leaveStart))
      .slice(0, 3); // Get only the next 3 upcoming leaves

    setUpcomingLeaves(upcoming);
  }, [leaveRecords]);

  const handleLeaveRequestSubmit = (leaveData) => {
    console.log("Leave request submitted:", leaveData);
    setIsRequestSuccessful(true);
    setTimeout(() => setIsRequestSuccessful(false), 3000);
  };

  // Calculate leave statistics by type
  const leavesByType = leaveRecords.reduce((acc, leave) => {
    acc[leave.reason] = (acc[leave.reason] || 0) + leave.noOfDays;
    return acc;
  }, {});

  // Get approved leaves for approved leaves view
  const approvedLeaves = leaveRecords.filter(leave => leave.status === "Approved");

  return (
    <div className="flex flex-col items-center bg-gray-50 p-6 space-y-6 min-h-screen">
      {/* Employee Header Card */}
      <Card className="w-full max-w-5xl shadow-md">
        <CardBody className="p-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <Avatar
                src={avatar || "https://i.pravatar.cc/150"}
                size="lg"
                className="border-2 border-indigo-200"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="flex items-center"><Briefcase size={16} className="mr-1" />{position}</span>
                  <span className="flex items-center"><User size={16} className="mr-1" />{department}</span>
                  <span className="flex items-center"><Clock size={16} className="mr-1" />Joined: {joinDate}</span>
                </div>
              </div>
            </div>
            <div className="ml-auto pl-4">
              <Button
                color="primary"
                size="lg"
                startContent={<CalendarIcon />}
                onClick={onOpenLeaveModal}
                className="font-semibold"
              >
                Request Leave
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Tabs Navigation */}
      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        className="w-full max-w-5xl"
        variant="underlined"
        size="lg"
      >
        <Tab key="overview" title="Overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl my-4">
            {/* Leave Summary Card */}
            <Card className="shadow-md col-span-1">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-800">Leave Balance</h2>
                <p className="text-sm text-gray-500">Current financial year</p>
              </CardHeader>
              <CardBody className="py-4 flex flex-col items-center">
                <CircularProgress
                  value={leavePercentage}
                  strokeWidth={5}
                  showValueLabel={true}
                  classNames={{
                    svg: "w-40 h-40",
                    indicator: "stroke-indigo-500",
                    track: "stroke-gray-200",
                    value: "text-3xl font-bold text-gray-800",
                  }}
                />
                <div className="flex flex-col items-center mt-4 w-full">
                  <div className="flex justify-between w-full px-4 py-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Total Leaves</span>
                    <span className="font-semibold">{totalLeaves} days</span>
                  </div>
                  <div className="flex justify-between w-full px-4 py-2">
                    <span className="text-gray-700">Taken</span>
                    <span className="font-semibold text-blue-600">{takenLeaves} days</span>
                  </div>
                  <div className="flex justify-between w-full px-4 py-2 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Remaining</span>
                    <span className="font-semibold text-green-600">{remainingLeaves} days</span>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Calendar Card */}
            <Card className="shadow-md col-span-1">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-800">Calendar</h2>
                <p className="text-sm text-gray-500">Plan your time off</p>
              </CardHeader>
              <CardBody className="py-4 flex justify-center">
                <Calendar
                  showMonthAndYearPickers
                  aria-label="Leave Calendar"
                  className="border-none"
                />
              </CardBody>
            </Card>

            {/* Upcoming Leaves Card */}
            <Card className="shadow-md col-span-1">
              <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Leaves</h2>
                <p className="text-sm text-gray-500">Next scheduled time off</p>
              </CardHeader>
              <CardBody className="py-4">
                {upcomingLeaves.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingLeaves.map((leave, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CalendarIcon size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{leave.reason}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(leave.leaveStart).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })} - {leave.noOfDays > 1 ?
                              `${leave.noOfDays} days` :
                              '1 day'}
                          </p>
                          <Badge color={leave.status === "Approved" ? "success" : "warning"}>
                            {leave.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                    <CalendarIcon size={40} className="mb-2 opacity-40" />
                    <p>No upcoming leaves</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Leave Statistics Card */}
          <Card className="w-full max-w-5xl shadow-md my-6">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h2 className="text-xl font-semibold text-gray-800">Leave Distribution</h2>
              <p className="text-sm text-gray-500">Breakdown by type</p>
            </CardHeader>
            <CardBody className="py-4">
              <div className="space-y-4">
                {Object.entries(leavesByType).map(([type, days], idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{type}</span>
                      <span className="text-gray-700 font-medium">{days} days</span>
                    </div>
                    <Progress
                      value={(days / takenLeaves) * 100}
                      color={
                        type === "Medical" ? "danger" :
                          type === "Vacation" ? "success" :
                            type === "Family Emergency" ? "warning" :
                              "primary"
                      }
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Quick Access Buttons */}
          <div className="flex flex-wrap gap-4 justify-center w-full max-w-5xl my-4">
            <Button variant="bordered" color="primary" startContent={<FileText />} onClick={onOpen}>
              Leave Policies
            </Button>
            <Button variant="bordered" color="secondary" startContent={<Clock />} onClick={() => setSelectedTab("calendar")}>
              View Time-off Calendar
            </Button>
            <Button variant="bordered" color="success" startContent={<CheckCircle />} onClick={() => setSelectedTab("approved")}>
              View Approved Leaves
            </Button>
            {/* New button to go to Leave History page */}
            <RouterLink to="/leavehistory">
              <Button variant="bordered" color="warning" endContent={<ArrowRight />}>
                Full Leave History
              </Button>
            </RouterLink>
          </div>
        </Tab>

        {/* Remove the non-working history tab and replace with a link to the separate page */}

        {/* New Tab for Time-off Calendar */}
        <Tab key="calendar" title="Time-off Calendar">
          <Card className="w-full max-w-5xl shadow-md my-6">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h2 className="text-xl font-semibold text-gray-800">Team Time-off Calendar</h2>
              <p className="text-sm text-gray-500">Plan around team availability</p>
            </CardHeader>
            <CardBody className="py-4">
              <div className="mb-4">
                <Select label="Calendar View" className="w-40">
                  <SelectItem key="month" value="month">Month</SelectItem>
                  <SelectItem key="week" value="week">Week</SelectItem>
                  <SelectItem key="day" value="day">Day</SelectItem>
                </Select>
              </div>
              <Calendar
                showMonthAndYearPickers
                aria-label="Time-off Calendar"
                className="border-none w-full"
                highlightToday
                size="lg"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge color="success" variant="flat" className="p-2">Annual Leave</Badge>
                <Badge color="danger" variant="flat" className="p-2">Sick Leave</Badge>
                <Badge color="warning" variant="flat" className="p-2">Family Emergency</Badge>
                <Badge color="primary" variant="flat" className="p-2">Other</Badge>
              </div>
            </CardBody>
          </Card>
        </Tab>

        {/* New Tab for Approved Leaves */}
        <Tab key="approved" title="Approved Leaves">
          <Card className="w-full max-w-5xl shadow-md my-6">
            <CardHeader className="pb-0 pt-4 px-4 flex-col items-start">
              <h2 className="text-xl font-semibold text-gray-800">Approved Leave Requests</h2>
              <p className="text-sm text-gray-500">All your approved time off</p>
            </CardHeader>
            <CardBody className="py-4">
              <Table aria-label="Approved leaves table">
                <TableHeader>
                  <TableColumn>Approval Date</TableColumn>
                  <TableColumn>Leave Period</TableColumn>
                  <TableColumn>Duration</TableColumn>
                  <TableColumn>Type</TableColumn>
                  <TableColumn>Approver</TableColumn>
                </TableHeader>
                <TableBody>
                  {approvedLeaves.length > 0 ? (
                    approvedLeaves.map((leave, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell>{formatDate(leave.date)}</TableCell>
                        <TableCell>
                          {formatDate(leave.leaveStart)}
                          {leave.noOfDays > 1 && ` - ${formatDate(getEndDate(leave.leaveStart, leave.noOfDays))}`}
                        </TableCell>
                        <TableCell>{leave.noOfDays} day{leave.noOfDays > 1 ? 's' : ''}</TableCell>
                        <TableCell>{leave.reason}</TableCell>
                        <TableCell>{leave.approvedBy || "Manager"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <div className="flex flex-col items-center text-gray-500">
                          <AlertCircle size={32} className="mb-2" />
                          <p>No approved leaves found.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Added link to full leave history */}
              <div className="mt-6 text-center">
                <RouterLink to="/leavehistory">
                  <Button color="primary" endContent={<ArrowRight />}>
                    View Full Leave History
                  </Button>
                </RouterLink>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {/* Drawer for Leave Policies */}
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="border-b">
                <h3 className="text-xl font-semibold text-gray-800">Company Leave Policies</h3>
                <p className="text-sm text-gray-500">Updated January 2025</p>
              </DrawerHeader>
              <DrawerBody className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Annual Leave Entitlement</h4>
                    <p className="text-gray-700 mb-2">
                      Each employee is entitled to 20 days of paid annual leave per calendar year. Leave accrues
                      at a rate of 1.67 days per month of service.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>New employees must complete their probation period before taking annual leave</li>
                      <li>A maximum of 5 days can be carried forward to the next year</li>
                      <li>Leaves must be requested at least 7 days in advance</li>
                    </ul>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Sick Leave</h4>
                    <p className="text-gray-700 mb-2">
                      Employees are entitled to 10 days of paid sick leave annually.
                    </p>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Medical certificate is required for absences exceeding 2 consecutive days</li>
                      <li>Notify your manager as soon as possible when taking sick leave</li>
                      <li>Extended medical leave may be granted for serious health conditions</li>
                    </ul>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Special Leave Categories</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-800">Bereavement Leave</h5>
                        <p className="text-gray-700">Up to 5 days for immediate family members</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Marriage Leave</h5>
                        <p className="text-gray-700">5 consecutive working days</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Maternity Leave</h5>
                        <p className="text-gray-700">16 weeks as per statutory requirements</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">Paternity Leave</h5>
                        <p className="text-gray-700">2 weeks as per statutory requirements</p>
                      </div>
                    </div>
                  </div>

                  <Divider />

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Leave Approval Process</h4>
                    <ol className="list-decimal pl-5 text-gray-700 space-y-2">
                      <li>Submit leave request through the HR portal</li>
                      <li>Direct manager reviews and approves the request</li>
                      <li>HR department receives notification and updates records</li>
                      <li>Employee receives confirmation via email</li>
                    </ol>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="border-t">
                <Button variant="light" onPress={onClose}>Close</Button>
                <Button color="primary" onPress={onOpenLeaveModal}>Request Leave</Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Success Message */}
      {isRequestSuccessful && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-3 px-6 rounded-lg shadow-xl z-50 flex items-center">
          <CheckCircle className="mr-2" />
          <p>Leave request submitted successfully!</p>
        </div>
      )}

      {/* Leave Request Modal */}
      <LeaveRequestModal
        isOpen={isLeaveModalOpen}
        onOpenChange={onOpenLeaveModalChange}
        onSubmit={handleLeaveRequestSubmit}
        remainingLeaves={remainingLeaves}
      />
    </div>
  );
};

// Helper functions
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

// Sample employee data for demonstration
const sampleEmployee = {
  name: "Alex Johnson",
  department: "Engineering",
  position: "Senior Developer",
  joinDate: "Mar 15, 2020",
  avatar: null, // Will use placeholder
  takenLeaves: 8,
  totalLeaves: 20,
  leaveRecords: [
    {
      date: "2023-12-15",
      leaveStart: "2024-01-10",
      noOfDays: 2,
      reason: "Vacation",
      approvedBy: "Manager B",
      status: "Approved",
    },
    {
      date: "2023-10-01",
      leaveStart: "2023-10-15",
      noOfDays: 2,
      reason: "Medical",
      approvedBy: "Manager A",
      status: "Approved",
    },
    {
      date: "2023-09-15",
      leaveStart: "2023-09-20",
      noOfDays: 1,
      reason: "Vacation",
      approvedBy: "Manager B",
      status: "Pending",
    },
    {
      date: "2023-08-05",
      leaveStart: "2023-08-10",
      noOfDays: 2,
      reason: "Family Emergency",
      approvedBy: "Manager C",
      status: "Approved",
    },
    {
      date: "2023-07-20",
      leaveStart: "2023-07-25",
      noOfDays: 2,
      reason: "Sick",
      approvedBy: "Manager D",
      status: "Approved",
    },
    {
      date: "2023-06-18",
      leaveStart: "2023-06-20",
      noOfDays: 1,
      reason: "Personal",
      approvedBy: "Manager E",
      status: "Approved",
    },
    {
      date: "2023-05-01",
      leaveStart: "2023-05-05",
      noOfDays: 3,
      reason: "Holiday",
      approvedBy: "Manager F",
      status: "Approved",
    },
    {
      date: "2022-12-10",
      leaveStart: "2022-12-20",
      noOfDays: 5,
      reason: "Year-end Vacation",
      approvedBy: "Manager A",
      status: "Approved",
    },
  ],
};

export default function App() {
  return <LeaveProfile employee={sampleEmployee} />;
}