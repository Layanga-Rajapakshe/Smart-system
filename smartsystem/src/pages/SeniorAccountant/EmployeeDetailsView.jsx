import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Button,
  Chip,
  Progress,
  Breadcrumbs,
  BreadcrumbItem
} from "@heroui/react";
import { 
  BsDownload, 
  BsPrinter, 
  BsArrowLeft, 
  BsBuilding, 
  BsCalendarWeek, 
  BsClock, 
  BsCashStack,
  BsPersonVcard
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";

// Mock employee data - would normally come from an API based on employeeId
const getEmployeeData = (employeeId) => {
  return {
    id: employeeId,
    name: "John Doe",
    employeeId: "EMP001",
    designation: "Software Engineer",
    department: "Engineering",
    joinDate: "2020-05-15",
    payPeriod: "February 2025",
    avatar: "https://i.pravatar.cc/150?u=1",
    email: "john.doe@example.com",
    contactNo: "+1 (123) 456-7890",
    workDetails: {
      daysWorked: 21,
      extraWorkingHours: 0.5,
      shortHours: 5.75,
      shortHoursDeduction: 5.25
    },
    overtimeDetails: {
      normalOtHours: 15,
      normalOtRate: 350,
      normalOtIncome: 5250,
      doubleOtHours: 8,
      doubleOtRate: 700,
      doubleOtIncome: 5600,
      poyaOtHours: 4,
      poyaOtRate: 525,
      poyaOtIncome: 2100
    },
    paymentDetails: {
      basicSalary: 55000,
      casualWagesPerDay: 2500,
      allowance: 500,
      grossIncome: 68450,
      mealPayment: 4400,
      mealAdvance: 20000,
      salaryAdvance: 10000,
      staffLoan: 5000,
      totalDeduction: 15000,
      netPayment: 53450,
      paymentMadeAsSalary: 50000,
      balanceToPay: 3450
    },
    attendanceRate: 85,
    paymentStatus: "Partially Paid"
  };
};

const EmployeeDetailsView = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get employee details
    setLoading(true);
    setTimeout(() => {
      const data = getEmployeeData(employeeId);
      setEmployee(data);
      setLoading(false);
    }, 500);
  }, [employeeId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Progress
          size="md"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-bold mb-4">Employee Not Found</h2>
        <Button
          color="primary"
          startContent={<BsArrowLeft />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Breadcrumbs>
          <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/payroll">Payroll</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Employee Details</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employee Details</h1>
        <div className="flex gap-3">
          <Button variant="light" startContent={<BsArrowLeft />} onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button color="primary" startContent={<BsDownload />}>
            Download Slip
          </Button>
          <Button color="secondary" startContent={<BsPrinter />}>
            Print Slip
          </Button>
        </div>
      </div>

      {/* Employee Basic Info Card */}
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <div className="flex gap-5">
            <img
              alt={employee.name}
              src={employee.avatar}
              className="w-20 h-20 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">{employee.name}</h2>
              <div className="flex items-center gap-2">
                <BsPersonVcard className="text-default-500" />
                <p className="text-small text-default-500">Employee ID: {employee.employeeId}</p>
              </div>
              <div className="flex items-center gap-2">
                <BsBuilding className="text-default-500" />
                <p className="text-small text-default-500">{employee.designation} | {employee.department}</p>
              </div>
            </div>
          </div>
          <Chip
            color={employee.paymentStatus === "Paid" ? "success" : employee.paymentStatus === "Partially Paid" ? "warning" : "danger"}
          >
            {employee.paymentStatus}
          </Chip>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-small font-semibold">Contact Information</p>
              <p className="text-small text-default-500">Email: {employee.email}</p>
              <p className="text-small text-default-500">Phone: {employee.contactNo}</p>
            </div>
            <div>
              <p className="text-small font-semibold">Employment Details</p>
              <p className="text-small text-default-500">Join Date: {employee.joinDate}</p>
              <p className="text-small text-default-500">Pay Period: {employee.payPeriod}</p>
            </div>
            <div>
              <p className="text-small font-semibold">Attendance Rate</p>
              <Progress
                aria-label="Attendance Rate"
                value={employee.attendanceRate}
                color={employee.attendanceRate > 90 ? "success" : employee.attendanceRate > 75 ? "warning" : "danger"}
                className="mt-2"
                showValueLabel={true}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Work Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BsCalendarWeek className="text-primary" />
              <h3 className="text-lg font-semibold">Work Details</h3>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Number of Days Worked</span>
                <span className="font-semibold">{employee.workDetails.daysWorked} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Extra Working Hours</span>
                <span className="font-semibold">{employee.workDetails.extraWorkingHours} hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Short Hours</span>
                <span className="font-semibold">{employee.workDetails.shortHours} hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Short Hours Deduction</span>
                <span className="font-semibold">{employee.workDetails.shortHoursDeduction} hours</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BsClock className="text-primary" />
              <h3 className="text-lg font-semibold">Overtime Details</h3>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <Table removeWrapper aria-label="Overtime details table">
              <TableHeader>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>HOURS</TableColumn>
                <TableColumn>RATE</TableColumn>
                <TableColumn>INCOME</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="normal">
                  <TableCell>Normal OT</TableCell>
                  <TableCell>{employee.overtimeDetails.normalOtHours}</TableCell>
                  <TableCell>${employee.overtimeDetails.normalOtRate}/hr</TableCell>
                  <TableCell>${employee.overtimeDetails.normalOtIncome}</TableCell>
                </TableRow>
                <TableRow key="double">
                  <TableCell>Double OT</TableCell>
                  <TableCell>{employee.overtimeDetails.doubleOtHours}</TableCell>
                  <TableCell>${employee.overtimeDetails.doubleOtRate}/hr</TableCell>
                  <TableCell>${employee.overtimeDetails.doubleOtIncome}</TableCell>
                </TableRow>
                <TableRow key="poya">
                  <TableCell>Poya Day OT</TableCell>
                  <TableCell>{employee.overtimeDetails.poyaOtHours}</TableCell>
                  <TableCell>${employee.overtimeDetails.poyaOtRate}/hr</TableCell>
                  <TableCell>${employee.overtimeDetails.poyaOtIncome}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>

      {/* Payment Details */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BsCashStack className="text-primary" />
            <h3 className="text-lg font-semibold">Payment Details</h3>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-medium font-semibold">Earnings</h4>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Basic Salary</span>
                <span className="font-semibold">${employee.paymentDetails.basicSalary}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Casual Wages/Day</span>
                <span className="font-semibold">${employee.paymentDetails.casualWagesPerDay}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Allowance</span>
                <span className="font-semibold">${employee.paymentDetails.allowance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Meal Payment</span>
                <span className="font-semibold">${employee.paymentDetails.mealPayment}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Total OT Income</span>
                <span className="font-semibold">
                  ${employee.overtimeDetails.normalOtIncome + employee.overtimeDetails.doubleOtIncome + employee.overtimeDetails.poyaOtIncome}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-medium font-semibold">Gross Income</span>
                <span className="font-semibold text-lg">${employee.paymentDetails.grossIncome}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-medium font-semibold">Deductions</h4>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Meal Advance</span>
                <span className="font-semibold">${employee.paymentDetails.mealAdvance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Salary Advance</span>
                <span className="font-semibold">${employee.paymentDetails.salaryAdvance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Staff Loan</span>
                <span className="font-semibold">${employee.paymentDetails.staffLoan}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Short Hours Deduction</span>
                <span className="font-semibold">
                  ${(employee.workDetails.shortHoursDeduction * (employee.paymentDetails.casualWagesPerDay / 8)).toFixed(2)}
                </span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-medium font-semibold">Total Deductions</span>
                <span className="font-semibold text-lg">${employee.paymentDetails.totalDeduction}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-medium font-semibold">Payment Summary</h4>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Gross Income</span>
                <span className="font-semibold">${employee.paymentDetails.grossIncome}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Total Deductions</span>
                <span className="font-semibold">-${employee.paymentDetails.totalDeduction}</span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-medium font-semibold">Net Payment</span>
                <span className="font-semibold text-lg">${employee.paymentDetails.netPayment}</span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">Payment Made as Salary</span>
                <span className="font-semibold">-${employee.paymentDetails.paymentMadeAsSalary}</span>
              </div>
              <Divider />
              <div className="flex justify-between items-center">
                <span className="text-medium font-semibold">Balance to Pay</span>
                <span className={`font-semibold text-lg ${employee.paymentDetails.balanceToPay > 0 ? "text-danger" : "text-success"}`}>
                  ${employee.paymentDetails.balanceToPay}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-between">
          <Button variant="light" startContent={<BsDownload />}>
            Download Report
          </Button>
          <Button color="primary" startContent={<BsPrinter />}>
            Print Payslip
          </Button>
        </CardFooter>
      </Card>

      {/* Payment History - could be expanded in a real implementation */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Payment History</h3>
        </CardHeader>
        <Divider />
        <CardBody>
          <Table aria-label="Payment history table">
            <TableHeader>
              <TableColumn>DATE</TableColumn>
              <TableColumn>REFERENCE</TableColumn>
              <TableColumn>METHOD</TableColumn>
              <TableColumn>AMOUNT</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Feb 15, 2025</TableCell>
                <TableCell>TXN-001234</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell>$50,000.00</TableCell>
                <TableCell>
                  <Chip color="success" size="sm">
                    Completed
                  </Chip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Feb 5, 2025</TableCell>
                <TableCell>TXN-001122</TableCell>
                <TableCell>Cash</TableCell>
                <TableCell>$10,000.00</TableCell>
                <TableCell>
                  <Chip color="success" size="sm">
                    Completed
                  </Chip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Feb 28, 2025</TableCell>
                <TableCell>TXN-001345</TableCell>
                <TableCell>Bank Transfer</TableCell>
                <TableCell>$3,450.00</TableCell>
                <TableCell>
                  <Chip color="warning" size="sm">
                    Pending
                  </Chip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeDetailsView;