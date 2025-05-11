import React, { useState } from 'react';
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
  Spinner
} from "@heroui/react";
import { useParams, Link } from 'react-router-dom';
import { FaFileDownload, FaEye, FaExclamationTriangle } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useGetSalaryHistoryQuery } from '../../redux/api/salaryCalculationApiSlice';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeeSalaryHistory = () => {
  const { id } = useParams();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Fetch salary history using the RTK Query hook
  const {
    data: salaryHistory,
    isLoading,
    isError,
    error
  } = useGetSalaryHistoryQuery(id || '');
  
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Salary History', href: '/salary-history', isCurrentPage: true },
  ];

  // Commented out PDF generation functionality
  const generatePDF = (salaryData) => {
    // PDF generation functionality is commented out
    console.log("PDF generation is disabled", salaryData);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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

  // Get unique years from the salary history data
  const years = salaryHistory 
    ? Array.from(new Set(salaryHistory.map(item => item.year))).sort((a, b) => b - a)
    : [new Date().getFullYear()];

  // Filter salary history by selected year
  const filteredSalaryHistory = salaryHistory
    ? salaryHistory.filter(item => item.year === selectedYear)
    : [];

  const handleYearSelect = (keys) => {
    const selectedKey = Array.from(keys)[0];
    setSelectedYear(Number(selectedKey));
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  // Render error state
  if (isError) {
    return (
      <div className="p-6">
        <GeneralBreadCrumb items={breadcrumbItems} />
        <Card>
          <CardBody>
            <div className="text-center p-6 text-danger">
              <p>Error loading salary history: {error?.data?.message || 'Something went wrong'}</p>
              <Button color="primary" className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <GeneralBreadCrumb items={breadcrumbItems} />
      
      <Card>
        <CardHeader className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Salary History</h2>
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
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                startContent={<IoFilterSharp />}
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
        </CardHeader>
        
        <CardBody>
          {filteredSalaryHistory.length === 0 ? (
            <div className="text-center p-6 text-gray-500">
              No salary records found for {selectedYear}
            </div>
          ) : (
            <Table 
              aria-label="Salary history table"
              removeWrapper
            >
              <TableHeader>
                <TableColumn>MONTH</TableColumn>
                <TableColumn>NET SALARY</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>PAYMENT DATE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredSalaryHistory.map((item) => (
                  <TableRow key={`${item.year}-${item.month}`}>
                    <TableCell>{monthNames[item.month - 1]}</TableCell>
                    <TableCell>${item.netPay.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip color={getStatusColor(item.status)} size="sm">
                        {item.status}
                      </Chip>
                    </TableCell>
                    <TableCell>{item.paymentDate || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          // Commented out to disable PDF generation functionality
                          onPress={() => generatePDF(item)}
                        >
                          <FaFileDownload className="text-lg" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => {/* Handle view details */}}
                        >
                          <FaEye className="text-lg" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeSalaryHistory;