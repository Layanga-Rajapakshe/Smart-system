import React from 'react';
import { useGetRecurringTasksQuery } from '../../redux/api/taskApiSlice';
import TaskTable from './TaskTable';
import { Card, CardBody, Spinner } from "@heroui/react";
import { useSelector } from 'react-redux';

const MonthlyTask = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: monthlyTasks,
    isLoading,
    isError,
    error
  } = useGetRecurringTasksQuery({
    userId: userInfo.userId,
    taskType: 'Monthly',
  });

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardBody className="flex justify-center items-center h-48">
          <Spinner size="lg" />
        </CardBody>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full">
        <CardBody className="p-6">
          <div className="text-red-500">
            Error loading tasks: {error?.data?.message || 'Something went wrong'}
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardBody>
        {monthlyTasks.tasks.length > 0 ? (
          <TaskTable tasks={monthlyTasks.tasks} />
        ) : (
          <div className="flex justify-center items-center h-48 text-default-500">
            No tasks scheduled for this month
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default MonthlyTask;