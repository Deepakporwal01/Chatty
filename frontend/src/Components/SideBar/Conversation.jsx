import {useMsgContext} from "../../../context/MsgContext";
import { useSocketContext } from "../../../context/SocketContext";
import { useEffect, useState } from "react";
export const Conversation = ({ data, selectedConversation, setSelectedConversation, searchQuery }) => {
  const users = data;
  const { receiverId, setreceiverId } = useMsgContext();
  const { onlineUsers } = useSocketContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Decide which list to render
  const displayUsers = searchQuery.trim() === "" ? users : filteredUsers;

  const handleConversation = (conversationId) => {
    setreceiverId(null);
    setreceiverId(conversationId);
    setSelectedConversation(conversationId);
  };

  return (
    <>
      {selectedConversation == null || !isMobile ? (
        <div className="flex flex-col gap-3 lg:gap-1 rounded p-2 py-4 min-w-screen max-h-screen">
          {displayUsers.map((user, id) => {
            const isOnline = onlineUsers?.includes(user?._id);
            return (
              <div key={id}>
                <div
                  className={`flex gap-4 items-center rounded-md p-1 cursor-pointer ${
                    selectedConversation === user._id ? "bg-sky-500" : ""
                  }`}
                  onClick={() => handleConversation(user?._id)}
                >
                  <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                    <div className="lg:w-12 w-20 rounded-full">
                      <img src={user.profilePic} alt="user avatar" />
                    </div>
                  </div>
                  <div className="relative flex flex-row items-center justify-center gap-7">
                    <div className="flex gap-3 justify-center items-center">
                      <p className="font-bold text-gray-200 lg:text-lg text-3xl">{user.fullName}</p>
                      <span className="text-3xl lg:text-xl">😊</span>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
              </div>
            );
          })}
        </div>
      ) : (
        selectedConversation && isMobile && <MessageContainer />
      )}
    </>
  );
};
