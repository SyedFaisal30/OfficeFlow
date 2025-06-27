import { Department } from "../../models/department.model";
import { asyncHandler } from "../../utils/Asynchandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";

export const getDepartmentById = asyncHandler(async (req, res) => {
    const dept = await Department.findById(req.params.id);

    if (!dept){
        return res
            .status(404)
            .json(new ApiError(404, false, "Department not found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, dept, "Department Found successfully"));
});