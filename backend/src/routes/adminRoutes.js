import express from "express";
import { signup } from "../controllers/adminController.js";
import { adminAuth } from "../middleware/adminAuthMiddleware.js";

const adminRouter = express.Router();

adminRouter.post("/create", adminAuth, signup);
// adminRouter.post("/update-message-status",ebAuth,)
export default adminRouter;
