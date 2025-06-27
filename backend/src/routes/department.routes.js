import { Router } from "express";
import createDepartment from "../controllers/createdepartment.controller.js";
import { getAllDepartments } from "../controllers/getallDepartment.controller.js";
import { getDepartmentById } from "../controllers/getDepartmentById.controller.js";
import { deleteDepartment } from "../controllers/deleteDepartment.controller.js";
import { updateDepartment } from "../controllers/updateDepartment.controller.js";

const departmentRouter = Router(); 

    router.route("/createdepartment").post(createDepartment);

    router.route("/getalldepartments").get(getAllDepartments);

    router.route("/getdepartmentbyid/:id").get(getDepartmentById);
    
    router.route("/updatedepartment/:id").put(updateDepartment);
    
    router.route("/deletedepartment/:id").delete(deleteDepartment);
    
export default departmentRouter