import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

export const generateAccessToken = async (userPayload) => {
  return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
export const generateRefreshToken = async (userPayload) => {
  return jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

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
        options: { maxAge: 15 * 60 * 1000 },
      },
      {
        name: "refreshToken",
        value: refreshToken,
        options: { maxAge: 7 * 24 * 60 * 60 * 1000 },
      },
    ],
  };
};
