import { Router } from "express";
import { adminLogin } from "../controllers/adminlogin.conytroller.js";
import { verifyJwt } from "../middlewares/verifyjwt.middlewares.js";

const adminRouter = Router();

adminRouter.route("/login").post(verifyJwt, adminLogin);

export default adminRouter;