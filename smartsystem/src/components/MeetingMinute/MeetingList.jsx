import React, { useState, useCallback, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  CircularProgress
} from "@heroui/react";
import toast from "react-hot-toast";
import { useUpdateMeetingMutation, useDeleteMeetingMutation } from "../../redux/api/meetingApiSlice";
import PaginationComponent from "../../components/Pagination";

function MeetingList({ meetings, onUpdate }) {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    topic: "",
    dateTime: "",
    description: "",
    meetingRoomId: "",
  });
  
  // RTK Query mutations
  const [updateMeeting, { isLoading: isUpdating }] = useUpdateMeetingMutation();
  const [deleteMeeting, { isLoading: isDeleting }] = useDeleteMeetingMutation();
  
  // Pagination and sorting states
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "topic",
    direction: "ascending",
  });
  const [filterValue, setFilterValue] = useState("");

  // Define columns
  const columns = [
    { name: "TOPIC", uid: "topic", sortable: true },
    { name: "DATE & TIME", uid: "dateTime", sortable: true },
    { name: "ROOM", uid: "meetingRoomId", sortable: true },
    { name: "ACTIONS", uid: "actions" }
  ];

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
        await deleteMeeting(id).unwrap();
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
      await updateMeeting({
        id: selectedMeeting.id,
        ...editFormData
      }).unwrap();
      
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

  // Check if meetings is defined and is an array
  const meetingsArray = Array.isArray(meetings) ? meetings : [];

  // Filter meetings based on search
  const hasSearchFilter = Boolean(filterValue);
  
  const filteredItems = useMemo(() => {
    let filteredMeetings = [...meetingsArray];
    
    if (hasSearchFilter) {
      filteredMeetings = filteredMeetings.filter((meeting) =>
        meeting.topic.toLowerCase().includes(filterValue.toLowerCase()) ||
        (meeting.description && meeting.description.toLowerCase().includes(filterValue.toLowerCase()))
      );
    }
    
    return filteredMeetings;
  }, [meetingsArray, filterValue]);

  // Pagination logic
  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  // Sorting logic
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  // Pagination handlers
  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // Cell rendering
  const renderCell = useCallback((meeting, columnKey) => {
    const cellValue = meeting[columnKey];
    
    switch (columnKey) {
      case "topic":
        return (
          <div>
            <div className="font-medium">{meeting.topic}</div>
            <div className="text-sm text-gray-500">{meeting.description}</div>
          </div>
        );
      case "dateTime":
        return formatDate(meeting.dateTime);
      case "actions":
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onPress={() => handleEdit(meeting)}
              disabled={isUpdating && selectedMeeting?.id === meeting.id}
            >
              {(isUpdating && selectedMeeting?.id === meeting.id) ? 'Updating...' : 'Edit'}
            </Button>
            <Button
              size="sm"
              color="danger"
              variant="flat"
              onPress={() => handleDelete(meeting.id)}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, [isUpdating, isDeleting, selectedMeeting]);

  // Table top content
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by topic or description..."
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant="bordered"
          />
          <div className="flex gap-3">
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small ml-2"
                onChange={onRowsPerPageChange}
                value={rowsPerPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </label>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {filteredItems.length} meetings
          </span>
        </div>
      </div>
    );
  }, [
    filterValue,
    onRowsPerPageChange,
    filteredItems.length,
    onSearchChange,
    rowsPerPage,
  ]);

  return (
    <div className="bg-white/50 rounded-lg border border-gray-200">
      {meetingsArray.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No meetings found. Add a new meeting to get started.
        </div>
      ) : (
        <Table
          aria-label="Meeting List"
          isHeaderSticky
          bottomContent={
            <PaginationComponent
              page={page}
              pages={pages}
              onPageChange={setPage}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
              selectedKeys={new Set([])}
              filteredItems={filteredItems}
            />
          }
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[600px]",
          }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody 
            emptyContent={"No meetings found"} 
            items={sortedItems}
            loadingContent={<CircularProgress aria-label="Loading" />}
          >
            {(item) => (
              <TableRow key={item.id || Math.random().toString()}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* Edit Meeting Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
        <ModalContent>
          {(onClose) => (
            <>
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
                <Button 
                  color="primary" 
                  onPress={handleUpdate}
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Meeting'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MeetingList;