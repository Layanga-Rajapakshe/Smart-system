import React, { useState } from "react";
import { Input, Button, Image, Select, SelectItem } from "@nextui-org/react";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import { useCreateEmployeeMutation, useGetEmployeesQuery } from "../../redux/api/employeeApiSlice";
import { useGetRolesQuery } from "../../redux/api/roleApiSlice";
import { useGetCompaniesQuery } from "../../redux/api/companyApiSlice";
import { toast } from "react-hot-toast";
import image1 from '../../assets/images/companyRegister.png';

const EmployeeRegister = () => {
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();
  const { data: rolesData, isLoading: rolesLoading } = useGetRolesQuery();
  const { data: companiesData, isLoading: companiesLoading } = useGetCompaniesQuery();
  const { data: employeesData, isLoading: employeesLoading } = useGetEmployeesQuery();

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
    } catch (err) {
      toast.error(err?.data?.message || "Employee Registration Failed");
    }
  };

  const breadcrumbItems = [
    { label: "Employees Menu", href: "/employee" },
    { label: "Employee Register", href: "/employeeregister", isCurrentPage: true },
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex-col flex items-center justify-center p-6 relative">
          <div className='md:hidden absolute inset-0 z-0'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src="https://nextui.org/gradients/docs-right.png"
              alt='Register page background'
            />
          </div>
          <div className="text-center text-[25px] font-bold mb-6">Employee Register</div>
          <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4 overflow-auto">
            <Input
              variant="bordered"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Hired Date"
              type="date"
              value={hiredDate}
              onChange={(e) => setHiredDate(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Post"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
            <Select className="max-w-xs" 
            label="Select Role"
            onChange={(e) => setRole(e.target.value)}
            >
              {rolesData?.map((role) => (
                <SelectItem key={role._id} textValue="string" value={role._id}>{role.name}</SelectItem>
              ))}
            </Select>
            <Input
              variant="bordered"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Select className="max-w-xs" 
            label="Select Company"
            onChange={(e) => setCompany(e.target.value)}
            required
            >
              {companiesData?.map((company) => (
                <SelectItem key={company._id} textValue="string" value={company._id}>{company.c_name}</SelectItem>
              ))}
            </Select>
            <Input
              variant="bordered"
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Select className="max-w-xs" 
            label="Select Supervisor"
            onChange={(e) => setSupervisor(e.target.value)}
            required
            >
              {employeesData?.map((employee) => (
                <SelectItem key={employee._id} textValue="string" value={employee._id}>{employee.name}</SelectItem>
              ))}
            </Select>
            <Input
              variant="bordered"
              label="Agreed Basic"
              type="number"
              step="0.01"
              value={agreedBasic}
              onChange={(e) => setAgreedBasic(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Re Allowance"
              type="number"
              step="0.01"
              value={reAllowance}
              onChange={(e) => setReAllowance(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Single OT"
              type="number"
              step="0.01"
              value={singleOt}
              onChange={(e) => setSingleOt(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Double OT"
              type="number"
              step="0.01"
              value={doubleOt}
              onChange={(e) => setDoubleOt(e.target.value)}
              required
            />
            <Input
              variant="bordered"
              label="Meal Allowance"
              type="number"
              step="0.01"
              value={mealAllowance}
              onChange={(e) => setMealAllowance(e.target.value)}
              required
            />
            <div>
            <Button type="submit" color="primary" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
            </div>
          </form>
        </div>
        <div className='hidden md:flex flex-1 items-center justify-center p-6'>
          <div className='w-full h-full flex items-center justify-center'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src={image1}
              alt='Register page image'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegister;
