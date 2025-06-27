import { Router } from "express";
import { createDepartment } from "../controllers/department/createDepartment.controller.js";
import { getAllDepartments } from "../controllers/department/getallDepartment.controller.js";
import { getDepartmentById } from "../controllers/department/getDepartmentById.controller.js";
import { deleteDepartment } from "../controllers/department/deleteDepartment.controller.js";
import { updateDepartment } from "../controllers/department/updateDepartment.controller.js";

const departmentRouter = Router(); 

    departmentRouter.route("/createdepartment").post(createDepartment);

    departmentRouter.route("/getalldepartments").get(getAllDepartments);

    departmentRouter.route("/getdepartmentbyid/:id").get(getDepartmentById);
    
    departmentRouter.route("/updatedepartment/:id").put(updateDepartment);
    
    departmentRouter.route("/deletedepartment/:id").delete(deleteDepartment);
    
export default departmentRouter