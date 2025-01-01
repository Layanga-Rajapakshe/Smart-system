import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useUploadAttendanceSheetMutation } from '../../redux/api/attendanceApiSlice';

function AttendanceDropzone() {
  const [uploadAttendanceSheet, { isLoading }] = useUploadAttendanceSheetMutation();
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

  const handleConfirmUpload = async () => {
    if (!acceptedFiles.length) {
      alert('Please upload a valid file before confirming.');
      return;
    }

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    try {
      await uploadAttendanceSheet(formData).unwrap();
      navigate('/attendance-view'); // Replace with the actual route
    } catch (error) {
      console.error('Upload failed:', error);
      alert('File upload failed. Please try again.');
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-400 p-4">
      <div {...getRootProps({ className: 'border-2 border-dashed border-gray-400 p-4 text-center w-full max-w-md' })}>
        <input {...getInputProps()} />
        <p>Drag and drop a file here, or click to select one</p>
        <em>(Only .xls and .xlsx files are accepted)</em>
      </div>

      <aside className="mt-4 w-full max-w-md">
        {acceptedFiles.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold">Accepted Files</h4>
            <ul className="list-disc pl-5">
              {acceptedFiles.map((file) => (
                <li key={file.path}>
                  {file.path} - {file.size} bytes
                </li>
              ))}
            </ul>
          </div>
        )}

        {fileRejections.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold">Rejected Files</h4>
            <ul className="list-disc pl-5">
              {fileRejections.map(({ file, errors }) => (
                <li key={file.path}>
                  {file.path} - {file.size} bytes
                  <ul className="list-disc pl-5 text-red-500">
                    {errors.map((e) => (
                      <li key={e.code}>{e.message}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={handleConfirmUpload}
        disabled={isLoading || acceptedFiles.length === 0}
      >
        {isLoading ? 'Uploading...' : 'Confirm Upload'}
      </button>
    </section>
  );
}

export default AttendanceDropzone;
