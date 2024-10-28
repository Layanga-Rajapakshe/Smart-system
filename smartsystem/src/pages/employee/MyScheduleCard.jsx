import { Card, CardHeader, CardBody, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React from "react";

export default function MyScheduleCard() {
  const schedules = [
    { name: "To-Do List", total: "NA", cpt: "NA", tbc: "NA" },
    { name: "This Week Schedule", total: "NA", cpt: "NA", tbc: "NA" },
    { name: "Daily Schedule", total: "NA", cpt: "NA", tbc: "NA" },
    { name: "Weekly Schedule", total: "NA", cpt: "NA", tbc: "NA" },
    { name: "Monthly Schedule", total: "NA", cpt: "NA", tbc: "NA" },
    { name: "Special Schedule", total: "NA", cpt: "NA", tbc: "NA" },
  ];

  return (
    <Card isBlurred shadow="none" >
      <CardHeader className="flex flex-col gap-3">
        <div className="text-lg">My Schedules</div>
      </CardHeader>
      <CardBody>
        <Table aria-label="My schedules summary table">
          <TableHeader>
            <TableColumn>Schedule</TableColumn>
            <TableColumn>Total</TableColumn>
            <TableColumn>CPT</TableColumn>
            <TableColumn>TBC</TableColumn>
          </TableHeader>
          <TableBody>
            {schedules.map((schedule, index) => (
              <TableRow key={index}>
                <TableCell>{schedule.name}</TableCell>
                <TableCell>{schedule.total}</TableCell>
                <TableCell>{schedule.cpt}</TableCell>
                <TableCell>{schedule.tbc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
