import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, Chip } from '@nextui-org/react';

const leaveStatusColorMap = {
  approved: 'success',
  rejected: 'danger',
  pending: 'warning',
};

const LeaveStatus = ({ leaveRequests }) => {
  return (
    <Table
      aria-label="Employee Leave Status"
      className="max-h-[382px]"
      selectionMode="none"
    >
      <TableHeader>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Reason</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.date}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                <Chip color={leaveStatusColorMap[leave.status]}>{leave.status}</Chip>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No leave requests found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LeaveStatus;
