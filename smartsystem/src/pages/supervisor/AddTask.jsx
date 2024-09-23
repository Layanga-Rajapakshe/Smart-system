import React, { useState } from 'react';
import { Input, Button, Image, Select, SelectItem } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("New");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskSupervisor, setTaskSupervisor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle task registration logic here
    console.log("Task Name:", taskName);
    console.log("Task Description:", taskDescription);
    console.log("Task Deadline:", taskDeadline);
    console.log("Task Priority:", taskPriority);
    console.log("Task Status:", taskStatus);
    console.log("Task Assignee:", taskAssignee);
    console.log("Task Supervisor:", taskSupervisor);
  };

  const breadcrumbItems = [
    { label: 'Supervisee Task List', href: '/superviseetasks' },
    { label: 'Add New Task', href: '/newtask', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className='flex h-fullx overflow-hidden'>
        <div className='flex-1 flex-col flex items-center justify-center p-6'>
          <div className='md:hidden absolute left-0 right-0 bottom-0 top-0 z-0'>
            <Image
              isBlurred
              className='w-full h-screen/2 fill-inherit'
              src="https://nextui.org/gradients/docs-right.png"
              alt='Register page image'
            />
          </div>

          <div className='text-center text-[25px] font-bold mb-6'>Add New Task</div>

          <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 mb-4'>
            <Input
              variant='bordered'
              label='Task Name'
              type='text'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Task Description'
              type='text'
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
            <Input
              variant='bordered'
              label='Task Deadline'
              type='date'
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
            <Select
              label="Task Priority"
              placeholder="Select Task Priority"
              value={taskPriority}
              onChange={(value) => setTaskPriority(value)}
            >
              <SelectItem value="1">1 - High</SelectItem>
              <SelectItem value="2">2 - Medium</SelectItem>
              <SelectItem value="3">3 - Low</SelectItem>
            </Select>
            <Select
              label="Task Assignee"
              placeholder="Select Task Assignee"
              value={taskAssignee}
              onChange={(value) => setTaskAssignee(value)}
            >
              <SelectItem value="Assignee 1">Assignee 1</SelectItem>
              <SelectItem value="Assignee 2">Assignee 2</SelectItem>
              <SelectItem value="Assignee 3">Assignee 3</SelectItem>
            </Select>
            <Select
              label="Task Supervisor"
              placeholder="Select Task Supervisor"
              value={taskSupervisor}
              onChange={(value) => setTaskSupervisor(value)}
            >
              <SelectItem value="Supervisor 1">Supervisor 1</SelectItem>
              <SelectItem value="Supervisor 2">Supervisor 2</SelectItem>
              <SelectItem value="Supervisor 3">Supervisor 3</SelectItem>
            </Select>

            <Button type='submit' variant='flat' color='primary'>
              Add Task
            </Button>
          </form>

        </div>

        <div className='hidden md:flex flex-1 items-center justify-center p-6'>
          <div className='w-full h-full flex items-center justify-center'>
            <Image
              isBlurred
              className='w-full h-full object-fill'
              src={image1}
              alt='Register page image'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
