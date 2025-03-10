import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { InboxIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function EmployeePermissionPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState([
    { id: 1, employee: "John Doe", type: "Sick Leave", status: "Unread" },
    { id: 2, employee: "Jane Smith", type: "Remote Work", status: "Read" },
  ]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function markAsRead(id) {
    setRequests(
      requests.map((req) => (req.id === id ? { ...req, status: "Read" } : req))
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Employee Permission Requests</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={openModal}
        >
          Request Permission
        </button>
        <div className="mt-6 space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
              <div>
                <h3 className="font-medium">{req.employee} - {req.type}</h3>
                <p className={req.status === "Unread" ? "text-red-500" : "text-gray-500"}>{req.status}</p>
              </div>
              <button
                className="text-green-600 hover:text-green-800"
                onClick={() => markAsRead(req.id)}
              >
                <CheckCircleIcon className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl w-96">
              <Dialog.Title className="text-lg font-medium">Request Permission</Dialog.Title>
              <form className="mt-4">
                <label className="block mb-2">Employee Name</label>
                <input className="w-full p-2 border rounded-lg" type="text" />

                <label className="block mt-4 mb-2">Permission Type</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Sick Leave</option>
                  <option>Remote Work</option>
                  <option>Personal Leave</option>
                </select>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Submit
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
