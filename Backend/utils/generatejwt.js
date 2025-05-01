import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateTokenAndSetCookies = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"});
res.cookie("jwt_token",token,{
    maxAge:15*24*60*60*1000,
    httpOnly:true, 
    secure: false,  // Set to true in production
  sameSite: "Lax", // Prevents cross-site issues
 
});

}

export default generateTokenAndSetCookies;