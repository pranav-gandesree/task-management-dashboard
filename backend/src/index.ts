import express, { Request, Response } from "express";

import connectDb from "./config";

import authRoutes from "./routes/authRoute";
import taskRoutes from "./routes/taskRoute";

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";

const app = express();

dotenv.config();

app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, async () => {
  await connectDb();
  console.log(`Server is running on port ${port}`);
});
