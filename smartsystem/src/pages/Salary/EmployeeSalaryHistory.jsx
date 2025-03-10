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
  Chip
} from "@heroui/react";
import { useParams, Link } from 'react-router-dom';
import { FaFileDownload, FaEye, FaExclamationTriangle } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Dummy data remains the same
const dummySalaryHistory = [
  {
    month: 1,
    year: 2024,
    employeeId: "1",
    employeeName: "John Doe",
    department: "Engineering",
    basicSalary: 5000.00,
    reAllowance: 500.00,
    singleOT: 200.00,
    doubleOT: 300.00,
    mealAllowance: 150.00,
    incomeTax: 600.00,
    insurance: 200.00,
    netPay: 5350.00,
    status: "Paid",
    paymentDate: "2024-01-25"
  },
  // ... other data entries remain the same
];

const EmployeeSalaryHistory = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Salary History', href: '/salary-history', isCurrentPage: true },
  ];

  const generatePDF = (salaryData) => {
    // Create new jsPDF instance
    const doc = new jsPDF();
    const companyName = "Sasesh International PVT LTD";
    const month = monthNames[salaryData.month - 1];
    const year = salaryData.year;

    // Add company header
    doc.setFontSize(20);
    doc.text(companyName, 105, 20, { align: 'center' });
    
    // Add salary slip title
    doc.setFontSize(16);
    doc.text('Salary Slip', 105, 30, { align: 'center' });
    doc.text(`${month} ${year}`, 105, 40, { align: 'center' });

    // Add employee details
    doc.setFontSize(12);
    doc.text('Employee Details', 20, 55);
    doc.setFontSize(10);
    doc.text(`Employee ID: ${salaryData.employeeId}`, 20, 65);
    doc.text(`Name: ${salaryData.employeeName}`, 20, 72);
    doc.text(`Department: ${salaryData.department}`, 20, 79);

    // Create earnings and deductions table
    const tableData = [
      ['Earnings', 'Amount', 'Deductions', 'Amount'],
      ['Basic Salary', salaryData.basicSalary.toFixed(2), 'Income Tax', salaryData.incomeTax.toFixed(2)],
      ['RE Allowance', salaryData.reAllowance.toFixed(2), 'Insurance', salaryData.insurance.toFixed(2)],
      ['Single OT', salaryData.singleOT.toFixed(2), '', ''],
      ['Double OT', salaryData.doubleOT.toFixed(2), '', ''],
      ['Meal Allowance', salaryData.mealAllowance.toFixed(2), '', ''],
    ];

    // Add table to document
    doc.autoTable({
      startY: 90,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: [66, 66, 66] },
      styles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 40 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 }
      }
    });

    // Add net pay
    const finalY = doc.lastAutoTable.finalY || 150;
    doc.setFontSize(12);
    doc.text(`Net Pay: $${salaryData.netPay.toFixed(2)}`, 20, finalY + 20);

    // Add footer
    doc.setFontSize(8);
    doc.text('This is a computer-generated document. No signature required.', 105, 280, { align: 'center' });

    // Save the PDF
    doc.save(`salary-slip-${salaryData.employeeId}-${month}-${year}.pdf`);
  };

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

  const years = Array.from(
    new Set(dummySalaryHistory.map(item => item.year))
  ).sort((a, b) => b - a);

  const filteredSalaryHistory = dummySalaryHistory.filter(
    item => item.year === selectedYear
  );

  const handleYearSelect = (keys) => {
    const selectedKey = Array.from(keys)[0];
    setSelectedYear(Number(selectedKey));
  };

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
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeSalaryHistory;