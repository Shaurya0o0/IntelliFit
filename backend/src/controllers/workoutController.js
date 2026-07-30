import { spawn } from "child_process";
import path from "path";
import User from "../models/User.js";
import WorkoutHistory from "../models/WorkoutHistory.js";

const ML_PATH = path.join(process.cwd(), "machine_learning");

// ======================================
// PYTHON HELPER
// ======================================

const runPython = (script, args = []) => {
  return new Promise((resolve, reject) => {
    // Convert to an absolute path
    const scriptPath = path.resolve(script);

    const pythonProcess = spawn("python", [scriptPath, ...args.map(String)]);

    let output = "";
    let error = "";

    pythonProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      error += data.toString();
    });

    pythonProcess.on("error", (err) => {
      reject(err);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(error || `Python script failed with exit code ${code}`),
        );
      }

      try {
        resolve(JSON.parse(output.trim()));
      } catch (err) {
        reject(
          new Error(
            `Invalid JSON returned from ${scriptPath}\nOutput:\n${output}`,
          ),
        );
      }
    });
  });
};

// ======================================
// GENERATE WORKOUT
// ======================================

export const getWorkoutRecommendation = async (req, res) => {
  try {
    // =============================
    // FETCH USER
    // =============================

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { age, gender, height, weight, goal, activityLevel, diet } = user;

    const fitness_level = activityLevel;

    // =============================
    // BMI
    // =============================

    const bmi = Number((weight / ((height / 100) * (height / 100))).toFixed(2));

    // =============================
    // WORKOUT RECOMMENDATION
    // =============================

    const recommendation = await runPython(
      "../machine_learning/recommend.py",

      [age, gender, bmi, fitness_level, goal],
    );

    // =============================
    // BODY GOAL
    // =============================

    const bodyGoal = await runPython(
      "../machine_learning/body_goal.py",

      [bmi, fitness_level],
    );

    // =============================
    // STOP HERE
    // PART 2 STARTS FROM GOAL
    // EXPLANATION
    // =============================
    // =============================
    // GOAL EXPLANATION
    // =============================

    const goalAnalysis = await runPython(
      "../machine_learning/goal_explanation.py",

      [bmi, fitness_level, bodyGoal.body_goal],
    );

    // =============================
    // DIET RECOMMENDATION
    // =============================

    const dietPlan = await runPython("../machine_learning/diet_recommend.py", [
      age,
      gender,
      height,
      weight,
      activityLevel,
      goal,
      diet || "Non-Veg",
    ]);

    // =============================
    // PROGRESS PREDICTION
    // =============================

    const progressPrediction = await runPython(
      "../machine_learning/progress_predictor.py",

      [weight, bodyGoal.body_goal],
    );

    // =============================
    // RESPONSE OBJECT
    // =============================

    const result = {
      success: true,

      bmi,

      body_goal: bodyGoal.body_goal,

      goal_analysis: goalAnalysis,

      user: {
        name: user.name,

        email: user.email,

        age,

        gender,

        height,

        weight,

        fitness_level,

        goal,
        
        diet: diet || "Non-Veg",
      },

      recommendation,

      diet: dietPlan,

      progress_prediction: progressPrediction,
    };

    // =============================
    // SAVE TO HISTORY
    // =============================

    await WorkoutHistory.create({
      userId: user._id,

      workoutData: result,
    });

    // =============================
    // RETURN RESPONSE
    // =============================

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// ======================================
// GET LATEST WORKOUT
// ======================================

export const getLatestWorkout = async (req, res) => {
  try {
    const latestWorkout = await WorkoutHistory.findOne({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    if (!latestWorkout) {
      return res.status(404).json({
        success: false,
        message: "No workout history found",
      });
    }

    return res.status(200).json({
      ...latestWorkout.workoutData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET WORKOUT HISTORY
// ======================================

export const getWorkoutHistory = async (req, res) => {
  try {
    const history = await WorkoutHistory.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,

      count: history.length,

      history,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// GET SINGLE WORKOUT
// ======================================

export const getWorkoutById = async (req, res) => {
  try {
    const workout = await WorkoutHistory.findOne({
      _id: req.params.id,

      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({
        success: false,

        message: "Workout not found",
      });
    }

    return res.status(200).json({
      success: true,

      workout,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// DELETE WORKOUT
// ======================================

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await WorkoutHistory.findOneAndDelete({
      _id: req.params.id,

      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({
        success: false,

        message: "Workout not found",
      });
    }

    return res.status(200).json({
      success: true,

      message: "Workout deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
