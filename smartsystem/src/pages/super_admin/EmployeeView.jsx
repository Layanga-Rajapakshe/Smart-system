import React, { useState } from 'react';
import { Input, Button, Image } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const EmployeeView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({ email: '' });

  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee' },
    { label: 'Employee View', href: '/employeeview', isCurrentPage: true },
  ];

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Email validation logic
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setValidationErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setValidationErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex h-screen overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 flex-col flex items-center justify-center p-6">
          {/* Background Image for Mobile */}
          <div className="md:hidden absolute left-0 right-0 bottom-0 top-0 z-0">
            <Image
              isBlurred
              className="w-full h-screen/2 fill-inherit"
              src="https://nextui.org/gradients/docs-right.png"
              alt="Login page image"
            />
          </div>

          {/* Form Section */}
          <div className="text-center text-[25px] font-bold mb-6">Employee Register</div>

          <form className="flex flex-col w-1/2 gap-4 mb-4">
            {/* Email Input */}
            <Input
              variant="bordered"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              helperText={validationErrors.email}
              helperColor="error"
              status={validationErrors.email ? 'error' : 'default'}
            />

            {/* Password Input */}
            <Input
              variant="bordered"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Submit Button */}
            <Button
              disabled={!!validationErrors.email}
              className="mt-4"
            >
              Register
            </Button>
          </form>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              isBlurred
              className="w-full h-full object-fill"
              src={image1}
              alt="Register page image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
