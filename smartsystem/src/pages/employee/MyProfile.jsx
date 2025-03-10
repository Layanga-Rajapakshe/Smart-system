import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Tabs,
  Tab,
  Button,
  Divider,
  Input,
  Textarea,
  Select,
  SelectItem,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@heroui/react";
import {
  IoSave,
  IoCamera,
  IoPersonCircleOutline,
  IoBriefcaseOutline,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoCalendarOutline,
  IoKeyOutline,
  IoShieldOutline,
  IoArrowBack
} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useUpdateEmployeeMutation } from '../../redux/api/employeeApiSlice';
import backgroundImage from "../../assets/images/background1.png";

const MyProfile = () => {
  const navigate = useNavigate();
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Mock user data - in a real app, this would come from your API
  const [profileData, setProfileData] = useState({
    id: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Software Engineer",
    department: "Engineering",
    location: "New York Office",
    joinDate: "2020-05-15",
    manager: "Jane Smith",
    emergencyContact: {
      name: "Mary Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    profileImage: "https://i.pravatar.cc/300"
  });

  // State for new profile image
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleNavigateBack = () => {
    navigate('/dashboard');
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      setProfileData({
        ...profileData,
        [parentField]: {
          ...profileData[parentField],
          [childField]: value
        }
      });
    } else {
      setProfileData({
        ...profileData,
        [field]: value
      });
    }
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
    // In a real implementation, you would upload the image to your server
    // and get back a URL to store in the profile data
    setProfileData({
      ...profileData,
      profileImage: previewImage || profileData.profileImage
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
      await updateEmployee(profileData);
      // Show success notification or feedback here
      alert("Profile updated successfully");
    } catch (error) {
      // Handle error
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

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
              isLoading={isLoading}
              onClick={handleUpdateProfile}
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
                  src={previewImage || profileData.profileImage}
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
              <h2 className="text-xl font-bold mt-2">{`${profileData.firstName} ${profileData.lastName}`}</h2>
              <p className="text-gray-600">{profileData.position}</p>
              <p className="text-sm text-gray-500">{profileData.department}</p>
            </div>

            <div className="w-full md:w-3/4">
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
                      label="First Name"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Last Name"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoCallOutline className="text-gray-400" />}
                    />
                    <Input
                      label="Location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoLocationOutline className="text-gray-400" />}
                    />
                    <Input
                      label="Join Date"
                      value={profileData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                      type="date"
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoCalendarOutline className="text-gray-400" />}
                    />
                  </div>
                </Tab>
                
                <Tab 
                  key="professional" 
                  title={
                    <div className="flex items-center gap-2">
                      <IoBriefcaseOutline />
                      <span>Work Details</span>
                    </div>
                  }
                >
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Employee ID"
                      value={profileData.id}
                      isReadOnly
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Position"
                      value={profileData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Select
                      label="Department"
                      selectedKeys={[profileData.department]}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    >
                      <SelectItem key="Engineering">Engineering</SelectItem>
                      <SelectItem key="Marketing">Marketing</SelectItem>
                      <SelectItem key="Sales">Sales</SelectItem>
                      <SelectItem key="HR">Human Resources</SelectItem>
                      <SelectItem key="Finance">Finance</SelectItem>
                    </Select>
                    <Input
                      label="Manager"
                      value={profileData.manager}
                      onChange={(e) => handleInputChange('manager', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Textarea
                      label="Professional Bio"
                      placeholder="Share a brief description of your professional background"
                      variant="bordered"
                      labelPlacement="outside"
                      className="col-span-2"
                    />
                  </div>
                </Tab>
                
                <Tab 
                  key="emergency" 
                  title={
                    <div className="flex items-center gap-2">
                      <IoShieldOutline />
                      <span>Emergency Contact</span>
                    </div>
                  }
                >
                  <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Contact Name"
                      value={profileData.emergencyContact.name}
                      onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Relationship"
                      value={profileData.emergencyContact.relationship}
                      onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Emergency Phone"
                      value={profileData.emergencyContact.phone}
                      onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                      variant="bordered"
                      labelPlacement="outside"
                      startContent={<IoCallOutline className="text-gray-400" />}
                      className="col-span-2 md:col-span-1"
                    />
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
                    <Input
                      label="Current Password"
                      type="password"
                      placeholder="Enter your current password"
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
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      placeholder="Confirm new password"
                      variant="bordered"
                      labelPlacement="outside"
                    />
                    <div className="md:col-span-2 mt-4">
                      <Button color="primary">
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