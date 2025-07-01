import { Admin } from "../../models/admins.models.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { ApiError } from "../../utils/apiError.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  path: "/",
};

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

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, false, "Invalid password"));
  }

  const accessToken = generateAccessToken(admin._id);
  const refreshToken = generateRefreshToken(admin._id);

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: 24 * 60 * 60 * 1000,
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

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json(new ApiError(401, false, "Refresh token missing"));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const adminId = decoded.adminId;
    const newAccessToken = generateAccessToken(adminId);

    res.cookie("accessToken", newAccessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    return res
      .status(403)
      .json(new ApiError(403, false, "Invalid or expired refresh token"));
  }
});

export const adminLogout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
    ...cookieOptions,
  });

  res.clearCookie("refreshToken", {
    ...cookieOptions,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Admin logged out successfully"));
});
