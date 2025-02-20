import { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";
export default function useSignup() {
    const [loading, setLoading] = useState(false); // Add loading state
const {authUser,setauthUser} = useAuthContext();
    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        // Validate Inputs
        const success = handleInputError({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true); // Show loading state

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            // Ensure response parsing doesn't crash
            const data = await res.json();
            if(data){
                toast.success("User Created Successfully");
                localStorage.setItem("chat-user",JSON.stringify(data));
                setauthUser(data);
            }
			if (data.error) {
				throw new Error(data.error);
			}
        } catch (err) {
            toast.error("Some error occurred");
            console.error("Signup Error:", err);
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return { signup, loading };
}

// 🔍 Improved Input Validation
 function handleInputError  ({ fullName, username, password, confirmPassword, gender })   {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }
    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return false;
    }
    return true;
};
