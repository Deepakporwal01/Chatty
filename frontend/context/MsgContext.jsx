import React, { createContext, useState,useContext } from 'react'
export const MsgContext = createContext();
export const useMsgContext = ()=>{
    return useContext(MsgContext);
}
export const MsgContextProvider =({children})=>{
const [receiverId,setreceiverId] = useState(null);
return (
    <MsgContext.Provider value={{receiverId,setreceiverId}}>
        {children}
    </MsgContext.Provider>
)
}
 

