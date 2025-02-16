import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Spinner } from "@heroui/react";
import { useSelector } from 'react-redux';
import { 
  useGetThisWeekTasksQuery,
  useGetNextWeekTasksQuery,
  useGetPrevWeekTasksQuery 
} from '../../redux/api/taskApiSlice';
import TaskTable from "./TaskTable";

const OneTimeTask = () => {
  const [weekView, setWeekView] = useState("thisWeek");
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: thisWeekTasks,
    isLoading: isLoadingThisWeek,
    isError: isErrorThisWeek,
    error: errorThisWeek
  } = useGetThisWeekTasksQuery({ userId: userInfo.userId });

  const {
    data: nextWeekTasks,
    isLoading: isLoadingNextWeek,
    isError: isErrorNextWeek,
    error: errorNextWeek
  } = useGetNextWeekTasksQuery({ userId: userInfo.userId });

  const {
    data: prevWeekTasks,
    isLoading: isLoadingPrevWeek,
    isError: isErrorPrevWeek,
    error: errorPrevWeek
  } = useGetPrevWeekTasksQuery({ userId: userInfo.userId });

  const renderTabContent = (tasks, isLoading, isError, error) => {
    if (isLoading) {
      return (
        <CardBody className="flex justify-center items-center h-48">
          <Spinner size="lg" />
        </CardBody>
      );
    }

    if (isError) {
      return (
        <CardBody className="p-6">
          <div className="text-red-500">
            Error loading tasks: {error?.data?.message || 'Something went wrong'}
          </div>
        </CardBody>
      );
    }

    return (
      <CardBody>
        {tasks.length > 0 ? (
          <TaskTable tasks={tasks} />
        ) : (
          <div className="flex justify-center items-center h-48 text-default-500">
            No tasks scheduled for this week
          </div>
        )}
      </CardBody>
    );
  };

  return (
    <Card className="w-full">
      <Tabs 
        selectedKey={weekView} 
        onSelectionChange={setWeekView}
        className="p-0"
      >
        <Tab 
          key="thisWeek" 
          title="This Week"
        >
          {renderTabContent(
            thisWeekTasks?.tasks || [], 
            isLoadingThisWeek, 
            isErrorThisWeek, 
            errorThisWeek
          )}
        </Tab>
        <Tab 
          key="previousWeek" 
          title="Previous Week"
        >
          {renderTabContent(
            prevWeekTasks?.tasks || [], 
            isLoadingPrevWeek, 
            isErrorPrevWeek, 
            errorPrevWeek
          )}
        </Tab>
        <Tab 
          key="nextWeek" 
          title="Next Week"
        >
          {renderTabContent(
            nextWeekTasks?.tasks || [], 
            isLoadingNextWeek, 
            isErrorNextWeek, 
            errorNextWeek
          )}
        </Tab>
      </Tabs>
    </Card>
  );
};

export default OneTimeTask;