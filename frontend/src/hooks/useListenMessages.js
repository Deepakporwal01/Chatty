import { useSocketContext } from "../../context/SocketContext";
import { useEffect } from "react";
import { useMsgContext } from "../../context/MsgContext";

const useListenMessages = (setMessage) => {
  const { socket } = useSocketContext();
  const { receiverId } = useMsgContext();
  
  // Notification function for different message types (sender/receiver)
  const notification = (type) => {
    if (type === "sender") {
      const audio = new Audio("/incmsg.mp3");
      audio.play().catch((err) => console.log("Error playing audio:", err));
    } else if (type === "receiver") {
      const audio = new Audio("/iphone_1.mp3");
      audio.play().catch((err) => console.log("Error playing audio:", err));
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleMessages = (newMessage) => {
      console.log("Received new message:", newMessage);

      // ✅ Ensure only messages for the active conversation are added
      if (
        newMessage.senderId.toString() !== receiverId.toString() &&
        newMessage.receiverId.toString() !== receiverId.toString()
      ) {
        return; // Ignore messages not part of the current conversation
      }

      // Add the new message to the message list
      setMessage((prevMessages) => {
        // Ensure prevMessages is an array
        if (!Array.isArray(prevMessages)) {
          prevMessages = [];
        }
        return [...prevMessages, newMessage];
      });

      // Trigger notification based on who the sender is
      if (newMessage.senderId.toString() !== receiverId.toString()) {
        notification("sender");
      } else {
        notification("receiver");
      }
    };

    // Listen for incoming messages
    socket.on("newMessage", handleMessages);

    // Clean up the listener on unmount
    return () => {
      socket.off("newMessage", handleMessages);
    };
  }, [socket, receiverId, setMessage]);

};

export default useListenMessages;
