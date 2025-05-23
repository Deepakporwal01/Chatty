import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react"; // Optional: using lucide icons

const JoinGroup = ({ onClose, onJoinSuccess }) => {
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleJoin = async () => {
    if (!groupCode.trim()) {
      setError("Group code cannot be empty.");
      return;
    }

    try {
      const res = await axios.post("/api/groups/joinGroup", { code: groupCode });
      setSuccess(res.data.message || "Joined group successfully.");
      setError("");
      setGroupCode("");
      if (onJoinSuccess) onJoinSuccess();
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Failed to join group.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="  bg-inherit rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto animate-fadeIn relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Join a Group
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Group Code</label>
          <input
            type="text"
            value={groupCode}
            onChange={(e) => setGroupCode(e.target.value)}
            placeholder="Enter group code or name"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        {success && <p className="text-sm text-green-600 mb-2">{success}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm bg-red-600   transition"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            className="px-4 py-2 rounded-xl text-sm text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGroup;
