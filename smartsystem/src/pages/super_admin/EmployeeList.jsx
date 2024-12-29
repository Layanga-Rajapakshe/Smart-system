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
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
} from "@nextui-org/react";
import { IoAdd } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { capitalize } from "./utils";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useGetEmployeesQuery } from "../../redux/api/employeeApiSlice";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "company", "actions"];

export default function Employeelist() {
  const navigate = useNavigate();
  const { data: employees, isLoading, error } = useGetEmployeesQuery();

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState(new Set(["all"]));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const handleNewClick = () => {
    navigate("/employeeregister");
  };

  const handleViewClick = (id) => {
    navigate(`/employeeview/${id}`);
  };

  const handleUpdateClick = (id) => {
    navigate(`/employeeupdate/${id}`);
  };

  const hasSearchFilter = Boolean(filterValue);

  const filteredEmployees = React.useMemo(() => {
    if (isLoading || error || !employees) return [];
    let filtered = employees;

    if (hasSearchFilter) {
      filtered = filtered.filter((emp) =>
        emp.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter.size && !statusFilter.has("all")) {
      filtered = filtered.filter((emp) => statusFilter.has(emp.status));
    }
    return filtered;
  }, [employees, filterValue, statusFilter, isLoading, error]);

  const pages = Math.ceil(filteredEmployees.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredEmployees.slice(start, end);
  }, [page, filteredEmployees, rowsPerPage]);

  const renderCell = React.useCallback((employee, columnKey) => {
    const cellValue = employee[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: employee.avatar }}
            description={employee.email}
            name={cellValue}
          >
            {employee.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{employee.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[employee.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <BsThreeDotsVertical className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem startContent={<GrView />} onClick={() => handleViewClick(employee.id)}>
                  View
                </DropdownItem>
                <DropdownItem startContent={<CiEdit />} onClick={() => handleUpdateClick(employee.id)}>
                  Edit
                </DropdownItem>
                <DropdownItem startContent={<RiDeleteBin6Line />} color="danger">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  if (isLoading) return <p>Loading employees...</p>;
  if (error) return (
    <div>
      <p>Error loading employees: {error.message}</p>
      <Button onClick={handleNewClick} endContent={<IoAdd />}>
            Add Employee
      </Button>
    </div>
  )

  return (
    <Table
      aria-label="Employee List"
      isHeaderSticky
      bottomContent={
        <PaginationComponent
          page={page}
          pages={pages}
          onPageChange={setPage}
        />
      }
      topContent={
        <div className="flex justify-between">
          <Input
            placeholder="Search by name..."
            startContent={<CiSearch />}
            value={filterValue}
            onValueChange={(value) => setFilterValue(value)}
          />
          <Button onClick={handleNewClick} endContent={<IoAdd />}>
            Add Employee
          </Button>
        </div>
      }
    >
      <TableHeader columns={INITIAL_VISIBLE_COLUMNS}>
        {(column) => (
          <TableColumn key={column} allowsSorting>
            {capitalize(column)}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
