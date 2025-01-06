import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { Event, Description, AccessTime, Room, AddCircleOutline } from '@mui/icons-material';
import axios from 'axios';
import './MeetingForm.css';

function MeetingForm({ fetchMeetings }) {
  const [formData, setFormData] = useState({
    topic: '',
    dateTime: '',
    description: '',
    meetingRoomId: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/meetings', formData);
      fetchMeetings(); // Refresh the meeting list
      setFormData({ topic: '', dateTime: '', description: '', meetingRoomId: '' });
      setOpenSnackbar(true); // Show success notification
    } catch (error) {
      console.error('Error creating meeting:', error);
      setErrorSnackbar(true); // Show error notification
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
    setErrorSnackbar(false);
  };

  return (
    <form onSubmit={handleSubmit} className="meeting-form">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            name="topic"
            label="Meeting Topic"
            value={formData.topic}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: <Event />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="dateTime"
            label="Date & Time"
            type="datetime-local"
            value={formData.dateTime}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: <AccessTime />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: <Description />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="meetingRoomId"
            label="Meeting Room ID"
            value={formData.meetingRoomId}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: <Room />,
            }}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutline />}
        fullWidth
        className="add-meeting-button"
      >
        Add Meeting
      </Button>
      {/* Success Notification */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Meeting created successfully!
        </Alert>
      </Snackbar>
      {/* Error Notification */}
      <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Failed to create meeting. Please try again.
        </Alert>
      </Snackbar>
    </form>
  );
}

export default MeetingForm;
