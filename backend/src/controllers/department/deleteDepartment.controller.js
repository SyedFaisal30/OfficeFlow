import { Department } from "../../models/department.model";
import { asyncHandler } from "../../utils/Asynchandler";
import { ApiError } from "../../utils/ApiError";   
import { ApiResponse } from "../../utils/ApiResponse";

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