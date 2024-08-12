import React from 'react';
import { useDropzone } from 'react-dropzone';

function AttendanceDropzone() {
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
    </section>
  );
}

export default AttendanceDropzone;
