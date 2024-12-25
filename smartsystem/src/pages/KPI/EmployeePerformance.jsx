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
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { grey, blue, green, yellow } from "@mui/material/colors";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarsIcon from "@mui/icons-material/Stars";
import AssessmentIcon from "@mui/icons-material/Assessment";

const employeeData = {
  name: "John Doe",
  image: "https://via.placeholder.com/100",
  division: "Sales",
  supervisor: "Jane Smith",
  recentPerformance: [9, 8, 7, 8, 10],
  pastPerformances: [
    { month: "March", year: 2024, scores: [7, 7, 8, 8, 9], feedback: "Great leadership skills." },
    { month: "April", year: 2024, scores: [8, 9, 9, 8, 10], feedback: "Excellent teamwork and progress." },
    { month: "May", year: 2024, scores: [7, 8, 9, 8, 7], feedback: "Steady improvement." },
  ],
};

const calculateOverallKPI = (scores) => {
  const total = scores.reduce((acc, score) => acc + score, 0);
  return (total / scores.length).toFixed(2);
};

const EmployeePerformance = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [past3Months, setPast3Months] = useState([]);
  const [showPast3Months, setShowPast3Months] = useState(false);

  useEffect(() => {
    setSelectedPerformance(employeeData.pastPerformances[employeeData.pastPerformances.length - 1]);
  }, []);

  const handleViewPast3Months = () => {
    setPast3Months(employeeData.pastPerformances.slice(0, 3));
    setShowPast3Months(true);
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
                ⭐ Overall KPI Score: {calculateOverallKPI(selectedPerformance.scores)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Past Performance in Recent Month */}
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
                    {selectedPerformance.scores.map((score, idx) => (
                      <TableCell key={idx} align="center">
                        {score}
                      </TableCell>
                    ))}
                    <TableCell align="center">
                      {calculateOverallKPI(selectedPerformance.scores)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: blue[500], color: "white", mt: 2 }}
                onClick={handleViewPast3Months}
              >
                📊 View Past 3 Months Performance
              </Button>
            </Box>
          </>
        )}
      </Paper>

      {/* Past 3 Months View */}
      {showPast3Months && (
        <Paper sx={{ padding: 3, mb: 5, boxShadow: 4, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" align="center">
            🔍 Past 3 Months Insights
          </Typography>

          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {["Month", "Year", "KPI Details", "Feedback"].map((header) => (
                    <TableCell key={header} align="center">
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {past3Months.map((item) => (
                  <TableRow key={`${item.month}-${item.year}`}>
                    <TableCell align="center">{item.month}</TableCell>
                    <TableCell align="center">{item.year}</TableCell>
                    <TableCell align="center">
                      {item.scores.join(", ")}
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{item.feedback}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default EmployeePerformance;
