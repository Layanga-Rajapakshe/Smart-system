import React, { useState } from "react";
import { Input, Button, Image, Card, Spinner, Select, SelectItem } from "@heroui/react";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import { useCreateEmployeeMutation, useGetEmployeesQuery } from "../../redux/api/employeeApiSlice";
import { useGetRolesQuery } from "../../redux/api/roleApiSlice";
import { useGetCompaniesQuery } from "../../redux/api/companyApiSlice";
import { toast } from "react-hot-toast";
import image1 from '../../assets/images/background1.png';
import { useNavigate } from "react-router-dom";

const EmployeeRegister = () => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: companiesData, isLoading: companiesLoading } = useGetCompaniesQuery();
  const { data: employeesData, isLoading: employeesLoading } = useGetEmployeesQuery();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [userId, setUserId] = useState("");
  const [hiredDate, setHiredDate] = useState("");
  const [post, setPost] = useState("Clerk");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("active");
  const [avatar, setAvatar] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [agreedBasic, setAgreedBasic] = useState(0);
  const [reAllowance, setReAllowance] = useState(0);
  const [singleOt, setSingleOt] = useState(0);
  const [doubleOt, setDoubleOt] = useState(0);
  const [mealAllowance, setMealAllowance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployeeData = {
      name,
      birthday,
      userId, 
      hired_date: hiredDate,
      post,
      role,
      email,
      password,
      company,
      age: parseInt(age),
      status,
      avatar,
      // supervisor,
      agreed_basic: parseFloat(agreedBasic),
      re_allowance: parseFloat(reAllowance),
      single_ot: parseFloat(singleOt),
      double_ot: parseFloat(doubleOt),
      meal_allowance: parseFloat(mealAllowance),
    };

    try {
      console.log(newEmployeeData);
      await createEmployee(newEmployeeData).unwrap();
      toast.success("New Employee Registered Successfully");
      // Clear form fields after successful submission
      setName("");
      setBirthday("");
      setUserId("");
      setHiredDate("");
      setPost("Clerk");
      setRole("");
      setEmail("");
      setPassword("");
      setCompany("");
      setAge("");
      setStatus("active");
      setAvatar("");
      // setSupervisor("");
      setAgreedBasic(0);
      setReAllowance(0);
      setSingleOt(0);
      setDoubleOt(0);
      setMealAllowance(0);
      navigate("/employee");
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || "Employee Registration Failed");
    }
  };

  const breadcrumbItems = [
    { label: "Employees Menu", href: "/employee" },
    { label: "Employee Register", href: "/employeeregister", isCurrentPage: true },
  ];

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
          <h3 className="text-2xl font-bold text-center text-black mb-6">Employee Registration</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Personal Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Enter employee name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter employee email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="User ID"
                  placeholder="Enter user ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Age"
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Avatar URL"
                  placeholder="Enter avatar image URL"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
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
                  type="date"
                  value={hiredDate}
                  onChange={(e) => setHiredDate(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Post"
                  placeholder="Enter employee post"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Select 
                  label="Select Role"
                  placeholder="Choose a role"
                  onChange={(e) => setRole(e.target.value)}
                  variant="bordered"
                  fullWidth
                  className="py-2"
                >
                  {rolesData?.map((role) => (
                    <SelectItem key={role._id} textValue="string" value={role._id}>{role.name}</SelectItem>
                  ))}
                </Select>
                <Select 
                  label="Select Company"
                  placeholder="Choose a company"
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                >
                  {companiesData?.map((company) => (
                    <SelectItem key={company._id} textValue="string" value={company._id}>{company.c_name}</SelectItem>
                  ))}
                </Select>
                <Select 
                  label="Select Supervisor"
                  placeholder="Choose a supervisor"
                  onChange={(e) => setSupervisor(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                >
                  {employeesData?.map((employee) => (
                    <SelectItem key={employee._id} textValue="string" value={employee._id}>{employee.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            {/* Compensation Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Compensation Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  label="Agreed Basic"
                  type="number"
                  step="0.01"
                  placeholder="Enter basic salary"
                  value={agreedBasic}
                  onChange={(e) => setAgreedBasic(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="RE Allowance"
                  type="number"
                  step="0.01"
                  placeholder="Enter RE allowance"
                  value={reAllowance}
                  onChange={(e) => setReAllowance(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Meal Allowance"
                  type="number"
                  step="0.01"
                  placeholder="Enter meal allowance"
                  value={mealAllowance}
                  onChange={(e) => setMealAllowance(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Single OT Rate"
                  type="number"
                  step="0.01"
                  placeholder="Enter single OT rate"
                  value={singleOt}
                  onChange={(e) => setSingleOt(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
                <Input
                  label="Double OT Rate"
                  type="number"
                  step="0.01"
                  placeholder="Enter double OT rate"
                  value={doubleOt}
                  onChange={(e) => setDoubleOt(e.target.value)}
                  required
                  variant="bordered"
                  fullWidth
                  className="py-2"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                type="submit" 
                color="primary" 
                size="lg" 
                disabled={isLoading} 
                className="px-8 py-3"
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" color="currentColor" className="mr-2" />
                    Registering...
                  </>
                ) : (
                  "Register Employee"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeRegister;