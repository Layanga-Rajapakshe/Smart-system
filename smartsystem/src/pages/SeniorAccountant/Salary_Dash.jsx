/*import React from 'react'

const Salary_Dash = () =>{
  return (
    <div>

    </div>
  )
}

export default Salary_Dash;

*/
/*import React from 'react';

const Salary_Dash = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Salary Dashboard</h1>
      <p>This is the salary dashboard page content.</p>
    </div>
  );
}

export default Salary_Dash;*/

/*
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Salary_Dash() {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedDataType, setSelectedDataType] = useState('Total Summary'); // New State for data type

  // Mock data for salary payments (replace with actual data)
  const salaryData = {
    'January': {
      total: [1200, 1500, 1700, 1300, 1600],
      overtime: [200, 250, 300, 180, 220],
      epf: [120, 150, 170, 130, 160],
      etf: [60, 75, 85, 65, 80],
    },
    'February': {
      total: [1300, 1400, 1600, 1200, 1500],
      overtime: [210, 260, 310, 190, 230],
      epf: [130, 140, 160, 120, 150],
      etf: [65, 70, 80, 60, 75],
    },
    'March': {
      total: [1250, 1550, 1650, 1350, 1450],
      overtime: [220, 270, 320, 200, 240],
      epf: [125, 155, 165, 135, 145],
      etf: [62, 77, 83, 68, 73],
    },
    // Add more months as needed
  };

  // Mock employee names (replace with actual employee data)
  const employeeNames = ['John', 'Emma', 'Oliver', 'Sophia', 'Liam'];

  // Handle month change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Handle data type change
  const handleDataTypeChange = (e) => {
    setSelectedDataType(e.target.value);
  };

  // Chart data based on selected month and data type
  const chartData = {
    labels: employeeNames, // Employee names
    datasets: [
      {
        label: `${selectedDataType} in ${selectedMonth}`,
        data: salaryData[selectedMonth][selectedDataType.toLowerCase()], // Dynamic data based on selected type
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Attractive colors
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderWidth: 2,
        hoverBackgroundColor: ['#FF9AA2', '#9BD9F9', '#FFD589', '#85F0E0', '#C5A3FF'], // Hover colors
      },
    ],
  };

  // Chart options for better design
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `${selectedDataType} for ${selectedMonth}`,
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#111',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555', // X-axis labels color
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: '#555', // Y-axis labels color
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Salary Dashboard</h1>

      {/* Month Selector Dropdown *//*}
      <div className="mb-4">
        <label htmlFor="month" className="block text-gray-700 font-semibold mb-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          {/* Add more months *//*}
        </select>
      </div>

      {/* Data Type Selector Dropdown *//*}
      <div className="mb-4">
        <label htmlFor="dataType" className="block text-gray-700 font-semibold mb-2">Select Data Type:</label>
        <select
          id="dataType"
          value={selectedDataType}
          onChange={handleDataTypeChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="Total Summary">Total Summary</option>
          <option value="Overtime">Overtime Payments</option>
          <option value="EPF">EPF</option>
          <option value="ETF">ETF</option>
        </select>
      </div>

      {/* Bar Chart *//*}
      <div className="my-6">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}*/




//line graph

import React from 'react';
import GraphComponent from './GraphComponent';
import SummaryComponent from './SummaryComponent';

// Dummy data for demonstration purposes
const totalPayments = [3000, 3200, 2900, 3100, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000];
const overtimePayments = [200, 150, 250, 180, 220, 240, 260, 230, 210, 200, 190, 210];
const epf = [300, 320, 290, 310, 330, 340, 350, 360, 370, 380, 390, 400];
const etf = [150, 160, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230];

const Salary_Dash = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Salary Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryComponent title="Total Payments (This Month)" value={`$4000`} />
        <SummaryComponent title="Overtime Payments (This Month)" value={`$210`} />
        <SummaryComponent title="EPF Contributions" value={`$400`} />
        <SummaryComponent title="ETF Contributions" value={`$230`} />
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 gap-6">
        <GraphComponent data={totalPayments} title="Total Payments Over the Year" />
        <GraphComponent data={overtimePayments} title="Overtime Payments Over the Year" />
        <GraphComponent data={epf} title="EPF Contributions Over the Year" />
        <GraphComponent data={etf} title="ETF Contributions Over the Year" />
      </div>
    </div>
  );
};

export default Salary_Dash;

//Pie chart 

/*
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

// SummaryComponent for displaying summary statistics
const SummaryComponent = ({ title, value }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default function Salary_Dash() {
  const [selectedMonth, setSelectedMonth] = useState('January');

  // Mock data for salary payments (replace with actual data)
  const salaryData = {
    'January': {
      total: 12000, // Total salary for all employees
      overtime: 2000, // Total overtime payments
      epf: 1200, // Total EPF contributions
      etf: 600, // Total ETF contributions
    },
    'February': {
      total: 13000,
      overtime: 2500,
      epf: 1300,
      etf: 650,
    },
    'March': {
      total: 12500,
      overtime: 2200,
      epf: 1250,
      etf: 620,
    },
    // Add more months as needed
  };

  // Handle month change
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Chart data based on selected month
  const chartData = {
    labels: ['Total Salary', 'Overtime Payments', 'EPF', 'ETF'],
    datasets: [
      {
        label: `Salary Breakdown for ${selectedMonth}`,
        data: [
          salaryData[selectedMonth].total,
          salaryData[selectedMonth].overtime,
          salaryData[selectedMonth].epf,
          salaryData[selectedMonth].etf,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Colorful segments
        hoverOffset: 4,
      },
    ],
  };

  // Chart options for better design
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows manual height adjustment
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Salary Payments for ${selectedMonth}`,
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#111',
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg salary-dashboard">
      <h1 className="text-2xl font-bold mb-4">Salary Dashboard</h1>

      {/* Month Selector Dropdown *//*}
      <div className="mb-4">
        <label htmlFor="month" className="block text-gray-700 font-semibold mb-2">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          {/* Add more months as needed *//*}
        </select>
      </div>

      {/* Summary Section *//*}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryComponent title="Total Payments (This Month)" value={`$${salaryData[selectedMonth].total}`} />
        <SummaryComponent title="Overtime Payments (This Month)" value={`$${salaryData[selectedMonth].overtime}`} />
        <SummaryComponent title="EPF Contributions" value={`$${salaryData[selectedMonth].epf}`} />
        <SummaryComponent title="ETF Contributions" value={`$${salaryData[selectedMonth].etf}`} />
      </div>

      {/* Pie Chart *//*}
      <div className="my-6" style={{ width: '400px', height: '400px', margin: '0 auto' }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
*/

