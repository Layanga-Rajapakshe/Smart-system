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
} from '@nextui-org/react';
import { useParams } from 'react-router-dom';
import { FaFileDownload, FaEye } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import { useGetEmployeeSalaryHistoryQuery } from '../../redux/api/employeeSalaryApiSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EmployeeSalaryHistory = () => {
  const { id: employeeId } = useParams();
  const { data: salaryHistory, isLoading } = useGetEmployeeSalaryHistoryQuery(employeeId);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Salary History', href: '/salary-history', isCurrentPage: true },
  ];

  const generatePDF = (salaryData) => {
    const doc = new jsPDF();
    const company = "Your Company Name";
    const month = monthNames[salaryData.month - 1];
    const year = salaryData.year;

    // Header
    doc.setFontSize(20);
    doc.text(company, 105, 15, { align: 'center' });
    doc.setFontSize(16);
    doc.text('Salary Sheet', 105, 25, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`${month} ${year}`, 105, 35, { align: 'center' });

    // Employee Details
    doc.setFontSize(10);
    doc.text(`Employee ID: ${salaryData.employeeId}`, 15, 50);
    doc.text(`Name: ${salaryData.employeeName}`, 15, 57);
    doc.text(`Department: ${salaryData.department}`, 15, 64);

    // Salary Details
    const salaryDetails = [
      ['Earnings', 'Amount', 'Deductions', 'Amount'],
      ['Basic Salary', salaryData.basicSalary.toFixed(2), 'Income Tax', salaryData.incomeTax.toFixed(2)],
      ['RE Allowance', salaryData.reAllowance.toFixed(2), 'Insurance', salaryData.insurance.toFixed(2)],
      ['Overtime (Single)', salaryData.singleOT.toFixed(2), '', ''],
      ['Overtime (Double)', salaryData.doubleOT.toFixed(2), '', ''],
      ['Meal Allowance', salaryData.mealAllowance.toFixed(2), '', ''],
    ];

    doc.autoTable({
      startY: 75,
      head: [['Earnings', 'Amount', 'Deductions', 'Amount']],
      body: salaryDetails,
      theme: 'grid',
      headStyles: { fillColor: [71, 71, 71] },
    });

    // Total
    const netPay = salaryData.netPay.toFixed(2);
    doc.setFontSize(12);
    doc.text(`Net Pay: $${netPay}`, 15, doc.autoTable.previous.finalY + 20);

    // Footer
    doc.setFontSize(8);
    doc.text('This is a computer-generated document. No signature required.', 105, 285, { align: 'center' });

    // Save the PDF
    doc.save(`salary-sheet-${month}-${year}.pdf`);
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
    new Set(salaryHistory?.map(item => item.year) || [new Date().getFullYear()])
  ).sort((a, b) => b - a);

  const filteredSalaryHistory = salaryHistory?.filter(
    item => item.year === selectedYear
  ) || [];

  return (
    <div className="p-6 space-y-6">
      <GeneralBreadCrumb items={breadcrumbItems} />
      
      <Card>
        <CardHeader className="flex justify-between items-center px-6 py-4">
          <h2 className="text-xl font-bold">Salary History</h2>
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
              selectedKeys={[selectedYear]}
              onSelectionChange={keys => setSelectedYear(Array.from(keys)[0])}>
              {years.map((year) => (
                <DropdownItem key={year}>
                  {year}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        
        <CardBody>
          <Table aria-label="Salary history table">
            <TableHeader>
              <TableColumn>MONTH</TableColumn>
              <TableColumn>NET SALARY</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>PAYMENT DATE</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody items={filteredSalaryHistory}>
              {(item) => (
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
                        onClick={() => generatePDF(item)}
                      >
                        <FaFileDownload className="text-lg" />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onClick={() => {/* Handle view details */}}
                      >
                        <FaEye className="text-lg" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeSalaryHistory;