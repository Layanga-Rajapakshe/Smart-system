import React, { useState } from 'react';
import { Input, Textarea, Select, SelectItem, Button } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import { useCreateTaskMutation } from '../../redux/api/taskApiSlice';
import { useSelector } from 'react-redux';

const RepeatTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [priorityLevel, setPriorityLevel] = useState('Medium');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [startingDate, setStartingDate] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskName || !description || !startingDate || !estimatedHours) {
      toast.error("Please fill out all fields");
      return;
    }

    try {
      const newTaskData = {
        UserId: userInfo.userId,
        Task: taskName,
        Comment: description,
        StartingDate: new Date(startingDate),
        PriorityLevel: priorityLevel,
        EstimatedHours: parseFloat(estimatedHours),
        isRecurring: true,
        TaskType: frequency,
        TaskId: `REC-${frequency}-${Date.now()}`,
        deadLine: new Date(startingDate)
      };

      await createTask(newTaskData).unwrap();
      toast.success(`${frequency} Recurring Task Added Successfully`);

      setTaskName('');
      setDescription('');
      setFrequency('Daily');
      setPriorityLevel('Medium');
      setEstimatedHours('');
      setStartingDate('');
      
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'An error occurred while creating recurring task');
    }
  };

  const today = new Date().toISOString().split('T')[0];

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
              isDisabled={isLoading}
            />
            <Textarea
              label='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder='Enter task description'
              isDisabled={isLoading}
            />
            <Input
              label='Starting Date'
              type='date'
              value={startingDate}
              onChange={(e) => setStartingDate(e.target.value)}
              min={today}
              required
              isDisabled={isLoading}
            />
            <Input
              label='Estimated Hours'
              type='number'
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              required
              placeholder='Enter estimated hours'
              min="0.5"
              step="0.5"
              isDisabled={isLoading}
            />
            <Select
              label="Priority Level"
              selectedKeys={[priorityLevel]}
              onChange={(e) => setPriorityLevel(e.target.value)}
              defaultSelectedKeys={["Medium"]}
              isDisabled={isLoading}
            >
              <SelectItem key="High" value="High" className="text-danger">High</SelectItem>
              <SelectItem key="Medium" value="Medium" className="text-warning">Medium</SelectItem>
              <SelectItem key="Low" value="Low" className="text-success">Low</SelectItem>
            </Select>
            <Select
              label="Frequency"
              selectedKeys={[frequency]}
              onChange={(e) => setFrequency(e.target.value)}
              placeholder="Select frequency"
              isDisabled={isLoading}
            >
              <SelectItem key="Daily" value="Daily">Daily</SelectItem>
              <SelectItem key="Weekly" value="Weekly">Weekly</SelectItem>
              <SelectItem key="Monthly" value="Monthly">Monthly</SelectItem>
            </Select>
            <Button 
              type='submit' 
              color='primary'
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              {isLoading ? 'Adding Recurring Task...' : 'Add Repeating Task'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepeatTask;