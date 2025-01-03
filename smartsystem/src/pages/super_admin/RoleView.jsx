import React from "react";
import { Input, CircularProgress, Image } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useGetRolesQuery } from "../../redux/api/roleApiSlice";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import toast from "react-hot-toast";

const RoleView = () => {
  const { id } = useParams();
  const { data: roles, isLoading, isError } = useGetRolesQuery();

  const breadcrumbItems = [
    { label: "Role Menu", href: "/role" },
    { label: "Role View", href: `/roleview/${id}`, isCurrentPage: true },
  ];

  if (isLoading) {
    return (
      <CircularProgress aria-label="Loading" />
    );
  }

  if (isError) {
    toast.error("Error fetching role. Please try again.");
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load role. Try refreshing the page.</p>
      </div>
    );
  }

  const role = roles?.find((role) => role.id === id);

  if (!role) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Role not found.</p>
      </div>
    );
  }

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex flex-col items-center justify-center p-6">
        <div className="text-center text-[25px] font-bold mb-6">Role Details</div>
        <form className="flex flex-col w-1/2 gap-4">
          <Input
            label="Role Name"
            type="text"
            value={role.name}
            readOnly
            variant="bordered"
          />
          <Input
            label="Hierarchy Level"
            type="number"
            value={role.hierarchyLevel}
            readOnly
            variant="bordered"
          />
          <div className="flex flex-col">
            <div className="text-lg font-semibold mb-2">Permissions:</div>
            {role.permissions.length > 0 ? (
              role.permissions.map((perm, index) => (
                <Input
                  key={index}
                  value={perm.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  readOnly
                  variant="bordered"
                />
              ))
            ) : (
              <Input
                value="No Permissions Assigned"
                readOnly
                variant="bordered"
              />
            )}
          </div>
        </form>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-6">
        <Image
          isBlurred
          className="w-full h-full object-fill"
          src="https://nextui.org/gradients/docs-right.png"
          alt="Role view background image"
        />
      </div>
    </div>
  );
};

export default RoleView;
