import { Department } from "../models/department.model";
import { asyncHandler } from "../utils/Asynchandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

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