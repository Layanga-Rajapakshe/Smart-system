import React from "react";
import { Button, Image } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { 
  FaUserFriends, 
  FaClipboardCheck, 
  FaClock, 
  FaMoneyBillWave 
} from 'react-icons/fa';
import image1 from "../assets/images/background1.png";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const features = [
    {
      name: 'Employee Management',
      description: 'Complete employee profiles with all relevant information easily accessible.',
      icon: <FaUserFriends className="text-blue-600 text-4xl" />
    },
    {
      name: 'Task Tracking',
      description: 'Assign, monitor, and evaluate employee tasks and projects efficiently.',
      icon: <FaClipboardCheck className="text-blue-600 text-4xl" />
    },
    {
      name: 'Attendance & Leaves',
      description: 'Track attendance records and manage leave applications seamlessly.',
      icon: <FaClock className="text-blue-600 text-4xl" />
    },
    {
      name: 'Payroll Management',
      description: 'Calculate and process employee salaries with integrated attendance data.',
      icon: <FaMoneyBillWave className="text-blue-600 text-4xl" />
    }
  ];

  return (
    <div className="relative min-h-screen p-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image
          src={image1}
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto mt-10">
        {/* Hero Section */}
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 mb-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Sasesh International Employee Management System
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Streamline HR operations, boost productivity, and empower your workforce with our comprehensive employee management solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={handleLoginClick}
                color="primary"
                className="px-6 py-2"
              >
                Employee Login
              </Button>
              <Button
                onPress={handleAboutClick}
                color="secondary"
                variant="flat"
                className="px-6 py-2"
              >
                About Us
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 mb-8">
          <h2 className="text-2xl font-bold text-black text-center mb-8">
            Complete Employee Management Suite
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div key={feature.name} className="p-4 bg-white/70 rounded-xl shadow">
                <div className="flex items-start">
                  <div className="mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.name}
                    </h3>
                    <p className="text-gray-700">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Company Section */}
        <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h2 className="text-2xl font-bold text-black text-center mb-6">
            About Sasesh International Pvt. Ltd.
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Sasesh International is a leading company dedicated to excellence and innovation. 
            Our employee management system is designed specifically to meet the unique needs 
            of our organization and enhance operational efficiency across all departments.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold mb-3">
              Access Your Dashboard
            </h3>
            <p className="mb-5">
              Login to manage your profile, view tasks, check attendance, and more.
            </p>
            <Button
              onClick={handleLoginClick}
              color="primary"
              className="px-6 py-2"
            >
              Employee Login
            </Button>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Sasesh International Private Limited. All rights reserved.</p>
            <p className="mt-2">For technical support, please contact the IT department</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;