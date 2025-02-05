import express from "express";
import {sendMessage,getMessages} from "../Controllers/message.controller.js"
import protectedRoute from "../Middleware/protectedRoute.middleware.js";
const router = express.Router();
router.post("/send/:id",protectedRoute,sendMessage);
router.get("/get/:id",protectedRoute,getMessages);
export default router;