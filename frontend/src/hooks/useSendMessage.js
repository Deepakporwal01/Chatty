import React, { useEffect } from "react";
 
import { useMsgContext } from "../../context/MsgContext";
 
export default function useSendMessage() {
 
  const {receiverId} = useMsgContext(); 
 
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
       console.log("message is" ,data.data );
 
      }
  
    } catch (error) {
      console.log(error);
    }
  };

  return { sendMessage };
}
  