import { Employee } from "../../models/employee.model.js";
import { Department } from "../../models/department.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";

export const createEmployee = asyncHandler(async (req, res) => {
    const { name, email, jobTitle, department, supervisor, location } = req.body;

    if (!name || !email || !jobTitle || !department || !location) {
        return res
            .status(400)
            .json(new ApiError(400, false, "All fields are required"));
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return res
            .status(409)
            .json(new ApiError(409, false, "Employee already exists"));
    }

    const Dept = await Department.findById(department);
    if (!Dept) {
        return res
            .status(404)
            .json(new ApiError(404, false, "Department not found"));
    }

    const employee = await Employee.create({
        name,
        email,
        jobTitle,
        department,
        supervisor,
        location,
    });     

    return res
        .status(201)
        .json(new ApiResponse(201, employee, "Employee created successfully"));
});