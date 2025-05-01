import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import userRoute from "./Routes/user.routes.js";
import cors from "cors";
import { ConnectDB } from "./Db/db.js";
import messageRoute from "./Routes/message.routes.js";
import cookieParser from "cookie-parser";
import {app,server} from "../Backend/socket/socket.js"
dotenv.config(); 
 
const port = 4000;
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use("/api/auth", authRoutes);         
app.use("/api",userRoute);
app.use("/api/message",messageRoute);
ConnectDB().then(
  server.listen(port,() => {
    console.log(`App is listening at port ${port}`);
  })
);
