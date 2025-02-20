import express from "express";
import { getUsersForSidebar } from "../Controllers/user.Controller.js";
import protectedRoute from "../Middleware/protectedRoute.middleware.js";
const router = express.Router();
router.get("/users", protectedRoute, getUsersForSidebar);
export default router;