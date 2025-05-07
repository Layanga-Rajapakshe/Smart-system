import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Breadcrumbs,
  BreadcrumbItem
} from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCalculateSalaryMutation } from '../../redux/api/salaryCalculationApiSlice';
import { useGetRolesQuery } from '../../redux/api/roleApiSlice';

const CalculateSalary = () => {
  const navigate = useNavigate();
  
  // State management
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [calculationSuccess, setCalculationSuccess] = useState(false);
  const [formattedMonth, setFormattedMonth] = useState("");
  
  // API hooks
  const { data: posts, isLoading: postsLoading } = useGetRolesQuery();
  const [calculateSalary, { isLoading: isCalculating }] = useCalculateSalaryMutation();

  // Format the selected month as YYYY-MM
  useEffect(() => {
    if (selectedMonth) {
      const month = String(selectedMonth.getMonth() + 1).padStart(2, "0");
      const year = selectedMonth.getFullYear();
      setFormattedMonth(`${year}-${month}`);
    }
  }, [selectedMonth]);

  // Handle post selection
  const handlePostChange = (postId) => {
    setSelectedPosts(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  // Handle select all posts
  const handleSelectAllPosts = () => {
    if (posts && posts.length > 0) {
      if (selectedPosts.length === posts.length) {
        setSelectedPosts([]);
      } else {
        setSelectedPosts(posts.map(post => post._id));
      }
    }
  };

  // Show confirmation modal
  const handleCalculateClick = () => {
    if (selectedMonth && selectedPosts.length > 0) {
      setShowConfirmModal(true);
    }
  };

  // Handle salary calculation
  const handleConfirmCalculation = async () => {
    try {
      await calculateSalary({
        month: formattedMonth,
        posts: selectedPosts
      }).unwrap();
      
      setCalculationSuccess(true);
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error calculating salary:", error);
      setShowConfirmModal(false);
      // You might want to show an error message here
    }
  };

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Salary Management', href: '/salary' },
    { label: 'Calculate Salary', href: '/calculatesalary', isCurrentPage: true }
  ];

  return (
    <div className="p-6">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs>
          {breadcrumbItems.map((item, index) => (
            <BreadcrumbItem 
              key={index} 
              href={item.href}
              isCurrentPage={item.isCurrentPage}
            >
              {item.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>

      <Card className="shadow-xl bg-white/90 backdrop-blur-md border border-white/40 rounded-xl">
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calculate Monthly Salary</h1>
          {calculationSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
              Salary calculated successfully!
            </div>
          )}
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Month Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Step 1: Select Salary Month</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Month
                </label>
                <DatePicker
                  selected={selectedMonth}
                  onChange={(date) => setSelectedMonth(date)}
                  dateFormat="yyyy/MM"
                  showMonthYearPicker
                  className="w-full border rounded-md p-2"
                  placeholderText="Select salary month"
                />
                {selectedMonth && (
                  <p className="mt-2 text-sm text-gray-600">
                    Salary period: 22nd of previous month to 21st of {selectedMonth.toLocaleString('default', { month: 'long' })}
                  </p>
                )}
              </div>
            </div>

            {/* Posts Selection */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Step 2: Select Posts/Roles</h2>
              <div className="mb-4">
                {postsLoading ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Select Posts
                      </label>
                      <Button 
                        color="secondary" 
                        variant="flat" 
                        size="sm"
                        onPress={handleSelectAllPosts}
                      >
                        {selectedPosts.length === (posts?.length || 0) ? "Deselect All" : "Select All"}
                      </Button>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto border rounded-md p-2">
                      {posts && posts.length > 0 ? (
                        posts.map((post) => (
                          <div key={post._id} className="mb-2">
                            <Checkbox
                              isSelected={selectedPosts.includes(post._id)}
                              onChange={() => handlePostChange(post._id)}
                            >
                              {post.name}
                            </Checkbox>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No posts available</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="flex justify-end mt-6">
            <Button
              color="primary"
              onPress={handleCalculateClick}
              disabled={!selectedMonth || selectedPosts.length === 0}
              className="px-6 py-2"
            >
              Calculate Salary
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
        <ModalContent className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl">
          <ModalHeader className="text-xl font-bold">Confirm Salary Calculation</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to calculate salaries for:</p>
            <ul className="list-disc pl-5 mt-2">
              <li><strong>Month:</strong> {selectedMonth?.toLocaleString('default', { month: 'long', year: 'numeric' })}</li>
              <li><strong>Posts:</strong> {selectedPosts.length} selected</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              This will process attendance data from 22nd of previous month to 21st of selected month and calculate all employee salaries for the selected posts.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleConfirmCalculation}
              isLoading={isCalculating}
            >
              {isCalculating ? "Calculating..." : "Confirm"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Results Card - shows when calculation is successful */}
      {calculationSuccess && (
        <Card className="mt-8 shadow-xl bg-white/90 backdrop-blur-md border border-white/40 rounded-xl">
          <CardHeader>
            <h2 className="text-xl font-bold">Calculation Results</h2>
          </CardHeader>
          <CardBody>
            <p className="mb-4">
              Salary calculations for {selectedMonth?.toLocaleString('default', { month: 'long', year: 'numeric' })} have been completed successfully.
            </p>
            <div className="flex justify-between">
              <Button
                color="secondary"
                variant="flat"
                onPress={() => navigate('/salaryreports')}
              >
                View Salary Reports
              </Button>
              <Button
                color="primary"
                onPress={() => navigate('/payslips')}
              >
                Generate Payslips
              </Button>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default CalculateSalary;