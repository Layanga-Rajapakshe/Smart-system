import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, Box } from '@mui/material';
import { MeetingRoom, Notifications } from '@mui/icons-material';
import './MeetingHome.css';

function MeetingHome() {
  return (
    <div className="meeting-home">
      <Card className="welcome-card" elevation={6}>
        <Typography variant="h2" className="welcome-text">
          Welcome to <span className="highlight">Meeting Minute Management System</span>
        </Typography>
        <Typography variant="subtitle1" className="description">
          Empowering your team with seamless meeting coordination and instant notifications.
        </Typography>
      </Card>
      <div className="nav-buttons">
        <Button
          component={Link}
          to="/meetings"
          variant="contained"
          startIcon={<MeetingRoom />}
          className="nav-button meeting-button"
        >
          Meetings
        </Button>
        <Button
          component={Link}
          to="/notifications"
          variant="contained"
          startIcon={<Notifications />}
          className="nav-button notification-button"
        >
          Notifications
        </Button>
      </div>
      <Box className="footer">
        <Typography variant="body2" className="footer-text">
          © 2025 Smart Systems Inc. All rights reserved.
        </Typography>
      </Box>
    </div>
  );
}

export default MeetingHome;
