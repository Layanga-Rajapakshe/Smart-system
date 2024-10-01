import React, { useState, useEffect } from 'react';
import ClaimUpload from './ClaimUpload'; // Import the ClaimUpload component

const MedicalClaimProfile = () => {
  const [claimData, setClaimData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated fetch function with hardcoded data
    const fetchClaimData = async () => {
      try {
        // Simulated successful response
        const simulatedResponse = {
          eligibility: 'Eligible',
          totalClaims: 3000,
          approvedClaims: 2500,
          pendingClaims: 500,
        };
        // Mimicking network delay
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        setClaimData(simulatedResponse); // Set the simulated data
      } catch (err) {
        setError('Failed to load medical claim data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaimData(); // Call the simulated fetch function
  }, []);

  // Loading state
  if (isLoading) {
    return <div className="loading-message text-center text-xl mt-6">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="error-message text-center text-xl mt-6 text-red-600">{error}</div>;
  }

  // If no claim data is available
  if (!claimData) {
    return <div className="error-message text-center text-xl mt-6 text-red-600">No claim data available</div>;
  }

  return (
    <div className="medical-claim-profile-container p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Medical Claim Profile</h1>
      <ClaimUpload /> {/* Integrate the ClaimUpload component */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <ClaimDetail title="Eligibility Status" value={claimData.eligibility || 'N/A'} />
        <ClaimDetail title="Total Claims" value={`$${claimData.totalClaims || 0}`} />
        <ClaimDetail title="Approved Claims" value={`$${claimData.approvedClaims || 0}`} />
        <ClaimDetail title="Pending Claims" value={`$${claimData.pendingClaims || 0}`} />
      </div>
    </div>
  );
};

// Component to display individual claim details
const ClaimDetail = ({ title, value }) => (
  <div className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out">
    <p className="text-lg font-semibold text-gray-900">{title}: </p>
    <p className="text-gray-700 text-xl">{value}</p>
  </div>
);

export default MedicalClaimProfile;
