import React, { useEffect } from "react";
import { useMsgContext } from "../../context/MsgContext";
 import useFetchMessage from "./useFetchMessage";


export default function useSendMessage() {
  const {receiverId} = useMsgContext(); 
  const {getMessages} =  useFetchMessage();
  const sendMessage = async (message) => {
 
    try {
      const response = await fetch(`/api/message/send/${receiverId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
 
      if(data.success){
       getMessages();
      }
      console.log("message receiverd ",data);
    } catch (error) {
      console.log(error);
    }
  };

  return { sendMessage };
}
Tech Stacks/Libraries: ReactJS, Redux, NodeJS, Express, MongoDB,    