import React, { useEffect, useState } from 'react';
import { Container, Typography, Card } from '@mui/material';
import MeetingForm from '../../components/MeetingMinute/MeetingForm';
import MeetingList from '../../components/MeetingMinute/MeetingList';
import axios from 'axios';
import './Meetings.css';

function Meetings() {
  const [meetings, setMeetings] = useState([]);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/meetings');
      setMeetings(response.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <Container maxWidth="lg" className="meetings-container">
      <Typography variant="h4" className="meetings-title" align="center" gutterBottom>
        <span className="highlight">Meetings</span> Management
      </Typography>
      <Typography variant="subtitle1" align="center" className="meetings-description">
        Seamlessly manage your company's meetings with ease and efficiency.
      </Typography>
      <Card className="meetings-card" elevation={4}>
        <MeetingForm fetchMeetings={fetchMeetings} />
        <MeetingList meetings={meetings} />
      </Card>
    </Container>
  );
}

export default Meetings;
