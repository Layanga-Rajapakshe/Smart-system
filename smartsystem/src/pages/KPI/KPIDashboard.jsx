import React, { useState } from "react";
import { Button, Card, Image, Select } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/KPI/Header";
import ScoreTable from "../../components/KPI/ScoreTable";
import KPIChart from "../../components/KPI/KPIChart";
import EmployeeDetails from "../../components/KPI/EmployeeDetails";
import { sampleEmployees } from "../../components/KPI/SampleData";
import backgroundImage from '../../assets/images/background1.png';

const EmployeeSelection = ({ employees, onSelect, onMonthChange, selectedMonth }) => {
  // Transform employees into format expected by HeroUI Select
  const employeeOptions = employees.map(employee => ({
    value: employee,
    label: employee.name
  }));
  
  // Add a placeholder option
  const options = [
    { value: "", label: "Select an employee" },
    ...employeeOptions
  ];

  return (
    <div className="flex w-full gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
        <Select 
          options={options}
          onChange={(selectedOption) => onSelect(selectedOption.value)}
          className="w-full"
          placeholder="Select an employee"
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

const KPIDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [scores, setScores] = useState({
    Attitude: { subParams: Array(3).fill(0) },
    Habits: { subParams: Array(3).fill(0) },
    Skills: { subParams: Array(3).fill(0) },
    Performance: { subParams: Array(3).fill(0) },
    "Subject Specific": { subParams: Array(3).fill(0) },
  });
  const [employeeScores, setEmployeeScores] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleAddScores = () => {
    if (!selectedEmployee) {
      setErrorMessage("Please select an employee.");
    } else if (!selectedMonth) {
      setErrorMessage("Please select a month.");
    } else {
      const newEntry = { ...selectedEmployee, scores, month: selectedMonth, comment };
      setEmployeeScores([...employeeScores, newEntry]);
      setSelectedEmployee(null);
      setScores({
        Attitude: { subParams: Array(3).fill(0) },
        Habits: { subParams: Array(3).fill(0) },
        Skills: { subParams: Array(3).fill(0) },
        Performance: { subParams: Array(3).fill(0) },
        "Subject Specific": { subParams: Array(3).fill(0) },
      });
      setComment("");
      setErrorMessage("");
      setSuccessMessage("Successfully added scores!");
    }
  };

  const handleViewAnalysis = () => {
    setShowChart(true);
  };

  const handleViewKPIDetails = () => {
    navigate("/kpi-overall-details", { state: { employeeScores } });
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black rounded-2xl bg-opacity-50 backdrop-blur-md"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-6 px-4">
        <h1 className="text-3xl font-semibold text-black text-center mb-6">
          KPI Dashboard
        </h1>
        
        <Card className="p-6 shadow-2xl bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 mb-6">
          <div className="mb-4">
            <EmployeeSelection
              employees={sampleEmployees}
              onSelect={(employee) => {
                setSelectedEmployee(employee);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              onMonthChange={(month) => {
                setSelectedMonth(month);
                if (month) setErrorMessage("");
              }}
              selectedMonth={selectedMonth}
            />
          </div>

          <EmployeeDetails employee={selectedEmployee} />

          {successMessage && (
            <div className="mt-4 text-center text-green-600 font-semibold text-lg">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 text-center text-red-600 font-semibold">
              {errorMessage}
            </div>
          )}

          <div className="mt-6">
            <ScoreTable scores={scores} setScores={setScores} />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Supervisor's Comment
            </h2>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 h-32"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comments about the employee's performance"
            />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              onClick={handleAddScores}
              color="primary"
              className="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
            >
              Add Score
            </Button>
            <Button
              onClick={handleViewAnalysis}
              color="primary"
              className="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
            >
              View Analysis
            </Button>
            <Button
              onClick={handleViewKPIDetails}
              color="secondary"
              className="px-6 py-2 rounded-full font-semibold transition-all hover:scale-105"
            >
              View Overall KPI Details
            </Button>
          </div>
        </Card>
      </div>

      {/* Analysis Modal */}
      {showChart && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowChart(false)}></div>
          <Card className="relative z-10 w-4/5 p-6 shadow-2xl bg-white rounded-2xl border border-white/40">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
              KPI Analysis Chart
            </h2>
            <KPIChart employeeScores={employeeScores} />
            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => setShowChart(false)}
                color="danger"
                className="px-6 py-2 rounded-full font-semibold"
              >
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KPIDashboard;