import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import moment from "moment-timezone";

export default function TimeDateCard() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(moment().tz("Asia/Colombo").format(" h:mm:ss A"));
    };

    const updateDate = () => {
        setDate(moment().tz("Asia/Colombo").format("dddd, MMMM Do YYYY"));
    };

    updateTime(); // Initial load
    const intervalId = setInterval(updateTime, 1000); // Update every second
    updateDate(); // Initial load
    const intervalId2 = setInterval(updateDate, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full"
      shadow="none"
    >
      <CardBody className="flex justify-center items-center text-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-3xl">{time}</h2>
          <h1 className="text-2xl font-medium text-foreground/80">{date}</h1>
        </div>
      </CardBody>
    </Card>
  );
}
