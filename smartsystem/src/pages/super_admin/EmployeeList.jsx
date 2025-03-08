import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@heroui/react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from "../../redux/api/employeeApiSlice"; // Import your employee API slice hook
import toast from "react-hot-toast";

export default function EmployeeList() {
  const { data: employees, error, isLoading } = useGetEmployeesQuery(); // Fetch employees data
  const [deleteEmployee] = useDeleteEmployeeMutation(); // Delete employee mutation
  const navigate = useNavigate();

  const handleEditClick = (employeeId) => {
    navigate(`/employeeedit/${employeeId}`);
  };

  const handleViewClick = (employeeId) => {
    navigate(`/employeeview/${employeeId}`);
  };

  const handleDeleteClick = (employeeId) => {
    try {
      deleteEmployee(employeeId);
      toast.success("Employee deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(err?.data?.message || "Failed to delete employee");
    }
  };

  const renderCell = React.useCallback((employee, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{employee.name}</p>
          </div>
        );
      case "email":
        return <p className="text-sm">{employee.email}</p>;
      case "post":
        return <p className="text-sm">{employee.post}</p>;
      case "status":
        return <p className={`text-sm ${employee.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{employee.status}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <GrView onClick={() => handleViewClick(employee._id)} />
              </span>
            </Tooltip>
            <Tooltip content="Edit employee">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit onClick={() => handleEditClick(employee._id)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete employee">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RiDeleteBin6Line onClick={() => handleDeleteClick(employee._id)} />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return employee[columnKey];
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;

  return (
    <Table aria-label="Employee list">
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="email">Email</TableColumn>
        <TableColumn key="post">Post</TableColumn>
        <TableColumn key="status">Status</TableColumn>
        <TableColumn key="actions" align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody items={employees}>
        {(employee) => (
          <TableRow key={employee._id}>
            {(columnKey) => <TableCell>{renderCell(employee, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
