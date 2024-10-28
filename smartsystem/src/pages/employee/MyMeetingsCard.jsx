import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";

export default function MyMeetingsCard() {
  const meetings = [
    { name: "Technical meeting", total: "", cpt: "", tbc: "" },
    { name: "Construction meeting", total: "", cpt: "", tbc: "" },
    { name: "Progress meeting", total: "", cpt: "", tbc: "" }
  ];

  return (
    <Card className="max-w-[600px]">
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex flex-col">
          <div className="text-lg">My Meetings</div>
        </div>
        <div>
          <Button className="text-sm" color="primary" radius="sm" size="sm" startContent={<FaPeopleGroup />}>
            Schedule Meeting
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <Table aria-label="My meetings summary table">
          <TableHeader>
            <TableColumn>Meeting</TableColumn>
            <TableColumn>Total</TableColumn>
            <TableColumn>CPT</TableColumn>
            <TableColumn>TBC</TableColumn>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting, index) => (
              <TableRow key={index}>
                <TableCell>{meeting.name}</TableCell>
                <TableCell>{meeting.total || "--"}</TableCell>
                <TableCell>{meeting.cpt || "--"}</TableCell>
                <TableCell>{meeting.tbc || "--"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
      <Divider />
      <CardFooter className="justify-end">
        <Link isExternal showAnchorIcon href="https://your-meetings-info-link.com">
          View detailed meeting schedule
        </Link>
      </CardFooter>
    </Card>
  );
}
