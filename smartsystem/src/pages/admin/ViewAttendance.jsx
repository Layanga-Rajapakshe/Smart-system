import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Card, Badge, Select, SelectItem } from "@nextui-org/react";
import { useGetAttendanceDetailsQuery } from '../../redux/api/attendanceApiSlice';
import AttendanceDropzone from './AttendanceDropzone';
import HolidayDropzone from './HolidayDropzone';

const AttendanceView = () => {
  const { userId, month } = useParams();
  const [selectedView, setSelectedView] = useState("table");
  const [selectedDropzone, setSelectedDropzone] = useState("attendance");
  
  const { 
    data: attendanceData = [], 
    isLoading, 
    isError,
    error,
    refetch
  } = useGetAttendanceDetailsQuery({ userId, month });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
        return 'success';
      case 'absent':
        return 'danger';
      case 'half-day':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    return format(new Date(timeString), 'hh:mm a');
  };

  const renderDropzoneSection = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Upload Files</h2>
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

  const renderTableSection = () => {
    if (isError) {
      return (
        <div className="text-center text-red-500 p-4">
          Error: {error?.data?.message || 'Failed to fetch attendance records'}
        </div>
      );
    }

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Attendance Records</h2>
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <Badge content="Present" color="success" />
              <Badge content="Absent" color="danger" />
              <Badge content="Half-day" color="warning" />
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

        <Table 
          aria-label="Attendance records table"
          className="min-w-full"
          isStriped
        >
          <TableHeader>
            <TableColumn>Date</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Check In</TableColumn>
            <TableColumn>Check Out</TableColumn>
            <TableColumn>Work Hours</TableColumn>
            <TableColumn>Notes</TableColumn>
          </TableHeader>
          <TableBody>
            {attendanceData.map((record) => (
              <TableRow key={record._id}>
                <TableCell>
                  {format(new Date(record.Date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <Badge color={getStatusColor(record.Status)} variant="flat">
                    {record.Status}
                  </Badge>
                </TableCell>
                <TableCell>{formatTime(record.CheckIn)}</TableCell>
                <TableCell>{formatTime(record.CheckOut)}</TableCell>
                <TableCell>
                  {record.WorkHours ? `${record.WorkHours.toFixed(2)} hrs` : '-'}
                </TableCell>
                <TableCell>{record.Notes || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
    <Card className="p-6">
      {selectedView === "table" ? renderTableSection() : renderDropzoneSection()}
    </Card>
  );
};

export default AttendanceView;