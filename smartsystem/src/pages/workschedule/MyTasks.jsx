import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import DailyTask from "./DailyTask";
import WeeklyTask from "./WeeklyTask";
import MonthlyTask from "./MonthlyTask";

export default function MyTasks() {

  return (
    <div className="flex w-full flex-col">
      <Tabs >
        <Tab value="daily" title='Daily'>Daily
          <Card>
            <CardBody>
              <DailyTask />
            </CardBody>
          </Card>
        </Tab>
        <Tab value="weekly" title='Weekly'>Weekly
        <Card>
            <CardBody>
              <WeeklyTask />
            </CardBody>
          </Card>
        </Tab>
        <Tab value="monthly" title='Monthly'>Monthly
        <Card>
            <CardBody>
              <MonthlyTask />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
