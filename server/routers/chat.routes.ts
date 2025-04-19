import express, { Router } from "express";
import { getAllChats, chat } from "../controllers/chat.controller";

const router: Router = express.Router();

router.post("/", chat);

router.get("/chats", getAllChats);

export default router;
