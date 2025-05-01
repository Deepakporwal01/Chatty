import React from "react";
import useFetchMessage from "../../hooks/useFetchMessage.js";
import { useMsgContext } from "../../../context/MsgContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { TiMessages } from "react-icons/ti";
import { FaRobot } from "react-icons/fa"; // Importing robot icon
import useListenMessages from "../../hooks/useListenMessages.js";
import robo from "../../assets/robo.webp"
const Message = React.memo(() => {
  const { sender, receiver, message, setMessage, loading } = useFetchMessage();
  const { receiverId } = useMsgContext();
  const user = JSON.parse(localStorage.getItem("chat-user"));
  const userId = user?._id;

  console.log(message, "message from message component");

  useListenMessages(setMessage);

  return receiverId ? (
    <div className="lg:mt-4 p-6 max-h-full rounded-lg flex flex-col bg-transparent">
      {loading ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-gray-400 text-xl">Loading messages...</p>
        </div>
      ) : message?.length === 0 ? (
        <p className="text-gray-400 text-xl">No messages found.</p>
      ) : (
        message?.map((msg, index) => {
          const isAi = msg?.senderType === "ai";
          const fromMe = !isAi && (userId === msg.senderId);
          const chatPosition = fromMe ? "chat-end" : "chat-start";

          const chatbg = fromMe
            ? "bg-blue-500"
            : isAi
            ? "bg-gradient-to-r from-purple-600 to-indigo-700"
            : "bg-gray-700";

          return (
            <div key={index} className={`chat ${chatPosition}`}>
              <div className="chat-image avatar">
                <div className="w-12 rounded-full flex items-center justify-center bg-gray-800">
                  {isAi ? (
                  <img
                      src= {robo}
                      alt="AI Avatar"
                      className="min-w-full min-h-full object-cover rounded-full"
                    />
                  
                  ) : (
                    <img
                      src={fromMe ? sender?.profilePic : receiver?.profilePic}
                      alt="User Avatar"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  )}
                </div>
              </div>
              <div
                className={`chat-bubble ${chatbg} text-white p-3 rounded-lg text-lg`}
              >
                {msg.message || "Hello"}
              </div>
              <div className="chat-footer opacity-50 text-xs text-white flex gap-1 items-center">
                {new Date(msg?.createdAt || Date.now()).toLocaleTimeString(
                  "en-US",
                  { hour12: true }
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  ) : (
    <NoChatSelected />
  );
});

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default Message;
