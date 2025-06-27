import { Department } from "../../models/department.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";

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