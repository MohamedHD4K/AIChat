import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const userRole = role ? Role.ADMIN : Role.USER;

    const user = await prisma.user.create({
      data: { username, email, password, role: userRole },
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error", error });
  } finally {
    await prisma.$disconnect();
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json({ message: "Users fetched successfully", users });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
