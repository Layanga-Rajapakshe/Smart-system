import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button } from "@heroui/react";

const PermissionManagement = () => {
    const [requestType, setRequestType] = useState("");
    const [hierarchyLevelRequired, setHierarchyLevelRequired] = useState("");
    const [requests, setRequests] = useState([]);
    const [editingRequest, setEditingRequest] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    useEffect(() => {
        fetchRequests();
    }, []);

    // Fetch all requests from the backend
    const fetchRequests = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/request", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests", error);
        }
    };

    // Handle form submission for creating a request
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const requestData = Object.fromEntries(formData);

        if (!requestData.requestType || !requestData.hierarchyLevelRequired) {
            alert("All fields are required.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/api/request",
                { requestType: requestData.requestType, hierarchyLevelRequired: requestData.hierarchyLevelRequired },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            alert("✅ Request type created successfully!");

            resetForm();
            fetchRequests();
        } catch (error) {
            alert(error.response?.data?.error || "❌ Operation failed.");
        }
    };

    // Handle form submission for updating a request
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!editingRequest.requestType || !editingRequest.hierarchyLevelRequired) {
            alert("All fields are required.");
            return;
        }

        try {
            await axios.put(
                `http://localhost:3000/api/request/${editingRequest._id}`,
                {
                    requestType: editingRequest.requestType,
                    hierarchyLevelRequired: editingRequest.hierarchyLevelRequired,
                },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            alert("✅ Request updated successfully!");

            setIsUpdateModalOpen(false);
            fetchRequests();
        } catch (error) {
            alert(error.response?.data?.error || "❌ Operation failed.");
        }
    };

    // Set form fields for editing
    const handleEdit = (request) => {
        setEditingRequest(request);
        setIsUpdateModalOpen(true);
    };

    // Handle deletion of a request
    const handleDelete = async (id) => {
        if (!window.confirm("⚠️ Are you sure you want to delete this request?")) return;

        try {
            await axios.delete(`http://localhost:3000/api/request/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            alert("✅ Request deleted successfully!");
            fetchRequests();
        } catch (error) {
            alert("❌ Failed to delete request.");
        }
    };

    // Reset form after submission
    const resetForm = () => {
        setRequestType("");
        setHierarchyLevelRequired("");
    };

    return (
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
            <div className="flex justify-center">
                <h2 className="text-4xl font-bold mb-6 text-blue-600 text-center">
                    Request Type Management
                </h2>
            </div>

            {/* Create Request Form (Hero UI) */}
            <div className="flex justify-center items-center">
                <Form
                    className="w-full max-w-xs flex flex-col gap-4"
                    onSubmit={handleCreateSubmit}
                    onReset={resetForm}
                >
                    <Input
                        isRequired
                        errorMessage="Please enter a valid request type"
                        label="Request Type"
                        labelPlacement="outside"
                        name="requestType"
                        placeholder="Enter request type"
                        type="text"
                    />

                    <Input
                        isRequired
                        errorMessage="Please enter a valid hierarchy level"
                        label="Hierarchy Level"
                        labelPlacement="outside"
                        name="hierarchyLevelRequired"
                        placeholder="Enter hierarchy level"
                        type="number"
                    />

                    <div className="flex gap-2 justify-center">
                        <Button color="primary" type="submit">
                            Create Request
                        </Button>
                        <Button type="reset" variant="flat">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>


           {/* Existing Requests Table */}
<h3 className="text-2xl font-semibold mt-8 mb-4">Existing Requests</h3>
<div className="overflow-x-auto">
    <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md">
        <thead>
            <tr className="bg-gray-200">
                <th className="p-4 text-left text-sm font-medium text-gray-700">Type</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Hierarchy Level</th>
                <th className="p-4 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
        </thead>
        <tbody>
            {requests.map((request) => (
                <tr key={request._id} className="border-t border-gray-300">
                    <td className="p-4 text-sm text-gray-800">{request.requestType}</td>
                    <td className="p-4 text-sm text-gray-800">{request.hierarchyLevelRequired}</td>
                    <td className="p-4 space-x-4">
                        <button
                            onClick={() => handleEdit(request)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(request._id)}
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            {/* Update Request Modal */}
            {isUpdateModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-4">Update Request</h3>
                        <form onSubmit={handleUpdateSubmit}>
                            <label>Request Type:</label>
                            <input
                                type="text"
                                value={editingRequest.requestType}
                                onChange={(e) => setEditingRequest({ ...editingRequest, requestType: e.target.value })}
                                className="w-full p-2 border rounded mb-4"
                                required
                            />
                            <label>Hierarchy Level:</label>
                            <input
                                type="number"
                                value={editingRequest.hierarchyLevelRequired}
                                onChange={(e) => setEditingRequest({ ...editingRequest, hierarchyLevelRequired: e.target.value })}
                                className="w-full p-2 border rounded mb-4"
                                required
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PermissionManagement;
