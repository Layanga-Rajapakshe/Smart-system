import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import React from "react";
import { FiCalendar } from "react-icons/fi";

export default function LeavesSummaryCard() {
  const leaveCategories = [
    { name: "Total leave", value: "##" },
    { name: "Approved leaves", value: "##" },
    { name: "Balance leaves", value: "##" },
    { name: "No pay leaves", value: "##" },
    { name: "Unplanned leaves", value: "##" }
  ];

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">Leave Summary</div>
          <div className="text-default-500">Employee Leave Details</div>
        </div>
        <div className="">
          <Link href="#">
            <FiCalendar size={24} />
          </Link>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Table aria-label="Leave summary table">
          <TableHeader>
            <TableColumn>Leave Type</TableColumn>
            <TableColumn>Days</TableColumn>
          </TableHeader>
          <TableBody>
            {leaveCategories.map((leave) => (
              <TableRow key={leave.name}>
                <TableCell>{leave.name}</TableCell>
                <TableCell>{leave.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
