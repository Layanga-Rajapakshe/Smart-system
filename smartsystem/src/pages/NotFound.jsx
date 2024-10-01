/*import React from 'react'

const NotFound = () => {
  return (
    <div>
      
    </div>
  )
}

export default NotFound*/


import React from 'react';
import { Link } from 'react-router-dom'; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-8xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-700 mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;



