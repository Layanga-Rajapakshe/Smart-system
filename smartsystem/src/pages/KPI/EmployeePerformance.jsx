import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { grey, blue, green } from "@mui/material/colors";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const employeeData = {
  name: "John Doe",
  image: "https://via.placeholder.com/100",
  division: "Sales",
  supervisor: "Jane Smith",
  recentPerformance: [9, 8, 7, 8, 10],
  yearPerformance: [
    { month: "January", score: 7.8 },
    { month: "February", score: 8.1 },
    { month: "March", score: 8.0 },
    { month: "April", score: 8.7 },
    { month: "May", score: 8.3 },
    { month: "June", score: 7.9 },
    { month: "July", score: 8.2 },
    { month: "August", score: 8.5 },
    { month: "September", score: 8.0 },
    { month: "October", score: 8.6 },
    { month: "November", score: 8.4 },
    { month: "December", score: 8.8 },
  ],
};

const calculateOverallKPI = (scores) => {
  const total = scores.reduce((acc, score) => acc + score, 0);
  return (total / scores.length).toFixed(2);
};

const EmployeePerformance = () => {
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [showYearGraph, setShowYearGraph] = useState(false);

  useEffect(() => {
    setSelectedPerformance(employeeData.recentPerformance);
  }, []);

  const handleViewYearGraph = () => {
    setShowYearGraph(true);
  };

  // Data for the graph
  const graphData = {
    labels: employeeData.yearPerformance.map((item) => item.month),
    datasets: [
      {
        label: "Monthly KPI Score",
        data: employeeData.yearPerformance.map((item) => item.score),
        borderColor: blue[500],
        backgroundColor: blue[100],
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      {/* Main Heading */}
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom sx={{ mb: 4 }}>
        📈 Employee Performance Dashboard
      </Typography>

      {/* Employee Information Section */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 4 }}>
        <Avatar src={employeeData.image} sx={{ width: 120, height: 120 }} />
        <Box sx={{ ml: 3 }}>
          <Typography variant="h5" fontWeight="bold">
            {employeeData.name}
          </Typography>
          <Typography>Division: {employeeData.division}</Typography>
          <Typography>Supervisor: {employeeData.supervisor}</Typography>

          {/* Overall KPI Section */}
          {selectedPerformance && (
            <Box sx={{ mt: 2, padding: 2, backgroundColor: green[100], borderRadius: 2 }}>
              <Typography fontWeight="bold">
                ⭐ Overall KPI Score: {calculateOverallKPI(selectedPerformance)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Recent Performance Section */}
      <Paper sx={{ padding: 3, mb: 4, boxShadow: 4, borderRadius: 2 }}>
        <Typography variant="h6" fontWeight="bold" align="center">
          Recent Month's Performance 📅
        </Typography>

        {selectedPerformance && (
          <>
            {/* Table showing recent month's KPIs */}
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Attitude", "Skills", "Performance", "Teamwork", "Adaptability"].map((header) => (
                      <TableCell key={header} align="center">
                        {header}
                      </TableCell>
                    ))}
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      Overall KPI
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    {selectedPerformance.map((score, idx) => (
                      <TableCell key={idx} align="center">
                        {score}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      {calculateOverallKPI(selectedPerformance)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: blue[500], color: "white", mt: 2 }}
                onClick={handleViewYearGraph}
              >
                📉 View Year Performance Graph
              </Button>
            </Box>
          </>
        )}
      </Paper>

      {/* Year Performance Graph */}
      {showYearGraph && (
        <Paper sx={{ padding: 3, mb: 5, boxShadow: 4, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" align="center">
            📉 Year Performance Graph
          </Typography>
          <Line data={graphData} options={graphOptions} />
        </Paper>
      )}
    </Container>
  );
};

export default EmployeePerformance;
