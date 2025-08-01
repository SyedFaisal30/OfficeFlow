import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

export const verifyJwt = (req, res, next) => {
  const token = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json(new ApiError(401, false, "Token not found or unAuthorized"));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.admin = decoded.adminId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(
        new ApiError(401, false, "Invalid or expired token. Access denied.")
      );
  }
};
