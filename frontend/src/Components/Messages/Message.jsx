import React, { useEffect, useState } from "react";
import useFetchMessage from "../../hooks/useFetchMessage.js";
import { useMsgContext } from "../../../context/MsgContext.jsx";
import { useAuthContext } from "../../../context/AuthContext.jsx";
import { TiMessages } from "react-icons/ti";
import useListenMessages from "../../hooks/useListenMessages.js";
const Message = React.memo(() => {
  
  const { message,setMessage, loading } = useFetchMessage();
 useListenMessages(setMessage);
  const { receiverId } = useMsgContext();

  const user = JSON.parse(localStorage.getItem("chat-user"));

  const userId = user?._id;
  const fromMe = userId === message[0]?.senderId;

  const chatPosition = fromMe ? "chat-end" : "chat-start";
  const chatbg = fromMe ? "bg-blue-500" : "bg-black";

  return receiverId ? (
    <div className="   mt-4 p-3 bg-gray-800 rounded-lg flex flex-col">
      {loading ? (
        <p className="text-gray-400 text-sm">Loading messages...</p>
      ) : message?.length === 0 ? (
        <p className="text-gray-400 text-sm">No messages found.</p>
      ) : (
        message?.map((msg, index) => (
          <div key={index} className={`chat ${chatPosition}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.senderProfilePic || ""} alt="User Avatar" />
              </div>
            </div>
            <div className={`chat-bubble ${chatbg}  text-white  `}>
              {msg.message || "hello"}
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
              {new Date(msg.createdAt).toLocaleTimeString() || "Time Unknown"}
            </div>
          </div>
        ))
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
