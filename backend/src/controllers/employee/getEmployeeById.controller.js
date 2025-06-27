import { Employee } from "../../models/employee.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";     
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";

export const getEmployeeById = asyncHandler(async (req, res ) => {
    
    const employee = await Employee.findById(req.params.id)
        .populate("department")
        .populate("supervisor");

    if (!employee) {
        return res
            .status(404)
            .json(new ApiError(404, false, "Employee not found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, employee, "Employee found successfully"));
});