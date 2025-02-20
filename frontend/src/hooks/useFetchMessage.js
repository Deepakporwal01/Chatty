import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useMsgContext } from "../../context/MsgContext.jsx";

export default function useFetchMessage() {
  const { receiverId } = useMsgContext();
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMessages = async () => {
    if (!receiverId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/message/get/${receiverId}`);
      const data = await response.json();
      if (data.success) {
        setMessage(data?.data?.messages);
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

  return { message, setMessage, loading };
}
