import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Button } from "@mui/material";
import { DownloadForOffline } from "@mui/icons-material"; // More attractive download icon

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const KPIChart = ({ employeeScores }) => {
  const chartData = {
    labels: ["Attitude", "Habits", "Skills", "Performance", "Subject Specific"],
    datasets: employeeScores.map((employee, index) => ({
      label: employee.name, // Employee name as the label for the line
      data: employee.categories.map((category) => {
        return category.subParams.reduce((sum, subParam) => sum + subParam.score, 0);
      }),
      borderColor: `rgba(${(index * 100) % 255}, ${(index * 150) % 255}, ${(index * 200) % 255}, 1)`,
      backgroundColor: `rgba(${(index * 100) % 255}, ${(index * 150) % 255}, ${(index * 200) % 255}, 0.2)`,
      fill: true,
    })),
  };

  const handleDownload = () => {
    const dataUrl = document.querySelector('canvas').toDataURL();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "KPI_Analysis_Chart.png";
    a.click();
  };

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <Line data={chartData} options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top', // Position of the legend with employee names
            labels: {
              font: {
                weight: 'bold', // Makes the names stand out more
              }
            }
          }
        }
      }} />
      
      <Button 
        onClick={handleDownload} 
        sx={{ 
          position: "absolute", 
          top: 10, 
          right: 10, 
          padding: "10px 20px", 
          backgroundColor: "#1976d2", 
          color: "white", 
          borderRadius: "8px",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#1565c0"
          }
        }} 
        variant="contained" 
        startIcon={<DownloadForOffline fontSize="large" />}
      >
        Download
      </Button>
    </div>
  );
};

export default KPIChart;
