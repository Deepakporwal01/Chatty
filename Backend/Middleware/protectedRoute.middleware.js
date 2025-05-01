import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../Models/User.model.js";
dotenv.config();

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized: No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
export default protectedRoute;