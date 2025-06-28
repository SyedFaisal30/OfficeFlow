import { Router } from "express";
import { adminLogin, refreshAccessToken } from "../controllers/admin/adminlogin.controller.js";

const adminRouter = Router();

adminRouter.route("/login").post(adminLogin);

adminRouter.post("/refresh-token", refreshAccessToken);

export default adminRouter;