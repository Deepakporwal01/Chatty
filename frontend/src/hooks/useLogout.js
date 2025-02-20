import React from 'react'
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../context/AuthContext';
export default function useLogout() {
const [loading,setLoading] = React.useState(false);
const {authUser,setauthUser} = useAuthContext();
const logout = async()=>{
    setLoading(true);
    try{
        const res = await fetch("/api/auth/logout",{
            method:"POST",
            credentials:"include",
            headers:{"Content-Type":"application/json"},
      
        });
        const data = await res.json();
        console.log("data is ",data)
if(data.success){
    toast.success("Logged Out Successfully");
    localStorage.removeItem("chat-user");
    setauthUser(null);

}
    }catch(error){
        console.error("Logout Error:",error);
    }finally{
        setLoading(false);
    }
}
  return {logout,loading};
    
  
}
