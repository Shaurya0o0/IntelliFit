import express from "express";
import cors from "cors";

import workoutRoutes from "./routes/workoutRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Fitness Recommendation API Running"
  });
});

app.use("/api/workout", workoutRoutes);
app.use("/api/health", healthRoutes);

export default app;