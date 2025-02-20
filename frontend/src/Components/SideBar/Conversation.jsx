import { useState } from "react";
import { useMsgContext } from "../../../context/MsgContext";
import { useSocketContext } from "../../../context/SocketContext";

const Conversation = ({ data }) => {
  const users = data;
  const { receiverId, setreceiverId } = useMsgContext();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { onlineUsers } = useSocketContext();

  const handleConversation = (conversationId) => {
    console.log(conversationId);
    setreceiverId(null);
    setreceiverId(conversationId);
    setSelectedConversation(conversationId);
  };

  return (
    <div className="flex flex-col gap-1 rounded p-2 py-1">
      {users.map((user, id) => {
        const isOnline = onlineUsers.includes(user._id); // ✅ Correctly checking online status

        return (
          <div
            key={id}
            className={`flex gap-5 items-center rounded-md p-2 cursor-pointer ${
              selectedConversation === user._id ? "bg-sky-500" : ""
            }`}
            onClick={() => handleConversation(user?._id)}
          >
            {/* User Avatar */}
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
              <div className="w-12 rounded-full">
                <img src={user.profilePic} alt="user avatar" />
              </div>
            </div>

            {/* User Name */}
            <div className="flex flex-row items-center justify-center">
              <div className="flex gap-3">
                <p className="font-bold text-gray-200">{user.fullName}</p>
                <span className="text-xl">😊</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
