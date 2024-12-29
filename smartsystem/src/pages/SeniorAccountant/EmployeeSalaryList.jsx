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
import { columns, users } from "../super_admin/datanew";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["userName", "userRole", "userStatus", "userCompany", "userActions"];

const RoleList = () => {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState(new Set(["all"]));
  const [companyFilter, setCompanyFilter] = React.useState(new Set(["all"]));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "userAge",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const handleNewClick = () => navigate("/roleregister");

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.userName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter.size && !statusFilter.has("all")) {
      filteredUsers = filteredUsers.filter((user) =>
        statusFilter.has(user.userStatus)
      );
    }
    if (companyFilter.size && !companyFilter.has("all")) {
      filteredUsers = filteredUsers.filter((user) =>
        companyFilter.has(user.userCompany)
      );
    }
    return filteredUsers;
  }, [users, filterValue, statusFilter, companyFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = (user, columnKey) => {
    switch (columnKey) {
      case "userName":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={user.userName}
          />
        );
      case "userRole":
        return (
          <div>
            <p className="capitalize">{user.userRole}</p>
            <p className="text-tiny capitalize text-default-400">{user.team}</p>
          </div>
        );
      case "userStatus":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.userStatus]}
            size="sm"
            variant="flat"
          >
            {user.userStatus}
          </Chip>
        );
      case "userActions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <BsThreeDotsVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem startContent={<GrView />} href="/employeeview">
                View
              </DropdownItem>
              <DropdownItem startContent={<CiEdit />} href="/employeeedit">
                Edit
              </DropdownItem>
              <DropdownItem startContent={<RiDeleteBin6Line />} color="danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return user[columnKey];
    }
  };

  return (
    <Table
      aria-label="User roles table"
      sortDescriptor={sortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.uid} allowsSorting={column.sortable}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RoleList;
