import React, { useState } from 'react';
import { Input, Textarea, Select, SelectItem, Button } from '@nextui-org/react';
import { toast } from 'react-hot-toast';

const RepeatTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [priorityLevel, setPriorityLevel] = useState(1);
  const [estimatedHours, setEstimatedHours] = useState('');
  const [startingDate, setStartingDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !description || !startingDate || !estimatedHours) {
      toast.error("Please fill out all fields");
      return;
    }

    const newTaskData = {
      Task: taskName,
      Comment: description,
      StartingDate: new Date(startingDate),
      PriorityLevel: priorityLevel,
      EstimatedHours: parseFloat(estimatedHours),
      isRecurring: true,
      TaskType: frequency,
    };

    // Assume the task creation logic here, like an API call
    console.log(newTaskData);
    toast.success("Repeating Task Added Successfully");

    // Clear form fields after successful submission
    setTaskName('');
    setDescription('');
    setFrequency('Daily');
    setPriorityLevel(1);
    setEstimatedHours('');
    setStartingDate('');
  };

  return (
    <div>
      <div className='flex overflow-hidden'>
        <div className='flex-1 flex-col flex items-center justify-center p-6 relative'>
          <div className='text-center text-[25px] font-bold mb-6 z-10'>Add Repeating Task</div>
          
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
            <Input
              label='Starting Date'
              type='date'
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              required
            />
            <Input
              label='Estimated Hours'
              type='number'
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              required
              placeholder='Enter estimated hours'
            />
            <Input
              label='Priority Level'
              type='number'
              value={priorityLevel}
              onChange={(e) => setPriorityLevel(parseInt(e.target.value))}
              min={1}
              max={5}
              placeholder='Enter priority level (1-5)'
            />
            <Select
              label="Frequency"
              value={frequency}
              onChange={setFrequency}
              placeholder="Select frequency"
            >
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </Select>
            <Button type='submit' color='primary'>
              Add Repeating Task
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepeatTask;
