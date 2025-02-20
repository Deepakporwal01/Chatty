import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext.jsx";
export default function useLogin() {
    const [loading, setLoading] = useState(false);
const {authUser,setauthUser} = useAuthContext();
    const login = async ({ username, password }) => {
        // Validate Inputs
         
        const success = handleInputError({ username, password });
        if (!success) return;
 
        setLoading(true); // Show loading state

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            // Ensure response parsing doesn't crash
            const data = await res.json();
            if (data.success) {
                console.log(data);
                toast.success("Welcome back!");
               setauthUser(data);
                localStorage.setItem("chat-user", JSON.stringify(data));
                
            
            }else{
                toast.error(data.message);
            }
            
        } catch (err) {
            toast.error("Some error occurred",err);
            console.log("error is ",err)
          
        } finally {
            setLoading(false); // Hide loading state
        }
    };
    console.log("authUser is ",authUser)
    return { login, loading };
}

// Improved Input Validation
const handleInputError = ({ username, password }) => {
  if(!username || !password){
 return false;
  }
    return true;
};