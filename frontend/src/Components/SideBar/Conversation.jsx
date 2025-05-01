import { useState } from "react";
import { useMsgContext } from "../../../context/MsgContext";
import { useSocketContext } from "../../../context/SocketContext";
import MessageContainer from "../Messages/MessageContainer";
import { useEffect } from "react";
const Conversation = ({
  data,
  selectedConversation,
  setSelectedConversation,
}) => {
  const users = data;
  const { receiverId, setreceiverId } = useMsgContext();

  const { onlineUsers } = useSocketContext();

  const handleConversation = (conversationId) => {
    console.log(conversationId);
    setreceiverId(null);
    setreceiverId(conversationId);
    setSelectedConversation(conversationId);
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Listen for screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {selectedConversation == null || !isMobile ? (
        <div className="flex flex-col gap-3 lg:gap-1 rounded p-2 py-4 min-w-screen max-h-screen">
          {users.map((user, id) => {
            const isOnline = onlineUsers?.includes(user?._id); // ✅ Correctly checking online status

            return (
              <>
                 <div
                key={id}
                className={`flex gap-4 items-center rounded-md p-1 cursor-pointer ${
                  selectedConversation === user._id ? "bg-sky-500" : ""
                }`}
                onClick={() => handleConversation(user?._id)}
              >
                {/* User Avatar */}
                <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                  <div className="lg:w-12 w-20 rounded-full">
                    <img src={user.profilePic} alt="user avatar" />
                  </div>
                </div>

                {/* User Name */}
                <div className=" relative flex flex-row items-center justify-center gap-7">
                  <div className="flex gap-3 justify-center items-center">
                    <p className="font-bold text-gray-200 lg:text-lg text-3xl">{user.fullName}</p>
                    <span className="text-3xl lg:text-xl ">😊</span>
                  </div>
                </div>
                
              </div>
              <div className="divider"></div>
              </>
           
            );
          })}
        </div>
      ) : (
        selectedConversation && isMobile && <MessageContainer />
      )}
    </>
  );
};

export default Conversation;
