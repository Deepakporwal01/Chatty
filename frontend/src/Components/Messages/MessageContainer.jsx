import { useMsgContext } from "../../../context/MsgContext";
import MessageInput from "../Messages/MessageInput/";
import Messages from "../Messages/Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../../context/AuthContext";
const MessageContainer = () => {
  const {receiverId} = useMsgContext();

const fetchreceiverdata = async()=>{
  try{
  const response = await fetch("/api/auth/login");
  }catch(err){
    console.log(err);
  }
}

  const NoChatSelecte = false;
  return (
    <div className="md:min-w-[450px] flex flex-col ">
      { receiverId? (
        <>
          <div className="bg-slate-500 p-2 my-7 rounded-sm ">
            <span className="label-text text-lg">To:</span>{"  "}
            <span className="text-gray-900 font-bold">John doe</span>
          </div>
          <Messages />
       <MessageInput  />
        </>
      ):(
        <NoChatSelected />
      ) }
    </div>
  );
};
const NoChatSelected = () => {
    const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 ❄ {authUser?.data?.fullName}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
export default MessageContainer;
