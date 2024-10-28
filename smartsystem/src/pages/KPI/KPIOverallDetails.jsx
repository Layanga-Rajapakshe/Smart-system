// src/pages/KPI/KPIOverallDetails.jsx

import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const KPIOverallDetails = () => {
  const location = useLocation();
  const employeeScores = location.state?.employeeScores || [];

  return (
    <Container>
      <h2>KPI Overall Details</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Attitude</TableCell>
              <TableCell>Habits</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell>Performance</TableCell>
              <TableCell>Subject Specific</TableCell>
              <TableCell>Overall KPI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeScores.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.name}</TableCell>
                {employee.scores.map((score, i) => (
                  <TableCell key={i}>{score}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default KPIOverallDetails;
