import React, { useState } from "react";
import { Table, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Spacer } from "@heroui/react";
import axios from "axios";
import toast from "react-hot-toast";

function MeetingList({ meetings, onUpdate }) {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    topic: "",
    dateTime: "",
    description: "",
    meetingRoomId: "",
  });

  const handleEdit = (meeting) => {
    setSelectedMeeting(meeting);
    setEditFormData({
      topic: meeting.topic,
      dateTime: meeting.dateTime ? meeting.dateTime.substring(0, 16) : "", // Format for datetime-local input
      description: meeting.description,
      meetingRoomId: meeting.meetingRoomId,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meeting?")) {
      try {
        await axios.delete(`http://localhost:5000/api/meetings/${id}`);
        toast.success("Meeting deleted successfully!");
        if (onUpdate) onUpdate();
      } catch (error) {
        console.error("Error deleting meeting:", error);
        toast.error("Failed to delete meeting.");
      }
    }
  };

  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/meetings/${selectedMeeting._id}`, editFormData);
      setIsModalOpen(false);
      toast.success("Meeting updated successfully!");
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Error updating meeting:", error);
      toast.error("Failed to update meeting.");
    }
  };

  const formatDate = (dateTimeStr) => {
    if (!dateTimeStr) return "N/A";
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  return (
    <div className="bg-white/50 rounded-lg border border-gray-200">
      {meetings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No meetings found. Add a new meeting to get started.
        </div>
      ) : (
        <Table aria-label="Meetings table" className="w-full">
          <Table.Header>
            <Table.Column>TOPIC</Table.Column>
            <Table.Column>DATE & TIME</Table.Column>
            <Table.Column>ROOM</Table.Column>
            <Table.Column>ACTIONS</Table.Column>
          </Table.Header>
          <Table.Body>
            {meetings.map((meeting) => (
              <Table.Row key={meeting._id}>
                <Table.Cell>
                  <div className="font-medium">{meeting.topic}</div>
                  <div className="text-sm text-gray-500">{meeting.description}</div>
                </Table.Cell>
                <Table.Cell>{formatDate(meeting.dateTime)}</Table.Cell>
                <Table.Cell>{meeting.meetingRoomId}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      onClick={() => handleEdit(meeting)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      variant="flat"
                      onClick={() => handleDelete(meeting._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {/* Edit Meeting Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader className="text-xl font-bold">Edit Meeting</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Meeting Topic"
                name="topic"
                value={editFormData.topic}
                onChange={handleChange}
                variant="bordered"
                fullWidth
                required
              />
              <Input
                label="Date & Time"
                name="dateTime"
                type="datetime-local"
                value={editFormData.dateTime}
                onChange={handleChange}
                variant="bordered"
                fullWidth
                required
              />
              <Input
                label="Description"
                name="description"
                value={editFormData.description}
                onChange={handleChange}
                variant="bordered"
                fullWidth
                required
              />
              <Input
                label="Meeting Room ID"
                name="meetingRoomId"
                value={editFormData.meetingRoomId}
                onChange={handleChange}
                variant="bordered"
                fullWidth
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleUpdate}>
              Update Meeting
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MeetingList;