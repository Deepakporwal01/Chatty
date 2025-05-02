import Conversations from "../SideBar/Conversations";
import LogoutButton from "../SideBar/LogoutButton";
import SearchInput from "../SideBar/SearchInput";
import { useState, useEffect } from "react";

const Sidebar = ({ selectedConversation, setSelectedConversation }) => {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState(""); // 🆕 Search state

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lg:border-r min-h-screen border-slate-500 lg:p-4 flex flex-col">
      {(selectedConversation === null || !mobile) && (
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <div className="lg:px-3"></div>
      <Conversations
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        searchQuery={searchQuery} // 🆕 Pass down search query
      />
      {!mobile && <LogoutButton />}
    </div>
  );
};

export default Sidebar;
