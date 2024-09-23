import React from 'react'
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
  import { BsThreeDotsVertical } from "react-icons/bs";
  import { CiSearch } from "react-icons/ci";
  import { FaChevronDown } from "react-icons/fa6";
  import { GrView } from "react-icons/gr";
  import { IoAdd } from "react-icons/io5";
  import { columns, users } from "./task";
  import { capitalize } from "./utils";
  import PaginationComponent from "../../components/Pagination";
  import { useNavigate } from "react-router-dom";

  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  
  const INITIAL_VISIBLE_COLUMNS = ["name", "role", "task", "status", "actions"];

const TasksList = () => {
    const navigate = useNavigate();
    const loggedInSupervisorId = 1; // Replace with logic to get logged supervisor's ID

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState(new Set(["all"]));
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(1);
  
    const hasSearchFilter = Boolean(filterValue);

    const handleNewClick = () => {
        navigate("/newtask");
    }
  
    const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    // Filter users who are assigned to the logged-in supervisor
    const superviseeUsers = React.useMemo(() => {
      return users.filter(user => user.supervisorId === loggedInSupervisorId);
    }, [loggedInSupervisorId]);
  
    const filteredItems = React.useMemo(() => {
      let filteredUsers = [...superviseeUsers];
      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (statusFilter.size && !statusFilter.has("all")) {
        filteredUsers = filteredUsers.filter((user) =>
          statusFilter.has(user.status)
        );
      }
      return filteredUsers;
    }, [superviseeUsers, filterValue, statusFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const renderCell = React.useCallback((user, columnKey) => {
      const cellValue = user[columnKey];
      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: user.avatar }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "task":
          return user.tasks?.length > 0 ? (
            <ul>
              {user.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          ) : (
            <p>No tasks assigned</p>
          );
        case "status":
          return (
            <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
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
                  <DropdownItem startContent={<GrView />} href="/employeeview">View Task</DropdownItem>
                  <DropdownItem startContent={<GrView />} href="/employeeview">Edit Task</DropdownItem>
                  <DropdownItem startContent={<GrView />} href="/employeeview">Delete Task</DropdownItem>
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
              placeholder="Search by name..."
              startContent={<CiSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex">
                  <Button endContent={<FaChevronDown className="text-small" />} variant="flat">
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Status Filter"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {["all", "active", "paused", "vacation"].map((status) => (
                    <DropdownItem key={status} className="capitalize">
                      {capitalize(status)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
              <Button color="primary" variant="flat" onClick={handleNewClick} endContent={<IoAdd />}>
              Add Task
            </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-default-400 text-small">Total {superviseeUsers.length} Supervisees</span>
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
      statusFilter,
      visibleColumns,
      onRowsPerPageChange,
      superviseeUsers.length,
      onSearchChange,
      hasSearchFilter,
    ]);

  return (
    <Table
      aria-label="Supervisee tasks table"
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
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
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
      <TableBody emptyContent={"No Supervisees found"} items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TasksList
