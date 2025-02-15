import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function GreetingCard() {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 h-full w-full overflow-hidden flex items-center justify-center"
    >
      <CardBody isBlurred shadow="none"className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-2xl">Welcome Back</h2>
          <h1 className="text-4xl font-medium">{userInfo.name}!!!</h1>
        </div>
      </CardBody>
    </Card>
  );
}
