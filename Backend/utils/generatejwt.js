import jwt from "json-web-token";
import dotenv from "dotenv";
dotenv.config();
const generateTokenAndSetCookies = (userId,req)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"15d"});
res.cookie("jwt_token",token,{
    maxAge:15*24*60*60*1000,
    httpOnly:true,
    
});

}

export default generateTokenAndSetCookies;