import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, Paper, Typography, Tooltip } from "@mui/material";

const parameters = ["Attitude", "Habits", "Skills", "Performance", "Subject Specific"];

const getComment = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5) return "Average";
  if (score >= 3) return "Below Average";
  return "Very Poor";
};

const ScoreTable = ({ scores, setScores }) => {
  const calculateOverallKPI = () => {
    const sum = scores.reduce((acc, score) => acc + (score || 0), 0);
    return (sum / 5).toFixed(1);
  };

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
        KPI Score Table
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", width: "30%", py: 0.5 }}>Parameter</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "30%", textAlign: "center", py: 0.5 }}>Score</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "40%", textAlign: "center", py: 0.5 }}>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((parameter, index) => (
              <TableRow key={index}>
                <TableCell>{parameter}</TableCell>
                <TableCell align="center">
                  <Tooltip title={`Score: ${scores[index]}`} arrow>
                    <Slider
                      value={scores[index]}
                      onChange={(e, value) => handleScoreChange(index, value)}
                      step={1}
                      min={0}
                      max={10}
                      marks
                      sx={{ width: "90%" }}
                      valueLabelDisplay="auto"
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="center">{getComment(scores[index])}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#00796b" }}>Overall KPI</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#00796b" }}>
                {calculateOverallKPI()}
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "#00796b" }}>
                {getComment(calculateOverallKPI())}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ScoreTable;
