import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Tooltip,
  Chip,
  User,
} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import { CiSearch, CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useGetEmployeesQuery } from "../../redux/api/employeeApiSlice";
import PaginationComponent from "../../components/Pagination";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function EmployeeList() {
  const navigate = useNavigate();
  const { data: employees, isLoading, error } = useGetEmployeesQuery();
  
  const [filterValue, setFilterValue] = React.useState("");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const handleNewClick = () => navigate("/employeeregister");
  const handleViewClick = (id) => navigate(`/employeeview/${id}`);
  const handleEditClick = (id) => navigate(`/employeeupdate/${id}`);

  const filteredEmployees = React.useMemo(() => {
    if (!employees) return [];
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [employees, filterValue]);

  const pages = Math.ceil(filteredEmployees.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredEmployees.slice(start, end);
  }, [page, filteredEmployees]);

  const renderCell = React.useCallback((employee, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: employee.avatar }}
            description={employee.email}
            name={employee.name}
          />
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{employee.role}</p>
            <p className="text-bold text-xs capitalize text-default-400">{employee.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip 
            className="capitalize" 
            color={statusColorMap[employee.status]} 
            size="sm" 
            variant="flat"
          >
            {employee.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="View Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <GrView onClick={() => handleViewClick(employee.id)} />
              </span>
            </Tooltip>
            <Tooltip content="Edit Employee">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit onClick={() => handleEditClick(employee.id)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Employee">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RiDeleteBin6Line />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return employee[columnKey];
    }
  }, []);

  if (isLoading) return <div>Loading employees...</div>;
  if (error) return (
    <div>
      <p>Error loading employees: {error?.message || "Unknown error"}</p>
      <Button onClick={handleNewClick} endContent={<IoAdd />}>
        Add Employee
      </Button>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Input
          className="w-full max-w-xs"
          placeholder="Search by name..."
          startContent={<CiSearch />}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <Button onClick={handleNewClick} endContent={<IoAdd />}>
          Add Employee
        </Button>
      </div>

      <Table 
        aria-label="Employee List"
        bottomContent={
          <PaginationComponent
            page={page}
            pages={pages}
            onPageChange={setPage}
          />
        }
      >
        <TableHeader>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="role">Role</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="company">Company</TableColumn>
          <TableColumn key="actions" align="center">Actions</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}