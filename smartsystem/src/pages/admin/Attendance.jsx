import React, { useState } from 'react';
import { Button, Select, SelectItem, Image, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useNavigate } from 'react-router-dom';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import AttendanceDropzone from './AttendanceDropzone';
import HolidayDropzone from './HolidayDropzone';
import image1 from "../../assets/images/background1.png";
import {useGetEmployeesQuery} from '../../redux/api/employeeApiSlice';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; // Make sure axios is imported

const Attendance = () => {
    const navigate = useNavigate();
    const [selectedDropzone, setSelectedDropzone] = useState("attendance");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    // New state for salary month selection modal
    const [isSalaryMonthModalOpen, setIsSalaryMonthModalOpen] = useState(false);
    const [selectedSalaryMonth, setSelectedSalaryMonth] = useState("");
    const [isCreatingSalaryMonth, setIsCreatingSalaryMonth] = useState(false);

    const employeesQuery = useGetEmployeesQuery();
    const employees = employeesQuery.data || [];

    const handleNewClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const formatMonthYear = (date) => {
        if (!date) return "";
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure two-digit month
        const year = date.getFullYear();
        return `${year}-${month}`;
    };

    const selectedDate = formatMonthYear(selectedMonth);
    const formattedSalaryMonth = formatMonthYear(selectedSalaryMonth);

    const handleViewAttendance = () => {
        if (selectedEmployee && selectedDate) {
            navigate(`/viewattendance/${selectedEmployee}/${selectedDate}`);
            setIsModalOpen(false);
        }
    };

    // New function to handle opening the salary month modal
    const handleBeforeUpload = () => {
        setIsSalaryMonthModalOpen(true);
    };

    // New function to handle closing the salary month modal
    const handleCloseSalaryMonthModal = () => {
        setIsSalaryMonthModalOpen(false);
    };

    // New function to handle creating the salary month
    const handleCreateSalaryMonth = async () => {
        if (!formattedSalaryMonth) return;
        
        setIsCreatingSalaryMonth(true);
        try {
            // Call the backend API to create the salary month
            await axios.post(`/api/attendance/salmonth/${formattedSalaryMonth}`);
            setIsSalaryMonthModalOpen(false);
            
            // Show success notification or proceed with upload
            alert("Salary month created successfully. You can now upload attendance data.");
            
            // If you want to automatically trigger the upload after creating salary month:
            // triggerAttendanceUpload();
        } catch (error) {
            console.error("Error creating salary month:", error);
            alert("Failed to create salary month. Please try again.");
        } finally {
            setIsCreatingSalaryMonth(false);
        }
    };

    const breadcrumbItems = [
        { label: 'Attendance Menu', href: '/attendance', isCurrentPage: true }
    ];

    const dropzoneTypes = [
        { value: "attendance", label: "Attendance Dropzone" },
        { value: "holiday", label: "Holiday Dropzone" },
    ];

    // Modified renderDropzone to include the prepare button
    const renderDropzone = () => {
        switch (selectedDropzone) {
            case "attendance":
                return (
                    <div>
                        <div className="mb-4">
                            <Button 
                                color="secondary" 
                                variant="flat" 
                                onPress={handleBeforeUpload} 
                                aria-label="Prepare Salary Month"
                                className="px-4 py-2"
                            >
                                Prepare Salary Month
                            </Button>
                            <span className="ml-2 text-xs text-gray-600">
                                (Must be done before uploading attendance data)
                            </span>
                        </div>
                        <AttendanceDropzone />
                    </div>
                );
            case "holiday":
                return <HolidayDropzone />;
            default:
                return <AttendanceDropzone />;
        }
    };

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

            {/* Breadcrumb with better positioning */}
            <div className="absolute top-6 left-6 z-10">
                <GeneralBreadCrumb items={breadcrumbItems} />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto mt-20">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Attendance Section */}
                    <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 lg:col-span-2">
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-black">Attendance</h1>
                                <div className="flex gap-4 items-center">
                                    <Select 
                                        placeholder="Select dropzone type"
                                        selectedKeys={[selectedDropzone]}
                                        onChange={(e) => setSelectedDropzone(e.target.value)}
                                        className="w-48"
                                    >
                                        {dropzoneTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <Button 
                                        color="primary" 
                                        variant="flat" 
                                        onPress={handleNewClick} 
                                        aria-label="View Attendance"
                                        className="px-4 py-2"
                                    >
                                        View Attendance
                                    </Button>
                                </div>
                            </div>
                            <div className="py-2">
                                {renderDropzone()}
                            </div>
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
                        <div className="flex flex-col">
                            <h1 className="text-2xl font-bold text-black mb-6">My Calendar</h1>
                            <div className="py-2">
                                <iframe
                                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FColombo&bgcolor=%234285F4&showTitle=0&showNav=0&showPrint=0&showTabs=0&src=c21hcnRzeXN0ZW1hbGw2MjNAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4ubGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043"
                                    style={{ border: '0', width: '100%', height: '400px' }}
                                    title="Google Calendar"
                                    aria-label="Google Calendar"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* View Attendance Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalContent className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl">
                    <ModalHeader className="text-xl font-bold text-black">View Attendance</ModalHeader>
                    <ModalBody>
                        <div className="space-y-6">
                            {/* Employee Select */}
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Employee
                            </label>
                            <select
                                value={selectedEmployee || ""}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                className="w-full border rounded-md p-2"
                            >
                                <option value="" disabled>Select an employee</option>
                                {employees.map((employee) => (
                                <option key={employee.userId} value={employee.userId}>
                                    {employee.name}
                                </option>
                                ))}
                            </select>
                            </div>

                            {/* Month Picker */}
                            <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Select Month
                            </label>
                            <DatePicker
                                selected={selectedMonth}
                                onChange={(date) => setSelectedMonth(date)}
                                dateFormat="yyyy/MM"
                                showMonthYearPicker
                                className="w-full border rounded-md p-2"
                            />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button 
                            color="primary" 
                            variant="flat" 
                            onPress={handleViewAttendance}
                            disabled={!selectedEmployee || !selectedMonth}
                        >
                            View
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* New Salary Month Modal */}
            <Modal isOpen={isSalaryMonthModalOpen} onClose={handleCloseSalaryMonthModal}>
                <ModalContent className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl">
                    <ModalHeader className="text-xl font-bold text-black">Prepare Salary Month</ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Please select the year and month for which you want to prepare the attendance data.
                                This will create attendance entries from the 21st of the previous month to the 20th of the selected month.
                            </p>
                            
                            {/* Month Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Year and Month
                                </label>
                                <DatePicker
                                    selected={selectedSalaryMonth}
                                    onChange={(date) => setSelectedSalaryMonth(date)}
                                    dateFormat="yyyy/MM"
                                    showMonthYearPicker
                                    className="w-full border rounded-md p-2"
                                    placeholderText="Select year and month"
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={handleCloseSalaryMonthModal}>
                            Cancel
                        </Button>
                        <Button 
                            color="primary" 
                            variant="flat" 
                            onPress={handleCreateSalaryMonth}
                            disabled={!selectedSalaryMonth || isCreatingSalaryMonth}
                            isLoading={isCreatingSalaryMonth}
                        >
                            {isCreatingSalaryMonth ? "Creating..." : "Create Salary Month"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default Attendance;