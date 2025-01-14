import React, { useState, useEffect } from "react";
import { Button, Container, Box, Stack, Typography, Modal, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Header from "../../components/KPI/Header";
import ScoreTable from "../../components/KPI/ScoreTable";
import KPIChart from "../../components/KPI/KPIChart";
import EmployeeDetails from "../../components/KPI/EmployeeDetails";
import { useNavigate } from "react-router-dom";

const EmployeeSelection = ({ employees, onSelect, onMonthChange, selectedMonth }) => (
  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
    <FormControl sx={{ flex: 1 }}>
      <InputLabel>Employee</InputLabel>
      <Select onChange={(e) => onSelect(e.target.value)} label="Employee" size="small">
        {employees.map((employee) => (
          <MenuItem key={employee.id} value={employee}>
            {employee.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <FormControl sx={{ flex: 1 }}>
      <TextField
        label="Month"
        type="month"
        value={selectedMonth}
        onChange={(e) => {
          onMonthChange(e.target.value);
        }}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
    </FormControl>
  </Box>
);

const KPIDashboard = () => {
  const [employees, setEmployees] = useState([]);
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
  const [scoredEmployees, setScoredEmployees] = useState([]); // Track scored employees
  const navigate = useNavigate();
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:4400/api/employeesKPI");
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleSelectEmployee = async (employeeId) => {
    setSelectedEmployee(employeeId);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await fetch(`http://localhost:4400/api/employeesKPI/${employeeId}`);
      const data = await response.json();
      setSelectedEmployeeDetails(data);
    } catch (err) {
      console.error("Error fetching employee details:", err);
    }
  };

  const handleAddScores = async () => {
    if (!selectedEmployee) {
      setErrorMessage("Please select an employee.");
    } else if (!selectedMonth) {
      setErrorMessage("Please select a month.");
    } else {
      const categories = [
        { name: "Attitude", subParams: ["SubParam1", "SubParam2", "SubParam3"] },
        { name: "Habits", subParams: ["SubParam1", "SubParam2", "SubParam3"] },
        { name: "Skills", subParams: ["SubParam1", "SubParam2", "SubParam3"] },
        { name: "Performance", subParams: ["SubParam1", "SubParam2", "SubParam3"] },
        { name: "Subject Specific", subParams: ["SubParam1", "SubParam2", "SubParam3"] },
      ];
  
      const payload = {
        employeeId: selectedEmployee._id,
        categories: categories.map((category) => ({
          name: category.name,
          subParams: category.subParams.map((subParam, index) => ({
            name: subParam,
            score: scores[category.name]?.subParams[index] || 0,
          })),
        })),
        month: selectedMonth,
        comment: comment,
      };

      try {
        const response = await fetch("http://localhost:4400/api/kpis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to add KPI");
        }

        const data = await response.json();
        setEmployeeScores([...employeeScores, data]);
        setScoredEmployees([...scoredEmployees, selectedEmployee._id]); // Add employee to scored list
        setSelectedEmployee(null);
        setSelectedEmployeeDetails(null);
        setSelectedMonth("");
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
      } catch (err) {
        setErrorMessage(err.message);
        console.error("Error adding KPI:", err);
      }
    }
  };

  const handleViewAnalysis = () => {
    setShowChart(true);
  };

  const handleViewKPIDetails = () => {
    navigate("/kpi-overall-details", { state: { employeeScores } });
  };

  // Filter out scored employees from the employee dropdown list
  const availableEmployees = employees.filter(employee => !scoredEmployees.includes(employee._id));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Header />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <EmployeeSelection
          employees={availableEmployees} // Use only available employees
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
      </Box>

      <EmployeeDetails employee={selectedEmployee} />
      <EmployeeDetails employee={selectedEmployeeDetails} />

      {successMessage && (
        <Typography variant="h6" color="success" sx={{ mt: 1, textAlign: "center", fontWeight: 600 }}>
          {successMessage}
        </Typography>
      )}

      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 1, textAlign: "center", fontWeight: 600 }}>
          {errorMessage}
        </Typography>
      )}

      <ScoreTable scores={scores} setScores={setScores} />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          Supervisor's Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add comments about the employee’s performance"
        />
      </Box>

      <Stack direction="row" spacing={2} sx={{ mt: 3, justifyContent: "center" }}>
        <Button onClick={handleAddScores} variant="contained" color="primary" sx={{ borderRadius: "20px", px: 4, fontWeight: 600 }}>
          Add Score
        </Button>
        <Button onClick={handleViewAnalysis} variant="contained" color="primary" sx={{ borderRadius: "20px", px: 4, fontWeight: 600 }}>
          View Analysis
        </Button>
        <Button onClick={handleViewKPIDetails} variant="outlined" color="info" sx={{ borderRadius: "20px", px: 4, fontWeight: 600 }}>
          View Overall KPI Details
        </Button>
      </Stack>

      <Modal open={showChart} onClose={() => setShowChart(false)} aria-labelledby="analysis-chart" sx={{ display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(5px)" }}>
        <Box sx={{ width: "80%", bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography id="analysis-chart" variant="h6" component="h2" sx={{ mb: 2 }}>
            KPI Analysis Chart
          </Typography>
          <KPIChart employeeScores={employeeScores} />
          <Button onClick={() => setShowChart(false)} variant="contained" color="error" sx={{ mt: 3, borderRadius: "20px" }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default KPIDashboard;