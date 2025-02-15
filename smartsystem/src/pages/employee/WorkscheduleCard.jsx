import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Button } from "@nextui-org/react";
import React from "react";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function WorkScheduleVisual() {
  const navigate = useNavigate();

  // Sample data - replace with actual data
  const weeks = Array.from({ length: 10 }, (_, i) => `W-${i + 1}`);
  const data = {
    workingHours: Array.from({ length: 10 }, () => Math.floor(Math.random() * 20 + 30)),
    estimatedHours: Array.from({ length: 10 }, () => Math.floor(Math.random() * 20 + 35)),
    throughput: Array.from({ length: 10 }, () => Math.floor(Math.random() * 15 + 25)),
    productivity: Array.from({ length: 10 }, () => Math.floor(Math.random() * 30 + 70)),
    delayDays: Array.from({ length: 10 }, () => Math.floor(Math.random() * 3)),
    effectiveness: Array.from({ length: 10 }, () => Math.floor(Math.random() * 20 + 75))
  };

  const chartData = {
    labels: weeks,
    datasets: [
      {
        label: 'Working Hours',
        data: data.workingHours,
        borderColor: '#007FFF',
        backgroundColor: 'rgba(0, 127, 255, 0.5)',
        tension: 0.4
      },
      {
        label: 'Estimated Hours',
        data: data.estimatedHours,
        borderColor: '#FF4081',
        backgroundColor: 'rgba(255, 64, 129, 0.5)',
        tension: 0.4
      },
      {
        label: 'Throughput',
        data: data.throughput,
        borderColor: '#00C853',
        backgroundColor: 'rgba(0, 200, 83, 0.5)',
        tension: 0.4
      }
    ]
  };

  const productivityData = {
    labels: weeks,
    datasets: [
      {
        label: 'Productivity %',
        data: data.productivity,
        borderColor: '#6200EA',
        backgroundColor: 'rgba(98, 0, 234, 0.5)',
        tension: 0.4
      },
      {
        label: 'Effectiveness %',
        data: data.effectiveness,
        borderColor: '#FFD600',
        backgroundColor: 'rgba(255, 214, 0, 0.5)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value}${chartData ? 'hrs' : '%'}`
        }
      }
    }
  };

  const handleClick = () => {
    navigate("/mytasks");
  };

  return (
    <Card shadow=""  className="w-full h-full">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">Work Schedule (WS)</div>
          <div className="text-default-500">Weekly Performance Metrics</div>
        </div>
        <div>
          <Link href="#">
              <FiClock size={24} />
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-6">
          <div className="h-[200px]">
            <h3 className="text-sm font-medium mb-2">Hours Distribution</h3>
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className="h-[200px]">
            <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
            <Line data={productivityData} options={chartOptions} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4  rounded-lg">
              <h4 className="text-sm font-medium mb-1">Average Delay</h4>
              <p className="text-2xl font-bold text-danger">
                {(data.delayDays.reduce((a, b) => a + b, 0) / data.delayDays.length).toFixed(1)} days
              </p>
            </div>
            <div className="p-4  rounded-lg">
              <h4 className="text-sm font-medium mb-1">Overall Effectiveness</h4>
              <p className="text-2xl font-bold text-success">
                {(data.effectiveness.reduce((a, b) => a + b, 0) / data.effectiveness.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="justify-end">
        <Link 
          isExternal 
          showAnchorIcon 
          href="https://your-work-schedule-info-link.com"
        >
          View detailed work schedule
        </Link>
      </CardFooter>
    </Card>
  );
}