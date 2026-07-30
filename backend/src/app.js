import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import workoutRoutes from "./routes/workoutRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://intelli-fit-psi.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fitness Recommendation API Running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/health", healthRoutes);

export default app;