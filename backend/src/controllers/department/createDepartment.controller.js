import { Department } from "../../models/department.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";

export const createDepartment = asyncHandler(async (req, res) => {
    const{ name, description } = req.body;

    if (!name ){ 
        return res
            .status(400)
            .json(new ApiError(400, false, "Department name is required"));
    };
    
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment){
        return res
            .status(400)
            .json( new ApiError(400, false, "Department already exists"));
    };

    const department = await Department.create({ name, description });
    return res
        .status(201)
        .json(new ApiResponse(201, department, "Department created successfully"));
});