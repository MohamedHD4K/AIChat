import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllChats = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const chats = await prisma.chat.findMany();

    return res
      .status(201)
      .json({ message: "User created successfully", chats });
  } catch (error) {
    console.error("Error in signup controller:", error);
    return res.status(500).json({ message: "Internal server error", error });
  } finally {
    await prisma.$disconnect();
  }
};
