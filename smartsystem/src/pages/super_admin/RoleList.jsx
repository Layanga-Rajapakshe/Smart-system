import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { useGetRolesQuery } from "../../redux/api/roleApiSlice"; // Import your role API slice hook

export default function RoleList() {
  const { data: roles, error, isLoading } = useGetRolesQuery(); // Fetch roles data
  const navigate = useNavigate();

  const handleEditClick = (roleId) => {
    navigate(`/roleedit/${roleId}`);
  };

  // const handleViewClick = (roleId) => {
  //   navigate(`/roleview/${roleId}`);
  // };

  const renderCell = React.useCallback((role, columnKey) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{role.name}</p>
          </div>
        );
      case "permissions":
        return (
          <p className="text-sm">
            {role.permissions.length > 0 ? role.permissions.join(", ") : "No permissions assigned"}
          </p>
        );
      case "hierarchyLevel":
        return <p className="text-sm">{role.hierarchyLevel}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            {/* <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <GrView onClick={() => handleViewClick(role._id)} />
              </span>
            </Tooltip> */}
            <Tooltip content="Edit role">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit onClick={() => handleEditClick(role._id)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete role">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RiDeleteBin6Line />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return role[columnKey];
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading roles</div>;

  return (
    <Table aria-label="Role list">
      <TableHeader>
        <TableColumn key="name">Name</TableColumn>
        <TableColumn key="permissions">Permissions</TableColumn>
        <TableColumn key="hierarchyLevel">Hierarchy Level</TableColumn>
        <TableColumn key="actions" align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody items={roles}>
        {(role) => (
          <TableRow key={role._id}>
            {(columnKey) => <TableCell>{renderCell(role, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
