import React, { useState, useEffect } from "react";
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, Input, Select, SelectItem, Checkbox, Textarea,
  Divider, RadioGroup, Radio, Link, Tooltip, Chip
} from "@heroui/react";
import { Calendar, Clock, HelpCircle, AlertTriangle } from "lucide-react";

export default function LeaveRequestModal({ isOpen, onOpenChange, onSubmit, remainingLeaves = 0 }) {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [halfDay, setHalfDay] = useState("no");
  const [contactInfo, setContactInfo] = useState("");
  const [handoverNotes, setHandoverNotes] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [calculatedDays, setCalculatedDays] = useState(0);
  
  // Clear form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetForm();
      }, 300); // Wait for modal close animation
    }
  }, [isOpen]);
  
  // Calculate days between dates when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      // Validate dates
      if (end < start) {
        setValidationErrors({
          ...validationErrors,
          date: "End date cannot be before start date"
        });
        setCalculatedDays(0);
        return;
      }
      
      // Calculate business days between dates
      let days = 0;
      const tempDate = new Date(start);
      while (tempDate <= end) {
        const dayOfWeek = tempDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          days++;
        }
        tempDate.setDate(tempDate.getDate() + 1);
      }
      
      // Adjust for half day if selected
      if (halfDay !== "no" && days > 0) {
        days -= 0.5;
      }
      
      setCalculatedDays(days);
      
      // Remove date error if fixed
      if (validationErrors.date) {
        const { date, ...rest } = validationErrors;
        setValidationErrors(rest);
      }
    }
  }, [startDate, endDate, halfDay]);
  
  const resetForm = () => {
    setLeaveType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setUrgent(false);
    setHalfDay("no");
    setContactInfo("");
    setHandoverNotes("");
    setAttachment(null);
    setIsFormValid(true);
    setValidationErrors({});
    setCalculatedDays(0);
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!leaveType) errors.leaveType = "Please select a leave type";
    if (!startDate) errors.startDate = "Start date is required";
    if (!endDate) errors.endDate = "End date is required";
    if (!reason) errors.reason = "Reason is required";
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end < start) errors.date = "End date cannot be before start date";
    }
    
    if (calculatedDays > remainingLeaves) {
      errors.exceededBalance = `You only have ${remainingLeaves} days available`;
    }
    
    if (urgent && !contactInfo) {
      errors.contactInfo = "Contact information is required for urgent leaves";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const leaveData = {
        leaveType,
        startDate,
        endDate,
        calculatedDays,
        reason,
        urgent,
        halfDay: halfDay !== "no" ? halfDay : null,
        contactInfo,
        handoverNotes,
        attachment: attachment ? attachment.name : null,
      };
      
      onSubmit(leaveData);
      onOpenChange(false);
    } else {
      setIsFormValid(false);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };
  
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  
  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 border-b">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                <span className="text-xl font-semibold">Request Leave</span>
              </div>
              <p className="text-sm text-gray-500">
                Complete the form below to submit your leave request
              </p>
            </ModalHeader>
            
            <ModalBody className="py-6">
              {/* Leave Balance Info */}
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg mb-4">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span className="text-blue-800 font-medium">Your Leave Balance</span>
                </div>
                <Chip color="primary" variant="flat">{remainingLeaves} days available</Chip>
              </div>
              
              {/* Warning if balance exceeded */}
              {calculatedDays > remainingLeaves && calculatedDays > 0 && (
                <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 text-red-700 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>
                    Your requested leave ({calculatedDays} days) exceeds your available balance ({remainingLeaves} days).
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Leave Type */}
                <div className="col-span-1">
                  <Select
                    label="Leave Type *"
                    placeholder="Select leave type"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                    isInvalid={!!validationErrors.leaveType}
                    errorMessage={validationErrors.leaveType}
                    classNames={{ 
                      base: "max-w-full",
                      trigger: "h-12"
                    }}
                  >
                    <SelectItem key="Annual Leave" value="Annual Leave">Annual Leave</SelectItem>
                    <SelectItem key="Sick Leave" value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem key="Family Emergency" value="Family Emergency">Family Emergency</SelectItem>
                    <SelectItem key="Personal" value="Personal">Personal</SelectItem>
                    <SelectItem key="Study Leave" value="Study Leave">Study Leave</SelectItem>
                    <SelectItem key="Bereavement" value="Bereavement">Bereavement</SelectItem>
                    <SelectItem key="Other" value="Other">Other</SelectItem>
                  </Select>
                </div>
                
                {/* Half Day Option */}
                <div className="col-span-1">
                  <RadioGroup
                    label="Half-day Option"
                    orientation="horizontal"
                    value={halfDay}
                    onValueChange={setHalfDay}
                  >
                    <Radio value="no">Full day(s)</Radio>
                    <Radio value="first">First day half</Radio>
                    <Radio value="last">Last day half</Radio>
                  </RadioGroup>
                </div>
                
                {/* Date Range */}
                <div className="col-span-1">
                  <Input
                    type="date"
                    label="Start Date *"
                    placeholder="Select start date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    isInvalid={!!validationErrors.startDate || !!validationErrors.date}
                    errorMessage={validationErrors.startDate || validationErrors.date}
                    className="w-full"
                    classNames={{ 
                      base: "max-w-full",
                      input: "h-12"
                    }}
                  />
                </div>
                
                <div className="col-span-1">
                  <Input
                    type="date"
                    label="End Date *"
                    placeholder="Select end date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || today}
                    isInvalid={!!validationErrors.endDate || !!validationErrors.date}
                    errorMessage={validationErrors.endDate || ""}
                    className="w-full"
                    classNames={{ 
                      base: "max-w-full",
                      input: "h-12"
                    }}
                  />
                </div>
              </div>
              
              {/* Calculated Days Display */}
              {calculatedDays > 0 && (
                <div className="mt-3 flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Total working days:</span>
                  <Chip 
                    color={calculatedDays > remainingLeaves ? "danger" : "success"}
                    variant="flat"
                  >
                    {calculatedDays} day{calculatedDays !== 1 ? 's' : ''}
                  </Chip>
                </div>
              )}
              
              {/* Reason for Leave */}
              <div className="mt-4">
                <Textarea
                  label="Reason for Leave *"
                  placeholder="Provide details about your leave request"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  isInvalid={!!validationErrors.reason}
                  errorMessage={validationErrors.reason}
                  minRows={3}
                  className="w-full"
                />
              </div>
              
              {/* Urgent Leave Checkbox */}
              <div className="mt-4 flex flex-col">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    isSelected={urgent}
                    onValueChange={setUrgent}
                    color="danger"
                  />
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Urgent Leave Request</span>
                    <Tooltip content="Use only for genuine emergencies that require immediate attention">
                      <Button isIconOnly variant="light" size="sm">
                        <HelpCircle size={16} className="text-gray-500" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
                
                {urgent && (
                  <Input
                    className="mt-2"
                    type="text"
                    label="Emergency Contact Information *"
                    placeholder="Phone number where you can be reached"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    isInvalid={!!validationErrors.contactInfo}
                    errorMessage={validationErrors.contactInfo}
                  />
                )}
              </div>
              
              <Divider className="my-4" />
              
              {/* Additional Information Section */}
              <h4 className="text-md font-medium mb-2">Additional Information</h4>
              
              <div className="space-y-4">
                {/* Handover Notes */}
                <Textarea
                  label="Handover Notes"
                  placeholder="Share any important tasks or information your team needs during your absence"
                  value={handoverNotes}
                  onChange={(e) => setHandoverNotes(e.target.value)}
                  minRows={2}
                />
                
                {/* Document Upload */}
                <div>
                  <label className="block text-sm mb-1">Supporting Document (optional)</label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      className="hidden"
                      id="attachment"
                      onChange={handleFileChange}
                    />
                    <Button 
                      as="label" 
                      htmlFor="attachment" 
                      variant="bordered" 
                      size="sm"
                      className="min-w-36"
                    >
                      {attachment ? "Change File" : "Upload Document"}
                    </Button>
                    {attachment && (
                      <span className="ml-3 text-sm text-gray-600">
                        {attachment.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    For sick leave, please upload a medical certificate if applicable
                  </p>
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter className="border-t">
              <div className="w-full flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  * Required fields
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="bordered" 
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button 
                    color="primary" 
                    onPress={handleSubmit}
                    isDisabled={calculatedDays > remainingLeaves}
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}