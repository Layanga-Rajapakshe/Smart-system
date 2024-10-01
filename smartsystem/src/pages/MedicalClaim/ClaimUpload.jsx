import React, { useState } from 'react';

const ClaimUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/employee/claims/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
      } else {
        throw new Error('Failed to upload file.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="claim-upload-container p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Upload Medical Claim</h2>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.pdf" // Accepting image and PDF formats
        onChange={handleFileChange}
        className="border rounded p-2 mb-4 w-full"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white rounded p-2"
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Upload Claim'}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default ClaimUpload;
