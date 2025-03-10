import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Checkbox, Textarea } from "@heroui/react";

// Leave Request Modal Component
export default function LeaveRequestModal({ isOpen, onOpenChange }) {
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [urgent, setUrgent] = useState(false);
    const [isFormValid, setIsFormValid] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [modalClosed, setModalClosed] = useState(false);

    const handleSubmit = () => {
        // Check if all required fields are filled
        if (leaveType && startDate && endDate && reason) {
            // Add submit logic here
            console.log({ leaveType, startDate, endDate, reason, urgent });

            // Close the modal after 1 second
            setTimeout(() => {
                setModalClosed(true); // Set modalClosed to true after the timeout
                onOpenChange(false); // Close the modal
            }, 1000);

            // Show success message after closing the modal
            setTimeout(() => {
                setSuccessMessage("Leave request submitted successfully!");
            }, 1500);

            // Hide success message after 3 seconds
            setTimeout(() => setSuccessMessage(""), 4500);

            setIsFormValid(true);
        } else {
            setIsFormValid(false); // Form is invalid if any field is empty
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="text-xl font-semibold">Request a Leave</ModalHeader>
                    <ModalBody>
                        <Select
                            label={<><span>Leave Type</span><span style={{ color: 'red' }}> *</span></>}
                            value={leaveType}
                            onChange={(e) => setLeaveType(e.target.value)}
                            classNames={{ input: "border-gray-300" }}
                        >
                            <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                            <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                            <SelectItem value="Special Leave">Special Leave</SelectItem>
                        </Select>

                        <div className="mt-4">
                            <Input
                                label={<><span>Start Date</span><span style={{ color: 'red' }}> *</span></>}
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                classNames={{ input: "border-gray-300" }}
                            />
                        </div>

                        <div className="mt-4">
                            <Input
                                label={<><span>End Date</span><span style={{ color: 'red' }}> *</span></>}
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                classNames={{ input: "border-gray-300" }}
                            />
                        </div>

                        <div className="mt-4">
                            <Textarea
                                label={<><span>Reason for Leave</span><span style={{ color: 'red' }}> *</span></>}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                classNames={{ textarea: "border-gray-300" }}
                            />
                        </div>

                        <div className="mt-4 flex items-center">
                            <Checkbox
                                checked={urgent}
                                onChange={(e) => setUrgent(e.target.checked)}
                            />
                            <span className="ml-2" style={{ color: 'black', fontWeight: 'bold' }}>
                                Urgent Leave
                            </span>
                        </div>

                        {!isFormValid && <p className="text-red-500 mt-2">Please fill in all mandatory fields before submitting.</p>}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="flat" color="danger" onPress={() => onOpenChange(false)}>Cancel</Button>
                        <Button color="primary" onPress={handleSubmit} disabled={!leaveType || !startDate || !endDate || !reason}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Display success message outside the modal */}
            {successMessage && modalClosed && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-green-500 text-white rounded-lg shadow-md">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
}
