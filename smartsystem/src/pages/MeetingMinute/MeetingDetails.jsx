import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  ChevronLeft,
  Edit3,
  Check,
  X,
  Video,
  Save,
  AlertCircle,
  Clipboard,
  CheckCircle,
  User,
  Tag,
  MessageSquare
} from "lucide-react";

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [project, setProject] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discussionPoints, setDiscussionPoints] = useState("");
  const [isEditingDiscussion, setIsEditingDiscussion] = useState(false);
  const [savingDiscussion, setSavingDiscussion] = useState(false);
  const [discussionError, setDiscussionError] = useState(null);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  useEffect(() => {
    const fetchMeetingDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/meeting/${id}`, {
          withCredentials: true,
        });
        
        setMeeting(response.data);
        
        // Initialize discussion points from meeting data
        setDiscussionPoints(response.data.discussionPoints || "");
        
        // Fetch project details
        if (response.data.projectId) {
          const projectResponse = await axios.get(`/api/project/${response.data.projectId}`, {
            withCredentials: true,
          });
          setProject(projectResponse.data);
        }
        
        // Fetch attendee details
        if (response.data.attendees && response.data.attendees.length > 0) {
          const attendeePromises = response.data.attendees.map(attendeeId => 
            axios.get(`/api/employees/${attendeeId}`, { withCredentials: true })
          );
          
          const attendeeResponses = await Promise.all(attendeePromises);
          setAttendees(attendeeResponses.map(res => res.data));
        }
      } catch (err) {
        setError("Failed to fetch meeting details. Please try again.");
        console.error("Error fetching meeting:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingDetails();
  }, [id]);

  const handleDiscussionChange = (e) => {
    setDiscussionPoints(e.target.value);
  };

  const saveDiscussionPoints = async () => {
    setSavingDiscussion(true);
    setDiscussionError(null);
    
    try {
      await axios.patch(
        `/api/meeting/${id}/discussion-points`,
        { discussionPoints },
        { withCredentials: true }
      );
      
      setIsEditingDiscussion(false);
    } catch (err) {
      setDiscussionError("Failed to save discussion points. Please try again.");
      console.error("Error saving discussion points:", err);
    } finally {
      setSavingDiscussion(false);
    }
  };

  const copyMeetingLink = () => {
    // Construct a URL for joining the meeting via video call (this would be your WebRTC link)
    const meetingUrl = `${window.location.origin}/join-meeting/${meeting.meetingRoomId}`;
    
    navigator.clipboard.writeText(meetingUrl).then(
      () => {
        setShowCopiedMessage(true);
        setTimeout(() => setShowCopiedMessage(false), 3000);
      },
      () => {
        alert("Failed to copy meeting link");
      }
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading meeting details...</p>
        </div>
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error</p>
          <p>{error || "Meeting not found"}</p>
          <button 
            onClick={() => navigate("/meetingList")}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
          >
            Return to Meetings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/meetingList")}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft size={20} />
            <span>Back to Meetings</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{meeting.topic}</h1>
              <p className="text-gray-600 mt-1">
                Meeting ID: {meeting.meetingId}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <button
                onClick={copyMeetingLink}
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
              >
                <Video size={16} className="mr-2" />
                {showCopiedMessage ? "Copied!" : "Copy Meeting Link"}
              </button>
              
              {!meeting.restrictedEdit && (
                <Link
                  to={`/meetingList/${id}/edit`}
                  className="inline-flex items-center px-4 py-2 bg-amber-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:border-amber-700 focus:ring ring-amber-300 disabled:opacity-25 transition ease-in-out duration-150"
                >
                  <Edit3 size={16} className="mr-2" />
                  Edit Meeting
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Meeting Info Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Meeting Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start mb-4">
                  <Calendar size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date & Time</p>
                    <p className="text-gray-900">
                      {format(new Date(meeting.dateTime), "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start mb-4">
                  <Tag size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Project</p>
                    <p className="text-gray-900">
                      {project ? project.projectName : "Loading project..."}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <User size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Meeting Room ID</p>
                    <p className="text-gray-900">{meeting.meetingRoomId}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-start mb-4">
                  <FileText size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-gray-900">{meeting.description}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Users size={20} className="mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Attendees ({attendees.length})
                    </p>
                    <div className="mt-1">
                      {attendees.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {attendees.map((attendee) => (
                            <span
                              key={attendee._id}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {attendee.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">No attendees found</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Points Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Discussion Points</h2>
              
              {!isEditingDiscussion ? (
                <button
                  onClick={() => setIsEditingDiscussion(true)}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                >
                  <Edit3 size={16} className="mr-1" />
                  Edit
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditingDiscussion(false)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </button>
                  <button
                    onClick={saveDiscussionPoints}
                    disabled={savingDiscussion}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                  >
                    {savingDiscussion ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={16} className="mr-1" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            
            {discussionError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md">
                <div className="flex items-center">
                  <AlertCircle className="text-red-500 mr-3" size={24} />
                  <p className="text-red-700">{discussionError}</p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <MessageSquare size={20} className="mr-3 text-gray-500 mt-0.5" />
              <div className="flex-grow">
                {isEditingDiscussion ? (
                  <textarea
                    value={discussionPoints}
                    onChange={handleDiscussionChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    rows={8}
                    placeholder="Enter discussion points, decisions made, and action items discussed during the meeting..."
                  />
                ) : (
                  <div className="bg-gray-50 p-4 rounded-md min-h-[150px]">
                    {discussionPoints ? (
                      <div className="whitespace-pre-wrap">{discussionPoints}</div>
                    ) : (
                      <p className="text-gray-500 italic">No discussion points recorded yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Todo List Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Todo List</h2>
            
            {meeting.todoList && meeting.todoList.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {meeting.todoList.map((todo, index) => {
                  const assignedEmployee = attendees.find(
                    (attendee) => attendee._id === todo.assignedTo
                  );
                  
                  return (
                    <div key={index} className="py-4 flex items-start">
                      <div className={`mr-3 mt-0.5 ${
                        todo.status === "completed" ? "text-green-500" : "text-amber-500"
                      }`}>
                        {todo.status === "completed" ? (
                          <CheckCircle size={20} />
                        ) : (
                          <Clipboard size={20} />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center flex-wrap gap-2">
                          <h4 className={`font-medium ${
                            todo.status === "completed" ? "line-through text-gray-500" : "text-gray-900"
                          }`}>
                            {todo.task}
                          </h4>
                          
                          {todo.spillover && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Spillover
                            </span>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-500 mt-1">
                          Assigned to: {assignedEmployee ? assignedEmployee.name : "Unknown"}
                        </div>
                        
                        <div className="text-sm text-gray-500 mt-1">
                          Status: {todo.status === "completed" ? "Completed" : "Pending"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-md">
                <p>No tasks have been added to this meeting.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetails;