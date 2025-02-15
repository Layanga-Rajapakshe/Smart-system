import React, { useState } from "react";
import { Input, Button, Image, Checkbox, Spacer } from "@nextui-org/react";
import { useCreateRoleMutation } from "../../redux/api/roleApiSlice";
import image1 from "../../assets/images/companyRegister.png";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import toast from "react-hot-toast";

const RoleRegister = () => {
  const [roleName, setRoleName] = useState("");
  const [hierarchyLevel, setHierarchyLevel] = useState(1);
  const [permissions, setPermissions] = useState({
    create_employee: false,
    create_role: false,
    assign_role: false,
    update_role: false,
    get_roles_permission: false,
    view_employee_details: false,
    update_employee: false,
    delete_employee: false,
  });

  const [createRole, { isLoading, isError, isSuccess }] = useCreateRoleMutation();

  const handlePermissionChange = (event) => {
    const { name, checked } = event.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roleData = {
      name: roleName,
      permissions: Object.keys(permissions).filter((perm) => permissions[perm]),
      hierarchyLevel,
    };

    try {
      await createRole(roleData).unwrap();
      if (isSuccess) {
        toast.success("Role registered successfully!");
      }
    } catch (error) {
      toast.error("Error registering role. Please try again.");
    }
  };

  const breadcrumbItems = [
    { label: "Role Menu", href: "/role" },
    { label: "Role Register", href: "/roleregister", isCurrentPage: true },
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex-col flex items-center justify-center p-6">
          <div className="md:hidden absolute left-0 right-0 bottom-0 top-0 z-0">
            <Image
              isBlurred
              className="w-full h-screen/2 fill-inherit"
              src="https://nextui.org/gradients/docs-right.png"
              alt="Login page image"
            />
          </div>

          <div className="text-center text-[25px] font-bold mb-6">Role Register</div>

          <form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-4 mb-4">
            <Input
              variant="bordered"
              label="Role Name"
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
            <Input
              label="Hierarchy Level"
              type="number"
              min={1}
              value={hierarchyLevel}
              onChange={(e) => setHierarchyLevel(parseInt(e.target.value, 10))}
              required
            />
            <div className="flex flex-col">
              <div className="text-lg font-semibold">Permissions:</div>
              {Object.keys(permissions).map((perm) => (
                <Checkbox
                  key={perm}
                  name={perm}
                  isSelected={permissions[perm]}
                  onChange={handlePermissionChange}
                >
                  {perm.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Checkbox>
              ))}
            </div>
            <Spacer y={1} />
            <Button type="submit" variant="flat" color="primary" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              isBlurred
              className="w-full h-full object-fill"
              src={image1}
              alt="Register page image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleRegister;
