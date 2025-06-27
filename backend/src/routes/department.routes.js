import { Router } from "express";
import { createDepartment } from "../controllers/department/createDepartment.controller.js";
import { getAllDepartments } from "../controllers/department/getallDepartment.controller.js";
import { getDepartmentById } from "../controllers/department/getDepartmentById.controller.js";
import { deleteDepartment } from "../controllers/department/deleteDepartment.controller.js";
import { updateDepartment } from "../controllers/department/updateDepartment.controller.js";

const departmentRouter = Router(); 

    router.route("/createdepartment").post(createDepartment);

    router.route("/getalldepartments").get(getAllDepartments);

    router.route("/getdepartmentbyid/:id").get(getDepartmentById);
    
    router.route("/updatedepartment/:id").put(updateDepartment);
    
    router.route("/deletedepartment/:id").delete(deleteDepartment);
    
export default departmentRouter