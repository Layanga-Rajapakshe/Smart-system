import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from "@heroui/react";
import image1 from '../../assets/images/background1.png';
import './MeetingHome.css';

function MeetingHome() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image src={image1} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl">
        {/* Welcome Card */}
        <Card className="p-8 sm:p-10 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-black mb-4">
            Welcome to <span className="text-primary">Meeting Minute Management System</span>
          </h1>
          <p className="text-center text-gray-700 text-lg mb-6">
            Empowering your team with seamless meeting coordination and instant notifications.
          </p>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button
            as={Link}
            to="/meetings"
            color="primary"
            size="lg"
            className="px-8 py-4 font-semibold flex items-center justify-center"
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
            }
          >
            Meetings
          </Button>
          <Button
            as={Link}
            to="/notifications"
            color="secondary"
            size="lg"
            className="px-8 py-4 font-semibold flex items-center justify-center"
            startContent={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            }
          >
            Notifications
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-white/70 mt-8">
          <p className="text-sm">© 2025 Smart Systems Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default MeetingHome;