import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import { CgPerformance } from "react-icons/cg";

export default function KPISummaryCard() {
  const kpiCategories = [
    { name: "Attitude", value: 8.5, color: "#36A2EB" },
    { name: "Habits", value: 7.8, color: "#4BC0C0" },
    { name: "Skills", value: 9.0, color: "#FFCE56" },
    { name: "Performance", value: 8.2, color: "#FF6384" },
    { name: "Subject specific", value: 8.7, color: "#9966FF" },
    { name: "Overall KPI", value: 8.4, color: "#2563eb" }
  ];

  const ProgressBar = ({ value, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="h-2.5 rounded-full transition-all duration-500"
        style={{ 
          width: `${(value/10) * 100}%`,
          backgroundColor: color
        }}
      />
    </div>
  );

  return (
    <Card shadow="" className="h-full w-full">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">KPI Matrix</div>
          <div className="text-default-500">Monthly Performance Tracker</div>
        </div>
        <div>
          <Link href="#">
            <CgPerformance size={24} />
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-6">
          {kpiCategories.map((kpi, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{kpi.name}</span>
                <span className="text-sm font-bold" style={{ color: kpi.color }}>
                  {kpi.value.toFixed(1)}/10
                </span>
              </div>
              <ProgressBar value={kpi.value} color={kpi.color} />
            </div>
          ))}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="justify-end">
        <Link isExternal showAnchorIcon href="https://your-kpi-info-link.com">
          View detailed metrics
        </Link>
      </CardFooter>
    </Card>
  );
}