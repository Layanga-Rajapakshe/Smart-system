import { Card, CardHeader, CardBody, CardFooter, Divider, Link } from "@nextui-org/react";
import React from "react";
import { FiCalendar } from "react-icons/fi";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LeavesSummaryCard() {
  const leaveCategories = [
    { name: "Total leave", value: 20 },
    { name: "Approved leaves", value: 10 },
    { name: "Balance leaves", value: 5 },
    { name: "No pay leaves", value: 2 },
    { name: "Unplanned leaves", value: 3 }
  ];

  const data = {
    labels: leaveCategories.map((leave) => leave.name),
    datasets: [
      {
        label: "Leave Days",
        data: leaveCategories.map((leave) => leave.value),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF"
        ]
      }
    ]
  };

  return (
    <Card shadow=""className="h-full w-full" >
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">Leave Summary</div>
          <div className="text-default-500">Employee Leave Details</div>
        </div>
        <div>
          <Link href="#">
            <FiCalendar size={24} />
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex justify-center">
        <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
      </CardBody>
      <Divider />
      <CardFooter className="justify-end">
        <Link isExternal showAnchorIcon href="https://your-leave-info-link.com">
          View detailed leave report
        </Link>
      </CardFooter>
    </Card>
  );
}
