import React, { useState } from "react";
import { Button, Container, Box, Stack, Typography, Paper } from "@mui/material";
import Header from "../../components/KPI/Header";
import EmployeeSelection from "../../components/KPI/EmployeeSelection";
import ScoreTable from "../../components/KPI/ScoreTable";
import KPIChart from "../../components/KPI/KPIChart";
import { useNavigate } from "react-router-dom";

const sampleEmployees = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Emily Johnson' }
];

const KPIDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [scores, setScores] = useState(Array(6).fill(0));
  const [employeeScores, setEmployeeScores] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const navigate = useNavigate();

  const handleAddScores = () => {
    if (selectedEmployee) {
      const newEntry = { ...selectedEmployee, scores };
      setEmployeeScores([...employeeScores, newEntry]);
      setSelectedEmployee(null); // Reset the selected employee
      setScores(Array(6).fill(0)); // Reset scores after adding
    }
  };

  const handleViewAnalysis = () => {
    setShowChart(true);
  };

  const handleViewKPIDetails = () => {
    navigate('/kpi-overall-details', { state: { employeeScores } });
  };

  const handleViewOverallKPI = () => {
    // Logic for viewing overall KPI can be implemented here
    console.log("Viewing Overall KPI");
  };

  return (
    <Container>
      <Header />
      <EmployeeSelection employees={sampleEmployees} onSelect={setSelectedEmployee} />

      {!selectedEmployee ? (
        <Paper elevation={2} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            KPI Scoring Guidelines
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            Each employee is evaluated based on several KPI parameters, ranging from Attitude, Habits, Skills, and Performance to Subject-specific knowledge and Overall KPI. The scores are scaled from 0 to 10, where:
          </Typography>
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body2" component="ul" sx={{ lineHeight: 1.6 }}>
              <li><strong>0-2:</strong> Very Poor - The employee shows minimal capability or effort in this area.</li>
              <li><strong>3-4:</strong> Below Average - The employee needs significant improvement to meet expectations.</li>
              <li><strong>5-6:</strong> Average - The employee meets the basic expectations but has room for growth.</li>
              <li><strong>7-8:</strong> Good - The employee demonstrates strong performance and exceeds basic requirements.</li>
              <li><strong>9-10:</strong> Excellent - The employee consistently exceeds expectations and excels in this area.</li>
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ marginTop: 2, lineHeight: 1.8 }}>
            Supervisors should assign scores thoughtfully, considering the employee's contributions, consistency, and improvement over time. Use this scale as a guideline to provide constructive feedback that supports professional growth and development.
          </Typography>
        </Paper>
      ) : (
        <>
          <ScoreTable scores={scores} setScores={setScores} />
          <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: 'space-between' }}>
            <Box>
              <Button
                onClick={handleAddScores}
                sx={{
                  backgroundColor: '#cce6ff',
                  color: '#0066cc',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#b3d9ff',
                  },
                }}
              >
                Add
              </Button>
              <Button
                onClick={handleViewAnalysis}
                sx={{
                  backgroundColor: '#cce6ff',
                  color: '#0066cc',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#b3d9ff',
                  },
                }}
              >
                View Analysis
              </Button>
            </Box>
            <Box>
              
              <Button
                onClick={handleViewKPIDetails}
                sx={{
                  backgroundColor: '#d3d3d3',
                  color: '#333',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#bfbfbf',
                  },
                }}
              >
                View KPI Overall Details
              </Button>
            </Box>
          </Stack>
        </>
      )}

      {showChart && (
        <Box sx={{ marginTop: 4 }}>
          <KPIChart employeeScores={employeeScores} />
        </Box>
      )}
    </Container>
  );
};

export default KPIDashboard;
