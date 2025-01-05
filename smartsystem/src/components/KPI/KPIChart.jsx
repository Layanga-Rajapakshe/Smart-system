import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const KPIChart = ({ employeeScores }) => {
  const chartRef = useRef();
  const labels = ["Attitude", "Habits", "Skills", "Performance", "Subject Specific"];
  const criticalThreshold = 5;

  // Data for each employee
  const datasets = employeeScores.map((employee, index) => ({
    label: employee.name,
    data: labels.map((label) => {
      const score = employee.scores[label] || 0;  // Ensure score exists for each category
      return score > 10 ? 10 : score;  // Cap score at 10 if it's higher
    }),
    borderColor: `hsl(${(index * 70 + 50) % 360}, 70%, 50%)`,
    backgroundColor: `hsla(${(index * 70 + 50) % 360}, 70%, 50%, 0.3)`,
    pointBorderColor: `hsl(${(index * 70 + 50) % 360}, 70%, 40%)`,
    pointBackgroundColor: `hsl(${(index * 70 + 50) % 360}, 70%, 50%)`,
    pointRadius: 5,
    fill: false,
    tension: 0.4,
  }));

  // Critical region (zone under the threshold)
  datasets.push({
    label: "Critical Zone",
    data: Array(labels.length).fill(criticalThreshold),
    borderColor: "rgba(255, 165, 0, 0)",
    backgroundColor: "rgba(255, 165, 0, 0.2)",
    pointRadius: 0,
    fill: true,
    tension: 0,
  });

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: { color: "rgba(200, 200, 200, 0.3)" },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Employee KPI Analysis',
        font: { size: 18, weight: "bold" },
      },
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
  };

  const downloadPDF = () => {
    const chart = chartRef.current;
    const downloadButton = document.getElementById("download-button");

    // Hide the button while downloading
    downloadButton.style.visibility = "hidden";

    html2canvas(chart).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
      pdf.save("Employee_KPI_Analysis.pdf");

      // Show the button after downloading
      downloadButton.style.visibility = "visible";
    });
  };

  return (
    <div style={{ height: '450px', width: '100%', position: 'relative' }} ref={chartRef}>
      <Line data={data} options={options} />
      <Button
        id="download-button"
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={downloadPDF}
        sx={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
      >
        Download PDF
      </Button>
    </div>
  );
};

export default KPIChart;
