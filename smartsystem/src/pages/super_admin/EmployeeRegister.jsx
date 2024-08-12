import React, { useState } from 'react';
import { Input, Button, Image, Select, SelectItem } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const EmployeeRegister = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hiredDate, setHiredDate] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [position, setPosition] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [reimbursementSalary, setReimbursementSalary] = useState("");
  const [singleOT, setSingleOT] = useState("");
  const [doubleOT, setDoubleOT] = useState("");
  const [mealAllowance, setMealAllowance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Name:", name);
    console.log("Birthday:", birthday);
    console.log("Hired Date:", hiredDate);
    console.log("Company:", company);
    console.log("Status:", status);
    console.log("Role:", role);
    console.log("Position:", position);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Basic Salary:", basicSalary);
    console.log("Reimbursement Salary:", reimbursementSalary);
    console.log("Single OT:", singleOT);
    console.log("Double OT:", doubleOT);
    console.log("Meal Allowance:", mealAllowance);
  };

  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee' },
    { label: 'Employee Register', href: '/employeeregister', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className='flex h-fullx overflow-hidden'>
        <div className='flex-1 flex-col flex items-center justify-center p-6'>
          <div className='md:hidden absolute left-0 right-0 bottom-0 top-0 z-0'>
            <Image
              isBlurred
              className='w-full h-screen/2 fill-inherit'
              src="https://nextui.org/gradients/docs-right.png"
              alt='Register page image'
            />
          </div>

          <div className='text-center text-[25px] font-bold mb-6'>Employee Register</div>

          <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 mb-4'>
            <Input
              variant='bordered'
              label='Name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Birthday'
              type='date'
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Hired Date'
              type='date'
              value={hiredDate}
              onChange={(e) => setHiredDate(e.target.value)}
            />

            <Select
              label="Company"
              placeholder="Select Company"
              value={company}
              onChange={(value) => setCompany(value)}
            >
              <SelectItem value="Company A">Company A</SelectItem>
              <SelectItem value="Company B">Company B</SelectItem>
              <SelectItem value="Company C">Company C</SelectItem>
            </Select>

            <Select
              label="Status"
              placeholder="Select Status"
              value={status}
              onChange={(value) => setStatus(value)}
            >
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="On Leave">On Leave</SelectItem>
            </Select>

            <Select
              label="Role"
              placeholder="Select Role"
              value={role}
              onChange={(value) => setRole(value)}
            >
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Employee">Employee</SelectItem>
            </Select>

            <Select
              label="Position"
              placeholder="Select Position"
              value={position}
              onChange={(value) => setPosition(value)}
            >
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="Tester">Tester</SelectItem>
            </Select>

            <Input
              variant='bordered'
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Re-Enter Password'
              type='password'
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Agreed Basic Salary'
              type='number'
              value={basicSalary}
              onChange={(e) => setBasicSalary(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Reimbursement Salary'
              type='number'
              value={reimbursementSalary}
              onChange={(e) => setReimbursementSalary(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Single OT'
              type='number'
              value={singleOT}
              onChange={(e) => setSingleOT(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Double OT'
              type='number'
              value={doubleOT}
              onChange={(e) => setDoubleOT(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Meal Allowance'
              type='number'
              value={mealAllowance}
              onChange={(e) => setMealAllowance(e.target.value)}
            />

            <Button type='submit' variant='flat' color='primary'>
              Register
            </Button>
          </form>

        </div>

        <div className='hidden md:flex flex-1 items-center justify-center p-6'>
          <div className='w-full h-full flex items-center justify-center'>
            <Image
              isBlurred
              className='w-full h-full object-fill'
              src={image1}
              alt='Register page image'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeRegister;
