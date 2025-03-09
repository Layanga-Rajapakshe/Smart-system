import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AttendanceEditModal = ({ isOpen, onClose, record, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    userId: '',
    date: new Date(),
    In: '',
    Out: ''
  });

  // Initialize form data when record changes
  useEffect(() => {
    if (record) {
      setFormData({
        userId: record.UserId || '',
        date: record.Date ? new Date(record.Date) : new Date(),
        In: record.In || '',
        Out: record.Out || ''
      });
    }
  }, [record]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      date
    }));
  };

  const handleTimeChange = (name, value) => {
    // Validate time format
    if (value === '' || /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    // Format time entries to ensure HH:MM:00 format
    const formatTimeEntry = (timeStr) => {
      if (!timeStr) return '';
      if (timeStr.split(':').length === 2) return `${timeStr}:00`;
      return timeStr;
    };

    const payload = {
      userId: formData.userId,
      date: formData.date.toISOString().split('T')[0],
      In: formatTimeEntry(formData.In),
      Out: formatTimeEntry(formData.Out)
    };

    onSave(payload);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl">
        <ModalHeader className="text-xl font-bold text-black">Edit Attendance Record</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                className="w-full border rounded-md p-2"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clock In Time (HH:MM)
              </label>
              <Input
                type="text"
                name="In"
                value={formData.In || ''}
                onChange={(e) => handleTimeChange('In', e.target.value)}
                placeholder="09:00"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Format: 24-hour time (e.g., 09:00 or 17:30)</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clock Out Time (HH:MM)
              </label>
              <Input
                type="text"
                name="Out"
                value={formData.Out || ''}
                onChange={(e) => handleTimeChange('Out', e.target.value)}
                placeholder="17:00"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">Format: 24-hour time (e.g., 09:00 or 17:30)</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            variant="flat" 
            onPress={handleSubmit}
            isLoading={isLoading}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AttendanceEditModal;