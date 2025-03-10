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
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
import { BsThreeDotsVertical, BsDownload, BsPrinter } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa6";
import { GrView } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { capitalize } from "../super_admin/utils";
import PaginationComponent from "../../components/Pagination";
import { useNavigate } from "react-router-dom";

// Define columns for the monthly salary summary table
const columns = [
  { name: "NAME", uid: "name", sortable: true },
  { name: "BASIC SALARY", uid: "basicSalary", sortable: true },
  { name: "REIMBURSEMENT", uid: "reimbursement", sortable: true },
  { name: "ALLOWANCE", uid: "allowance", sortable: true },
  { name: "NO PAY DAYS", uid: "noPayDays", sortable: true },
  { name: "NO PAY DEDUCTION", uid: "noPayDeduction", sortable: true },
  { name: "OT RATE", uid: "otRate", sortable: false },
  { name: "OT HOURS", uid: "otHours", sortable: false },
  { name: "EARNING FOR THE MONTH", uid: "monthlyEarning", sortable: false },
  { name: "TOTAL DEDUCTION", uid: "totalDeduction", sortable: true },
  { name: "SALARY PMT", uid: "salaryPayment", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

// Sample monthly salary data
const salaryData = [
  {
    id: 1,
    name: "John Doe",
    basicSalary: 60000,
    reimbursement: 5000,
    allowance: 3000,
    noPayDays: 0,
    noPayDeduction: 0,
    otRate: {
      single: 400,
      double: 800,
    },
    otHours: {
      single: 20,
      double: 5,
    },
    monthlyEarning: {
      basic: 60000,
      reimbursement: 5000,
      allowance: 3000,
      ot: 12000,
    },
    totalDeduction: {
      salaryAdvance: 5000,
      staffLoan: 2000,
      otherDeduction: 500,
      total: 7500,
    },
    salaryPayment: 72500,
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    id: 2,
    name: "Jane Smith",
    basicSalary: 55000,
    reimbursement: 4000,
    allowance: 2500,
    noPayDays: 2,
    noPayDeduction: 3666,
    otRate: {
      single: 350,
      double: 700,
    },
    otHours: {
      single: 15,
      double: 8,
    },
    monthlyEarning: {
      basic: 51334,
      reimbursement: 4000,
      allowance: 2500,
      ot: 10850,
    },
    totalDeduction: {
      salaryAdvance: 3000,
      staffLoan: 5000,
      otherDeduction: 1000,
      total: 9000,
    },
    salaryPayment: 59684,
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    id: 3,
    name: "Robert Johnson",
    basicSalary: 70000,
    reimbursement: 6000,
    allowance: 3500,
    noPayDays: 1,
    noPayDeduction: 2333,
    otRate: {
      single: 450,
      double: 900,
    },
    otHours: {
      single: 25,
      double: 10,
    },
    monthlyEarning: {
      basic: 67667,
      reimbursement: 6000,
      allowance: 3500,
      ot: 20250,
    },
    totalDeduction: {
      salaryAdvance: 0,
      staffLoan: 10000,
      otherDeduction: 2000,
      total: 12000,
    },
    salaryPayment: 85417,
    avatar: "https://i.pravatar.cc/150?u=3"
  },
  {
    id: 4,
    name: "Amy Wilson",
    basicSalary: 50000,
    reimbursement: 3000,
    allowance: 2000,
    noPayDays: 3,
    noPayDeduction: 5000,
    otRate: {
      single: 300,
      double: 600,
    },
    otHours: {
      single: 10,
      double: 0,
    },
    monthlyEarning: {
      basic: 45000,
      reimbursement: 3000,
      allowance: 2000,
      ot: 3000,
    },
    totalDeduction: {
      salaryAdvance: 2000,
      staffLoan: 0,
      otherDeduction: 800,
      total: 2800,
    },
    salaryPayment: 50200,
    avatar: "https://i.pravatar.cc/150?u=4"
  },
  {
    id: 5,
    name: "Michael Brown",
    basicSalary: 65000,
    reimbursement: 5500,
    allowance: 3200,
    noPayDays: 0,
    noPayDeduction: 0,
    otRate: {
      single: 420,
      double: 840,
    },
    otHours: {
      single: 18,
      double: 6,
    },
    monthlyEarning: {
      basic: 65000,
      reimbursement: 5500,
      allowance: 3200,
      ot: 12600,
    },
    totalDeduction: {
      salaryAdvance: 8000,
      staffLoan: 3000,
      otherDeduction: 1200,
      total: 12200,
    },
    salaryPayment: 74100,
    avatar: "https://i.pravatar.cc/150?u=5"
  },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "basicSalary", "allowance", "noPayDeduction", "monthlyEarning", "totalDeduction", "salaryPayment", "actions"];

const MonthlySalarySummaryPage = () => {
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [month, setMonth] = React.useState("February");
  const [year, setYear] = React.useState("2025");

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredSalary = [...salaryData];
    if (hasSearchFilter) {
      filteredSalary = filteredSalary.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredSalary;
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
      
      // Handle nested objects for sort
      if (typeof first === 'object' && first !== null && typeof second === 'object' && second !== null) {
        return 0; // Skip sorting for objects
      }
      
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((item, columnKey) => {
    if (columnKey === "name") {
      return (
        <div className="flex items-center gap-2">
          <img
            src={item.avatar}
            alt={item.name}
            className="w-8 h-8 rounded-full"
          />
          <span>{item.name}</span>
        </div>
      );
    }
    if (columnKey === "basicSalary" || columnKey === "reimbursement" || columnKey === "allowance" || columnKey === "salaryPayment") {
      return `$${item[columnKey].toLocaleString()}`;
    }
    if (columnKey === "noPayDeduction") {
      return `$${item[columnKey].toLocaleString()}`;
    }
    if (columnKey === "otRate") {
      return (
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div>Single: ${item.otRate.single}</div>
          <div>Double: ${item.otRate.double}</div>
        </div>
      );
    }
    if (columnKey === "otHours") {
      return (
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div>Single: {item.otHours.single}h</div>
          <div>Double: {item.otHours.double}h</div>
        </div>
      );
    }
    if (columnKey === "monthlyEarning") {
      const totalEarning = item.monthlyEarning.basic + item.monthlyEarning.reimbursement + 
                          item.monthlyEarning.allowance + item.monthlyEarning.ot;
      return (
        <div className="text-xs space-y-1">
          <div>Basic: ${item.monthlyEarning.basic.toLocaleString()}</div>
          <div>Reimb: ${item.monthlyEarning.reimbursement.toLocaleString()}</div>
          <div>Allow: ${item.monthlyEarning.allowance.toLocaleString()}</div>
          <div>OT: ${item.monthlyEarning.ot.toLocaleString()}</div>
          <div className="font-semibold border-t pt-1">Total: ${totalEarning.toLocaleString()}</div>
        </div>
      );
    }
    if (columnKey === "totalDeduction") {
      return (
        <div className="text-xs space-y-1">
          <div>Adv: ${item.totalDeduction.salaryAdvance.toLocaleString()}</div>
          <div>Loan: ${item.totalDeduction.staffLoan.toLocaleString()}</div>
          <div>Other: ${item.totalDeduction.otherDeduction.toLocaleString()}</div>
          <div className="font-semibold border-t pt-1">Total: ${item.totalDeduction.total.toLocaleString()}</div>
        </div>
      );
    }
    if (columnKey === "actions") {
      return (
        <div className="flex justify-center items-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <BsThreeDotsVertical className="text-default-300" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem startContent={<GrView />}>View Details</DropdownItem>
              <DropdownItem startContent={<CiEdit />}>Edit Salary</DropdownItem>
              <DropdownItem startContent={<BsDownload />}>Download Slip</DropdownItem>
              <DropdownItem startContent={<BsPrinter />}>Print Slip</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    }
    return item[columnKey];
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

  const summaryData = React.useMemo(() => {
    return {
      totalEmployees: salaryData.length,
      totalBasicSalary: salaryData.reduce((sum, item) => sum + item.basicSalary, 0),
      totalAllowances: salaryData.reduce((sum, item) => sum + item.allowance, 0),
      totalReimbursements: salaryData.reduce((sum, item) => sum + item.reimbursement, 0),
      totalOTPayments: salaryData.reduce((sum, item) => sum + item.monthlyEarning.ot, 0),
      totalDeductions: salaryData.reduce((sum, item) => sum + item.totalDeduction.total, 0),
      totalNetPayment: salaryData.reduce((sum, item) => sum + item.salaryPayment, 0),
    };
  }, [salaryData]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2023", "2024", "2025"];

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <div className="flex flex-col sm:flex-row gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" className="capitalize">
                  {month}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Month Selection"
                onAction={(key) => setMonth(key.toString())}
              >
                {months.map((m) => (
                  <DropdownItem key={m}>{m}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" className="capitalize">
                  {year}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Year Selection"
                onAction={(key) => setYear(key.toString())}
              >
                {years.map((y) => (
                  <DropdownItem key={y}>{y}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Input
              isClearable
              className="w-full sm:max-w-[44%]"
              placeholder="Search by employee name..."
              startContent={<CiSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
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
            <Button color="primary" endContent={<BsDownload />}>
              Export
            </Button>
            <Button color="secondary" endContent={<BsPrinter />}>
              Print
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <Card>
            <CardBody className="p-4">
              <p className="text-default-500 text-sm">Total Employees</p>
              <h4 className="text-large font-bold">{summaryData.totalEmployees}</h4>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-default-500 text-sm">Total Basic Salary</p>
              <h4 className="text-large font-bold">${summaryData.totalBasicSalary.toLocaleString()}</h4>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-default-500 text-sm">Total Net Payment</p>
              <h4 className="text-large font-bold">${summaryData.totalNetPayment.toLocaleString()}</h4>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="p-4">
              <p className="text-default-500 text-sm">Total OT Payments</p>
              <h4 className="text-large font-bold">${summaryData.totalOTPayments.toLocaleString()}</h4>
            </CardBody>
          </Card>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} employees found
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small ml-2"
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
    month,
    year,
    visibleColumns,
    onRowsPerPageChange,
    filteredItems.length,
    onSearchChange,
    summaryData,
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Monthly Salary Summary - {month} {year}</h1>
      
      <Table
        aria-label="Monthly Salary Summary Table"
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
        <TableBody emptyContent={"No employees found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonthlySalarySummaryPage;