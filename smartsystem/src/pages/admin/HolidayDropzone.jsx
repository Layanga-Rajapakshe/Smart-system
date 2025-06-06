import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useUploadHolidaysMutation } from '../../redux/api/attendanceApiSlice';
import { toast } from 'react-hot-toast';

function HolidayDropzone() {
  const [uploadHolidaysSheet, { isLoading }] = useUploadHolidaysMutation();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    // Validate file size (e.g., 10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    const file = acceptedFiles[0];
    
    if (file && file.size > maxSize) {
      toast.error("File size must be less than 10MB");
      return;
    }
  }, []);

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
    onDrop,
  });

  const handleConfirmUpload = useCallback(async () => {
    if (!acceptedFiles.length) {
      toast.error('Please upload a valid file before confirming.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      
      const loadingToast = toast.loading('Uploading holidays file...');
      
      await uploadHolidaysSheet(formData).unwrap();
      
      toast.dismiss(loadingToast);
      toast.success('Holidays file uploaded successfully');
    } catch (error) {
      toast.error(error.data?.message || 'Error uploading holidays file. Please try again.');
      console.error('Upload error:', error);
    }
  }, [acceptedFiles, uploadHolidaysSheet]);
 
  const handleCancel = useCallback(() => {
    acceptedFiles.splice(0, acceptedFiles.length);
  }, [acceptedFiles]);

  return (
    <section className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <div 
        {...getRootProps()} 
        className="border-2 border-dashed border-gray-400 rounded-lg p-8 w-full max-w-xl hover:border-blue-500 transition-colors cursor-pointer"
      >
        <input {...getInputProps()} />
        <div className="text-center space-y-4">
          <p className="text-lg">Drag and drop a holidays sheet here, or click to select</p>
          <p className="text-sm text-gray-500">(Only .xls and .xlsx files are accepted)</p>
        </div>
      </div>

      {(acceptedFiles.length > 0 || fileRejections.length > 0) && (
        <aside className="mt-8 w-full max-w-xl space-y-4">
          {acceptedFiles.length > 0 && (
            <div className="bg-green-50 p-4 rounded-lg">
              <div className='flex justify-between'>
                <h4 className="text-lg font-semibold text-green-800">Selected File</h4>
                <button onClick={handleCancel} className='text-md'>×</button>
              </div>
              <ul className="mt-2">
                {acceptedFiles.map((file) => (
                  <li key={file.path} className="text-green-700">
                    {file.path} ({(file.size / 1024).toFixed(2)} KB)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {fileRejections.length > 0 && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-red-800">Rejected Files</h4>
              <ul className="mt-2">
                {fileRejections.map(({ file, errors }) => (
                  <li key={file.path} className="text-red-700">
                    {file.path} ({(file.size / 1024).toFixed(2)} KB)
                    <ul className="ml-4 mt-1">
                      {errors.map((e) => (
                        <li key={e.code} className="text-sm">• {e.message}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      )}

      <button
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleConfirmUpload}
        disabled={isLoading || acceptedFiles.length === 0}
      >
        {isLoading ? 'Uploading' : 'Confirm Upload'}
      </button>
    </section>
  );
}

export default HolidayDropzone;