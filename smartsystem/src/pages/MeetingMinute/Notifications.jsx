import React from "react";
import NotificationList from "./NotificationList";
import { Container, Typography } from "@mui/material";
import { Notifications } from "@mui/icons-material";

const NotificationPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        <Notifications sx={{ mr: 2 }} />
        Notifications Dashboard
      </Typography>
      <NotificationList />
    </Container>
  );
};

export default NotificationPage;
