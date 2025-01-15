// EmployeeSelection.js
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField, Box } from "@mui/material";

const EmployeeSelection = ({ employees, onSelect, onMonthChange, selectedMonth }) => (
  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
    <FormControl sx={{ flex: 1 }}>
      <InputLabel>Employee</InputLabel>
      <Select
        value={selectedEmployee ? selectedEmployee._id : ""}
        onChange={(e) => onSelect(e.target.value)}
        label="Employee"
        size="small"
      >
        {employees.map((employee) => (
          <MenuItem key={employee._id} value={employee._id}>
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
        onChange={(e) => onMonthChange(e.target.value)}
        InputLabelProps={{ shrink: true }}
        size="small"
      />
    </FormControl>
  </Box>
);

export default EmployeeSelection;
