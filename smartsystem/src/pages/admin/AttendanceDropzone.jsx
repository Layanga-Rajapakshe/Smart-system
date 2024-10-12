import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';

function AttendanceDropzone() {
  const [fileConfirmed, setFileConfirmed] = useState(false);
  const navigate = useNavigate();

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: {
      'application/vnd.ms-excel': [], // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [] // .xlsx
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const handleConfirmUpload = () => {
    if (acceptedFiles.length > 0) {
      setFileConfirmed(true);
      // Logic to handle the file upload goes here
      // After confirming, navigate to the attendance view page
      navigate('/attendance-view'); // Replace with the actual route
    } else {
      alert("Please upload a valid file before confirming.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-400 p-4">
      <div {...getRootProps({ className: 'border-2 border-dashed border-gray-400 p-4 text-center w-full max-w-md' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.xls and *.xlsx files will be accepted)</em>
      </div>
      <aside className="mt-4 w-full max-w-md">
        <h4 className="text-lg font-semibold">Accepted files</h4>
        <ul className="list-none p-0">{acceptedFileItems}</ul>
        <h4 className="text-lg font-semibold mt-4">Rejected files</h4>
        <ul className="list-none p-0">{fileRejectionItems}</ul>
      </aside>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleConfirmUpload}
        disabled={acceptedFiles.length === 0}
      >
        Confirm Upload
      </button>
      {fileConfirmed && <p className="text-green-500 mt-2">File upload confirmed! Redirecting...</p>}
    </section>
  );
}

export default AttendanceDropzone;
