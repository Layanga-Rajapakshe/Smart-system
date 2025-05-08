import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { Input, Button, Image, Checkbox, Card, Spacer, CircularProgress } from "@heroui/react";
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPermissionsQuery, useGetRoleByIdQuery } from '../../redux/api/roleApiSlice';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/background1.png';
import { toast } from 'react-hot-toast';

const RoleEdit = () => {
  const navigate = useNavigate();
  const { id: roleId } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  
  const [roleName, setRoleName] = useState("");
  const [hierarchyLevel, setHierarchyLevel] = useState(1);
  const [permissions, setPermissions] = useState({});
  
  // Use RTK Query hooks for fetching data
  const { data: permissionsData, isLoading: isLoadingPermissions } = useGetPermissionsQuery();
  const { data: roleData, isLoading: isLoadingRole } = useGetRoleByIdQuery(roleId);

  // Initialize permissions when permissionsData is available
  useEffect(() => {
    if (permissionsData?.permissions) {
      const initialPermissions = {};
      permissionsData.permissions.forEach((perm) => {
        initialPermissions[perm] = false;
      });
      setPermissions(initialPermissions);
    }
  }, [permissionsData]);

  // Set role data when it's fetched
  useEffect(() => {
    if (roleData) {
      setRoleName(roleData.name);
      setHierarchyLevel(roleData.hierarchyLevel);
      
      // Set permissions based on role data
      if (roleData.permissions && permissionsData?.permissions) {
        const updatedPermissions = { ...permissions };
        
        // Mark the permissions the role has as true
        roleData.permissions.forEach(perm => {
          if (perm in updatedPermissions) {
            updatedPermissions[perm] = true;
          }
        });
        
        setPermissions(updatedPermissions);
      }
    }
  }, [roleData, permissionsData]);

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
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
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

  // Update role using Axios instead of Redux mutation
  const updateRoleWithAxios = async (roleData) => {
    setIsSaving(true);
    try {
      // Get token from localStorage or wherever you store it
      const token = localStorage.getItem('token'); // Adjust based on your auth setup
      
      const response = await axios.put(
        `https://smart-system-one.vercel.app//api/role/${roleId}`, 
        roleData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include auth token if needed
          }
        }
      );
      
      return response.data;
    } catch (error) {
      // Handle error and rethrow for the calling function to catch
      const errorMessage = error.response?.data?.message || error.message || "Failed to update role";
      throw new Error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get selected permissions
    const selectedPermissions = Object.keys(permissions).filter(perm => permissions[perm]);

    const updatedRoleData = {
      name: roleName,
      permissions: selectedPermissions,
      hierarchyLevel,
    };

    try {
      await updateRoleWithAxios(updatedRoleData);
      toast.success("Role updated successfully!");
      navigate('/role');
      window.location.reload(); // Reload to ensure data consistency
    } catch (error) {
      toast.error(error?.message || "Error updating role. Please try again.");
    }
  };

  const breadcrumbItems = [
    { label: "Role Menu", href: "/role" },
    { label: "Role Edit", href: `/roleedit/${roleId}`, isCurrentPage: true },
  ];

  const isLoading = isLoadingPermissions || isLoadingRole;

  if (isLoading) {
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
            </div>

            <Spacer y={1} />
            
            {/* Submit Button */}
            <div className="flex justify-between pt-4">
              <Button 
                color="default"
                variant="flat"
                onPress={() => navigate('/role')}
                size="lg"
                className="px-6"
              >
                Cancel
              </Button>
              
              <Button 
                type="submit" 
                color="primary" 
                isDisabled={isSaving || !Object.values(permissions).includes(true)}
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