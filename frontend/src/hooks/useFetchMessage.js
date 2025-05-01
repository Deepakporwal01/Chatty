import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMsgContext } from "../../context/MsgContext.jsx";
import { BsCheckLg } from "react-icons/bs";

export default function useFetchMessage() {
  const { receiverId } = useMsgContext();
  const [message, setMessage] = useState([]);
  const [sender,setSender] = useState(null);
  const [receiver,setReceiver] = useState(null);

  const [loading, setLoading] = useState(true);
  const getMessages = async () => {
    if (!receiverId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/message/get/${receiverId}`);
      const data = await response.json();
      console.log("Messages data:", data); // 
      if (data?.success) {
    
        setMessage(data?.data?.conversation?.messages);
        
console.log("Messages in useFetch Message:", data?.data?.messages); 
        setSender(data?.sender);
        setReceiver(data?.receiver);
      } else {
        setMessage([]); // Reset to prevent stale data
      }
    } catch (err) {
      toast.error("Unable to fetch messages");
      setMessage([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [receiverId ]); // ✅ Runs only when `receiverId` changes

  return { message, setMessage, loading ,sender,receiver};
}
