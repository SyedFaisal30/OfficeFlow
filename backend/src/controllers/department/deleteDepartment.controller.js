import { Department } from "../../models/department.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";   
import { ApiResponse } from "../../utils/apiResponse.js";

export const deleteDepartment = asyncHandler(async (req, res) => {

    const department = await Department.findById(req.params.id);

    if (!department) {
        return res
            .status(404)
            .json(new ApiError(404, false, "Department not found"));
    }

    await department.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, null, "Department deleted successfully"));
});