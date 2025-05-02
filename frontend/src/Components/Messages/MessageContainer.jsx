import { useMsgContext } from "../../../context/MsgContext";
import MessageInput from "../Messages/MessageInput/";
import Messages from "../Messages/Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../../context/AuthContext";
import { FcVideoCall } from "react-icons/fc";
import { IoCall } from "react-icons/io5";
import useFetchMessage from "../../hooks/useFetchMessage";
import { useEffect, useState } from "react";
import VideoCall from "../VideoCall/VideoCall"; // ✅ Import VideoCall Component

const MessageContainer = () => {
  const { receiverId } = useMsgContext();
  const { receiver } = useFetchMessage();
  const { authUser } = useAuthContext(); // ✅ Get logged-in user (myId)
  const [isCalling, setIsCalling] = useState(false); // ✅ Controls Video Call UI

  // ✅ Ensure `authUser` and `receiverId` exist before calling
  if (!JSON.parse(localStorage.getItem("chat-user")) || !receiverId) return <NoChatSelected />;

  return (
    <div className="md:min-w-[600px] min-w-[390px] flex-col flex lg:min-h-screen max-h-screen overflow-x-hidden">
      {receiverId ? (
        <>
          {/* ✅ Chat Header with Call Buttons */}
          <div className="bg-slate-500 p-2 h-[4.5rem] lg:my-1 rounded-md lg:mx-5 flex items-center justify-around sticky top-0 z-10 min-w-full lg:h-[4.5rem]">
            <span className="label-text text-3xl lg:text-xl font-bold capitalize">
              {receiver?.fullName}
            </span>

            <div className="flex gap-8">
              {/* ✅ Start Video Call */}
              <button onClick={() => setIsCalling(true)}>
                <FcVideoCall size={"1.6rem"} color={"black"} />
              </button>

              {/* ✅ Audio Call Button (Not Implemented Yet) */}
              <button>
                <IoCall size={"1.2rem"} />
              </button>
            </div>
          </div>

          {/* ✅ Show Chat UI OR Video Call UI */}
          {!isCalling ? (
            <>
              <Messages />
              <MessageInput />
            </>
          ) : (
            <VideoCall 
              currentUserId={JSON.parse(localStorage.getItem("chat-user"))?._id} // ✅ Pass logged-in user ID
              receiverId={receiverId} // ✅ Pass receiver ID
               
            />
          )}
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full min-h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 ❄ {authUser?.data?.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
