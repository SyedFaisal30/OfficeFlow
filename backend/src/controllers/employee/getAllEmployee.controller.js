import { Employee } from "../../models/employee.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";

export const getAllEmployees = asyncHandler(async (req, res) => {
  const { search, department, jobTitle, page = 1, limit = 10 } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (department) filter.department = department;
  if (jobTitle) filter.jobTitle = jobTitle;

  const skip = (page - 1) * limit;

  const employees = await Employee.find(filter)
    .populate("department")
    .populate("supervisor")
    .skip(skip)
    .limit(Number(limit));

  const total = await Employee.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      employees,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    })
  );
});
