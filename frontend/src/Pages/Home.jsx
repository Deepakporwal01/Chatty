import MessageContainer from "../Components/Messages/MessageContainer";
import Sidebar from "../Components/SideBar/Sidebar";
import { useEffect, useState } from "react";
const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedConversation, setSelectedConversation] = useState(null);
  // Listen for screen resizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex  max-h-screen   rounded-lg   bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 min-w-screen">
      <Sidebar
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />
      {!isMobile && <MessageContainer />}
    </div>
  );
};
export default Home;
