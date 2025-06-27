import { Department } from "../../models/department.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";


export const updateDepartment = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res
            .status(400)
            .json(new ApiError(400, false, "Invalid department ID"));
    }

    const department = await Department.findById(req.params.id);

    if (!department) {
        return res
            .status(404)
            .json(new ApiError(404, false, "Department not found"));
    }

    if (name && name !== department.name) {
        const duplicate = await Department.findOne({ name });
        if (duplicate) {
            return res
                .status(409)
                .json(new ApiError(409, false, "Department name already exists"));
        }
    }

    department.name = name || department.name;
    department.description = description || department.description;

    await department.save();

    return res
        .status(200)
        .json(new ApiResponse(200, department, "Department updated successfully"));
});
