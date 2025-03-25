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
  // New state variables for popup
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" or "warning"
  
  const navigate = useNavigate();

  const handleAddScores = () => {
    if (!selectedEmployee) {
      setPopupMessage("Please select an employee.");
      setPopupType("warning");
      setShowPopup(true);
    } else if (!selectedMonth) {
      setPopupMessage("Please select a month.");
      setPopupType("warning");
      setShowPopup(true);
    } else {
      // All validation passed, show success popup first
      setPopupMessage(`Successfully added scores for ${selectedEmployee.name}!`);
      setPopupType("success");
      setShowPopup(true);
    }
  };

  const confirmAddScores = () => {
    // Only proceed with score addition if it was a success popup
    if (popupType === "success") {
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
    
    // Close the popup in any case
    setShowPopup(false);
  };

  const handleViewAnalysis = () => {
    setShowChart(true);
  };

  const handleViewKPIDetails = () => {
    navigate("/employeesOverall", { state: { employeeScores } });
  };

  const handleViewKPIParameters = () => {
    navigate("/kpidetails");
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
        {/* Centered title and button */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-black mb-4">
            KPI Dashboard
          </h1>
          <Button
            color="primary"
            variant="bordered"
            onClick={handleViewKPIParameters}
            className="mx-auto"
          >
            {/* Use an icon if available or omit if not */}
            <span className="mr-2">📋</span>
            View KPI Parameter Details
          </Button>
        </div>

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

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 border border-blue-200 hover:shadow-md transition-all bg-gradient-to-r from-blue-50 to-white">
              <div className="flex flex-col items-center">
                <div className="text-blue-500 mb-2 text-3xl">📊</div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Record Performance</h3>
                <Button
                  onClick={handleAddScores}
                  color="primary"
                  className="w-full justify-center rounded-lg font-semibold"
                >
                  Add Score
                </Button>
              </div>
            </Card>

            <Card className="p-4 border border-purple-200 hover:shadow-md transition-all bg-gradient-to-r from-purple-50 to-white">
              <div className="flex flex-col items-center">
                <div className="text-purple-500 mb-2 text-3xl">📈</div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Performance Trends</h3>
                <Button
                  onClick={handleViewAnalysis}
                  color="primary"
                  className="w-full justify-center rounded-lg font-semibold"
                >
                  View Analysis
                </Button>
              </div>
            </Card>

            <Card className="p-4 border border-green-200 hover:shadow-md transition-all bg-gradient-to-r from-green-50 to-white">
              <div className="flex flex-col items-center">
                <div className="text-green-500 mb-2 text-3xl">📝</div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Complete Report</h3>
                <Button
                  onClick={handleViewKPIDetails}
                  color="primary"
                  variant="bordered"
                  className="w-full justify-center rounded-lg font-semibold"
                >
                  View Overall KPI Scores
                </Button>
              </div>
            </Card>
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

      {/* Success/Warning Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setShowPopup(false)}></div>
          <Card className={`relative z-10 w-96 p-6 shadow-2xl bg-white rounded-2xl border ${
            popupType === "success" ? "border-green-300" : "border-red-300"
          }`}>
            <div className="flex flex-col items-center">
              <div className={`text-5xl mb-4 ${
                popupType === "success" ? "text-green-500" : "text-red-500"
              }`}>
                {popupType === "success" ? "✅" : "⚠️"}
              </div>
              <h2 className={`text-xl font-semibold text-center mb-4 ${
                popupType === "success" ? "text-green-700" : "text-red-700"
              }`}>
                {popupType === "success" ? "Success" : "Warning"}
              </h2>
              <p className="text-gray-700 mb-6 text-center">
                {popupMessage}
              </p>
              <div className="flex justify-center gap-4">
                {popupType === "warning" ? (
                  <Button
                    onClick={() => setShowPopup(false)}
                    color="danger"
                    className="px-6 py-2 rounded-full font-semibold"
                  >
                    Ok
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => setShowPopup(false)}
                      color="secondary"
                      className="px-6 py-2 rounded-full font-semibold"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={confirmAddScores}
                      color="primary"
                      className="px-6 py-2 rounded-full font-semibold"
                    >
                      Confirm
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KPIDashboard;