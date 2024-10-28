import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import TaskTable from "./TaskTable";
import { tasks } from "./data";

export default function WeeklyTask() {
  const [weekView, setWeekView] = useState("thisWeek");
  const today = new Date();

  const getWeekTasks = (start, end) =>
    tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= start && taskDate <= end;
    });

  const weeklyTasks = (() => {
    const weekStart = new Date(today);
    const weekEnd = new Date(today);
    if (weekView === "previousWeek") {
      weekStart.setDate(today.getDate() - today.getDay() - 7);
      weekEnd.setDate(weekStart.getDate() + 6);
    } else if (weekView === "nextWeek") {
      weekStart.setDate(today.getDate() - today.getDay() + 7);
      weekEnd.setDate(weekStart.getDate() + 6);
    } else {
      weekStart.setDate(today.getDate() - today.getDay());
      weekEnd.setDate(weekStart.getDate() + 6);
    }
    return getWeekTasks(weekStart, weekEnd);
  })();

  return (
    <div>
      <Tabs selectedValue={weekView} onSelectionChange={setWeekView}>
        <Tab value="thisWeek">This Week</Tab>
        <Tab value="previousWeek">Previous Week</Tab>
        <Tab value="nextWeek">Next Week</Tab>
      </Tabs>

      <TaskTable tasks={weeklyTasks} />
    </div>
  );
}
