import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { OpenAI } from "openai";

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getAllChats = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const chats = await prisma.chat.findMany();
    return res
      .status(200)
      .json({ message: "Chats fetched successfully", chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const chat = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: "Invalid request body: 'messages' is required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const aiMessage = completion.choices[0].message;
    return res.status(200).json(aiMessage);
  } catch (error: any) {
    console.error("OpenAI Error:", error);

    if (error.status === 429 || error.code === "insufficient_quota") {
      return res.status(429).json({
        error: "Quota exceeded. Please check your OpenAI billing or plan.",
      });
    }

    return res.status(500).json({
      error: error.message || "Error communicating with OpenAI",
      details: error.response?.data || null,
    });
  }
};
