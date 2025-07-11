import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
