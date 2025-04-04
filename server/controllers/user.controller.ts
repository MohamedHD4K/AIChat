import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const allUsers = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.error("Error in allUsers controller:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const me = async (
  req: AuthRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const user = req.user;

    const userData = await prisma.user.findUnique({
      where: { username: user?.username },
    });

    return res.status(200).json({ message: "OK", userData });
  } catch (error) {
    console.error("Error in getAllUsers controller:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const user = async (
  req: AuthRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const username = req.params.username;

    const userData = await prisma.user.findUnique({
      where: { username },
    });

    return res.status(200).json({ message: "OK", userData });
  } catch (error) {
    console.error("Error in getAllUsers controller:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
