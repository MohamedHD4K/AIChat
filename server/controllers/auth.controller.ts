import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateJsonWebToken from "../util/generateJsonWebToken";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userRole = role ? Role.ADMIN : Role.USER;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword, role: userRole },
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
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    const deHashedPassword = await bcrypt.compare(password, user.password);
    if (!deHashedPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    generateJsonWebToken(res, user.id, user.username, user.role);

    return res.status(200).json({ message: "Logged in successfully", user });
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error", error });
  } finally {
    await prisma.$disconnect();
  }
};
