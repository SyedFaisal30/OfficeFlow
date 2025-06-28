import { Admin } from "../models/admins.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { generateAccessToken, generateRefreshToken } from "../services/jwt.js";

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new ApiError(400, false, "All fields are required"));
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(404).json(new ApiError(404, false, "Admin not found"));
  }

  if (admin.password !== password) {
    return res
      .status(401)
      .json(new ApiError(401, false, "Invalid Invalid Password"));
  }

  const accessToken = generateAccessToken(admin._id);
  const refreshToken = generateRefreshToken(admin._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Admin logged in successfully"
      )
    );
});
