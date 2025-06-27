import { Router } from "express";
import { createEmployee } from "../controllers/employee/createemployee.controller.js";
import { getAllEmployees } from "../controllers/employee/getAllEmployee.controller.js";
import { getEmployeeById } from "../controllers/employee/getEmployeeById.controller.js";
import { updateEmployee } from "../controllers/employee/updateEmployee.controller.js";
import { deleteEmployee } from "../controllers/employee/deleteEmployee.controller.js";

const employeeRouter = Router();

    employeeRouter.route("/createemployee").post(createEmployee);

    employeeRouter.route("/getallemployees").get(getAllEmployees);

    employeeRouter.route("/getemployeebyid/:id").get(getEmployeeById);
    
    employeeRouter.route("/updateemployee/:id").put(updateEmployee);
    
    employeeRouter.route("/deleteemployee/:id").delete(deleteEmployee);
    
export default employeeRouter