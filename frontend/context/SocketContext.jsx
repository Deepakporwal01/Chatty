import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
export const socketContext = createContext();
export const useSocketContext = () => {
  return useContext(socketContext);
};
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState();
  const [onlineUsers, setOnlineUsers] = useState();
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:4000", {
        query: {
          userId: authUser?._id,
          transports: ["websocket"],
        },
      });
      setSocket(socket);
   console.log("Socket from frontend",socket);
 
      //socket.on is used to listen to the events can be used both on cleint and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
