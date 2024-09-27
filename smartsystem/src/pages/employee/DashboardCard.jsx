import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

export default function DashboardCard() {
  return (
    <div className="py-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

        {/* Profile Card */}
        <Card isFooterBlurred className="w-full h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Manage your account</p>
            <h4 className="text-white/90 font-medium text-xl">My Profile</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Profile Image"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-5.jpeg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Profile icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Profile</p>
                <p className="text-tiny text-white/60">View and edit your profile.</p>
              </div>
            </div>
            <Button as="a" href="/profile" radius="full" size="sm">
              View Profile
            </Button>
          </CardFooter>
        </Card>

        {/* Work Schedule Card */}
        <Card isFooterBlurred className="w-full h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Manage your time</p>
            <h4 className="text-white/90 font-medium text-xl">Work Schedule</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Work Schedule Image"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-5.jpeg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Work Schedule icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Schedule</p>
                <p className="text-tiny text-white/60">View and manage your work schedule.</p>
              </div>
            </div>
            <Button as="a" href="/schedule" radius="full" size="sm">
              View Schedule
            </Button>
          </CardFooter>
        </Card>

        {/* Leave Request Card */}
        <Card isFooterBlurred className="w-full h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Manage your leave</p>
            <h4 className="text-white/90 font-medium text-xl">My Leave</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Leave Image"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-5.jpeg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Leave icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Leave</p>
                <p className="text-tiny text-white/60">View and apply for leave.</p>
              </div>
            </div>
            <Button as="a" href="/leave" radius="full" size="sm">
              View Leave
            </Button>
          </CardFooter>
        </Card>

        {/* Salary Sheet Card */}
        <Card isFooterBlurred className="w-full h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Manage your salary</p>
            <h4 className="text-white/90 font-medium text-xl">Salary Sheet</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Salary Sheet Image"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-5.jpeg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Salary Sheet icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Salary</p>
                <p className="text-tiny text-white/60">View your salary details.</p>
              </div>
            </div>
            <Button as="a" href="/salary" radius="full" size="sm">
              View Salary Sheet
            </Button>
          </CardFooter>
        </Card>

        {/* Performance Card */}
        <Card isFooterBlurred className="w-full h-[300px]">
          <CardHeader className="absolute z-10 top-1 flex-col items-start">
            <p className="text-tiny text-white/60 uppercase font-bold">Track your performance</p>
            <h4 className="text-white/90 font-medium text-xl">Performance</h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Performance Image"
            className="z-0 w-full h-full object-cover"
            src="https://nextui.org/images/card-example-5.jpeg"
          />
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <div className="flex flex-grow gap-2 items-center">
              <Image
                alt="Performance icon"
                className="rounded-full w-10 h-11 bg-black"
                src="https://nextui.org/images/breathing-app-icon.jpeg"
              />
              <div className="flex flex-col">
                <p className="text-tiny text-white/60">Performance</p>
                <p className="text-tiny text-white/60">Check your performance metrics.</p>
              </div>
            </div>
            <Button as="a" href="/performance" radius="full" size="sm">
              View Performance
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}
