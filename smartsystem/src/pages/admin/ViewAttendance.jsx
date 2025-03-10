import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Badge, Select, SelectItem, Image, Button, useDisclosure } from "@heroui/react";
import { useAttendance } from './useAttendance';
import { useEditAttendanceDetailsMutation } from '../../redux/api/attendanceApiSlice';
import { useGetEmployeesQuery } from '../../redux/api/employeeApiSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AttendanceDropzone from './AttendanceDropzone';
import HolidayDropzone from './HolidayDropzone';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import AttendanceEditModal from './AttendanceEditModal';
import image1 from "../../assets/images/background1.png";

const AttendanceView = () => {
  const { userId: initialUserId, month: initialMonth } = useParams();
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState("table");
  const [selectedDropzone, setSelectedDropzone] = useState("attendance");
  const [selectedEmployee, setSelectedEmployee] = useState(initialUserId || "");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    if (initialMonth) {
      const [year, monthNum] = initialMonth.split('-');
      return new Date(parseInt(year), parseInt(monthNum) - 1, 1);
    }
    return new Date();
  });
  
  // Edit modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  const employeesQuery = useGetEmployeesQuery();
  const employees = employeesQuery.data || [];
  
  const { 
    data: attendanceData = [], 
    isLoading, 
    isError,
    error,
    isFetching,
    refetch
  } = useAttendance(selectedEmployee, formatMonthYear(selectedMonth));

  const [editAttendance, editAttendanceMutation] = useEditAttendanceDetailsMutation();

  // Update URL when selection changes
  useEffect(() => {
    if (selectedEmployee && selectedMonth) {
      const formattedMonth = formatMonthYear(selectedMonth);
      navigate(`/viewattendance/${selectedEmployee}/${formattedMonth}`, { replace: true });
    }
  }, [selectedEmployee, selectedMonth, navigate]);

  // Format month to YYYY-MM format for API
  function formatMonthYear(date) {
    if (!date) return "";
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}`;
  };

  // Format the month parameter for display
  const formatDisplayMonth = () => {
    try {
      return format(selectedMonth, 'MMMM yyyy');
    } catch (error) {
      return formatMonthYear(selectedMonth) || 'Current Period';
    }
  };

  const handleEditRecord = (record) => {
    setSelectedRecord(record);
    onOpen();
  };

  const handleSaveRecord = async (formData) => {
    try {
      await editAttendance(formData);
      onClose();
      refetch();
    } catch (error) {
      console.error("Failed to update attendance record:", error);
    }
  };

  const getStatusColor = (isLeave) => {
    if (isLeave) return 'danger';
    return 'success';
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    // Handle time in HH:mm:ss format
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const breadcrumbItems = [
    { label: 'Attendance Menu', href: '/attendance' },
    { label: `Attendance View - ${formatDisplayMonth()}`, href: `/viewattendance/${selectedEmployee}/${formatMonthYear(selectedMonth)}`, isCurrentPage: true }
  ];

  const renderDropzoneSection = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Upload Files</h2>
          <Select 
            label="Select Upload Type"
            selectedKeys={[selectedDropzone]}
            onChange={(e) => setSelectedDropzone(e.target.value)}
            className="w-48"
          >
            <SelectItem key="attendance" value="attendance">
              Attendance Sheet
            </SelectItem>
            <SelectItem key="holiday" value="holiday">
              Holiday Sheet
            </SelectItem>
          </Select>
        </div>
        {selectedDropzone === "attendance" ? (
          <AttendanceDropzone onSuccess={refetch} />
        ) : (
          <HolidayDropzone onSuccess={refetch} />
        )}
      </div>
    );
  };

  const renderSelectorSection = () => {
    return (
      <div className="flex flex-wrap gap-4 mb-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Employee
          </label>
          <select
            value={selectedEmployee || ""}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full border rounded-md p-2 bg-white"
          >
            <option value="" disabled>Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.userId} value={employee.userId}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Month
          </label>
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="yyyy/MM"
            showMonthYearPicker
            className="w-full border rounded-md p-2 bg-white"
          />
        </div>

        <div className="flex items-end">
          <Button 
            color="primary" 
            variant="flat" 
            onPress={() => refetch()}
            disabled={!selectedEmployee || !selectedMonth}
            className="h-10"
          >
            Refresh Data
          </Button>
        </div>
      </div>
    );
  };

  const renderTableSection = () => {
    if (isError) {
      return (
        <div className="text-center text-red-500 p-4">
          Error: {error?.message || 'Failed to fetch attendance records'}
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Attendance Records</h2>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <Badge content="Present" color="success" variant="flat" />
              <Badge content="Leave" color="danger" variant="flat" />
            </div>
            <Select 
              label="View"
              selectedKeys={[selectedView]}
              onChange={(e) => setSelectedView(e.target.value)}
              className="w-32"
            >
              <SelectItem key="table" value="table">Table</SelectItem>
              <SelectItem key="upload" value="upload">Upload</SelectItem>
            </Select>
          </div>
        </div>

        <div className="overflow-auto">
          <Table 
            aria-label="Attendance records table"
            className="min-w-full"
            isStriped
          >
            <TableHeader>
              <TableColumn>Date</TableColumn>
              <TableColumn>In Time</TableColumn>
              <TableColumn>Out Time</TableColumn>
              <TableColumn>Time Period</TableColumn>
              <TableColumn>Standard Hours</TableColumn>
              <TableColumn>OT Hours</TableColumn>
              <TableColumn>Extra Hours</TableColumn>
              <TableColumn>Short Hours</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record._id}>
                  <TableCell>
                    {format(new Date(record.Date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{formatTime(record.In)}</TableCell>
                  <TableCell>{formatTime(record.Out)}</TableCell>
                  <TableCell>{formatTime(record.TimePeriod)}</TableCell>
                  <TableCell>{formatTime(record.stdHours)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>Single: {formatTime(record.singleOt)}</div>
                      <div>Double: {formatTime(record.doubleOt)}</div>
                      <div>Poya: {formatTime(record.poyaOt)}</div>
                    </div>
                  </TableCell>
                  <TableCell>{formatTime(record.extraWorkingHrs)}</TableCell>
                  <TableCell>{formatTime(record.shortWorkingHrs)}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="flat"
                      onClick={() => handleEditRecord(record)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <div className="text-center">Loading attendance records...</div>
          </div>
        )}

        {!isLoading && attendanceData.length === 0 && (
          <div className="flex justify-center items-center h-40">
            <div className="text-center text-gray-500">
              No attendance records found for this period
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="relative min-h-screen p-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image
          src={image1}
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Breadcrumb with better positioning */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-20">
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex flex-col">
            {/* Employee & Month Selection Section - Always visible */}
            {renderSelectorSection()}
            
            {/* View Toggle Content */}
            {selectedView === "table" ? renderTableSection() : renderDropzoneSection()}
          </div>
        </div>
      </div>

      {/* Edit Attendance Modal */}
      <AttendanceEditModal 
        isOpen={isOpen}
        onClose={onClose}
        record={selectedRecord}
        onSave={handleSaveRecord}
        isLoading={editAttendanceMutation.isLoading}
      />
    </div>
  );
};

export default AttendanceView;