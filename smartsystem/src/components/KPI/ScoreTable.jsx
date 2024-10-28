import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Paper, Typography } from "@mui/material";

const parameters = ["Attitude", "Habits", "Skills", "Performance", "Subject Specific", "Overall KPI"];

const getComment = (score) => {
  if (score >= 9) return "Excellent";
  if (score >= 7) return "Good";
  if (score >= 5) return "Average";
  if (score >= 3) return "Below Average";
  if (score >= 0) return "Very Poor";
  return ""; // Default for undefined scores
};

const ScoreTable = ({ scores, setScores }) => {
  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = parseFloat(value);
    setScores(newScores);
  };

  return (
    <Paper elevation={3} sx={{ padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      <Typography variant="h6" component="h2" sx={{ marginBottom: '16px', fontWeight: 'bold', textAlign: 'center' }}>
        KPI Score Table
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '14px', padding: '4px', backgroundColor: '#f5f5f5', textAlign: 'center' }}>Parameter</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '14px', padding: '4px', backgroundColor: '#f5f5f5', textAlign: 'center' }}>Score (0-10)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '14px', padding: '4px', backgroundColor: '#f5f5f5', textAlign: 'center' }}>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map((parameter, index) => (
              <TableRow key={parameter}>
                <TableCell sx={{ padding: '4px', borderBottom: '1px solid #ddd', textAlign: 'center', fontSize: '12px' }}>{parameter}</TableCell>
                <TableCell sx={{ padding: '4px', borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                  <TextField
                    type="number"
                    inputProps={{ min: 0, max: 10 }}
                    value={scores[index]}
                    onChange={(e) => handleScoreChange(index, e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ width: '60px' }} // Sets a fixed width for a consistent look
                  />
                </TableCell>
                <TableCell sx={{ padding: '4px', borderBottom: '1px solid #ddd', textAlign: 'center', fontSize: '12px' }}>
                  {getComment(scores[index])} {/* Display the comment based on the score */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ScoreTable;
