import { Department } from "../models/department.model";
import { asyncHandler } from "../utils/Asynchandler";
import { ApiResponse } from "../utils/ApiResponse";

export const getAllDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find();
    return res
        .status(200)
        .json(new ApiResponse(200, departments, "Departments fetched successfully"));
});