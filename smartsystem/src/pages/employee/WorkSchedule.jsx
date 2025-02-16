// WorkSchedule.js
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@heroui/react";
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

// Set Sri Lanka Timezone
moment.tz.setDefault("Asia/Colombo");
const localizer = momentLocalizer(moment);

const initialEvents = [
  {
    id: 0,
    title: 'Team Meeting',
    allDay: false,
    start: new Date(2024, 9, 13, 10, 0), // October 13th, 2024 at 10:00 AM in Sri Lanka time
    end: new Date(2024, 9, 13, 12, 0),   // Ends at 12:00 PM
  },
  {
    id: 1,
    title: 'Project Review',
    allDay: false,
    start: new Date(2024, 9, 14, 14, 0), // October 14th, 2024 at 2:00 PM
    end: new Date(2024, 9, 14, 15, 0),   // Ends at 3:00 PM
  }
];

const WorkSchedule = () => {
  const [myEvents, setMyEvents] = useState(initialEvents);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newEvent, setNewEvent] = useState({ title: '', start: null, end: null, id: null });
  const [isEditing, setIsEditing] = useState(false);

  // Handle slot selection to add new event
  const handleSelect = ({ start, end }) => {
    setNewEvent({ title: '', start, end, id: null });
    setIsEditing(false);
    onOpen(); // Open modal to input event details
  };

  // Handle event selection to edit existing event
  const handleSelectEvent = (event) => {
    setNewEvent(event);
    setIsEditing(true);
    onOpen(); // Open modal with event details for editing
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding or updating event
  const handleSaveEvent = () => {
    if (newEvent.title) {
      if (isEditing) {
        // Update existing event
        setMyEvents((prev) =>
          prev.map((event) =>
            event.id === newEvent.id ? newEvent : event
          )
        );
      } else {
        // Add new event
        setMyEvents((prev) => [
          ...prev,
          { ...newEvent, id: prev.length } // Assign new ID
        ]);
      }
      onOpenChange(false); // Close the modal
    }
  };

  // Handle deleting event
  const handleDeleteEvent = () => {
    setMyEvents((prev) => prev.filter((event) => event.id !== newEvent.id));
    onOpenChange(false); // Close the modal
  };

  const breadcrumbItems = [
    { label: 'My Dashboard', href: '/dashboard' },
    { label: 'Work Schedule', href: '/schedule', isCurrentPage: true }
  ];

  return (
    <div>
        <GeneralBreadCrumb items={breadcrumbItems} />
        <div className='container rounded-lg px-4'>

        <h1 className='text-2xl font-bold pb-4'>My Work Schedule (Sri Lanka Timezone)</h1>

        <Calendar
            localizer={localizer}
            events={myEvents}
            defaultView="week"
            views={['month', 'week', 'day']}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelect} // Select a time slot to add a new task
            onSelectEvent={handleSelectEvent} // Click an event to edit it
            style={{ height: 500 }}
        />

        {/* Modal for Adding/Editing Event */}
        <Modal 
            backdrop="blur"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    {isEditing ? 'Edit Task' : 'Add New Task'}
                </ModalHeader>
                <ModalBody>
                    <Input
                    autoFocus
                    label="Task Title"
                    placeholder="Enter task title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    name="title"
                    type="text"
                    variant="bordered"
                    />
                    <Input
                    readOnly
                    label="Start Time"
                    value={newEvent.start ? moment(newEvent.start).format('YYYY-MM-DD HH:mm') : ''}
                    variant="bordered"
                    />
                    <Input
                    readOnly
                    label="End Time"
                    value={newEvent.end ? moment(newEvent.end).format('YYYY-MM-DD HH:mm') : ''}
                    variant="bordered"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                    </Button>
                    {isEditing && (
                    <Button color="danger" onPress={handleDeleteEvent}>
                        Delete Task
                    </Button>
                    )}
                    <Button color="primary" onPress={handleSaveEvent}>
                    {isEditing ? 'Save Changes' : 'Add Task'}
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </div>
    </div>
  );
};

export default WorkSchedule;
