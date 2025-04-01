import express, { Router } from "express";
import { getAllChats } from "../controllers/chat.controller";

const router: Router = express.Router();

router.get("/chats", getAllChats);

export default router;
