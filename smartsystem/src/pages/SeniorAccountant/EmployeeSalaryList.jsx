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
  User,
} from "@heroui/react";
import { IoAdd } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { capitalize } from "../super_admin/utils";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

// Updated columns definition
const columns = [
  { name: "EMPLOYEE ID", uid: "employeeId", sortable: true },
  { name: "EMPLOYEE NAME", uid: "name", sortable: true },
  { name: "BASIC SALARY", uid: "basicSalary", sortable: true },
  { name: "RE ALLOWANCE", uid: "reAllowance", sortable: true },
  { name: "SINGLE OT", uid: "singleOt", sortable: true },
  { name: "DOUBLE OT", uid: "doubleOt", sortable: true },
  { name: "MEAL ALLOWANCE", uid: "mealAllowance", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

// Sample employee data
const employees = [
  {
    id: 1,
    employeeId: "EMP001",
    name: "John Doe",
    email: "john@example.com",
    basicSalary: 50000,
    reAllowance: 5000,
    singleOt: 30,
    doubleOt: 60,
    mealAllowance: 100,
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  // Add more employee data as needed
];

const INITIAL_VISIBLE_COLUMNS = ["employeeId", "name", "basicSalary", "reAllowance", "singleOt", "doubleOt", "mealAllowance", "actions"];

const EmployeeSalaryList = () => {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "employeeId",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredEmployees = [...employees];
    if (hasSearchFilter) {
      filteredEmployees = filteredEmployees.filter((employee) =>
        employee.employeeId.toLowerCase().includes(filterValue.toLowerCase()) ||
        employee.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredEmployees;
  }, [employees, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

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
      case "basicSalary":
      case "reAllowance":
        return `$${cellValue.toLocaleString()}`;
      case "singleOt":
      case "doubleOt":
        return `$${cellValue}/hr`;
      case "mealAllowance":
        return `$${cellValue}/day`;
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
                <DropdownItem startContent={<GrView/>} href="/viewsalary/1">View</DropdownItem>
                <DropdownItem startContent={<CiEdit/>} href="/editsalary/1">Edit</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by Employee ID or Name..."
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<FaChevronDown className="text-small" />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {employees.length} employees</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    employees.length,
    onSearchChange,
  ]);

  return (
    <Table
      aria-label="Employee Salary List"
      isHeaderSticky
      bottomContent={
        <PaginationComponent
          page={page}
          pages={pages}
          onPageChange={setPage}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          selectedKeys={selectedKeys}
          filteredItems={filteredItems}
        />
      }
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No employees found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default EmployeeSalaryList;