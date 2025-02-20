import React from "react";
import { AuthContextProvider } from "./AuthContext";
import { MsgContextProvider } from "./MsgContext";
import { SocketContextProvider } from "./SocketContext";

export default function ContextProvider({ children }) {
    return (
       
        <AuthContextProvider>
            <MsgContextProvider>
            <SocketContextProvider>
                {children}
                    </SocketContextProvider>
            </MsgContextProvider>
        </AuthContextProvider>
    
    );
}
