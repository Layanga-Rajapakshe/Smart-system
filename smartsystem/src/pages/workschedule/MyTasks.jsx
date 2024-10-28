import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import DailyTask from "./DailyTask";
import WeeklyTask from "./WeeklyTask";
import MonthlyTask from "./MonthlyTask";

export default function MyTasks() {
  const [view, setView] = useState("daily");

  return (
    <div>
      <Tabs selectedValue={view} onSelectionChange={setView}>
        <Tab value="daily">Daily</Tab>
        <Tab value="weekly">Weekly</Tab>
        <Tab value="monthly">Monthly</Tab>
      </Tabs>

      {view === "daily" && <DailyTask />}
      {view === "weekly" && <WeeklyTask />}
      {view === "monthly" && <MonthlyTask />}
    </div>
  );
}
