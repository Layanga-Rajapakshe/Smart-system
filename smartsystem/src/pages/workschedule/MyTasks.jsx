import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";

// Sample data for users
const users = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "https://via.placeholder.com/150", role: "Developer", team: "Engineering" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "https://via.placeholder.com/150", role: "Designer", team: "Design" },
];

// Sample data for tasks
const tasks = [
  { id: 1, name: "Implement feature X", date: "2024-10-26", status: "active", userId: 1 },
  { id: 2, name: "Design UI for new app", date: "2024-10-27", status: "paused", userId: 2 },
  { id: 3, name: "Fix bug in module Y", date: "2024-10-26", status: "active", userId: 1 },
  { id: 4, name: "User research", date: "2024-10-28", status: "vacation", userId: 2 },
  { id: 5, name: "Write documentation", date: "2024-11-01", status: "active", userId: 1 },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function MyTasks() {
  const [view, setView] = useState("daily"); // State for view selection

  // Function to filter tasks based on the selected view
  const filterTasks = () => {
    const today = new Date();
    switch (view) {
      case "daily":
        return tasks.filter(task => {
          const taskDate = new Date(task.date);
          return taskDate.toDateString() === today.toDateString();
        });
      case "weekly":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay()); // Get start of the week
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6); // Get end of the week
        return tasks.filter(task => {
          const taskDate = new Date(task.date);
          return taskDate >= weekStart && taskDate <= weekEnd;
        });
      case "monthly":
        return tasks.filter(task => {
          const taskDate = new Date(task.date);
          return taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear();
        });
      default:
        return [];
    }
  };

  const renderCell = React.useCallback((task, columnKey) => {
    const cellValue = task[columnKey];

    switch (columnKey) {
      case "name":
        const user = users.find(u => u.id === task.userId); // Find the user for the task
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={user.name}
          >
            {user.email}
          </User>
        );
      case "role":
        const userRole = users.find(u => u.id === task.userId); // Get user role
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{userRole.role}</p>
            <p className="text-bold text-sm capitalize text-default-400">{userRole.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[task.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <GrView />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RiDeleteBin6Line />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
      <Tabs
        selectedValue={view}
        onSelectionChange={setView} // Update the view when tab is changed
      >
        <Tab value="daily">Daily</Tab>
        <Tab value="weekly">Weekly</Tab>
        <Tab value="monthly">Monthly</Tab>
      </Tabs>

      <Table aria-label="Tasks Table">
        <TableHeader columns={[{ uid: "name", name: "Task" }, { uid: "role", name: "Role" }, { uid: "status", name: "Status" }, { uid: "actions", name: "Actions" }]}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={filterTasks()}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
