import React from "react"; // Import React (though optional, depending on your setup)
import useGetConversation from "../../hooks/useGetConversation.js"; // Custom hook to fetch conversations
import { Conversation } from "../SideBar/Conversation.jsx"; // Conversation component

const Conversations = ({
  selectedConversation,
  setSelectedConversation,
  searchQuery,
}) => {
  const { loading, conversation } = useGetConversation(); // Get conversation data from custom hook

  if (loading) {
    return <div>Loading...</div>; // Show loading text while data is fetching
  }

  return (
    <div className="py-2 flex flex-col overflow-y-scroll">
      <Conversation
        data={conversation} // Pass the fetched conversation data
        selectedConversation={selectedConversation} // Pass selected conversation
        setSelectedConversation={setSelectedConversation} // Function to update selected conversation
        searchQuery={searchQuery} // Pass the search query to filter users
      />
    </div>
  );
};

export default Conversations;
