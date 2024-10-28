import React from "react";
import { Card, CardBody, Image, Button, Slider, CardFooter } from "@nextui-org/react";

export default function GreetingCard() {
  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 w-full"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src="https://nextui.org/images/album-cover.png"
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex justify-center text-center">
              <div className="flex flex-col gap-0">
                <h2 className="font-semibold text-2xl items-center">Welcome Back</h2>
                <h1 className="text-4xl font-medium mb-2">John Doe !!!</h1>
                <p className="text-small text-foreground/80">Employee Id: EE123456789</p>
              </div>
            </div>
            <CardFooter className="justify-center">
                <Button className="text-sm" color="primary" radius="lg" size="sm">
                    My Profile
                </Button>
            </CardFooter>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
