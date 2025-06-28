import { Router } from "express";
import { createDepartment } from "../controllers/department/createDepartment.controller.js";
import { getAllDepartments } from "../controllers/department/getallDepartment.controller.js";
import { getDepartmentById } from "../controllers/department/getDepartmentById.controller.js";
import { deleteDepartment } from "../controllers/department/deleteDepartment.controller.js";
import { updateDepartment } from "../controllers/department/updateDepartment.controller.js";
import { verifyJwt } from "../middlewares/verifyjwt.middlewares.js";

const departmentRouter = Router(); 

    departmentRouter.route("/createdepartment").post(verifyJwt, createDepartment);

    departmentRouter.route("/getalldepartments").get(verifyJwt, getAllDepartments);

    departmentRouter.route("/getdepartmentbyid/:id").get(verifyJwt, getDepartmentById);
    
    departmentRouter.route("/updatedepartment/:id").put(verifyJwt, updateDepartment);
    
    departmentRouter.route("/deletedepartment/:id").delete(verifyJwt, deleteDepartment);
    
export default departmentRouter