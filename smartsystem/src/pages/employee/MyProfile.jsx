import React, { useState, useEffect } from 'react';
import {
  Image,
  Tabs,
  Tab,
  Button,
  Divider,
  Input,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Checkbox,
  Card,
  CardBody
} from "@heroui/react";
import {
  IoSave,
  IoCamera,
  IoPersonCircleOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoCalendarOutline,
  IoKeyOutline,
  IoArrowBack,
  IoBriefcaseOutline,
  IoWalletOutline,
  IoPeopleOutline
} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateEmployeeMutation, useGetEmployeeQuery } from '../../redux/api/employeeApiSlice';
import { useUpdatePasswordMutation } from '../../redux/api/authApiSlice';
import backgroundImage from "../../assets/images/background1.png";

const MyProfile = () => {
  const navigate = useNavigate();
  const [updateEmployee, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Get current user info from Redux store
  const { userInfo } = useSelector((state) => state.auth);
  
  // Fetch employee data using RTK Query
  const { data: employee, isLoading: isLoadingEmployee, error } = useGetEmployeeQuery(
    userInfo.id || ''
  );

  // State for password fields
  const [passwordData, setPasswordData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  
  // State for profile data - updated with all fields
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    birthday: '',
    location: '',
    avatar: '',
    userId: '',
    hired_date: '',
    post: '',
    role: '',
    status: '',
    age: '',
    company: '',
    supervisor: '',
    supervisees: [],
    agreed_basic: 0,
    re_allowance: 0,
    single_ot: 0,
    double_ot: 0,
    meal_allowance: 0,
    isEPF: false
  });

  // State for profile image
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  // State for form validation and feedback
  const [passwordError, setPasswordError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

  // Format currency values
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value || 0);
  };

  // Update profileData when employee data is loaded
  useEffect(() => {
    if (employee) {
      setProfileData({
        id: employee._id || '',
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        birthday: employee.birthday || '',
        location: employee.location || '',
        avatar: employee.avatar || '',
        userId: employee.userId || '',
        hired_date: employee.hired_date || '',
        post: employee.post || '',
        role: employee.role || '',
        status: employee.status || '',
        age: employee.age || '',
        company: employee.company || '',
        supervisor: employee.supervisor || '',
        supervisees: employee.supervisees || [],
        agreed_basic: employee.agreed_basic || 0,
        re_allowance: employee.re_allowance || 0,
        single_ot: employee.single_ot || 0,
        double_ot: employee.double_ot || 0,
        meal_allowance: employee.meal_allowance || 0,
        isEPF: employee.isEPF || false
      });
      
      console.log("Employee data loaded:", employee);

      // Also set email for password update
      setPasswordData(prev => ({
        ...prev,
        email: employee.email || ''
      }));
    }
  }, [employee]);

  const handleNavigateBack = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (field, value) => {
    // Handle numeric fields
    if (['agreed_basic', 're_allowance', 'single_ot', 'double_ot', 'meal_allowance'].includes(field)) {
      value = parseFloat(value) || 0;
    }
    
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData({
      ...passwordData,
      [field]: value
    });
    
    // Clear previous errors when user starts typing
    if (passwordError) setPasswordError('');
    if (updateSuccess) setUpdateSuccess('');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewProfileImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      onOpen();
    }
  };

  const handleConfirmImageUpdate = () => {
    setProfileData({
      ...profileData,
      avatar: previewImage || profileData.avatar
    });
    onClose();
  };

  const handleCancelImageUpdate = () => {
    setNewProfileImage(null);
    setPreviewImage(null);
    onClose();
  };

  const handleUpdateProfile = async () => {
    try {
      // Extract the ID from profileData and then send the rest
      const { id, ...updatedEmployeeData } = profileData;
      
      await updateEmployee({ 
        id, 
        updatedEmployeeData 
      });
      
      // Show success notification
      setUpdateSuccess("Profile updated successfully");
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      // Validate passwords
      if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        setPasswordError("New passwords don't match");
        return;
      }
      
      if (passwordData.newPassword.length < 8) {
        setPasswordError("Password must be at least 8 characters");
        return;
      }

      // Call the password update mutation
      await updatePassword({
        email: passwordData.email,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }).unwrap();
      
      // Clear fields and show success message
      setPasswordData({
        ...passwordData,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      setUpdateSuccess("Password updated successfully");
      setTimeout(() => setUpdateSuccess(''), 3000);
    } catch (error) {
      console.error("Error updating password:", error);
      setPasswordError(error.data?.message || "Failed to update password");
    }
  };

  // Show loading state while fetching employee data
  if (isLoadingEmployee && !employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Show error if data fetch failed
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">Failed to load profile data</p>
          <Button color="primary" onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Calculate number of supervisees
  const superviseeCount = profileData.supervisees?.length || 0;

  return (
    <div className="relative min-h-screen">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <Image
          src={backgroundImage}
          alt="Profile Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
      </div>

      {/* Profile Header */}
      <div className="relative z-10 w-full bg-white/80 backdrop-blur-md shadow-md border-b border-white/40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                isIconOnly 
                variant="light" 
                aria-label="Back" 
                className="text-gray-600"
                onClick={handleNavigateBack}
              >
                <IoArrowBack />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
                <p className="text-sm text-gray-600">View and edit your personal information</p>
              </div>
            </div>
            <Button 
              color="primary" 
              endContent={<IoSave />}
              isLoading={isUpdating}
              onPress={handleUpdateProfile}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-6">
        <div className="p-4 md:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          {/* Profile Overview with Image */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/4 flex flex-col items-center">
              <div className="relative group">
                <Avatar
                  src={previewImage || profileData.avatar}
                  className="w-40 h-40 text-large mb-4 border-4 border-white shadow-lg"
                  isBordered
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label htmlFor="profile-image-upload" className="cursor-pointer">
                    <div className="bg-black/70 rounded-full p-3 text-white">
                      <IoCamera size={24} />
                    </div>
                    <input 
                      type="file" 
                      id="profile-image-upload" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              <h2 className="text-xl font-bold mt-2">{profileData.name}</h2>
              <p className="text-sm text-gray-500 mb-1">{profileData.post}</p>
              <p className="text-sm text-gray-500">{profileData.company}</p>
              
              {/* Status indicator */}
              <div className="mt-4 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${profileData.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    profileData.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {profileData.status || 'Status'}
                </span>
              </div>
              
              {/* Quick Stats Cards */}
              <div className="w-full mt-4 space-y-3">
                <Card className="bg-blue-50 border border-blue-100">
                  <CardBody className="py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-700">Role</span>
                      <span className="font-medium">{profileData.role || 'Not Set'}</span>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-purple-50 border border-purple-100">
                  <CardBody className="py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-700">Supervisees</span>
                      <span className="font-medium">{superviseeCount}</span>
                    </div>
                  </CardBody>
                </Card>
                
                <Card className="bg-green-50 border border-green-100">
                  <CardBody className="py-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-700">Basic Salary</span>
                      <span className="font-medium">{formatCurrency(profileData.agreed_basic)}</span>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>

            <div className="w-full md:w-3/4">
              {updateSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  {updateSuccess}
                </div>
              )}
              
              <Tabs 
                aria-label="Profile sections"
                fullWidth
                classNames={{
                  tabList: "bg-gray-100/80 p-1 rounded-xl",
                  tab: "data-[selected=true]:bg-white data-[selected=true]:shadow-sm"
                }}
              >
                <Tab 
                  key="personal" 
                  title={
                    <div className="flex items-center gap-2">
                      <IoPersonCircleOutline />
                      <span>Personal Details</span>
                    </div>
                  }
                >
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoMailOutline className="text-gray-400" />}
                    />
                    <Input
                      label="Phone"
                      value={profileData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoCallOutline className="text-gray-400" />}
                    />
                    <Input
                      label="Location"
                      value={profileData.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoLocationOutline className="text-gray-400" />}
                    />
                    <Input
                      label="Birthday"
                      value={profileData.birthday || ''}
                      onChange={(e) => handleInputChange('birthday', e.target.value)}
                      type="date"
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoCalendarOutline className="text-gray-400" />}
                    />
                    <Input
                      label="Age"
                      value={profileData.age || ''}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      type="number"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Employee ID"
                      value={profileData.userId || ''}
                      isReadOnly
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>
                </Tab>
                
                <Tab 
                  key="employment" 
                  title={
                    <div className="flex items-center gap-2">
                      <IoBriefcaseOutline />
                      <span>Employment</span>
                    </div>
                  }
                >
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Company"
                      value={profileData.company || ''}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Position/Post"
                      value={profileData.post || ''}
                      onChange={(e) => handleInputChange('post', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Role"
                      value={profileData.role || ''}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Status"
                      value={profileData.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Hiring Date"
                      value={profileData.hired_date || ''}
                      onChange={(e) => handleInputChange('hired_date', e.target.value)}
                      type="date"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Supervisor"
                      value={profileData.supervisor || ''}
                      onChange={(e) => handleInputChange('supervisor', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </div>
                </Tab>
                
                <Tab 
                  key="compensation" 
                  title={
                    <div className="flex items-center gap-2">
                      <IoWalletOutline />
                      <span>Compensation</span>
                    </div>
                  }
                >
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Agreed Basic Salary"
                      value={profileData.agreed_basic || ''}
                      onChange={(e) => handleInputChange('agreed_basic', e.target.value)}
                      type="number"
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-400">$</span>}
                    />
                    <Input
                      label="RE Allowance"
                      value={profileData.re_allowance || ''}
                      onChange={(e) => handleInputChange('re_allowance', e.target.value)}
                      type="number"
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-400">$</span>}
                    />
                    <Input
                      label="Single OT Rate"
                      value={profileData.single_ot || ''}
                      onChange={(e) => handleInputChange('single_ot', e.target.value)}
                      type="number"
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-400">$</span>}
                    />
                    <Input
                      label="Double OT Rate"
                      value={profileData.double_ot || ''}
                      onChange={(e) => handleInputChange('double_ot', e.target.value)}
                      type="number"
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-400">$</span>}
                    />
                    <Input
                      label="Meal Allowance"
                      value={profileData.meal_allowance || ''}
                      onChange={(e) => handleInputChange('meal_allowance', e.target.value)}
                      type="number"
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-400">$</span>}
                    />
                    <div>
                      <Checkbox
                        isSelected={profileData.isEPF}
                        onChange={(e) => handleInputChange('isEPF', e.target.checked)}
                        className="mt-8"
                      >
                        Enrolled in EPF
                      </Checkbox>
                    </div>
                  </div>
                </Tab>
                
                <Tab 
                  key="team" 
                  title={
                    <div className="flex items-center gap-2">
                      <IoPeopleOutline />
                      <span>Team</span>
                    </div>
                  }
                >
                  <div className="pt-4">
                    <div className="mb-4">
                      <p className="text-lg font-medium mb-2">Your Supervisor</p>
                      <Card className="bg-gray-50">
                        <CardBody>
                          <p>{profileData.supervisor || 'Not assigned'}</p>
                        </CardBody>
                      </Card>
                    </div>
                    
                    <div>
                      <p className="text-lg font-medium mb-2">Your Team Members ({superviseeCount})</p>
                      {superviseeCount > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {profileData.supervisees.map((member, index) => (
                            <Card key={index} className="bg-gray-50">
                              <CardBody className="py-2">
                                <p>{member}</p>
                              </CardBody>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <Card className="bg-gray-50">
                          <CardBody>
                            <p className="text-gray-500">You don't have any team members reporting to you.</p>
                          </CardBody>
                        </Card>
                      )}
                    </div>
                  </div>
                </Tab>
                
                <Tab 
                  key="security" 
                  title={
                    <div className="flex items-center gap-2">
                      <IoKeyOutline />
                      <span>Security</span>
                    </div>
                  }
                >
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {passwordError && (
                      <div className="col-span-2 p-3 bg-red-100 text-red-700 rounded-lg mb-2">
                        {passwordError}
                      </div>
                    )}
                    
                    <Input
                      label="Current Password"
                      type="password"
                      placeholder="Enter your current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <div className="md:col-span-2">
                      <Divider className="my-2" />
                    </div>
                    <Input
                      label="New Password"
                      type="password"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmNewPassword}
                      onChange={(e) => handlePasswordChange('confirmNewPassword', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <div className="md:col-span-2 mt-4">
                      <Button 
                        color="primary"
                        isLoading={isUpdatingPassword}
                        onClick={handleUpdatePassword}
                        disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword}
                      >
                        Change Password
                      </Button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Image Update Modal */}
      <Modal isOpen={isOpen} onClose={handleCancelImageUpdate}>
        <ModalContent>
          <ModalHeader>Update Profile Picture</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center">
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-48 h-48 rounded-full object-cover mb-4"
                />
              )}
              <p className="text-center text-gray-600">
                This will be your new profile picture. Do you want to continue?
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" color="danger" onClick={handleCancelImageUpdate}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleConfirmImageUpdate}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyProfile;