import express from "express";

import {

  getWorkoutRecommendation,
  getLatestWorkout,
  getWorkoutHistory,
  getWorkoutById,
  deleteWorkout

} from "../controllers/workoutController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/generate",
  authMiddleware,
  getWorkoutRecommendation
);

router.get(
  "/latest",
  authMiddleware,
  getLatestWorkout
);

router.get(
  "/history",
  authMiddleware,
  getWorkoutHistory
);

router.get(
  "/:id",
  authMiddleware,
  getWorkoutById
);

router.delete(
  "/:id",
  authMiddleware,
  deleteWorkout
);

export default router;