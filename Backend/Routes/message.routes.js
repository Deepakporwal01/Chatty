import express from "express";
import {sendMessage,getMessages} from "../Controllers/message.controller.js"
import {main} from "../Gemini/Integration.js";
import protectedRoute from "../Middleware/protectedRoute.middleware.js";
const router = express.Router();
router.post("/send/:id",protectedRoute,sendMessage);
router.get("/get/:id",protectedRoute,getMessages);
router.post("/ai-response",protectedRoute,main)
export default router;