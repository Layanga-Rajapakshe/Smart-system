import React from "react";
import { Card, Avatar } from "@heroui/react";

// Import icons from a compatible library like heroicons
// Since we're using HeroUI, we'll use simple SVG icons instead of Material UI icons
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
  </svg>
);

const ChecklistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
  </svg>
);

const ClipboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const PersonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const EmployeeDetails = ({ employee }) => {
  if (!employee) return null;

  return (
    <Card className="p-6 mt-6 mb-6 bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-col items-center mb-4">
        <Avatar 
          src={employee.imageUrl}
          alt={employee.name}
          className="w-24 h-24 mb-3"
        />
        <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><ClockIcon /></span>
          <span className="text-gray-700">Age: <span className="font-medium">{employee.age}</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><BriefcaseIcon /></span>
          <span className="text-gray-700">Division: <span className="font-medium">{employee.division}</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><ChecklistIcon /></span>
          <span className="text-gray-700">Tasks Done: <span className="font-medium">{employee.tasksDone}</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><ClipboardIcon /></span>
          <span className="text-gray-700">Tasks In Progress: <span className="font-medium">{employee.tasksInProgress}</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><ClipboardIcon /></span>
          <span className="text-gray-700">Tasks To Do: <span className="font-medium">{employee.tasksToDo}</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><UserGroupIcon /></span>
          <span className="text-gray-700">Supervisor: <span className="font-medium">{employee.supervisor}</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><StarIcon /></span>
          <span className="text-gray-700">Leaves Taken: <span className="font-medium">{employee.leaves}</span></span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-blue-600"><PersonIcon /></span>
          <span className="text-gray-700">Remarks: <span className="font-medium">{employee.remarks}</span></span>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeDetails;