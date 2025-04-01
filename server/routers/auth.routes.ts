import express, { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import { loginValidation, signupValidation, validate } from "../middleware/validators";

const router: Router = express.Router();

router.post("/login", validate(loginValidation), login);
router.post("/signup", validate(signupValidation), signup);

export default router;
