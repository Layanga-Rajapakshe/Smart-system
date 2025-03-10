import { useEffect, useState } from "react";
import axios from "axios";

const PermissionApprove = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/permissions", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching permissions", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApproval = async (requestId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/permissions/${requestId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessage(`Request ${status} successfully.`);
      fetchRequests(); // Refresh the list after approval/rejection
    } catch (error) {
      console.error("Error updating request status", error);
    }
  };

  return (
    <div className="bg-white p-8 shadow-md rounded-lg max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-green-600">Approve Requests</h2>

      {message && (
        <p className="text-blue-600 font-semibold mb-4">{message}</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6">Employee</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Reason</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-t border-gray-300">
                <td className="py-3 px-6">{request.employeeName}</td>
                <td className="py-3 px-6">{request.requestType}</td>
                <td className="py-3 px-6">{request.reason}</td>
                <td className="py-3 px-6">{request.status}</td>
                <td className="py-3 px-6 flex space-x-4">
                  {request.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleApproval(request.id, "Approved")}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(request.id, "Rejected")}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.status !== "Pending" && (
                    <span className="text-gray-500">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PermissionApprove;
