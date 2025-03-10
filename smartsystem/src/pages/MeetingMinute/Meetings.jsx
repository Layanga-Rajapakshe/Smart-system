import React, { useState, useEffect } from "react";
import { Card, Image, Button, CircularProgress, Spacer } from "@heroui/react";
import axios from "axios";
import image1 from "../../assets/images/background1.png";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import MeetingForm from "../../components/MeetingMinute/MeetingForm";
import MeetingList from "../../components/MeetingMinute/MeetingList";
import toast from "react-hot-toast";

const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchMeetings = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/meetings");
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      toast.error("Failed to fetch meetings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleAddSuccess = () => {
    fetchMeetings();
    setShowForm(false);
    toast.success("Meeting added successfully!");
  };

  const breadcrumbItems = [
    { label: "Dashboard", href: "/" },
    { label: "Meetings Management", href: "/meetings", isCurrentPage: true },
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
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image src={image1} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-black">Meetings Management</h3>
            <Button 
              color="primary" 
              onClick={() => setShowForm(!showForm)}
              className="px-4"
            >
              {showForm ? "Hide Form" : "Add Meeting"}
            </Button>
          </div>

          <p className="text-gray-700 mb-6">
            Seamlessly manage your company's meetings with ease and efficiency.
          </p>

          {/* Form Section */}
          {showForm && (
            <>
              <div className="bg-white/50 rounded-lg p-4 border border-gray-200 mb-6">
                <MeetingForm onAddSuccess={handleAddSuccess} />
              </div>
              <Spacer y={2} />
            </>
          )}

          {/* Meetings List */}
          <div>
            <div className="text-lg font-semibold mb-4 text-black">Meeting Records</div>
            <MeetingList 
              meetings={meetings} 
              onUpdate={fetchMeetings} 
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Meetings;