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

// Define columns for the payroll summary table
const columns = [
  { name: "EMPLOYEE NAME", uid: "name", sortable: true },
  { name: "CASUAL WAGES PER DAY", uid: "casualWages", sortable: true },
  { name: "ALLOWANCE", uid: "allowance", sortable: true },
  { name: "NO OF DAYS WORKED", uid: "daysWorked", sortable: true },
  { name: "WAGES BASIC", uid: "wagesBasic", sortable: true },
  { name: "OT RATES", uid: "otRates", sortable: false },
  { name: "OT HOURS", uid: "otHours", sortable: false },
  { name: "OT INCOME", uid: "otIncome", sortable: false },
  { name: "GROSS INCOME", uid: "grossIncome", sortable: true },
  { name: "PAYMENT FOR MEAL", uid: "mealPayment", sortable: true },
  { name: "SALARY ADVANCE", uid: "salaryAdvance", sortable: true },
  { name: "STAFF LOAN", uid: "staffLoan", sortable: true },
  { name: "DEDUCTION FOR SHORT WORKING", uid: "shortWorkingDeduction", sortable: true },
  { name: "TOTAL DEDUCTION", uid: "totalDeduction", sortable: true },
  { name: "NET PAYMENT", uid: "netPayment", sortable: true },
  { name: "PAYMENT MADE AS SALARY", uid: "paymentMade", sortable: true },
  { name: "BALANCE TO PAY", uid: "balanceToPay", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

// Sample payroll summary data
const payrollData = [
  {
    id: 1,
    name: "John Doe",
    casualWages: 2500,
    allowance: 500,
    daysWorked: 22,
    wagesBasic: 55000,
    otRates: {
      normal: 350,
      double: 700,
      poya: 525
    },
    otHours: {
      normal: 15,
      double: 8,
      poya: 4
    },
    otIncome: {
      normal: 5250,
      double: 5600,
      poya: 2100
    },
    grossIncome: 68450,
    mealPayment: 4400,
    salaryAdvance: 10000,
    staffLoan: 5000,
    shortWorkingDeduction: 0,
    totalDeduction: 15000,
    netPayment: 53450,
    paymentMade: 50000,
    balanceToPay: 3450,
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  {
    id: 2,
    name: "Jane Smith",
    casualWages: 2200,
    allowance: 400,
    daysWorked: 20,
    wagesBasic: 44000,
    otRates: {
      normal: 300,
      double: 600,
      poya: 450
    },
    otHours: {
      normal: 12,
      double: 6,
      poya: 0
    },
    otIncome: {
      normal: 3600,
      double: 3600,
      poya: 0
    },
    grossIncome: 51600,
    mealPayment: 4000,
    salaryAdvance: 5000,
    staffLoan: 3000,
    shortWorkingDeduction: 2200,
    totalDeduction: 10200,
    netPayment: 41400,
    paymentMade: 41400,
    balanceToPay: 0,
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  {
    id: 3,
    name: "Robert Johnson",
    casualWages: 2800,
    allowance: 600,
    daysWorked: 22,
    wagesBasic: 61600,
    otRates: {
      normal: 400,
      double: 800,
      poya: 600
    },
    otHours: {
      normal: 20,
      double: 10,
      poya: 6
    },
    otIncome: {
      normal: 8000,
      double: 8000,
      poya: 3600
    },
    grossIncome: 81800,
    mealPayment: 4400,
    salaryAdvance: 15000,
    staffLoan: 10000,
    shortWorkingDeduction: 0,
    totalDeduction: 25000,
    netPayment: 56800,
    paymentMade: 56800,
    balanceToPay: 0,
    avatar: "https://i.pravatar.cc/150?u=3"
  },
  {
    id: 4,
    name: "Amy Wilson",
    casualWages: 2400,
    allowance: 450,
    daysWorked: 18,
    wagesBasic: 43200,
    otRates: {
      normal: 320,
      double: 640,
      poya: 480
    },
    otHours: {
      normal: 8,
      double: 4,
      poya: 2
    },
    otIncome: {
      normal: 2560,
      double: 2560,
      poya: 960
    },
    grossIncome: 49730,
    mealPayment: 3600,
    salaryAdvance: 8000,
    staffLoan: 0,
    shortWorkingDeduction: 4800,
    totalDeduction: 12800,
    netPayment: 36930,
    paymentMade: 30000,
    balanceToPay: 6930,
    avatar: "https://i.pravatar.cc/150?u=4"
  },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "daysWorked", "wagesBasic", "grossIncome", "totalDeduction", "netPayment", "balanceToPay", "actions"];

const PayrollSummaryPage = () => {
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

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredPayroll = [...payrollData];
    if (hasSearchFilter) {
      filteredPayroll = filteredPayroll.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredPayroll;
  }, [payrollData, filterValue]);

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
    if (columnKey === "casualWages" || columnKey === "allowance" || 
        columnKey === "wagesBasic" || columnKey === "grossIncome" || 
        columnKey === "mealPayment" || columnKey === "salaryAdvance" || 
        columnKey === "staffLoan" || columnKey === "shortWorkingDeduction" || 
        columnKey === "totalDeduction" || columnKey === "netPayment" || 
        columnKey === "paymentMade" || columnKey === "balanceToPay") {
      return `$${item[columnKey].toLocaleString()}`;
    }
    if (columnKey === "otRates") {
      return (
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div>Normal: ${item.otRates.normal}</div>
          <div>Double: ${item.otRates.double}</div>
          <div>Poya: ${item.otRates.poya}</div>
        </div>
      );
    }
    if (columnKey === "otHours") {
      return (
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div>Normal: {item.otHours.normal}h</div>
          <div>Double: {item.otHours.double}h</div>
          <div>Poya: {item.otHours.poya}h</div>
        </div>
      );
    }
    if (columnKey === "otIncome") {
      return (
        <div className="grid grid-cols-3 gap-1 text-xs">
          <div>Normal: ${item.otIncome.normal}</div>
          <div>Double: ${item.otIncome.double}</div>
          <div>Poya: ${item.otIncome.poya}</div>
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
              <DropdownItem startContent={<CiEdit />}>Edit Payroll</DropdownItem>
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
      totalEmployees: payrollData.length,
      totalGrossIncome: payrollData.reduce((sum, item) => sum + item.grossIncome, 0),
      totalDeductions: payrollData.reduce((sum, item) => sum + item.totalDeduction, 0),
      totalNetPayment: payrollData.reduce((sum, item) => sum + item.netPayment, 0),
      totalBalanceToPay: payrollData.reduce((sum, item) => sum + item.balanceToPay, 0),
    };
  }, [payrollData]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by employee name..."
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
              <p className="text-default-500 text-sm">Total Gross Income</p>
              <h4 className="text-large font-bold">${summaryData.totalGrossIncome.toLocaleString()}</h4>
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
              <p className="text-default-500 text-sm">Total Balance To Pay</p>
              <h4 className="text-large font-bold">${summaryData.totalBalanceToPay.toLocaleString()}</h4>
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
    visibleColumns,
    onRowsPerPageChange,
    filteredItems.length,
    onSearchChange,
    summaryData,
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Payroll Summary</h1>
      
      <Table
        aria-label="Payroll Summary Table"
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

export default PayrollSummaryPage;