import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, Paper, Typography, Tooltip } from "@mui/material";
import axios from "axios";

const getComment = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5) return "Average";
  if (score >= 3) return "Below Average";
  return "Very Poor";
};

const ScoreTable = () => {
  const [categories, setCategories] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4400/api/kpiParameter/");
        setCategories(response.data);

        // Initialize scores with empty values
        const initialScores = {};
        response.data.forEach((category) => {
          initialScores[category.name] = {
            subParams: Array(category.parameters.length).fill(0),
          };
        });
        setScores(initialScores);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const calculateOverallKPI = () => {
    const sum = Object.values(scores).reduce(
      (acc, category) => acc + category.subParams.reduce((subAcc, score) => subAcc + (score || 0), 0),
      0
    );
    const totalSubParams = Object.values(scores).reduce((acc, category) => acc + category.subParams.length, 0);
    return totalSubParams > 0 ? (sum / totalSubParams).toFixed(1) : 0;
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
                {category.parameters.map((parameter, index) => (
                  <TableRow key={parameter._id}>
                    <TableCell>{parameter.name}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={`Score: ${scores[category.name]?.subParams[index] || 0}`} arrow>
                        <Slider
                          value={scores[category.name]?.subParams[index] || 0}
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
                    <TableCell align="center">{getComment(scores[category.name]?.subParams[index] || 0)}</TableCell>
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
