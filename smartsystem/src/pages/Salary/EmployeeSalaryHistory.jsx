import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  CircularProgress,
  Image,
  Input
} from "@heroui/react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaFileDownload, FaEye, FaExclamationTriangle, FaChevronDown } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
import { CiSearch } from "react-icons/ci";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useGetSalaryHistoryQuery } from '../../redux/api/salaryCalculationApiSlice';
import toast from "react-hot-toast";
import image1 from "../../assets/images/background1.png";
import PaginationComponent from "../../components/Pagination";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const columns = [
  { name: "MONTH", uid: "month", sortable: true },
  { name: "NET SALARY", uid: "netPay", sortable: true },
  { name: "EPF (EMPLOYEE)", uid: "epf", sortable: true },
  { name: "TOTAL INCOME", uid: "totalIncome", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const EmployeeSalaryHistory = () => {
  const {id}  = useParams();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "month",
    direction: "descending",
  });

  // Get user ID from localStorage if not provided in params
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  const currentUserId = id 

  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useGetSalaryHistoryQuery(currentUserId);
  
  // Format the data from the new API response structure
  const salaryHistoryData = React.useMemo(() => {
    if (!data || !data.success || !data.salaryDetails) return [];
    
    return data.salaryDetails.map(item => {
      const date = new Date(item.month);
      return {
        month: date.getMonth() + 1,  // JavaScript months are 0-indexed
        year: date.getFullYear(),
        netPay: item.FinalSalary,
        epf: item.EPF_employee,
        totalIncome: item.totalIncomeForTheMonth,
        status: 'Paid', // Default status since it's not in the response
        paymentDate: date.toLocaleDateString(), // Format date as string
        // Additional fields that might be needed for PDF generation
        employeeId: currentUserId,
        employeeName: userInfo?.name || 'Employee',
        department: userInfo?.department || 'Department',
      };
    });
  }, [data, currentUserId, userInfo]);
  
  // Handle errors from the API
  useEffect(() => {
    if (isError) {
      toast.error(`Error fetching salary history: ${error?.data?.message || "Unknown error"}`);
    }
  }, [isError, error]);

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Salary History', href: '/salary-history', isCurrentPage: true },
  ];

  const hasSearchFilter = Boolean(filterValue);

  // Filter and sort data
  const filteredItems = React.useMemo(() => {
    let filteredHistory = [];
    
    if (salaryHistoryData.length > 0) {
      filteredHistory = [...salaryHistoryData];
      
      // Filter by year
      filteredHistory = filteredHistory.filter(item => item.year === selectedYear);
      
      // Apply search filter if exists (search by month name)
      if (hasSearchFilter) {
        filteredHistory = filteredHistory.filter((item) => {
          const monthName = monthNames[item.month - 1].toLowerCase();
          return monthName.includes(filterValue.toLowerCase());
        });
      }
    }
    
    return filteredHistory;
  }, [salaryHistoryData, selectedYear, filterValue]);

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'processing':
        return 'primary';
      default:
        return 'default';
    }
  };

  const years = React.useMemo(() => {
    if (!salaryHistoryData || salaryHistoryData.length === 0) return [new Date().getFullYear()];
    return Array.from(
      new Set(salaryHistoryData.map(item => item.year))
    ).sort((a, b) => b - a);
  }, [salaryHistoryData]);

  const handleYearSelect = (keys) => {
    const selectedKey = Array.from(keys)[0];
    setSelectedYear(Number(selectedKey));
  };

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

  // Helper function to format month with leading zero
  const formatMonth = (month) => {
    return month.toString().padStart(2, '0');
  };

  const renderCell = React.useCallback((salary, columnKey) => {
    const cellValue = salary[columnKey];
    
    switch (columnKey) {
      case "month":
        return monthNames[salary.month - 1];
      case "netPay":
        return `$${salary.netPay.toLocaleString()}`;
      case "epf":
        return `$${salary.epf.toLocaleString()}`;
      case "totalIncome":
        return `$${salary.totalIncome.toLocaleString()}`;
      case "status":
        return (
          <Chip color={getStatusColor(salary.status)} size="sm">
            {salary.status}
          </Chip>
        );
      case "paymentDate":
        return salary.paymentDate || '-';
      case "actions":
        return (
          <div className="flex gap-2 justify-center">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => navigate(`/payrolldetails/${salary.employeeId}/${salary.year}-${formatMonth(salary.month)}`)}
            >
              <FaFileDownload className="text-lg" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => navigate(`/viewsalary/${salary.employeeId}/${formatMonth(salary.month)}/${salary.year}`)}
              title="View Details"
            >
              <FaEye className="text-lg" />
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, [navigate]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by month..."
            startContent={<CiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant="bordered"
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<IoFilterSharp />}
                  endContent={<FaChevronDown className="text-small" />}
                >
                  {selectedYear}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Year selection"
                selectionMode="single"
                selectedKeys={new Set([selectedYear.toString()])}
                onSelectionChange={handleYearSelect}
              >
                {years.map((year) => (
                  <DropdownItem key={year.toString()}>
                    {year}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Link to="/salarycomplaint">
              <Button
                color="warning"
                variant="flat"
                startContent={<FaExclamationTriangle />}
              >
                Submit Complaint
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} salary records
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
    selectedYear,
    years,
    onSearchChange,
    filteredItems.length,
    onRowsPerPageChange,
    rowsPerPage,
    handleYearSelect,
  ]);

  if (isLoading) {
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
          <h3 className="text-2xl font-bold text-center text-black mb-6">Salary History</h3>
          
          <Table
            aria-label="Salary history table"
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
            <TableHeader columns={columns}>
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
              emptyContent={"No salary records found for this year"} 
              items={sortedItems}
              loadingContent={<CircularProgress aria-label="Loading" />}
            >
              {(item) => (
                <TableRow key={`${item.year}-${item.month}`}>
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

export default EmployeeSalaryHistory;