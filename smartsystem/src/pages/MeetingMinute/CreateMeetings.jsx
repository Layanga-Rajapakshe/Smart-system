import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ChevronLeft,
  Save,
  X,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateMeetings = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [meetingData, setMeetingData] = useState({
    topic: "",
    dateTime: new Date(),
    description: "",
    projectId: "", // Using projectId to match the backend field name
    attendees: [],
    todoList: [],
    projectManager: "" // Added projectManager which is required by the backend
  });

  // Field validation state
  const [validationErrors, setValidationErrors] = useState({
    topic: "",
    dateTime: "",
    description: "",
    projectId: "",
    attendees: "",
    todoList: "",
    projectManager: ""
  });

  // Fetch projects and employees on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projectsResponse, employeesResponse] = await Promise.all([
          axios.get("/api/project", {
            withCredentials: true,
          }),
          axios.get("/api/employees", {
            withCredentials: true,
          }),
        ]);

        setProjects(projectsResponse.data);
        setEmployees(employeesResponse.data);

        // If there are employees, set the first one as default project manager
        if (employeesResponse.data.length > 0) {
          setMeetingData(prev => ({
            ...prev,
            projectManager: employeesResponse.data[0]._id
          }));
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData({ ...meetingData, [name]: value });

    // Clear validation error when field is being edited
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: "" });
    }
  };

  // Handle date change
  const handleDateChange = (date) => {
    setMeetingData({ ...meetingData, dateTime: date });
    if (validationErrors.dateTime) {
      setValidationErrors({ ...validationErrors, dateTime: "" });
    }
  };

  // Handle attendee selection
  const handleAttendeeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setMeetingData({ ...meetingData, attendees: selectedOptions });
    if (validationErrors.attendees) {
      setValidationErrors({ ...validationErrors, attendees: "" });
    }
  };

  // Handle project manager selection
  const handleProjectManagerChange = (e) => {
    setMeetingData({ ...meetingData, projectManager: e.target.value });
    if (validationErrors.projectManager) {
      setValidationErrors({ ...validationErrors, projectManager: "" });
    }
  };

  // Add new todo item
  const addTodoItem = () => {
    setMeetingData({
      ...meetingData,
      todoList: [
        ...meetingData.todoList,
        { task: "", assignedTo: "", status: "pending", spillover: false }
      ]
    });
  };

  // Update todo item
  const updateTodoItem = (index, field, value) => {
    const updatedTodoList = [...meetingData.todoList];
    updatedTodoList[index] = { ...updatedTodoList[index], [field]: value };
    setMeetingData({ ...meetingData, todoList: updatedTodoList });
  };

  // Remove todo item
  const removeTodoItem = (index) => {
    const updatedTodoList = meetingData.todoList.filter((_, i) => i !== index);
    setMeetingData({ ...meetingData, todoList: updatedTodoList });
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!meetingData.topic.trim()) {
      errors.topic = "Meeting topic is required";
    }

    if (!meetingData.dateTime) {
      errors.dateTime = "Date and time are required";
    }

    if (!meetingData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!meetingData.projectId) {
      errors.projectId = "Project selection is required";
    }

    if (!meetingData.projectManager) {
      errors.projectManager = "Project manager is required";
    }

    if (meetingData.attendees.length === 0) {
      errors.attendees = "At least one attendee is required";
    }

    // Validate each todo item (if any exist)
    if (meetingData.todoList.length > 0) {
      const todoErrors = meetingData.todoList.some(
        item => !item.task.trim() || !item.assignedTo
      );

      if (todoErrors) {
        errors.todoList = "All todo items must have a task and assigned person";
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors).find(key => validationErrors[key]);
      if (firstErrorField) {
        const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Format the data for submission
      const formattedData = {
        ...meetingData,
        // Format todo list to ensure proper structure
        todoList: meetingData.todoList.map(item => ({
          task: item.task,
          assignedTo: item.assignedTo,
          status: item.status || "pending",
          spillover: item.spillover || false
        }))
      };

      // First check if the meeting already exists to avoid duplicates
      let meetingExists = false;
      
      try {
        // Make the POST request to create the meeting
        const response = await axios.post("/api/meeting", formattedData, {
          withCredentials: true,
          timeout: 8000, // Reduced timeout to prevent long waits
        });
        
        console.log("Meeting created successfully:", response.data);
        setSuccess(true);
        
        // Redirect after a brief delay to show success message
        setTimeout(() => {
          navigate("/meetingList");
        }, 2000);
        
      } catch (postError) {
        console.error("Initial POST error:", postError);
        
        // Wait a moment to give database time to complete potential transaction
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // If the POST fails, check if the meeting was actually created
        // by making a GET request to the meetings list
        try {
          const checkResponse = await axios.get("/api/meeting", {
            withCredentials: true,
            timeout: 5000,
          });
          
          // Check if a meeting with the same topic and project exists in recent meetings
          // This is a basic check - you may need more specific criteria
          const recentCreatedMeeting = checkResponse.data.find(meeting => 
            meeting.topic === meetingData.topic && 
            meeting.projectId === meetingData.projectId &&
            // Check if created within the last 5 minutes
            new Date(meeting.createdAt) > new Date(Date.now() - 5 * 60 * 1000)
          );
          
          if (recentCreatedMeeting) {
            console.log("Meeting was actually created:", recentCreatedMeeting);
            meetingExists = true;
            setSuccess(true);
            
            // Redirect to meetings list
            setTimeout(() => {
              navigate("/meetingList");
            }, 2000);
          } else {
            // Re-throw the original error if no matching meeting was found
            throw postError;
          }
        } catch (checkError) {
          console.error("Error checking for meeting:", checkError);
          // Continue to the main error handler with the original error
          throw postError;
        }
      }
    } catch (err) {
      // Improved error handling
      console.error("Final error details:", err);
      
      // Check if the error has a response property
      if (err.response) {
        // The request was made and the server responded with a status code outside 2xx range
        const errorMsg = err.response.data?.message || `Server error: ${err.response.status}`;
        
        // If we get a 500 error, it might be from the notification service
        if (err.response.status === 500 && err.response.data?.error?.includes("notification")) {
          setError("Meeting may have been created but notification service failed. Please check the meetings list.");
        } else {
          setError(errorMsg);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response received from server. The meeting might have been created. Please check the meetings list.");
      } else {
        // Something happened in setting up the request
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/meetingList")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Back to Meetings</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Create New Meeting</h1>
          <p className="text-gray-600 mt-2">
            Schedule a new meeting and invite team members to collaborate.
          </p>
        </div>

        {/* Success message */}
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-3" size={24} />
              <p className="text-green-700">
                Meeting created successfully! Redirecting to meetings dashboard...
              </p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={24} />
              <div>
                <p className="text-red-700 font-medium">Error</p>
                <p className="text-red-600">{error}</p>
                {error.includes("might have been created") && (
                  <p className="text-gray-600 mt-1">
                    <button 
                      onClick={() => navigate("/meetingList")} 
                      className="text-blue-600 hover:underline"
                    >
                      Click here
                    </button> to check if your meeting was created.
                  </p>
                )}
              </div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          {/* Meeting Details Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Meeting Details</h2>
            
            {/* Topic */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="topic">
                Meeting Topic*
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                  ${validationErrors.topic ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                value={meetingData.topic}
                onChange={handleInputChange}
                placeholder="Enter meeting topic"
              />
              {validationErrors.topic && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.topic}</p>
              )}
            </div>

            {/* Project Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="projectId">
                Select Project*
              </label>
              <select
                id="projectId"
                name="projectId"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                  ${validationErrors.projectId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                value={meetingData.projectId}
                onChange={handleInputChange}
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
              {validationErrors.projectId && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.projectId}</p>
              )}
            </div>

            {/* Project Manager Selection */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="projectManager">
                Project Manager*
              </label>
              <select
                id="projectManager"
                name="projectManager"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                  ${validationErrors.projectManager ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                value={meetingData.projectManager}
                onChange={handleProjectManagerChange}
              >
                <option value="">Select a project manager</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              {validationErrors.projectManager && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.projectManager}</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Date and Time*
              </label>
              <div className="relative">
                <DatePicker
                  selected={meetingData.dateTime}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                    ${validationErrors.dateTime ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                  placeholderText="Select date and time"
                />
                <Calendar className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
              {validationErrors.dateTime && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.dateTime}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                Meeting Description*
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 
                  ${validationErrors.description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                value={meetingData.description}
                onChange={handleInputChange}
                placeholder="Provide a brief description of the meeting"
              ></textarea>
              {validationErrors.description && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.description}</p>
              )}
            </div>
          </div>

          {/* Attendees Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <div className="flex items-center">
                <Users size={20} className="mr-2" />
                <span>Meeting Attendees*</span>
              </div>
            </h2>
            <select
              multiple
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 h-48 
                ${validationErrors.attendees ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
              value={meetingData.attendees}
              onChange={handleAttendeeChange}
            >
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} - {employee.designation}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-2">
              Hold Ctrl (or Cmd) to select multiple attendees
            </p>
            {validationErrors.attendees && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.attendees}</p>
            )}
          </div>

          {/* Todo List Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                <div className="flex items-center">
                  <CheckCircle size={20} className="mr-2" />
                  <span>Action Items</span>
                </div>
              </h2>
              <button
                type="button"
                onClick={addTodoItem}
                className="flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
              >
                <Plus size={18} className="mr-1" />
                <span>Add Item</span>
              </button>
            </div>

            {meetingData.todoList.length === 0 ? (
              <div className="text-center py-6 bg-gray-50 rounded-md border border-dashed border-gray-300">
                <p className="text-gray-500">No action items added yet. Click "Add Item" to create tasks.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {meetingData.todoList.map((item, index) => (
                  <div key={index} className="p-4 border rounded-md bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium">Action Item #{index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeTodoItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Task */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Task*
                        </label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200"
                          value={item.task}
                          onChange={(e) => updateTodoItem(index, "task", e.target.value)}
                          placeholder="Describe the task"
                        />
                      </div>

                      {/* Assigned To */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Assigned To*
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200"
                          value={item.assignedTo}
                          onChange={(e) => updateTodoItem(index, "assignedTo", e.target.value)}
                        >
                          <option value="">Select assignee</option>
                          {employees.map((employee) => (
                            <option key={employee._id} value={employee._id}>
                              {employee.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Status */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">
                          Status
                        </label>
                        <select
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-200"
                          value={item.status}
                          onChange={(e) => updateTodoItem(index, "status", e.target.value)}
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>

                      {/* Spillover */}
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`spillover-${index}`}
                          checked={item.spillover}
                          onChange={(e) => updateTodoItem(index, "spillover", e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`spillover-${index}`}
                          className="ml-2 block text-gray-700 text-sm"
                        >
                          Mark as spillover task
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {validationErrors.todoList && (
              <p className="text-red-500 text-sm mt-2">{validationErrors.todoList}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className={`flex items-center px-6 py-2.5 ${
                submitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  <span>Create Meeting</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeetings;