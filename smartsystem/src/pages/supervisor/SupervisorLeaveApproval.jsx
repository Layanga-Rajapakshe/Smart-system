import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell, Button, Chip } from "@heroui/react";

const SupervisorLeaveApproval = ({ leaveRequests, handleApprove, handleReject }) => {
  return (
    <Table
      aria-label="Supervisee Leave Approval"
      className="max-h-[382px]"
      selectionMode="none"
    >
      <TableHeader>
        <TableRow>
          <TableCell>Employee</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Reason</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaveRequests.length > 0 ? (
          leaveRequests.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.employeeName}</TableCell>
              <TableCell>{leave.date}</TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                <Chip color={leave.status === 'pending' ? 'warning' : leave.status === 'approved' ? 'success' : 'danger'}>
                  {leave.status}
                </Chip>
              </TableCell>
              <TableCell>
                {leave.status === 'pending' && (
                  <>
                    <Button size="sm" color="success" onClick={() => handleApprove(leave.id)}>
                      Approve
                    </Button>
                    <Button size="sm" color="danger" onClick={() => handleReject(leave.id)}>
                      Reject
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>No leave requests found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SupervisorLeaveApproval;
