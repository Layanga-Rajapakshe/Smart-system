import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
} from "@nextui-org/react";

function ProjectDetails() {
  const { projectId } = useParams();
  const [meetings, setMeetings] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [page, setPage] = useState(1); // Track the current page
  const [isFormOpen, setIsFormOpen] = useState(false); // For popup form
  const rowsPerPage = 5; // Set how many rows per page to display
  const [formData, setFormData] = useState({
    topic: "",
    dateTime: "",
    description: "",
    attendees: [""],
  });

  useEffect(() => {
    const fetchProjectMeetings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/meeting/project/${projectId}`
        );
        setMeetings(response.data.meetings);
        setProjectName(response.data.projectName);
      } catch (error) {
        console.error("Error fetching project meetings:", error);
      }
    };

    fetchProjectMeetings();
  }, [projectId]);

  const pages = Math.ceil(meetings.length / rowsPerPage);
  const currentMeetings = meetings.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicFieldChange = (index, value) => {
    setFormData((prev) => {
      const updatedAttendees = [...prev.attendees];
      updatedAttendees[index] = value;
      return { ...prev, attendees: updatedAttendees };
    });
  };

  const addAttendeeField = () => {
    setFormData((prev) => ({
      ...prev,
      attendees: [...prev.attendees, ""],
    }));
  };

  const removeAttendeeField = (index) => {
    setFormData((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/meeting/`, {
        ...formData,
        projectId,
      });
      
      // Directly update the state with the new meeting
      setMeetings((prevMeetings) => [
        ...prevMeetings,
        response.data, // Assuming the response contains the newly created meeting
      ]);
  
      setFormData({
        topic: "",
        dateTime: "",
        description: "",
        attendees: [""],
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding meeting:", error);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Project Details</h1>
      <p className="text-gray-500 mb-6">Viewing details for Project ID: {projectId}</p>
      <h2 className="text-2xl font-semibold mb-4">{projectName}</h2>

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Meetings for this Project</h3>

        {/* Add Meeting Button */}
        <div className="mb-6 flex justify-end">
          <Button
            onPress={() => setIsFormOpen(true)}
            color="primary"
            auto
            icon={<span className="text-xl font-bold"> + </span>}
          >
            Add Meeting
          </Button>
        </div>

        {/* Modal for Adding Meeting */}
        <Modal isOpen={isFormOpen} onOpenChange={setIsFormOpen}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add New Meeting
                </ModalHeader>
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
                  <div>
                    <h3 className="text-gray-700 mb-2">Attendees</h3>
                    {formData.attendees.map((attendee, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          value={attendee}
                          onChange={(e) =>
                            handleDynamicFieldChange(index, e.target.value)
                          }
                          placeholder="Attendee"
                          variant="bordered"
                        />
                        <Button
                          color="danger"
                          variant="flat"
                          onPress={() => removeAttendeeField(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      color="secondary"
                      variant="flat"
                      onPress={addAttendeeField}
                    >
                      Add Attendee
                    </Button>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    onPress={() => {
                      handleSubmit();
                      onClose();
                    }}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Meetings Table */}
        {Array.isArray(meetings) && meetings.length > 0 ? (
          <Table aria-label="Meetings under this project" css={{ width: "100%" }}>
            <TableHeader>
              <TableColumn>Topic</TableColumn>
              <TableColumn>Date & Time</TableColumn>
              <TableColumn>Description</TableColumn>
              <TableColumn>Attendees</TableColumn>
            </TableHeader>
            <TableBody>
              {currentMeetings.map((meeting) => (
                <TableRow key={meeting.id}>
                  <TableCell>{meeting.topic || "N/A"}</TableCell>
                  <TableCell>{new Date(meeting.dateTime).toLocaleString()}</TableCell>
                  <TableCell>{meeting.description || "N/A"}</TableCell>
                  <TableCell>
                    {meeting.attendees.length > 0
                      ? meeting.attendees.join(", ")
                      : "None"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No meetings scheduled for this project.</p>
        )}

        {/* Pagination */}
        <div className="mt-4">
          <Pagination
            isCompact
            showControls
            initialPage={1}
            total={pages}
            page={page}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
