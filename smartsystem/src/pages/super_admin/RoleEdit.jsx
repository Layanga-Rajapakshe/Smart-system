import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Checkbox, Card, Spacer, CircularProgress } from "@heroui/react";
import { useNavigate, useParams } from 'react-router-dom';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/background1.png';
import toast from 'react-hot-toast';

const RoleEdit = () => {
  const navigate = useNavigate();
  const { id: roleId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [roleName, setRoleName] = useState("");
  const [hierarchyLevel, setHierarchyLevel] = useState(1);
  
  // Group permissions by category for better organization
  const [permissions, setPermissions] = useState({
    // Employee Management
    employee: {
      create_employee: false,
      view_employee_details: false,
      update_employee: false,
      delete_employee: false,
    },
    // Role Management
    role: {
      create_role: false,
      assign_role: false,
      update_role: false,
      get_roles_permission: false,
    }
  });

  // Simulate fetching role data (replace with actual API call)
  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        // Mock API call - replace with actual data fetching
        setTimeout(() => {
          // Sample data - replace with actual API response
          const roleData = {
            _id: roleId,
            name: "Manager",
            hierarchyLevel: 2,
            permissions: [
              "create_employee", 
              "view_employee_details", 
              "create_role", 
              "assign_role"
            ]
          };
          
          setRoleName(roleData.name);
          setHierarchyLevel(roleData.hierarchyLevel);
          
          // Set permissions based on API response
          const updatedPermissions = { ...permissions };
          
          // Reset all permissions to false
          Object.keys(updatedPermissions).forEach(category => {
            Object.keys(updatedPermissions[category]).forEach(perm => {
              updatedPermissions[category][perm] = false;
            });
          });
          
          // Set permissions from API to true
          roleData.permissions.forEach(perm => {
            for (const category in updatedPermissions) {
              if (perm in updatedPermissions[category]) {
                updatedPermissions[category][perm] = true;
                break;
              }
            }
          });
          
          setPermissions(updatedPermissions);
          setIsLoading(false);
        }, 1000); // Simulate network delay
      } catch (error) {
        toast.error("Error loading role data");
        setIsLoading(false);
      }
    };

    fetchRoleData();
  }, [roleId]);

  const handlePermissionChange = (category, permission) => {
    setPermissions(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [permission]: !prev[category][permission]
      }
    }));
  };

  const handleSelectAllCategory = (category, isChecked) => {
    const updatedCategoryPermissions = {};
    
    Object.keys(permissions[category]).forEach(perm => {
      updatedCategoryPermissions[perm] = isChecked;
    });
    
    setPermissions(prev => ({
      ...prev,
      [category]: updatedCategoryPermissions
    }));
  };

  const isCategoryFullySelected = (category) => {
    return Object.values(permissions[category]).every(value => value === true);
  };

  const isCategoryPartiallySelected = (category) => {
    const values = Object.values(permissions[category]);
    return values.some(value => value === true) && values.some(value => value === false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Flatten permissions object into array of permission strings
    const flattenedPermissions = [];
    Object.keys(permissions).forEach(category => {
      Object.keys(permissions[category]).forEach(perm => {
        if (permissions[category][perm]) {
          flattenedPermissions.push(perm);
        }
      });
    });

    const roleData = {
      name: roleName,
      permissions: flattenedPermissions,
      hierarchyLevel,
    };

    try {
      // Simulate API call - replace with actual update call
      setTimeout(() => {
        console.log("Updated Role Data:", roleData);
        toast.success("Role updated successfully!");
        setIsSaving(false);
        navigate('/role');
      }, 1000);
    } catch (error) {
      toast.error("Error updating role. Please try again.");
      setIsSaving(false);
    }
  };

  const breadcrumbItems = [
    { label: "Role Menu", href: "/role" },
    { label: "Role Edit", href: `/roleedit/${roleId}`, isCurrentPage: true },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image
          src={image1}
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>
      
      {/* Breadcrumb with better positioning */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Form Card Container */}
      <div className="relative z-10 w-full max-w-3xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h3 className="text-2xl font-bold text-center text-black mb-6">Role Edit</h3>

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
              
              {/* Employee Permissions */}
              <div className="mb-4 border border-gray-200 rounded-lg p-4 bg-white/50">
                <div className="flex items-center mb-2">
                  <Checkbox
                    isSelected={isCategoryFullySelected('employee')}
                    isIndeterminate={isCategoryPartiallySelected('employee')}
                    onChange={(e) => handleSelectAllCategory('employee', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="font-medium text-black">Employee Management</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8">
                  {Object.keys(permissions.employee).map((perm) => (
                    <Checkbox
                      key={perm}
                      isSelected={permissions.employee[perm]}
                      onChange={() => handlePermissionChange('employee', perm)}
                    >
                      {perm.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Checkbox>
                  ))}
                </div>
              </div>
              
              {/* Role Permissions */}
              <div className="mb-4 border border-gray-200 rounded-lg p-4 bg-white/50">
                <div className="flex items-center mb-2">
                  <Checkbox
                    isSelected={isCategoryFullySelected('role')}
                    isIndeterminate={isCategoryPartiallySelected('role')}
                    onChange={(e) => handleSelectAllCategory('role', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="font-medium text-black">Role Management</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-8">
                  {Object.keys(permissions.role).map((perm) => (
                    <Checkbox
                      key={perm}
                      isSelected={permissions.role[perm]}
                      onChange={() => handlePermissionChange('role', perm)}
                    >
                      {perm.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>

            <Spacer y={1} />
            
            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                color="primary" 
                isDisabled={isSaving}
                size="lg"
                className="px-8"
              >
                {isSaving ? "Saving Changes..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RoleEdit;