export const validateWorkoutRequest = (req, res, next) => {
  const {
    age,
    gender,
    height,
    weight,
    fitness_level,
    goal
  } = req.body;

  if (
    age === undefined ||
    gender === undefined ||
    height === undefined ||
    weight === undefined ||
    fitness_level === undefined ||
    goal === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  if (age < 15 || age > 80) {
    return res.status(400).json({
      success: false,
      message: "Age must be between 15 and 80"
    });
  }

  if (height < 100 || height > 250) {
    return res.status(400).json({
      success: false,
      message: "Height must be between 100 and 250 cm"
    });
  }

  if (weight < 30 || weight > 250) {
    return res.status(400).json({
      success: false,
      message: "Weight must be between 30 and 250 kg"
    });
  }

  const validGoals = [
    "Muscle Gain",
    "Fat Loss",
    "Endurance"
  ];

  if (!validGoals.includes(goal)) {
    return res.status(400).json({
      success: false,
      message: "Invalid goal"
    });
  }

  const validLevels = [
    "Beginner",
    "Intermediate",
    "Advanced"
  ];

  if (!validLevels.includes(fitness_level)) {
    return res.status(400).json({
      success: false,
      message: "Invalid fitness level"
    });
  }

  next();
};