import { useMsgContext } from "../../../context/MsgContext";
import { useSocketContext } from "../../../context/SocketContext";
import { useEffect, useState } from "react";
import CreateGroup from "../../utility/CreateGroup";
import axios from "axios";

import MessageContainer from "../messages/MessageContainer"; // Adjust if needed
import JoinGroup from "../../utility/JoinGroup";
export const Conversation = ({
  data,
  selectedConversation,
  setSelectedConversation,
  searchQuery,
}) => {
  const { receiverId, setreceiverId } = useMsgContext();
  const { onlineUsers } = useSocketContext();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [group, setGroup] = useState([]);
  const [createGroup, setCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("/api/groups/getUserGroups");
        setGroup(res.data);
      } catch (err) {
        console.log("Error fetching groups:", err);
      }
    };
    fetchGroups();
  }, []);

  const handleConversation = (id) => {
    setreceiverId(null);
    setreceiverId(id);
    setSelectedConversation(id);
  };

  const filteredUsers = data.filter((user) =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const displayUsers = searchQuery.trim() === "" ? data : filteredUsers;


const handleLeaveGroup = async (groupId) => {
    try {
      const res = await axios.post(`/api/groups/leaveGroup/${groupId}`);
      setGroup((prevGroups) =>
        prevGroups.filter((group) => group._id !== groupId)
      );
      console.log(res.data.message);
    } catch (err) {
      console.error("Error leaving group:", err);
    }
  };




  return (
    <>
      {createGroup && <CreateGroup onClose={() => setCreateGroup(false)} />}
      {showJoinGroup && <JoinGroup onClose={() => setShowJoinGroup(false)} />}

      {(selectedConversation == null || !isMobile) && (
        <div className="flex flex-col gap-3 lg:gap-1 rounded p-2 py-4 overflow-y-auto">
          <div className="flex flex-col  gap-3 lg:gap-2 rounded p-2 py-4">
            <button
              className="bg-red-800 h-8 hover:bg-red-500 text-white rounded"
              onClick={() => setCreateGroup(true)}
            >
              Create a Group
            </button>
            <button  className="bg-green-800 hover:bg-green-500 h-8 text-white rounded" onClick={() => setShowJoinGroup(true) }>
              Join a Group
            </button>
          </div>

          {/* Groups Section */}
          {group.length > 0 && (
            <>
              <h2 className="text-gray-400 text-md mt-4 mb-2 ml-2">Groups</h2>
              {group.map((grp, idx) => (
                <div key={idx}>
                  <div
                    className={`flex gap-4 items-center rounded-md p-1 cursor-pointer ${
                      selectedConversation === grp._id ? "bg-sky-500" : ""
                    }`}
                    onClick={() => handleConversation(grp._id)}
                  >
                    <div className="avatar placeholder">
                      <div className=" bg-neutral text-black rounded-full w-12 h-12 flex items-center justify-center text-xl uppercase">
                        {grp.name?.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-200 lg:text-lg">
                        {grp.name}
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="text-sm text-gray-400">
                          {grp.members?.length} members
                        </p>
                        <button onClick={()=>handleLeaveGroup(grp?._id)} className=" text-red-600   rounded-lg p-1">
                          leave
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="divider"></div>
                </div>
              ))}
            </>
          )}
          {/* Users Section */}
          <h2 className="text-gray-400 text-sm mb-2 ml-2">Users</h2>
          {displayUsers.map((user, id) => {
            const isOnline = onlineUsers?.includes(user._id);
            return (
              <div key={id}>
                <div
                  className={`flex gap-4 items-center rounded-md p-1 cursor-pointer ${
                    selectedConversation === user._id ? "bg-sky-500" : ""
                  }`}
                  onClick={() => handleConversation(user._id)}
                >
                  <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                    <div className="lg:w-12 w-20 rounded-full">
                      <img src={user.profilePic} alt="user avatar" />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-center items-center">
                    <p className="font-bold text-gray-200 lg:text-lg text-3xl">
                      {user.fullName}
                    </p>
                    <span className="text-3xl lg:text-xl">😊</span>
                  </div>
                </div>
                <div className="divider"></div>
              </div>
            );
          })}
        </div>
      )}

      {selectedConversation && isMobile && <MessageContainer />}
    </>
  );
};
