import bcrypt from "bcryptjs";
import User from "../model/userSchema.js";
import { createErrorLog, createInfoLog } from "../utils/serviceLoggers.js";
import customError from "../../config/customError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const signupService = async (userData) => {
  const { email, password } = userData;

  const exists = await User.findOne({ email });
  if (exists) return { message: "Email already used" };

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash });

  return { message: "Signup success" };
};

export const loginService = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });
  if (!user) return { message: "User not found" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { message: "Wrong password" };
  const payload = {
    id: user._id,
    email: user.email,
  };

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  return {
    message: "Login successful ",
    cookies: [
      {
        name: "accessToken",
        value: accessToken,
        options: {
          httpOnly: true,
          secure: true, // REQUIRED for HTTPS
          sameSite: "none", // REQUIRED for cross-domain
          maxAge: 15 * 60 * 1000,
        },
      },
      {
        name: "refreshToken",
        value: refreshToken,
        options: {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
      },
    ],
  };
};

export const createAccessTokenServices = async (refreashToken) => {
  const response = await verifyRefreshToken(refreashToken);
  const { id, email } = response;
  const payload = {
    id,
    email,
  };
  if (response) {
    const newAccessToken = await generateAccessToken(payload);
    createInfoLog("AccessToken created", "auth.refresh-access-token");
    return {
      cookies: [
        {
          name: "accessToken",
          value: newAccessToken,
          options: { maxAge: 15 * 60 * 1000 },
        },
      ],
    };
  } else {
    createErrorLog("AccessToken created", "auth.refresh-access-token");
    return customError(403, "Access token creation failed");
  }
};

export const logoutServices = async (res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  return { message: "Logged out successfully" };
};
