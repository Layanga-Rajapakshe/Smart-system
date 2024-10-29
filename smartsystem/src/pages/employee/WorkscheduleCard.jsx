import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import React from "react";
import { FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function WorkScheduleCard() {

  const navigate = useNavigate();

  const workCategories = [
    "Total working Hrs in the Week",
    "Total Estimated Hours",
    "Throughput in Hrs",
    "Productivity %",
    "Delay date to submit WS",
    "Effectiveness of the WS"
  ];
  const weeks = Array.from({ length: 10 }, (_, i) => `W-${i + 1}`);

  const handleClick = () => {
    navigate("/mytasks");
  }

  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">Work Schedule (WS)</div>
          <div className="text-default-500">Weekly Performance Metrics</div>
        </div>
        <div className="">
          <Button className="text-sm" color="primary" radius="sm" size="sm" startContent={<FiClock />} onClick={handleClick}>
            My Work Schedule
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Table aria-label="Work schedule summary table">
          <TableHeader>
            <TableColumn>Category</TableColumn>
            {weeks.map((week) => (
              <TableColumn key={week}>{week}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {workCategories.map((category) => (
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
        <Link isExternal showAnchorIcon href="https://your-work-schedule-info-link.com">
          View detailed work schedule
        </Link>
      </CardFooter>
    </Card>
  );
}
