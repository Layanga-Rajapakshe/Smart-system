import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Progress,
  CircularProgress,
  Image
} from "@heroui/react";
import { 
  BsDownload, 
  BsPrinter, 
  BsArrowLeft, 
  BsPersonVcard,
  BsBuilding, 
  BsCalendarWeek, 
  BsCashStack
} from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSalarySheetQuery } from "../../redux/api/salaryCalculationApiSlice";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import image1 from "../../assets/images/background1.png";
import toast from "react-hot-toast";

const EmployeeDetailsView = () => {
  const navigate = useNavigate();
  const { userId, month } = useParams();
  
  // Use RTK Query hook to fetch salary sheet data
  const { 
    data, 
    isLoading, 
    isError, 
    error 
  } = useGetSalarySheetQuery({ userId, month });

  // Get employee and salary data from the API response
  const employee = data?.employee;
  const salaryDetails = data?.salaryDetails;

  // Handle errors from the API
  React.useEffect(() => {
    if (isError) {
      toast.error(`Error fetching data: ${error?.data?.message || "Unknown error"}`);
    }
  }, [isError, error]);

  // Breadcrumb setup
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Payroll", href: "/payroll" },
    { label: "Employee Details", href: "#", isCurrentPage: true },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress aria-label="Loading" />
      </div>
    );
  }

  if (!employee || !salaryDetails) {
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
          <Image src={image1} alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
        </div>
        
        <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-white/40 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Employee Not Found</h2>
          <Button
            color="primary"
            startContent={<BsArrowLeft />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Format dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format time (convert HH:MM:SS to hours)
  const formatTimeToHours = (timeString) => {
    if (!timeString) return "0";
    const [hours, minutes] = timeString.split(':');
    return `${parseInt(hours)}h ${parseInt(minutes)}m`;
  };

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

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Employee Payslip Details</h1>
          <div className="flex gap-3">
            <Button variant="light" startContent={<BsArrowLeft />} onPress={() => navigate(-1)}>
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
        <Card className="mb-6 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <CardHeader className="flex justify-between items-center">
            <div className="flex gap-5">
              <img
                alt={employee.name}
                src={employee.avatar || "https://via.placeholder.com/80"}
                className="w-20 h-20 rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">{employee.name}</h2>
                <div className="flex items-center gap-2">
                  <BsPersonVcard className="text-default-500" />
                  <p className="text-small text-default-500">Employee ID: {employee.userId}</p>
                </div>
                <div className="flex items-center gap-2">
                  <BsBuilding className="text-default-500" />
                  <p className="text-small text-default-500">{employee.post}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-small text-default-500">Agreed Basic: ${employee.agreed_basic}</p>
              <p className="text-small text-default-500">Month: {formatDate(salaryDetails.month)}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-small font-semibold">Contact Information</p>
                <p className="text-small text-default-500">Email: {employee.email}</p>
                <p className="text-small text-default-500">Age: {employee.age}</p>
              </div>
              <div>
                <p className="text-small font-semibold">Employment Details</p>
                <p className="text-small text-default-500">Join Date: {formatDate(employee.hired_date)}</p>
                <p className="text-small text-default-500">Birthday: {formatDate(employee.birthday)}</p>
              </div>
              <div>
                <p className="text-small font-semibold">EPF Status</p>
                <p className="text-small text-default-500">EPF Eligible: {employee.isEPF ? "Yes" : "No"}</p>
                <p className="text-small text-default-500">Employee EPF: ${salaryDetails.EPF_employee}</p>
                <p className="text-small text-default-500">Employer EPF: ${salaryDetails.EPF_employer}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Work Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
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
                  <span className="text-small text-default-500">Total Extra Working Hours</span>
                  <span className="font-semibold">{formatTimeToHours(salaryDetails.totalExtraWorkingHrs)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Total Short Working Hours</span>
                  <span className="font-semibold">{formatTimeToHours(salaryDetails.totalShortWorkingHrs)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">No Pay Days</span>
                  <span className="font-semibold">{salaryDetails.totalNPdays}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">No Pay Days OT</span>
                  <span className="font-semibold">{salaryDetails.nopaydays_ot}</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BsCalendarWeek className="text-primary" />
                <h3 className="text-lg font-semibold">Overtime Details</h3>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Single OT Rate</span>
                  <span className="font-semibold">${employee.single_ot}/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Double OT Rate</span>
                  <span className="font-semibold">${employee.double_ot}/hr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Total Single OT</span>
                  <span className="font-semibold">{formatTimeToHours(salaryDetails.totalSingleOt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Total Double OT</span>
                  <span className="font-semibold">{formatTimeToHours(salaryDetails.totalDoubleOt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Total Poya OT</span>
                  <span className="font-semibold">{formatTimeToHours(salaryDetails.totalPoyaOt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">OT Earnings</span>
                  <span className="font-semibold">${salaryDetails.OtEarnings}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Payment Details */}
        <Card className="mb-6 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
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
                  <span className="text-small text-default-500">Agreed Basic Salary</span>
                  <span className="font-semibold">${employee.agreed_basic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Rent Allowance</span>
                  <span className="font-semibold">${employee.re_allowance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Meal Allowance</span>
                  <span className="font-semibold">${employee.meal_allowance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Adjusted Basic</span>
                  <span className="font-semibold">${salaryDetails.newBasic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Adjusted RE</span>
                  <span className="font-semibold">${salaryDetails.newRE}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">OT Earnings</span>
                  <span className="font-semibold">${salaryDetails.OtEarnings}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-medium font-semibold">Deductions</h4>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">No Pay Basic Deduction</span>
                  <span className="font-semibold">${salaryDetails.noPayDeductionBasic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">No Pay RE Deduction</span>
                  <span className="font-semibold">${salaryDetails.noPayDeductionREallowance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Meal Advance</span>
                  <span className="font-semibold">${salaryDetails.mealAdvance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Salary Advance</span>
                  <span className="font-semibold">${salaryDetails.sallaryAdvance}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">OT Deduction</span>
                  <span className="font-semibold">${salaryDetails.OtDeduction}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Other Deductions</span>
                  <span className="font-semibold">${salaryDetails.otherDeductions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">EPF Employee</span>
                  <span className="font-semibold">${salaryDetails.EPF_employee}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-medium font-semibold">Payment Summary</h4>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Total Income</span>
                  <span className="font-semibold">${salaryDetails.totalIncomeForTheMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Final Salary</span>
                  <span className="font-semibold">${salaryDetails.FinalSalary}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Created At</span>
                  <span className="font-semibold">{new Date(salaryDetails.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-small text-default-500">Last Updated</span>
                  <span className="font-semibold">{new Date(salaryDetails.updatedAt).toLocaleString()}</span>
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
      </div>
    </div>
  );
};

export default EmployeeDetailsView;