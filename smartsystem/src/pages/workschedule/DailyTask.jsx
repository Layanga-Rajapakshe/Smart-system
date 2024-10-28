import React from "react";
import TaskTable from "./TaskTable";
import { tasks } from "./data";

export default function DailyTask() {
  const today = new Date();
  const dailyTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate.toDateString() === today.toDateString();
  });

  return <TaskTable tasks={dailyTasks} />;
}
