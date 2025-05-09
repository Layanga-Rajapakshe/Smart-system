import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, 
  Users, 
  ChevronLeft,
  Save,
  X,
  Plus,
  Trash2,
  AlertCircle,
  Lock,
  CheckCircle,
  Shield
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [originalMeeting, setOriginalMeeting] = useState(null);
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
    projectId: "",
    meetingRoomId: "",
    attendees: [],
    todoList: []
  });
  
  // Field validation state
  const [validationErrors, setValidationErrors] = useState({
    topic: "",
    dateTime: "",
    description: "",
    projectId: "",
    attendees: "",
    todoList: ""
  });

  // Fetch meeting, projects and employees on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [meetingResponse, projectsResponse, employeesResponse] = await Promise.all([
          axios.get(`/api/meeting/${id}`, {
            withCredentials: true,
          }),
          axios.get("/api/project", {
            withCredentials: true,
          }),
          axios.get("/api/employees", {
            withCredentials: true,
          }),
        ]);
        
        const meeting = meetingResponse.data;
        
        // Check if meeting is restricted from editing
        if (meeting.restrictedEdit) {
          setError("This meeting is restricted from editing because a newer meeting exists for this project.");
          setLoading(false);
          return;
        }
        
        setOriginalMeeting(meeting);
        setProjects(projectsResponse.data);
        setEmployees(employeesResponse.data);
        
        // Format the meeting data for the form
        setMeetingData({
          topic: meeting.topic || "",
          dateTime: meeting.dateTime ? new Date(meeting.dateTime) : new Date(),
          description: meeting.description || "",
          projectId: meeting.projectId || "",
          meetingRoomId: meeting.meetingRoomId || "",
          attendees: meeting.attendees || [],
          todoList: meeting.todoList || []
        });
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load meeting data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear validation error when field is edited
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Handle date change
  const handleDateChange = (date) => {
    setMeetingData((prev) => ({
      ...prev,
      dateTime: date,
    }));
    
    // Clear validation error
    if (validationErrors.dateTime) {
      setValidationErrors((prev) => ({
        ...prev,
        dateTime: "",
      }));
    }
  };

  // Handle attendee selection
  const handleAttendeeChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setMeetingData((prev) => ({
      ...prev,
      attendees: selectedOptions,
    }));
    
    // Clear validation error
    if (validationErrors.attendees) {
      setValidationErrors((prev) => ({
        ...prev,
        attendees: "",
      }));
    }
  };

  // Add new todo item
  const addTodoItem = () => {
    setMeetingData((prev) => ({
      ...prev,
      todoList: [
        ...prev.todoList,
        { task: "", assignedTo: "", status: "pending" }
      ],
    }));
  };

  // Update todo item
  const updateTodoItem = (index, field, value) => {
    const updatedTodoList = [...meetingData.todoList];
    updatedTodoList[index] = {
      ...updatedTodoList[index],
      [field]: value,
    };
    
    setMeetingData((prev) => ({
      ...prev,
      todoList: updatedTodoList,
    }));
  };

  // Remove todo item
  const removeTodoItem = (index) => {
    const updatedTodoList = meetingData.todoList.filter((_, i) => i !== index);
    setMeetingData((prev) => ({
      ...prev,
      todoList: updatedTodoList,
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {
      topic: "",
      dateTime: "",
      description: "",
      projectId: "",
      attendees: "",
      todoList: ""
    };
    
    let isValid = true;
    
    if (!meetingData.topic.trim()) {
      errors.topic = "Meeting topic is required";
      isValid = false;
    }
    
    if (!meetingData.dateTime) {
      errors.dateTime = "Meeting date and time is required";
      isValid = false;
    }
    
    if (!meetingData.description.trim()) {
      errors.description = "Meeting description is required";
      isValid = false;
    }
    
    if (!meetingData.projectId) {
      errors.projectId = "Project selection is required";
      isValid = false;
    }
    
    if (meetingData.attendees.length === 0) {
      errors.attendees = "At least one attendee is required";
      isValid = false;
    }
    
    // Check for incomplete todo items
    if (meetingData.todoList.some(item => !item.task.trim() || !item.assignedTo)) {
      errors.todoList = "All todo items must have a task and assignee";
      isValid = false;
    }
    
    setValidationErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios.put(
        `/api/meeting/${id}`,
        meetingData,
        {
          withCredentials: true,
        }
      );
      
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate(`/meetingList/${id}`);
      }, 1500);
      
    } catch (err) {
      console.error("Error updating meeting:", err);
      setError(err.response?.data?.message || "Failed to update meeting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate(`/meetingList/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading meeting data...</p>
        </div>
      </div>
    );
  }

  if (error && !originalMeeting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-md">
          <div className="flex items-center mb-2">
            <AlertCircle size={20} className="mr-2" />
            <p className="font-bold">Error</p>
          </div>
          <p>{error}</p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => navigate("/meetingList")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Meetings
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/meetingList")}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            title="Back to Meetings"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Meeting</h1>
        </div>

        {success && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded flex items-center">
            <CheckCircle size={20} className="mr-2" />
            <span>Meeting updated successfully! Redirecting...</span>
          </div>
        )}

        {error && originalMeeting && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
            <div className="flex items-center">
              <Shield size={20} className="text-blue-600 mr-2" />
              <span className="font-medium">Meeting Details</span>
            </div>
          </div>

          <div className="p-6 grid gap-6">
            {/* Meeting topic */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Topic*
              </label>
              <input
                type="text"
                id="topic"
                name="topic"
                value={meetingData.topic}
                onChange={handleChange}
                className={`w-full border ${
                  validationErrors.topic ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter meeting topic"
              />
              {validationErrors.topic && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.topic}</p>
              )}
            </div>

            {/* Project selection */}
            <div>
              <label htmlFor="projectId" className="block text-sm font-medium text-gray-700 mb-1">
                Project*
              </label>
              <select
                id="projectId"
                name="projectId"
                value={meetingData.projectId}
                onChange={handleChange}
                className={`w-full border ${
                  validationErrors.projectId ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
              {validationErrors.projectId && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.projectId}</p>
              )}
            </div>

            {/* Date and time + Meeting room */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={meetingData.dateTime}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className={`w-full border ${
                      validationErrors.dateTime ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                {validationErrors.dateTime && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.dateTime}</p>
                )}
              </div>

              <div>
                <label htmlFor="meetingRoomId" className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Room ID
                </label>
                <input
                  type="text"
                  id="meetingRoomId"
                  name="meetingRoomId"
                  value={meetingData.meetingRoomId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter meeting room ID or link"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={meetingData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full border ${
                  validationErrors.description ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter meeting description, agenda items, etc."
              />
              {validationErrors.description && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
              )}
            </div>

            {/* Attendees */}
            <div>
              <label htmlFor="attendees" className="block text-sm font-medium text-gray-700 mb-1">
                Attendees*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={16} className="text-gray-400" />
                </div>
                <select
                  id="attendees"
                  name="attendees"
                  multiple
                  value={meetingData.attendees}
                  onChange={handleAttendeeChange}
                  className={`w-full border ${
                    validationErrors.attendees ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  size={5}
                >
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.name} ({employee.email})
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-xs text-gray-500">Hold Ctrl/Cmd to select multiple attendees</p>
              {validationErrors.attendees && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.attendees}</p>
              )}
            </div>

            {/* Todo List */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  To-Do List
                </label>
                <button
                  type="button"
                  onClick={addTodoItem}
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <Plus size={16} className="mr-1" />
                  Add Item
                </button>
              </div>
              
              {meetingData.todoList.length === 0 ? (
                <div className="text-center py-6 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">No todo items added yet</p>
                  <button
                    type="button"
                    onClick={addTodoItem}
                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                  >
                    <Plus size={14} className="mr-1" />
                    Add First Item
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {meetingData.todoList.map((item, index) => (
                    <div key={index} className="flex gap-2 border border-gray-200 p-3 rounded-md bg-gray-50">
                      <div className="flex-grow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="md:col-span-1">
                            <input
                              type="text"
                              value={item.task}
                              onChange={(e) => updateTodoItem(index, "task", e.target.value)}
                              placeholder="Task"
                              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <select
                              value={item.assignedTo}
                              onChange={(e) => updateTodoItem(index, "assignedTo", e.target.value)}
                              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="">Assign to</option>
                              {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                  {employee.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="md:col-span-1">
                            <select
                              value={item.status}
                              onChange={(e) => updateTodoItem(index, "status", e.target.value)}
                              className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeTodoItem(index)}
                        className="self-center p-1 text-red-500 hover:text-red-700"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {validationErrors.todoList && (
                <p className="mt-2 text-sm text-red-600">{validationErrors.todoList}</p>
              )}
            </div>
          </div>

          {/* Form actions */}
          <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={submitting}
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                submitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              }`}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeeting;