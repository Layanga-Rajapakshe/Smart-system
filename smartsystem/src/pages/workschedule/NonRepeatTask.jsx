import React, { useState } from 'react';
import { Input, Textarea, Button } from '@nextui-org/react';
import { toast } from 'react-hot-toast';

const NonRepeatTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskName || !description) {
      toast.error("Please fill out all fields");
      return;
    }

    const newTaskData = {
      taskName,
      description,
    };

    // Assume the task creation logic here, like an API call
    console.log(newTaskData);
    toast.success("One-Time Task Added Successfully");

    // Clear form fields after successful submission
    setTaskName('');
    setDescription('');
  };

  return (
    <div>
      <div className='flex overflow-hidden'>
        <div className='flex-1 flex-col flex items-center justify-center p-6 relative'>
          <div className='text-center text-[25px] font-bold mb-6 z-10'>Add One-Time Task</div>
          
          <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-4 mb-4 z-10'>
            <Input
              label='Task Name'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              placeholder='Enter task name'
            />

            <Textarea
              label='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder='Enter task description'
            />

            <Button type='submit' color='primary'>
              Add One-Time Task
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NonRepeatTask;
