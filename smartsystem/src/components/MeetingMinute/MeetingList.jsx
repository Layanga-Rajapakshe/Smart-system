import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import { Schedule } from '@mui/icons-material';
import './MeetingList.css';

function MeetingList({ meetings }) {
    return (
      <div className="meeting-list">
        {meetings.length === 0 ? (
          <Typography variant="body1" className="no-meetings">
            No meetings scheduled yet. Add one to get started!
          </Typography>
        ) : (
          <List>
            {meetings.map((meeting) => (
              <React.Fragment key={meeting._id}>
                <ListItem className="meeting-item">
                  <ListItemText
                    primary={
                      <Typography variant="h6" className="meeting-topic">
                        <Schedule /> {meeting.topic}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" className="meeting-details">
                          {meeting.description}
                        </Typography>
                        <Typography variant="body2" className="meeting-date">
                          {new Date(meeting.dateTime).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" className="meeting-room">
                          Room ID: {meeting.meetingRoomId}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </div>
    );
  }
  

export default MeetingList;
