import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import workoutRoutes from "./routes/workoutRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // React/Vite
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Fitness Recommendation API Running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);
app.use("/api/health", healthRoutes);

export default app;