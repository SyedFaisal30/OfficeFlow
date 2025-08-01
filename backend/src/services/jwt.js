import jwt from "jsonwebtoken";

export const generateAccessToken = (adminId) => {
  return jwt.sign(
    { adminId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = (adminId) => {
  return jwt.sign(
    { adminId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
};