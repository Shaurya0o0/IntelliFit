import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Workout Recommendation API",
    status: "Running"
  });
});

export default router;