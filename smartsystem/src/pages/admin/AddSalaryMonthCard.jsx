import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { DatePicker } from "@heroui/react";
import { parseDate } from "@internationalized/date";

function AddSalaryMonthCard({ isModalOpen, setIsModalOpen, onSubmit }) {
  const [startDate, setStartDate] = useState(parseDate("2024-04-01"));

  const handleSubmit = () => {
    // Validate the range (ensure start and end exist)
    if (!startDate) {
      alert("Please select valid start and end dates.");
      return;
    }

    const startMonth = startDate.toString().slice(0, 7); // Extract "YYYY-MM"
    console.log(startMonth)

    // Call the addSalMonth function with the formatted data
    onSubmit(startMonth);

    // Close the modal after submitting
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={setIsModalOpen}
      backdrop="blur"
      placement="top-center"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Add your Salary Month to Continue
        </ModalHeader>
        <ModalBody>
          <DatePicker
            label="Start Date"
            className="max-w-[284px]"
            value={startDate}
            onChange={setStartDate}
            isRequired
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => setIsModalOpen(false)}
          >
            Close
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddSalaryMonthCard;
