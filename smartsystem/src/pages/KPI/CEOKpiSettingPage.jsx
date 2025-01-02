import React from "react";
import { useNavigate } from "react-router-dom";
import image_add from "../../assets/images/add_parameter.jpg";
import image_edit from "../../assets/images/edit_parameter.jpg";

const CEOParameters = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 text-gray-800 text-center py-4 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
          Parameter Management
        </h1>
        <p className="text-lg mt-2 font-medium text-gray-700">
          Easily manage your KPI parameters
        </p>
        <div className="mt-4 mx-auto w-10/12 border-t border-gray-400"></div>
      </header>

      <main className="flex-grow container mx-auto py-6 px-6">
        <section className="bg-white p-4 rounded-lg shadow-md transition duration-500 hover:shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, CEO</h2>
          <p className="text-gray-600 leading-relaxed">
            This page allows you to manage the KPI parameters for your company.
            You can add new parameters or edit existing ones to ensure accurate performance evaluations.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Add Parameter Card */}
          <div className="relative group bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
            <img
              src={image_add}
              alt="Add Parameter"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-900">
              Add Parameters
            </h3>
            <p className="text-gray-600 mt-2">
              Define new KPI parameters tailored to your organizational goals.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate("/add-parameter")}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 hover:shadow-lg transition duration-300"
              >
                Add Parameter
              </button>
            </div>
          </div>

          {/* Detail Parameter Card */}
          <div className="relative group bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300">
            <img
              src={image_edit}
              alt="Edit Parameter"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4 text-gray-900">
              Parameter Details
            </h3>
            <p className="text-gray-600 mt-2">
              View detailed descriptions of each KPI parameter to understand their significance and alignment with company objectives.
            </p>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate("/detail-parameter")}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:shadow-lg transition duration-300"
              >
                Parameter Details
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CEOParameters;
