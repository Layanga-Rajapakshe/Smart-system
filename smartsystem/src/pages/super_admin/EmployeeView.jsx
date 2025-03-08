import React, { useState, useEffect } from 'react';
import { useGetEmployeeQuery } from '../../redux/api/employeeApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Image, Card, CircularProgress, Button } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/background1.png';

const EmployeeView = () => {
  const { id: employeeId } = useParams();
  const { data: employee, isLoading, isError } = useGetEmployeeQuery(employeeId);
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    birthday: '',
    userId: '',
    hired_date: '',
    post: '',
    role: '',
    status: '',
    age: '',
    avatar: '',
    email: '',
    company: '',
    supervisor: '',
    supervisees: [],
    agreed_basic: 0,
    re_allowance: 0,
    single_ot: 0,
    double_ot: 0,
    meal_allowance: 0,
  });

  const breadcrumbItems = [
    { label: 'Employees Menu', href: '/employee' },
    { label: 'Employee View', href: `/employee/${employeeId}`, isCurrentPage: true },
  ];

  useEffect(() => {
    if (employee) {
      setEmployeeData(employee);
    }
  }, [employee]);

  if (isLoading) return <CircularProgress aria-label="Loading" />;
  if (isError) return <div>Error fetching employee data</div>;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image
          src={image1}
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>
      
      {/* Breadcrumb with better positioning */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Form Card Container */}
      <div className="relative z-10 w-full max-w-4xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h3 className="text-2xl font-bold text-center text-black mb-6">Employee View</h3>

          <form className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Personal Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={employeeData.name}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Email"
                  value={employeeData.email}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="User ID"
                  value={employeeData.userId}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Birthday"
                  value={employeeData.birthday}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Age"
                  value={employeeData.age}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Avatar"
                  value={employeeData.avatar}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
              </div>
            </div>

            {/* Employment Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Employment Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Hired Date"
                  value={employeeData.hired_date}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Post"
                  value={employeeData.post}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Role"
                  value={employeeData.role}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Status"
                  value={employeeData.status}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Supervisor"
                  value={employeeData.supervisor}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
              </div>
            </div>

            {/* Compensation Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Compensation Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="Agreed Basic"
                  value={employeeData.agreed_basic}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="RE Allowance"
                  value={employeeData.re_allowance}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Single OT"
                  value={employeeData.single_ot}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Double OT"
                  value={employeeData.double_ot}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Meal Allowance"
                  value={employeeData.meal_allowance}
                  readOnly
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
              </div>
              <div className="flex justify-between mt-4">
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => navigate('/employee')}
                >
                  Back to List
                </Button>
                <Button
                  color="primary"
                  onPress={() => navigate(`/employeeedit/${employeeId}`)}
                >
                  Edit Company
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeView;
