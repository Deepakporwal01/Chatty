import jwt from "json-web-token";
import dotenv from "dotenv";
import User from "../Models/User.model.js" 
dotenv.config();
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookie.jwt_token;
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized No token found",})
      }
      const verify = jwt.verify(token, process.env.JWT_SECRET);
      if(!verify){
        return res.status(401).json({error: "Unauthorized Invalid token found",});
      }
      const user = await User.findById(verify.userId).select("-password");
req.user = user;
next();
    
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export default protectedRoute;