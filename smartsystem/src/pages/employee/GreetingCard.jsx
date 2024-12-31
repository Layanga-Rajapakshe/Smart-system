import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export default function GreetingCard() {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 h-full w-full overflow-hidden flex items-center justify-center"
      shadow=""
    >
      <CardBody className="flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-2xl">Welcome Back</h2>
          <h1 className="text-4xl font-medium">John Doe !!!</h1>
        </div>
      </CardBody>
    </Card>
  );
}
