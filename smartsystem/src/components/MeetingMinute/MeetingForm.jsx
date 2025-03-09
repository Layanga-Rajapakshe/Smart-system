import React, { useState } from "react";
import { Input, Button, Spacer } from "@heroui/react";
import axios from "axios";

function MeetingForm({ onAddSuccess }) {
  const [formData, setFormData] = useState({
    topic: "",
    dateTime: "",
    description: "",
    meetingRoomId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post("http://localhost:5000/api/meetings", formData);
      
      // Reset form
      setFormData({ 
        topic: "", 
        dateTime: "", 
        description: "", 
        meetingRoomId: "" 
      });
      
      // Call callback function to refresh parent component
      if (onAddSuccess) {
        onAddSuccess();
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 text-black">Add New Meeting</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            variant="bordered"
            label="Meeting Topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            fullWidth
            required
            className="py-2"
          />
          
          <Input
            variant="bordered"
            label="Date & Time"
            name="dateTime"
            type="datetime-local"
            value={formData.dateTime}
            onChange={handleChange}
            fullWidth
            required
            className="py-2"
          />
          
          <Input
            variant="bordered"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
            className="py-2"
          />
          
          <Input
            variant="bordered"
            label="Meeting Room ID"
            name="meetingRoomId"
            value={formData.meetingRoomId}
            onChange={handleChange}
            fullWidth
            required
            className="py-2"
          />
        </div>
        
        <Spacer y={1} />
        
        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="px-8"
            isDisabled={!formData.topic || !formData.dateTime || !formData.description || !formData.meetingRoomId}
          >
            Add Meeting
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MeetingForm;