import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@heroui/react";
import React from "react";
import { FiClock } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";

export default function AttendanceCard() {
  const attendanceCategories = [
    "Total working hours",
    "Completed working hours",
    "Extra working hours",
    "Due working",
    "Late attendance",
    "Nos of Leaves taken"
  ];
  const weeks = Array.from({ length: 10 }, (_, i) => `W-${i + 1}`);

  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">Attendance</div>
          <div className="text-default-500">Weekly Attendance Metrics</div>
        </div>
        <div className="">
          <Button className="text-sm" color="primary" radius="sm" size="sm" startContent={<SlCalender />}>
            My Attendance
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Table aria-label="Attendance summary table">
          <TableHeader>
            <TableColumn>Category</TableColumn>
            {weeks.map((week) => (
              <TableColumn key={week}>{week}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {attendanceCategories.map((category) => (
              <TableRow key={category}>
                <TableCell>{category}</TableCell>
                {weeks.map((week) => (
                  <TableCell key={week}>--</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <Divider />
      <CardFooter className="justify-end">
        <Link isExternal showAnchorIcon href="https://your-attendance-info-link.com">
          View detailed attendance
        </Link>
      </CardFooter>
    </Card>
  );
}
