import { Card, CardHeader, CardBody, Progress } from "@nextui-org/react";
import React from "react";
import { 
  FiCheckSquare, 
  FiCalendar, 
  FiClock, 
  FiList,
  FiStar,
} from "react-icons/fi";

export default function MyScheduleCard() {
  const schedules = [
    { 
      name: "To-Do List", 
      icon: <FiList className="text-xl" />, 
      total: 10, 
      completed: 4, 
      inProgress: 3,
      color: "success"
    },
    { 
      name: "This Week Schedule", 
      icon: <FiCheckSquare className="text-xl" />, 
      total: 8, 
      completed: 3, 
      inProgress: 2,
      color: "primary"
    },
    { 
      name: "Daily Schedule", 
      icon: <FiClock className="text-xl" />, 
      total: 6, 
      completed: 2, 
      inProgress: 2,
      color: "warning"
    },
    { 
      name: "Weekly Schedule", 
      icon: <FiCalendar className="text-xl" />, 
      total: 12, 
      completed: 5, 
      inProgress: 4,
      color: "secondary"
    },
    { 
      name: "Monthly Schedule", 
      icon: <FiCalendar className="text-xl" />, 
      total: 15, 
      completed: 6, 
      inProgress: 5,
      color: "danger"
    },
    { 
      name: "Special Schedule", 
      icon: <FiStar className="text-xl" />, 
      total: 5, 
      completed: 2, 
      inProgress: 1,
      color: "default"
    },
  ];

  return (
    <Card shadow="" className="h-full w-full">
      <CardHeader className="flex flex-col gap-3">
        <div className="text-lg">My Schedules</div>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {schedules.map((schedule, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {schedule.icon}
                  <span className="font-medium">{schedule.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-success">
                    {schedule.completed} CPT
                  </span>
                  <span className="text-warning">
                    {schedule.inProgress} TBC
                  </span>
                  <span className="text-default-400">
                    {schedule.total} Total
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Progress 
                  value={(schedule.completed / schedule.total) * 100}
                  color={schedule.color}
                  className="flex-1"
                  size="sm"
                />
                <div className="w-16 text-tiny text-default-400">
                  {Math.round((schedule.completed / schedule.total) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}