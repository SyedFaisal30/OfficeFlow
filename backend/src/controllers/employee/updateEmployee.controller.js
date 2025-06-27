import { Employee } from "../../models/employee.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";

export const updateEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if(!employee) {
        return res
            .status(404)
            .json(new ApiError(404, false, "Employee not found"));
    }

    const { name, email, jobTitle, department, supervisor, location } = req.body;

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.jobTitle = jobTitle || employee.jobTitle;
    employee.department = department || employee.department;
    employee.supervisor = supervisor || employee.supervisor;
    employee.location = location || employee.location;

    await employee.save();

    return res
        .status(200)
        .json(new ApiResponse(200, employee, "Employee updated successfully"));
})