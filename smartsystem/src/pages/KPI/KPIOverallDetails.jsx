import React from "react";
import { useLocation } from "react-router-dom";
import {Container,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Card,Avatar,Box,Divider,Tooltip,Stack,} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import { styled } from "@mui/system";
import { amber, grey, green } from "@mui/material/colors";


const EmployeeOfTheMonthCard = styled(Card)(({
  display: "flex",
  alignItems: "center",
  padding: "20px",
  marginBottom: "20px",
  backgroundColor: "#39ad2f", 
  color: "white",
  boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  animation: "bounce 1s infinite alternate",
  "&:hover": {
    transform: "scale(1.02)", 
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
  },
  "@keyframes bounce": {
    "0%": { transform: "translateY(0)" },
    "100%": { transform: "translateY(-8px)" },
  },
}));

const EmployeeDetailsContainer = styled(Box)(({
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  flexGrow: 1, 
}));

const TrophyIcon = styled(EmojiEventsIcon)(({
  fontSize: 80,
  color: "gold",
  marginLeft: "auto", 
  marginRight: "10px",
  animation: "blink 1.5s infinite alternate",
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "100%": { opacity: 0.5 }, 
  },
}));

const StarContainer = styled(Box)(({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

const Star = styled(StarIcon)(({
  position: "absolute",
  color: "yellow",
  fontSize: 24,
  animation: "twinkle 1.5s infinite", 
  "@keyframes twinkle": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.7 },
    "100%": { opacity: 1 },
  },
}));

const starsPosition = [
  { top: -30, left: -30 }, 
  { top: -30, right: -30 }, 
  { bottom: -30, left: -30 },
  { bottom: -30, right: -30 }, 
  { top: 10, left: 0 }, 
  { bottom: 10, right: 0 }, 
];

const KPIOverallDetails = () => {
  const location = useLocation();
  const employeeScores = location.state?.employeeScores || [];

  
  if (employeeScores.length === 0) {
    console.warn("No employee data provided.");
    return <Typography variant="h6" color="error">No employee data available.</Typography>;
  }


  const employeeOfTheMonth = employeeScores.reduce((prev, current) =>
    prev.scores[5] > current.scores[5] ? prev : current
  );

 
  const calculateOverallKPI = (scores) => {
    const total = scores.slice(0, 5).reduce((acc, score) => acc + score, 0);
    return (total / 5).toFixed(2); // Tharindu, Make the changes as your algorithm
    //Divide by 5 and round to 2 decimal places.
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "30px", marginBottom: "30px" }}>
      <Typography variant="h4" fontWeight="bold" color="textPrimary" align="center" gutterBottom>
        Keep Performance Indicator
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" align="center" paragraph>
        A comprehensive analysis of employees' Key Performance Indicators (KPIs) to assess and celebrate outstanding
        achievements and identify areas for growth.
      </Typography>
      <Divider sx={{ marginY: "20px" }} />

      {/* Employee of the Month Section */}
      <EmployeeOfTheMonthCard>
        <Avatar src={employeeOfTheMonth.image} sx={{ width: 100, height: 100, border: `4px solid ${green[700]}` }} />
        <EmployeeDetailsContainer>
          <Typography variant="h5" fontWeight="bold" color="inherit">
            Employee of the Month
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            {employeeOfTheMonth.name}
          </Typography>
          <Typography variant="body2" color="inherit">
            <strong>Age:</strong> {employeeOfTheMonth.age} | <strong>Division:</strong> {employeeOfTheMonth.division}
          </Typography>
          <Typography variant="body2" color="inherit">
            <strong>Supervisor:</strong> {employeeOfTheMonth.supervisor}
          </Typography>
          <Typography variant="body2" color="inherit">
            <strong>Total KPI Score:</strong> {calculateOverallKPI(employeeOfTheMonth.scores)}
          </Typography>
        </EmployeeDetailsContainer>
        <StarContainer>
          {starsPosition.map((position, index) => (
            <Star key={index} sx={{ top: position.top, left: position.left, right: position.right, bottom: position.bottom }} />
          ))}
          <Tooltip title="Awarded for outstanding performance">
            <TrophyIcon /> 
          </Tooltip>
        </StarContainer>
      </EmployeeOfTheMonthCard>

      {/* KPI Overall Details Table */}
      <Paper elevation={4} sx={{ padding: "20px", borderRadius: "12px", backgroundColor: grey[50] }}>
        <Typography variant="h4" fontWeight="bold" color="textSecondary" gutterBottom align="center">
          KPI Overall Performance Summary
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" paragraph>
          This table provides an in-depth look at each employee's performance across various KPI categories,
          with an emphasis on key strengths and potential growth areas.
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: amber[100] }}>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Attitude</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Habits</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Skills</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Performance</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Subject Specific</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>Overall KPI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeScores.map((employee, index) => (
                <TableRow key={index} hover>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "textPrimary" }}>
                    {employee.name}
                  </TableCell>
                  {employee.scores.slice(0, 5).map((score, i) => (
                    <TableCell key={i} align="center">{score}</TableCell>
                  ))}
                  <TableCell align="center" sx={{ fontWeight: "bold", color: calculateOverallKPI(employee.scores) > 7 ? "green" : "red" }}>
                    {calculateOverallKPI(employee.scores)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ marginY: "20px" }} />
        <Stack direction="row" spacing={2} justifyContent="center">
          <Box textAlign="center">
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              Top Scorers
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Recognizing the top performers with outstanding KPI achievements.
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" color="textSecondary" fontWeight="bold">
              Improvement Areas
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Identifying key areas for improvement and development opportunities.
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default KPIOverallDetails;
