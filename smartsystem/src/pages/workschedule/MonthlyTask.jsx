import React from "react";
import TaskTable from "./TaskTable";
import { tasks } from "./data";

export default function MonthlyTask() {
  const today = new Date();
  const monthlyTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return (
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    );
  });

  return <TaskTable tasks={monthlyTasks} />;
}
  