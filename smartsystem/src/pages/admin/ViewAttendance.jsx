import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table } from '@nextui-org/react';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useGetAttendanceDetailsQuery } from '../../redux/api/attendanceApiSlice';

const ViewAttendance = () => {
  const navigate = useNavigate();
  const userId = 'exampleUserId'; // Replace with actual user ID
  const month = '2023-10'; // Replace with actual month, if needed

  // Query attendance records
  const { data: attendanceRecords = [], isLoading } = useGetAttendanceDetailsQuery({ userId, month });
  const [editableRecordId, setEditableRecordId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEditClick = (record) => {
    setEditableRecordId(record._id);
    setEditedData(record);
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  const breadcrumbItems = [
    { label: 'Attendance Menu', href: '/attendance' },
    { label: 'View Attendance', href: '/viewattendance', isCurrentPage: true },
  ];

  if (isLoading) return <p>Loading attendance records...</p>;

  return (
    <div className="p-4 space-y-6">
      <GeneralBreadCrumb items={breadcrumbItems} />

      <div className="flex justify-between items-center">
        <div className='h2'>View Attendance</div>
        <Button onClick={() => navigate('/attendance')} color="primary" variant="flat">
          Back to Attendance
        </Button>
      </div>

      <Table aria-label="Attendance Table" shadow={false} bordered={true}>
        <Table.Header>
          <Table.Column>Date</Table.Column>
          <Table.Column>In Time</Table.Column>
          <Table.Column>Out Time</Table.Column>
          <Table.Column>Time Period</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Actions</Table.Column>
        </Table.Header>
        <Table.Body>
          {attendanceRecords.map((record) => (
            <Table.Row key={record._id}>
              <Table.Cell>
                {editableRecordId === record._id ? (
                  <input
                    type="date"
                    value={editedData.Date}
                    onChange={(e) => handleInputChange(e, 'Date')}
                  />
                ) : (
                  record.Date
                )}
              </Table.Cell>
              <Table.Cell>
                {editableRecordId === record._id ? (
                  <input
                    type="text"
                    value={editedData.In}
                    onChange={(e) => handleInputChange(e, 'In')}
                  />
                ) : (
                  record.In
                )}
              </Table.Cell>
              <Table.Cell>
                {editableRecordId === record._id ? (
                  <input
                    type="text"
                    value={editedData.Out}
                    onChange={(e) => handleInputChange(e, 'Out')}
                  />
                ) : (
                  record.Out
                )}
              </Table.Cell>
              <Table.Cell>{record.TimePeriod}</Table.Cell>
              <Table.Cell>{record.isLeave ? 'Leave' : 'Present'}</Table.Cell>
              <Table.Cell>
                {editableRecordId === record._id ? (
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => setEditableRecordId(null)}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    color="primary"
                    onClick={() => handleEditClick(record)}
                  >
                    Edit
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ViewAttendance;
