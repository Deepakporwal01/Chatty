import useGetConversation from "../../hooks/useGetConversation.js";
import Conversation from "../SideBar/Conversation.jsx";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();
 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation data={conversation} />
      
    </div>
  );
};

export default Conversations;