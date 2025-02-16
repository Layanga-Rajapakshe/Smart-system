import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@heroui/react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { useSelector } from "react-redux";

// Define columns structure
const columns = [
  { uid: "Task", name: "Task" },
  { uid: "PriorityLevel", name: "Priority" },
  { uid: "EstimatedHours", name: "Hours" },
  { uid: "deadLine", name: "Deadline" },
  { uid: "isFinished", name: "Status" },
  { uid: "Comment", name: "Comment" },
  { uid: "actions", name: "Actions" },
];

const renderCell = (task, columnKey) => {
  const cellValue = task[columnKey];

  switch (columnKey) {
    case "Task":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm">{task.Task}</p>
        </div>
      );
    case "PriorityLevel":
      return (
        <Chip
          className="capitalize"
          size="sm"
          variant="flat"
          color={task.PriorityLevel === "High" ? "danger" : task.PriorityLevel === "Medium" ? "warning" : "success"}
        >
          {task.PriorityLevel}
        </Chip>
      );
    case "EstimatedHours":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm">{task.EstimatedHours} hrs</p>
        </div>
      );
    case "deadLine":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm">
            {new Date(task.deadLine).toLocaleDateString()}
          </p>
        </div>
      );
    case "isFinished":
      return (
        <Chip
          className="capitalize"
          size="sm"
          variant="flat"
          color={task.isFinished ? "success" : "warning"}
        >
          {task.isFinished ? "Completed" : "Pending"}
        </Chip>
      );
    case "Comment":
      return (
        <Tooltip content={task.Comment}>
          <div className="flex flex-col max-w-[200px]">
            <p className="text-bold text-sm truncate">{task.Comment}</p>
          </div>
        </Tooltip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Mark as Complete">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <GrView />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete Task">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <RiDeleteBin6Line />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};

export default function TaskTable({ tasks }) {
  return (
    <Table aria-label="Tasks Table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn 
            key={column.uid} 
            align={column.uid === "actions" ? "center" : "start"}
            className={column.uid === "Comment" ? "max-w-[200px]" : ""}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tasks}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}