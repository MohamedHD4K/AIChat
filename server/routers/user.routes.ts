import express, { Router } from "express";
import { allUsers, me, user } from "../controllers/user.controller";
import protectedEndPoint from "../middleware/protectedEndPoint";

const router : Router = express.Router();

router.get("/", allUsers);

router.get("/me", protectedEndPoint, me);

router.get("/:username", user);

export default router;
