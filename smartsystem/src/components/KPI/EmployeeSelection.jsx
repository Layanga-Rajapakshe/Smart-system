import React, { useState, useEffect } from "react";
import { 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Box, 
  CircularProgress 
} from "@mui/material";
import axios from "axios";

const EmployeeSelection = ({ onSelect, onMonthChange }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7) // Current month in YYYY-MM format
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setLoading(false);
    }
  };

  const handleEmployeeChange = (event) => {
    const employee = event.target.value;
    setSelectedEmployee(employee);
    onSelect(employee);
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    onMonthChange(month);
  };

  return (
    <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
      <FormControl sx={{ flex: 1 }}>
        <InputLabel id="employee-select-label">Employee</InputLabel>
        <Select
          labelId="employee-select-label"
          value={selectedEmployee}
          onChange={handleEmployeeChange}
          label="Employee"
          size="small"
          disabled={loading}
          startAdornment={
            loading ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null
          }
        >
          {employees.map((employee) => (
            <MenuItem key={employee._id} value={employee}>
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
          onChange={handleMonthChange}
          InputLabelProps={{ shrink: true }}
          size="small"
        />
      </FormControl>
    </Box>
  );
};

export default EmployeeSelection;