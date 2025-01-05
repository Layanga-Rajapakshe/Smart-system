import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, Paper, Typography, Tooltip } from "@mui/material";

const categories = [
  { name: "Attitude", subParams: ["Communication", "Behavior", "Teamwork"] },
  { name: "Habits", subParams: ["Punctuality", "Consistency", "Proactiveness"] },
  { name: "Skills", subParams: ["Technical Skills", "Problem Solving", "Creativity"] },
  { name: "Performance", subParams: ["Task Completion", "Efficiency", "Quality of Work"] },
  { name: "Subject Specific", subParams: ["Knowledge", "Application", "Research"] },
];

const getComment = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5) return "Average";
  if (score >= 3) return "Below Average";
  return "Very Poor";
};

const ScoreTable = ({ scores, setScores }) => {
  const calculateOverallKPI = () => {
    const sum = Object.values(scores).reduce((acc, category) => acc + category.subParams.reduce((subAcc, score) => subAcc + (score || 0), 0), 0);
    const totalSubParams = Object.values(scores).reduce((acc, category) => acc + category.subParams.length, 0);
    return (sum / totalSubParams).toFixed(1);
  };

  const handleScoreChange = (category, index, value) => {
    const newScores = { ...scores };
    newScores[category].subParams[index] = value;
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
              <TableCell sx={{ fontWeight: "bold", width: "30%", py: 0.5 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "30%", textAlign: "center", py: 0.5 }}>Score</TableCell>
              <TableCell sx={{ fontWeight: "bold", width: "40%", textAlign: "center", py: 0.5 }}>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <React.Fragment key={category.name}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }} colSpan={3}>
                    {category.name}
                  </TableCell>
                </TableRow>
                {category.subParams.map((subParam, index) => (
                  <TableRow key={index}>
                    <TableCell>{subParam}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={`Score: ${scores[category.name].subParams[index]}`} arrow>
                        <Slider
                          value={scores[category.name].subParams[index]}
                          onChange={(e, value) => handleScoreChange(category.name, index, value)}
                          step={1}
                          min={0}
                          max={10}
                          marks
                          sx={{ width: "90%" }}
                          valueLabelDisplay="auto"
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">{getComment(scores[category.name].subParams[index])}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
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
