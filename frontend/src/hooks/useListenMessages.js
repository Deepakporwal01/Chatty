import { useSocketContext } from "../../context/SocketContext";
import { MsgContext } from "../../context/MsgContext";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
const useListenMessages =(setMessage)=>{
    const {socket} = useSocketContext();
   useEffect (()=>{
const handleMessages =(newMessage)=>{
setMessage((prevMessage)=>[
    ...prevMessage,
    newMessage
])
}
socket.on("newMessage",handleMessages)
return () => {
    socket.off("newMessage", handleMessages); // ✅ Cleanup on unmount
  };
   },[socket,setMessage]);
}
export default useListenMessages;