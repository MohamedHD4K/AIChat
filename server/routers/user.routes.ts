import express, { Router } from "express";
import { login, signup } from "../controllers/user.controller";

const router: Router = express.Router();

router.get("/login", login);

router.post("signup", signup);

export default router;
