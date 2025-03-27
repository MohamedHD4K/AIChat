import express, { Router } from "express";
import { chats } from "../controllers/chat.controller";

const router: Router = express.Router();

router.get("/chats", chats);

export default router;
