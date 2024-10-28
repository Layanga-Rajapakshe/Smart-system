import React from "react";
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
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { users, statusColorMap } from "./data";

const renderCell = (task, columnKey) => {
  const cellValue = task[columnKey];

  switch (columnKey) {
    case "name":
      const user = users.find(u => u.id === task.userId);
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
      const userRole = users.find(u => u.id === task.userId);
      return (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{userRole.role}</p>
          <p className="text-bold text-sm capitalize text-default-400">
            {userRole.team}
          </p>
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
};

export default function TaskTable({ tasks }) {
  return (
    <Table aria-label="Tasks Table">
      <TableHeader columns={[{ uid: "name", name: "Task" }, { uid: "role", name: "Role" }, { uid: "status", name: "Status" }, { uid: "actions", name: "Actions" }]}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={tasks}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
