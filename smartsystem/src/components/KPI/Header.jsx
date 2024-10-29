// Header.js
import React from "react";
import { Typography } from "@mui/material";

const Header = () => (
  <Typography
    variant="h4"
    align="center"
    gutterBottom
    sx={{
      fontWeight: "bold",
      color: "#004085",
      borderBottom: "3px solid #004085",
      mt: 0, 
      mb: 2,
      py: 1,
    }}
  >
    KPI Dashboard
  </Typography>
);

export default Header;
