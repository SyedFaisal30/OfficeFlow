import { Router } from "express";
import { adminLogin } from "../controllers/adminlogin.controller.js";

const adminRouter = Router();

adminRouter.route("/login").post(adminLogin);

export default adminRouter;