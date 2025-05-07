import React, { useState } from 'react';
import { 
  useGetSuperviseesQuery,
  useGetSuperviseeTasksByIdQuery,
  useAddTaskCommentMutation
} from '../../redux/api/superviseeApiSlice'; // Adjust import path as needed

const TasksList = () => {
  const [selectedSuperviseeId, setSelectedSuperviseeId] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  
  // Get all supervisees
  const { 
    data: supervisees, 
    isLoading: isLoadingSupervisees, 
    isError: isErrorSupervisees 
  } = useGetSuperviseesQuery();

  // Get tasks for selected supervisee
  const { 
    data: superviseeData, 
    isLoading: isLoadingTasks, 
    isError: isErrorTasks 
  } = useGetSuperviseeTasksByIdQuery(selectedSuperviseeId, { 
    skip: !selectedSuperviseeId 
  });

  // Mutation for adding comments
  const [addTaskComment, { isLoading: isAddingComment }] = useAddTaskCommentMutation();

  // Handle supervisee selection
  const handleSuperviseeChange = (e) => {
    setSelectedSuperviseeId(e.target.value);
  };

  // Handle comment input change
  const handleCommentChange = (taskId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [taskId]: value
    }));
  };

  // Handle submit comment
  const handleSubmitComment = async (taskId) => {
    if (!commentInputs[taskId]?.trim()) return;
    
    try {
      await addTaskComment({ 
        taskId, 
        comment: commentInputs[taskId] 
      }).unwrap();
      
      // Clear input after successful submission
      setCommentInputs(prev => ({
        ...prev,
        [taskId]: ''
      }));
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  // If loading supervisees
  if (isLoadingSupervisees) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If error loading supervisees
  if (isErrorSupervisees) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">Error loading supervisees. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Supervisee Selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label htmlFor="supervisee-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Supervisee
        </label>
        <select
          id="supervisee-select"
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={selectedSuperviseeId}
          onChange={handleSuperviseeChange}
        >
          <option value="">-- Select a supervisee --</option>
          {supervisees && supervisees.map(supervisee => (
            <option key={supervisee._id} value={supervisee._id}>
              {supervisee.name} - {supervisee.email}
            </option>
          ))}
        </select>
      </div>

      {/* Tasks List */}
      {selectedSuperviseeId && (
        <div className="bg-white p-4 rounded-lg shadow">
          {isLoadingTasks ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : isErrorTasks ? (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-600">Error loading tasks. Please try again later.</p>
            </div>
          ) : !superviseeData?.tasks?.length ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No tasks found for this supervisee.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {superviseeData.tasks.map((task) => (
                    <tr key={task._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.Title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{task.Description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.Status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          task.Status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.Status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.Priority === 'High' ? 'bg-red-100 text-red-800' : 
                          task.Priority === 'Medium' ? 'bg-orange-100 text-orange-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {task.Priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(task.Deadline).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-2">
                          {task.Comment && (
                            <div className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
                              {task.Comment}
                            </div>
                          )}
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              className="flex-1 text-sm border border-gray-300 rounded px-2 py-1"
                              placeholder="Add comment..."
                              value={commentInputs[task._id] || ''}
                              onChange={(e) => handleCommentChange(task._id, e.target.value)}
                            />
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-1 text-sm disabled:opacity-50"
                              onClick={() => handleSubmitComment(task._id)}
                              disabled={isAddingComment || !commentInputs[task._id]?.trim()}
                            >
                              {isAddingComment ? 'Saving...' : 'Add'}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {!selectedSuperviseeId && (
        <div className="bg-blue-50 p-4 rounded-md text-center">
          <p className="text-blue-600">Please select a supervisee to view their tasks.</p>
        </div>
      )}
    </div>
  );
};

export default TasksList;