import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Button, Card, CardContent, Snackbar, Alert, CircularProgress } from "@mui/material";
import { Notifications, Event } from "@mui/icons-material";
import { motion } from "framer-motion";
import "./NotificationList.css"; // External CSS file for additional styling

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem("userId"); // Assuming user ID is stored in local storage
      const response = await axios.get(`/api/notifications/${userId}`);
      setNotifications(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch(`/api/notifications/mark-as-read/${notificationId}`);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
      setOpenSnackbar(true); // Show success snackbar
    } catch (err) {
      console.error("Error marking notification as read:", err.message);
    }
  };

  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <motion.div className="notification-list-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        <Notifications /> Notifications
      </Typography>
      
      <div className="notifications-wrapper">
        {notifications.map((notification) => (
          <motion.div key={notification._id} whileHover={{ scale: 1.05 }} className={`notification-item ${notification.isRead ? "read" : "unread"}`}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{notification.message}</Typography>
                <Typography variant="body2" color="textSecondary">Meeting ID: {notification.meetingId}</Typography>
                {!notification.isRead && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => markAsRead(notification._id)}
                    sx={{ mt: 2 }}
                  >
                    Mark as Read
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Success Snackbar */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          Notification marked as read!
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default NotificationList;
