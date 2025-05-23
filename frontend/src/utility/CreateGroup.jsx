import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreateGroup({ onClose }) {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedUsers.length === 0) {
      alert("Please enter a group name and select at least one member.");
      return;
    }

    try {
      const res = await axios.post("/api/groups/createGroup", {
        name: groupName.trim(),
        members: selectedUsers,
      });
      alert("Group created successfully!");
      onClose();
    } catch (err) {
      console.error("Error creating group", err);
      alert("Group creation failed.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-neutral rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Create a New Group
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Group Name
          </label>
          <input
            type="text"
            placeholder="Enter group name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Select Members
          </label>
          <div className="max-h-40 overflow-y-auto border rounded-lg px-3 py-2 space-y-2 dark:bg-gray-800 dark:border-gray-700">
            {users.map((user) => (
              <div key={user._id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`user-${user._id}`}
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserSelect(user._id)}
                  className="mr-2 accent-blue-600"
                />
                <label htmlFor={`user-${user._id}`} className="text-gray-700 dark:text-gray-200">
                  {user.fullName}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleCreateGroup}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
