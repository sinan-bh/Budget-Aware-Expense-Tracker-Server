import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;

export const generateAccessToken = async (userPayload) => {
  return jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};
export const generateRefreshToken = async (userPayload) => {
  return jwt.sign(userPayload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyRefreshToken = async (refreshToken) => {
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) ;
};
