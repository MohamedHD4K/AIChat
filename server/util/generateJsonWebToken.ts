import { Response } from "express";
import jwt from "jsonwebtoken";

const generateJsonWebToken = (
  res: Response,
  userId: string,
  username: string,
  role: string
) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const payload = { id: userId, username, role };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token expires in 30 days
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
  } catch (error) {
    console.error("Error generating JWT:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default generateJsonWebToken;
