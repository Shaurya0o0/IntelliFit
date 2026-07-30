import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import WorkoutSchedule from "../dashboard/WorkoutSchedule";
import GoalAnalysisCard from "../dashboard/GoalAnalysisCard";
import ProfileSummary from "../dashboard/ProfileSummary";
import BMIChartCard from "../dashboard/BMIChartCard";

import DashboardHeader from "../dashboard/DashboardHeader";
import StatCard from "../dashboard/StatCard";

import SkeletonLoader from "../SkeletonLoader";
import WorkoutHistory from "../dashboard/WorkoutHistory";

import {
  getWorkoutRecommendation,
  getLatestWorkout,
  getWorkoutHistory,
  deleteWorkout,
} from "../../api/workoutApi";

import { useAuth } from "../../context/AuthContext";

function WorkoutDashboard() {
  const {
    user,
    setLatestWorkout,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // ==========================
  // Load History
  // ==========================

  const loadHistory = async () => {
    try {
      const response = await getWorkoutHistory();
      setHistory(response.history || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ==========================
  // Load Latest Workout
  // ==========================

  const loadLatestWorkout = async () => {
    try {
      const response = await getLatestWorkout();

      setResult(response);

      // Update global context
      setLatestWorkout(response);
      console.log("Saved workout:", response);

    } catch (error) {
      if (error.response?.status !== 404) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    loadLatestWorkout();
    loadHistory();
  }, []);

  // ==========================
  // Delete Workout
  // ==========================

  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);

      toast.success("Workout deleted");

      await loadHistory();
      await loadLatestWorkout();

    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ==========================
  // Generate Workout
  // ==========================

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const response = await getWorkoutRecommendation();

      setResult(response);

      // Update global context
      setLatestWorkout(response);

      await loadHistory();

      toast.success("AI Workout Generated Successfully!");

    } catch (error) {
      console.error(error);

      toast.error("Failed to generate workout");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      <DashboardHeader
        user={user}
        result={result}
      />

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="
            bg-green-600 dark:bg-emerald-500
            hover:bg-green-700 dark:hover:bg-emerald-600
            text-white
            px-10
            py-4
            rounded-xl
            text-lg
            font-semibold
            transition
            disabled:opacity-50
          "
        >
          {loading
            ? "Generating..."
            : result
            ? "🔄 Generate New Workout"
            : "🔥 Generate AI Workout"}
        </button>
      </div>

      {/* Quick Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="BMI"
          value={result?.bmi ?? "--"}
          icon="📏"
          color="bg-blue-500"
        />

        <StatCard
          title="Goal"
          value={result?.body_goal ?? user?.goal}
          icon="🎯"
          color="bg-purple-500"
        />

        <StatCard
          title="Calories"
          value={
            result?.diet?.daily_macros?.calories
              ? `${result.diet.daily_macros.calories} kcal`
              : "--"
          }
          icon="🔥"
          color="bg-orange-500"
        />

        <StatCard
          title="Workout"
          value={result?.recommendation?.plan ?? "--"}
          icon="💪"
          color="bg-green-500"
        />

      </div>

      {/* Profile */}

      <div className="grid lg:grid-cols-2 gap-6">

        <ProfileSummary
          user={user}
          bmi={result?.bmi}
          bodyGoal={result?.body_goal}
        />

        <GoalAnalysisCard
          analysis={result?.goal_analysis}
        />

      </div>

      <BMIChartCard bmi={result?.bmi} />

      <WorkoutSchedule
        recommendation={result?.recommendation}
      />

      <WorkoutHistory
        history={history}
        onDelete={handleDelete}
      />

      {loading && <SkeletonLoader />}

      {!loading && !result && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            No Workout Found
          </h2>

          <p className="text-gray-500 dark:text-slate-400 mt-2">
            Generate your first AI workout.
          </p>
        </div>
      )}

    </div>
  );
}

export default WorkoutDashboard;
