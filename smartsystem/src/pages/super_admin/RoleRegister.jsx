import React, { useState, useEffect } from "react";
import { Input, Button, Image, Checkbox, Card, Spacer, CircularProgress } from "@heroui/react";
import { useCreateRoleMutation, useGetPermissionsQuery } from "../../redux/api/roleApiSlice";
import image1 from "../../assets/images/background1.png";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RoleRegister = () => {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [hierarchyLevel, setHierarchyLevel] = useState(1);
  const [permissions, setPermissions] = useState({});

  const [createRole, { isLoading: isSaving }] = useCreateRoleMutation();
  const { data: permissionsData, isLoading: isLoadingPermissions } = useGetPermissionsQuery();

  // Initialize permissions state when permissionsData is available
  useEffect(() => {
    if (permissionsData?.permissions) {
      const initialPermissions = {};
      permissionsData.permissions.forEach((perm) => {
        initialPermissions[perm] = false;
      });
      setPermissions(initialPermissions);
    }
  }, [permissionsData]);

  // Group permissions by category helper
  const getGroupedPermissions = () => {
    const grouped = {};
    
    if (permissionsData?.permissions) {
      permissionsData.permissions.forEach(perm => {
        // Determine category from permission name (e.g., create_employee -> employee)
        const category = perm.split('_')[1] || 'other';
        
        if (!grouped[category]) {
          grouped[category] = [];
        }
        
        grouped[category].push(perm);
      });
    }
    
    return grouped;
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const handleSelectAllCategory = (category, isChecked) => {
    const groupedPermissions = getGroupedPermissions();
    const categoryPermissions = groupedPermissions[category] || [];
    
    const updatedPermissions = { ...permissions };
    
    categoryPermissions.forEach(perm => {
      updatedPermissions[perm] = isChecked;
    });
    
    setPermissions(updatedPermissions);
  };

  const isCategoryFullySelected = (category) => {
    const groupedPermissions = getGroupedPermissions();
    const categoryPermissions = groupedPermissions[category] || [];
    
    return categoryPermissions.length > 0 && 
           categoryPermissions.every(perm => permissions[perm] === true);
  };

  const isCategoryPartiallySelected = (category) => {
    const groupedPermissions = getGroupedPermissions();
    const categoryPermissions = groupedPermissions[category] || [];
    
    return categoryPermissions.some(perm => permissions[perm] === true) && 
           categoryPermissions.some(perm => permissions[perm] === false);
  };

  const formatPermissionName = (permission) => {
    return permission.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPermissions = Object.keys(permissions).filter((perm) => permissions[perm]);

    const roleData = {
      name: roleName,
      permissions: selectedPermissions,
      hierarchyLevel,
    };

    try {
      await createRole(roleData).unwrap();
      toast.success("Role registered successfully!");
      navigate("/role");
    } catch (error) {
      toast.error("Error registering role. Please try again.");
    }
  };

  const breadcrumbItems = [
    { label: "Role Menu", href: "/role" },
    { label: "Role Register", href: "/roleregister", isCurrentPage: true },
  ];

  if (isLoadingPermissions) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress aria-label="Loading" />
      </div>
    );
  }

  // Group permissions by category for display
  const groupedPermissions = getGroupedPermissions();

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image src={image1} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-3xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h3 className="text-2xl font-bold text-center text-black mb-6">Role Register</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Basic Information</div>
              <div className="grid grid-cols-1 gap-4">
                <Input
                  variant="bordered"
                  label="Role Name"
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                  fullWidth
                  className="py-2"
                />
                <Input
                  variant="bordered"
                  label="Hierarchy Level"
                  type="number"
                  min={1}
                  value={hierarchyLevel}
                  onChange={(e) => setHierarchyLevel(parseInt(e.target.value, 10))}
                  required
                  fullWidth
                  className="py-2"
                />
              </div>
            </div>

            {/* Permissions Section */}
            <div>
              <div className="text-lg font-semibold mb-4 text-black">Permissions</div>
              
              {permissionsData?.permissions?.length === 0 ? (
                <div className="text-center py-4">No permissions available</div>
              ) : (
                <>
                  {Object.keys(groupedPermissions).map(category => (
                    <div key={category} className="mb-4 border border-gray-200 rounded-lg p-4 bg-white/50">
                      <div className="flex items-center mb-2">
                        <Checkbox
                          isSelected={isCategoryFullySelected(category)}
                          isIndeterminate={isCategoryPartiallySelected(category)}
                          onChange={(e) => handleSelectAllCategory(category, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="font-medium text-black">
                          {category.charAt(0).toUpperCase() + category.slice(1)} Management
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8">
                        {groupedPermissions[category].map((perm) => (
                          <Checkbox
                            key={perm}
                            isSelected={permissions[perm] || false}
                            onChange={() => handlePermissionChange(perm)}
                          >
                            {formatPermissionName(perm)}
                          </Checkbox>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <Spacer y={1} />

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                color="primary"
                isDisabled={isSaving || !Object.values(permissions).includes(true)}
                size="lg"
                className="px-8"
              >
                {isSaving ? "Registering..." : "Register Role"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RoleRegister;