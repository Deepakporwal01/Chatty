import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import cors from "cors";
import { ConnectDB } from "./Db/db.js";
import messageRoute from "./Routes/message.routes.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const port = 5000;
app.use(cookieParser());
app.use(express.json);
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);
ConnectDB().then(
  app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
  })
);
