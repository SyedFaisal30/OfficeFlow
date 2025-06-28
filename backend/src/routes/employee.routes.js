import { Router } from "express";
import { createEmployee } from "../controllers/employee/createemployee.controller.js";
import { getAllEmployees } from "../controllers/employee/getAllEmployee.controller.js";
import { getEmployeeById } from "../controllers/employee/getEmployeeById.controller.js";
import { updateEmployee } from "../controllers/employee/updateEmployee.controller.js";
import { deleteEmployee } from "../controllers/employee/deleteEmployee.controller.js";
import { verifyJwt } from "../middlewares/verifyjwt.middlewares.js";

const employeeRouter = Router();

    employeeRouter.route("/createemployee").post(verifyJwt, createEmployee);

    employeeRouter.route("/getallemployees").get(verifyJwt, getAllEmployees);

    employeeRouter.route("/getemployeebyid/:id").get(verifyJwt, getEmployeeById);
    
    employeeRouter.route("/updateemployee/:id").put(verifyJwt, updateEmployee);
    
    employeeRouter.route("/deleteemployee/:id").delete(verifyJwt, deleteEmployee);
    
export default employeeRouter