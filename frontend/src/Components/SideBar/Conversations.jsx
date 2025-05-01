import useGetConversation from "../../hooks/useGetConversation.js";
import Conversation from "../SideBar/Conversation.jsx";

const Conversations = ({selectedConversation,setSelectedConversation}) => {
  const { loading, conversation } = useGetConversation();
 

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-2 flex flex-col  overflow-y-scroll">
      <Conversation data={conversation}  selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
      
    </div>
  );
};

export default Conversations;