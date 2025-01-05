import React from 'react';
import { useGetRecurringTasksQuery } from '../../redux/api/taskApiSlice';
import TaskTable from './TaskTable';
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { useSelector } from 'react-redux';

const DailyTask = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: weeklyTasks,
    isLoading,
    isError,
    error
  } = useGetRecurringTasksQuery({
    UserId: userInfo.userId,
    TaskType: 'Daily',
  });

  // Transform tasks to match the expected format for the TaskTable
  const transformTasks = (tasks) => {
    return tasks?.map(task => ({
      id: task.id,
      userId: task.userId,
      name: task.name,
      status: task.status || 'pending',
      role: task.role || 'user',
      date: task.date
    })) || [];
  };

  const dailyTasks = weeklyTasks ? 
    transformTasks(
      weeklyTasks.filter(task => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate.getTime() === today.getTime();
      })
    ) : [];

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
        {dailyTasks.length > 0 ? (
          <TaskTable tasks={dailyTasks} />
        ) : (
          <div className="flex justify-center items-center h-48 text-default-500">
            No tasks scheduled for today
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default DailyTask;