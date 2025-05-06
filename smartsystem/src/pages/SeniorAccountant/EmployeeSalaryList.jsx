import React, { useState, useEffect } from "react";
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
  Card,
  Image,
  CircularProgress
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
import { useGetSalaryParametersQuery, useUpdateSalaryParametersMutation } from "../../redux/api/salarymanagementApiSlice";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import image1 from "../../assets/images/background1.png";
import toast from "react-hot-toast";

// Updated columns definition
const columns = [
  { name: "EMPLOYEE ID", uid: "userId", sortable: true },
  { name: "EMPLOYEE NAME", uid: "name", sortable: true },
  { name: "POST", uid: "post", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "BASIC SALARY", uid: "agreed_basic", sortable: true },
  { name: "RE ALLOWANCE", uid: "re_allowance", sortable: true },
  { name: "SINGLE OT", uid: "single_ot", sortable: true },
  { name: "DOUBLE OT", uid: "double_ot", sortable: true },
  { name: "MEAL ALLOWANCE", uid: "meal_allowance", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["userId", "name", "post", "agreed_basic", "re_allowance", "single_ot", "double_ot", "meal_allowance"];

const EmployeeSalaryList = () => {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "userId",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  // Get user role from localStorage
  const userRole = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).role : null;
  
  // Use RTK Query hook to fetch salary parameters with the role from localStorage
  const { 
    data: salaryData, 
    isLoading: isLoadingSalaries, 
    isError, 
    error 
  } = useGetSalaryParametersQuery(userRole);
  
  // Update salary parameters mutation
  const [updateSalaryParameters, { isLoading: isUpdating }] = useUpdateSalaryParametersMutation();

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredEmployees = [];
    
    // Use data from the query if available
    if (salaryData?.salaryParameters) {
      filteredEmployees = [...salaryData.salaryParameters];
      
      if (hasSearchFilter) {
        filteredEmployees = filteredEmployees.filter((employee) =>
          employee.userId.toString().toLowerCase().includes(filterValue.toLowerCase()) ||
          employee.name.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    }
    
    return filteredEmployees;
  }, [salaryData, filterValue]);

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

  // Handle errors from the API
  useEffect(() => {
    if (isError) {
      toast.error(`Error fetching data: ${error?.data?.message || "Unknown error"}`);
    }
  }, [isError, error]);

  // Check if userRole exists on component mount
  useEffect(() => {
    if (!userRole) {
      toast.error("User role not found. Please log in again.");
      // Optionally redirect to login
      // navigate('/login');
    }
  }, [userRole]);

  // const handleEditSalary = (id) => {
  //   navigate(`/editsalary/${id}`);
  // };

  // const handleViewSalary = (id) => {
  //   navigate(`/viewsalary/${id}`);
  // };

  // const handleAddNew = () => {
  //   navigate("/addsalary");
  // };

  const renderCell = React.useCallback((employee, columnKey) => {
    const cellValue = employee[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: employee.avatar || "https://via.placeholder.com/40" }}
            description={employee.post}
            name={cellValue}
          >
            {employee.post}
          </User>
        );
      case "agreed_basic":
      case "re_allowance":
        return `$${cellValue.toLocaleString()}`;
      case "single_ot":
      case "double_ot":
        return `$${cellValue}/hr`;
      case "meal_allowance":
        return `$${cellValue}/day`;
      // case "actions":
      //   return (
      //     <div className="relative flex justify-end items-center gap-2">
      //       {/* <Dropdown>
      //         <DropdownTrigger>
      //           <Button isIconOnly size="sm" variant="light">
      //             <BsThreeDotsVertical className="text-default-300" />
      //           </Button>
      //         </DropdownTrigger>
      //         <DropdownMenu>
      //           <DropdownItem 
      //             startContent={<GrView />}
      //             onPress={() => handleViewSalary(employee.userId)}
      //           >
      //             View
      //           </DropdownItem>
      //           <DropdownItem 
      //             startContent={<CiEdit />}
      //             onPress={() => handleEditSalary(employee.userId)}
      //           >
      //             Edit
      //           </DropdownItem>
      //         </DropdownMenu>
      //       </Dropdown> */}
      //     </div>
      //   );
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
            variant="bordered"
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
            {/* <Button 
              color="primary" 
              endContent={<IoAdd />}
              onPress={handleAddNew}
            >
              Add New
            </Button> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} employees
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
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
    filteredItems.length,
    onSearchChange,
    rowsPerPage,
  ]);

  // Breadcrumb setup
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Employee Salary", href: "/salary", isCurrentPage: true },
  ];

  if (isLoadingSalaries) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image src={image1} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Table Card */}
      <div className="relative z-10 w-full max-w-6xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h3 className="text-2xl font-bold text-center text-black mb-6">Employee Salary List</h3>
          
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
              wrapper: "max-h-[600px]",
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
            <TableBody 
              emptyContent={"No employees found"} 
              items={sortedItems}
              isLoading={isLoadingSalaries}
              loadingContent={<CircularProgress aria-label="Loading" />}
            >
              {(item) => (
                <TableRow key={item.userId}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeSalaryList;