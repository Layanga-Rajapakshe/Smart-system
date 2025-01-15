import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import axios from "axios";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Card, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";

function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    dateTime: "",
    description: "",
    ProjectId: "",
    ProjectManager: "",
    attendees: [""],
  });

  const navigate = useNavigate(); // Initialize navigate function for routing

  const fetchMeetings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/meeting/");
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/meeting/", formData);
      fetchMeetings();
      setIsFormOpen(false);
      setFormData({
        topic: "",
        dateTime: "",
        description: "",
        ProjectId: "",
        ProjectManager: "",
        attendees: [""],
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicFieldChange = (index, value, field) => {
    setFormData((prev) => {
      const updatedField = [...prev[field]];
      updatedField[index] = value;
      return { ...prev, [field]: updatedField };
    });
  };

  const addField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (index, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`); // Navigate to the project-specific page
    
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Meetings Management</h1>
      <p className="text-gray-500 mb-6">
        Seamlessly manage your company's meetings with ease and efficiency.
      </p>
      <Button color="primary" onPress={() => setIsFormOpen(true)}>
        Create Project
      </Button>

      <Modal isOpen={isFormOpen} onOpenChange={setIsFormOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Meeting</ModalHeader>
              <ModalBody>
                <Input
                  label="Topic"
                  placeholder="Enter topic"
                  value={formData.topic}
                  name="topic"
                  onChange={handleInputChange}
                  variant="bordered"
                />
                <Input
                  label="Date and Time"
                  type="datetime-local"
                  value={formData.dateTime}
                  name="dateTime"
                  onChange={handleInputChange}
                  variant="bordered"
                />
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  value={formData.description}
                  name="description"
                  onChange={handleInputChange}
                  variant="bordered"
                />
                <Input
                  label="Project ID"
                  placeholder="Enter project ID"
                  type="number"
                  value={formData.ProjectId}
                  name="ProjectId"
                  onChange={handleInputChange}
                  variant="bordered"
                />
                <Input
                  label="Project Manager"
                  placeholder="Enter project manager ID"
                  value={formData.ProjectManager}
                  name="ProjectManager"
                  onChange={handleInputChange}
                  variant="bordered"
                />
                <div>
                  <h3 className="text-gray-700 mb-2">Attendees</h3>
                  {formData.attendees.map((attendee, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={attendee}
                        onChange={(e) =>
                          handleDynamicFieldChange(index, e.target.value, "attendees")
                        }
                        placeholder="Attendee ID"
                        variant="bordered"
                      />
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={() => removeField(index, "attendees")}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    color="secondary"
                    variant="flat"
                    onPress={() => addField("attendees")}
                  >
                    Add Attendee
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => { handleSubmit(); onClose(); }}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Scheduled Meetings</h2>
        {meetings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="max-w-[340px]">
                <CardHeader>
                  <div className="flex gap-3">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="https://nextui.org/avatars/avatar-1.png"
                    />
                    <div>
                      <h4 className="text-medium font-semibold">{meeting.topic}</h4>
                      <p className="text-small text-default-400">{meeting.ProjectManager}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <p>{meeting.description}</p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(meeting.dateTime).toLocaleString()}
                  </p>
                  <p>
                    <strong>Project ID:</strong> {meeting.ProjectId}
                  </p>
                </CardBody>
                <CardFooter>
                  <Button color="primary" size="sm" onPress={() => handleViewDetails(meeting.ProjectId)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>No meetings scheduled yet.</p>
        )}
      </div>
    </div>
  );
}

export default Meetings;
