import React from 'react';

const SuperviseeTaskOverview = () => {
  // Example data, you can pass this data via props or fetch it from API
  const taskData = [
    { title: 'Task 1', status: 'In Progress', deadline: '2024-09-25' },
    { title: 'Task 2', status: 'Completed', deadline: '2024-09-20' },
    { title: 'Task 3', status: 'Pending', deadline: '2024-09-30' },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Task Overview</h2>
      <ul className="space-y-2">
        {taskData.map((task, index) => (
          <li key={index} className="p-2 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{task.title}</p>
                <p className="text-sm text-gray-500">Deadline: {task.deadline}</p>
              </div>
              <p className={`text-sm font-bold ${task.status === 'Completed' ? 'text-green-600' : task.status === 'In Progress' ? 'text-blue-600' : 'text-red-600'}`}>
                {task.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SuperviseeTaskOverview;
