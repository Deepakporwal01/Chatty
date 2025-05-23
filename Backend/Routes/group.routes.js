 import express from "express";
 import protectedRoute from "../Middleware/protectedRoute.middleware.js";
import { createGroup, getGroupMessages, getUserGroups } from "../Controllers/group.controller.js";
import { leaveGroup } from "../Controllers/group.controller.js";
 const router = express.Router();
 router.post("/createGroup",protectedRoute,createGroup);
 router.get("/getUserGroups",protectedRoute,getUserGroups);
 router.get("/:groupId/messages",protectedRoute,getGroupMessages);
 router.post("/leaveGroup/:groupId",protectedRoute,leaveGroup);
//  router.post("/ai-response",protectedRoute,main)
 
 export default router;