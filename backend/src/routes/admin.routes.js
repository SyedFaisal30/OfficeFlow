import { Router } from "express";
import { adminLogin, refreshAccessToken } from "../controllers/admin/adminlogin.controller.js";
import { adminLogout } from "../controllers/admin/adminLogout.controller.js";
const adminRouter = Router();

adminRouter.route("/login").post(adminLogin);

adminRouter.post("/refresh-token", refreshAccessToken);

adminRouter.route("/logout").post(adminLogout);

export default adminRouter;