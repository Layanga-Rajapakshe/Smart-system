// src/components/KPI/KPIChart.jsx

import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const KPIChart = ({ employeeScores }) => {
  const labels = ["Attitude", "Habits", "Skills", "Performance", "Subject Specific", "Overall KPI"];
  
  const data = {
    labels,
    datasets: employeeScores.map((employee, index) => ({
      label: employee.name,
      data: employee.scores,
      backgroundColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 80}, ${(index + 1) * 100}, 0.2)`,
      borderColor: `rgba(${(index + 1) * 50}, ${(index + 1) * 80}, ${(index + 1) * 100}, 1)`,
      borderWidth: 1,
    }))
  };

  return <Radar data={data} />;
};

export default KPIChart;
