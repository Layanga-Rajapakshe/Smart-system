import React from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Work as WorkIcon,
  SupervisorAccount as SupervisorAccountIcon,
  ListAlt as ListAltIcon,
  StarBorder as StarBorderIcon,
  EmojiPeople as EmojiPeopleIcon,
} from "@mui/icons-material";

const EmployeeDetails = ({ employee }) => {
  if (!employee) return null; 

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 3,
        p: 2,
        backgroundColor: "#fff",
        border: "none",
        
        maxWidth: 700,
        margin: "0 auto",
      }}
    >
      <Avatar
        src={employee.imageUrl}
        alt={employee.name}
        sx={{ width: 120, height: 120, mb: 1 }}
      />
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        {employee.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon sx={{ color: "#1976d2", mr: 1 }} /> Age: {employee.age}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <WorkIcon sx={{ color: "#1976d2", mr: 1 }} /> Division: {employee.division}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <AssignmentTurnedInIcon sx={{ color: "#1976d2", mr: 1 }} /> Tasks Done: {employee.tasksDone}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <ListAltIcon sx={{ color: "#1976d2", mr: 1 }} /> Tasks In Progress: {employee.tasksInProgress}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <ListAltIcon sx={{ color: "#1976d2", mr: 1 }} /> Tasks To Do: {employee.tasksToDo}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <SupervisorAccountIcon sx={{ color: "#1976d2", mr: 1 }} /> Supervisor: {employee.supervisor}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <StarBorderIcon sx={{ color: "#1976d2", mr: 1 }} /> Leaves Taken: {employee.leaves}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <EmojiPeopleIcon sx={{ color: "#1976d2", mr: 1 }} /> Remarks: {employee.remarks}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDetails;
