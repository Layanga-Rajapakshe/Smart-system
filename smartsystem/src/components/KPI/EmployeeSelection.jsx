// src/components/KPI/EmployeeSelection.jsx
import React from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const EmployeeSelection = ({ employees, onSelect, onMonthChange }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
    <FormControl fullWidth style={{ marginRight: 20 }}>
      <InputLabel>Employee</InputLabel>
      <Select onChange={(e) => onSelect(e.target.value)} label="Employee">
        {employees.map((employee) => (
          <MenuItem key={employee.id} value={employee}>
            {employee.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <TextField
      label="Month"
      type="month"
      onChange={(e) => onMonthChange(e.target.value)}
      InputLabelProps={{ shrink: true }}
      fullWidth
    />
  </div>
);

export default EmployeeSelection;
