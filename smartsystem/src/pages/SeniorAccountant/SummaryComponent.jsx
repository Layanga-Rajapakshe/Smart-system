import React from 'react';

const SummaryComponent = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default SummaryComponent;
