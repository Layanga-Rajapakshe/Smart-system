import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import React from "react";
import { CgPerformance } from "react-icons/cg";

export default function KIPCard() {
  const categories = ["Attitude", "Habits", "Skills", "Performance", "Subject specific", "Overall KIP"];
  const months = Array.from({ length: 12 }, (_, i) => `M-${i + 1}`);

  return (
    <Card className="">
      <CardHeader className="flex gap-3 justify-between">
        {/* <Image
          alt="matrix icon"
          height={40}
          radius="sm"
          src="https://your-image-url.png"
          width={40}
        /> */}
        <div className="flex flex-col">
          <div className="text-lg">KPI Matrix</div>
          <div className="text-default-500">Monthly Performance Tracker</div>
        </div>
        <div className="">
          <Button className="text-sm" color="primary" radius="sm" size="sm" startContent={<CgPerformance />}>
            My KPI
          </Button>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-4">
          <Table aria-label="KPI summary table">
            <TableHeader>
              <TableColumn>Category</TableColumn>
              {months.map((month) => (
                <TableColumn key={month}>{month}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  {months.map((month) => (
                    <TableCell key={month}>4</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="justify-end">
        <Link isExternal showAnchorIcon href="https://your-matrix-info-link.com">
          View detailed metrics
        </Link>
      </CardFooter>
    </Card>
  );
}
