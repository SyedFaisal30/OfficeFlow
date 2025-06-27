import { Department } from "../../models/department.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

export const getAllDepartments = asyncHandler(async (req, res) => {
    const departments = await Department.find();
    return res
        .status(200)
        .json(new ApiResponse(200, departments, "Departments fetched successfully"));
});