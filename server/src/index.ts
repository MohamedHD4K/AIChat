import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "../routers/auth.routes";
import chatRoutes from "../routers/chat.routes";
import userRoutes from "../routers/user.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security middleware
app.use(morgan("dev")); // Logger middleware
app.use(express.json({ limit: "5mb" })); // Request body parser
app.use(bodyParser.json());
app.use(cookieParser()); // Parse cookies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data
app.use(cors({ origin: "http://localhost:4000", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
