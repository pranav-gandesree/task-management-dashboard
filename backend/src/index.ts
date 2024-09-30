import  express from "express";
import connectDb from './config'
import dotenv from 'dotenv'
import cors from 'cors'

import taskRoutes from './routes/taskRoute'
import authRoutes from './routes/authRoute'

// Load environment variables
dotenv.config();

const app = express();

// Middleware setup
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const port = process.env.PORT || 4000;


// JSON body parser
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start the server
app.listen(port, async () => {
  await connectDb();
  console.log(`Server is running on port ${port}`);
});
