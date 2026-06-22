import express from "express";
import { getWorkoutRecommendation } from "../controllers/workoutController.js";

const router = express.Router();

router.post(
  "/recommend",
  getWorkoutRecommendation
);

export default router;