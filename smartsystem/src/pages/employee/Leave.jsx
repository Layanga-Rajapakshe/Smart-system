import { Card, CardHeader, CardFooter, Image, Progress, Text, Row, Col } from "@nextui-org/react";

export default function LeaveBalanceCard({ totalLeaves, leavesTaken }) {
  const remainingLeaves = totalLeaves - leavesTaken;
  const percentageUsed = (leavesTaken / totalLeaves) * 100;

  return (
    <div>
    <Card isFooterBlurred className="w-full h-[300px]">
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">Manage your leave</p>
        <h4 className="text-white/90 font-medium text-xl">Leave Balance</h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Leave Balance Image"
        className="z-0 w-full h-full object-cover"
        src="https://nextui.org/images/card-example-5.jpeg" // Use a relevant image URL
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <Row>
          <Col>
            <Text className="text-tiny text-white/60">Leaves Taken</Text>
            <Text b size={24} color="primary">{leavesTaken}</Text>
          </Col>
          <Col>
            <Text className="text-tiny text-white/60">Total Leaves</Text>
            <Text b size={24}>{totalLeaves}</Text>
          </Col>
          <Col>
            <Text className="text-tiny text-white/60">Remaining Leaves</Text>
            <Text b size={24} color="success">{remainingLeaves}</Text>
          </Col>
        </Row>
        <Progress
          value={percentageUsed}
          color={percentageUsed > 75 ? "danger" : "primary"}
          label="Leave Usage"
          aria-label="Leave Usage Progress"
        />
      </CardFooter>
    </Card>
    </div>
  );
}
