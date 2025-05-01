import { useState, useEffect } from "react";
import axios from "axios";

const useGetConversation = () => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/api/users");
        console.log("Conversations fetched:", response.data);
        setConversation(response?.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { conversation, loading };
};

export default useGetConversation;
