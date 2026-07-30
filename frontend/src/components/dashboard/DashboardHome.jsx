import { useAuth } from "../../context/AuthContext";
import StatCard from "./StatCard";

function DashboardHome({ setActivePage }) {
  const { user, latestWorkout } = useAuth();

  const bmi =
    user?.weight && user?.height
      ? (
          user.weight /
          Math.pow(user.height / 100, 2)
        ).toFixed(2)
      : "--";

  const macros = latestWorkout?.diet?.daily_macros;
  const progress = latestWorkout?.progress_prediction;

  return (
    <div className="space-y-8">
      {/* Welcome Card */}

      <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 dark:from-slate-800 dark:to-slate-900 p-8 shadow-lg">
        <h1 className="text-4xl font-bold text-white">
          Welcome Back, {user?.name} 👋
        </h1>

        <p className="mt-2 text-black dark:text-white">
          Stay consistent. Every workout gets you closer to your goal.
        </p>
      </div>

      {/* User Stats */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Goal"
          value={user?.goal || "--"}
          icon="🎯"
          color="bg-green-600"
        />

        <StatCard
          title="Weight"
          value={`${user?.weight || "--"} kg`}
          icon="⚖️"
          color="bg-blue-600"
        />

        <StatCard
          title="Height"
          value={`${user?.height || "--"} cm`}
          icon="📏"
          color="bg-purple-600"
        />

        <StatCard
          title="BMI"
          value={bmi}
          icon="🔥"
          color="bg-orange-500"
        />

        <StatCard
          title="Fitness Level"
          value={user?.activityLevel || "--"}
          icon="🏋️"
          color="bg-red-500"
        />
      </div>

      {/* Nutrition Overview */}

      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          🍽️ Nutrition Overview
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCard
            title="Calories"
            value={`${macros?.calories ?? "--"} kcal`}
            icon="🔥"
            color="bg-orange-500"
          />

          <StatCard
            title="Protein"
            value={`${macros?.protein ?? "--"} g`}
            icon="🍗"
            color="bg-blue-600"
          />

          <StatCard
            title="Carbs"
            value={`${macros?.carbs ?? "--"} g`}
            icon="🍚"
            color="bg-yellow-500"
          />

          <StatCard
            title="Fats"
            value={`${macros?.fats ?? "--"} g`}
            icon="🥑"
            color="bg-green-600"
          />
        </div>
      </div>

      {/* Progress Prediction */}

      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          📈 Progress Prediction
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Current Weight"
            value={`${progress?.current_weight ?? "--"} kg`}
            icon="⚖️"
            color="bg-gray-600"
          />

          <StatCard
            title="30 Days"
            value={`${progress?.predicted_weight_30_days ?? "--"} kg`}
            icon="📅"
            color="bg-indigo-600"
          />

          <StatCard
            title="60 Days"
            value={`${progress?.predicted_weight_60_days ?? "--"} kg`}
            icon="📈"
            color="bg-pink-600"
          />

          <StatCard
            title="90 Days"
            value={`${progress?.predicted_weight_90_days ?? "--"} kg`}
            icon="🚀"
            color="bg-emerald-600"
          />
        </div>
      </div>

      {/* AI Insights */}

      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          🧠 AI Recommendation
        </h2>

        {latestWorkout?.goal_analysis ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Recommended Goal
              </h3>

              <p className="text-xl font-bold text-green-600 dark:text-green-300">
                {latestWorkout.goal_analysis.recommended_goal}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Why this goal?
              </h3>

              <p className="text-gray-600 dark:text-slate-300">
                {latestWorkout.goal_analysis.reason}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Fitness Level
              </h3>

              <p className="text-gray-600 dark:text-slate-300">
                {latestWorkout.goal_analysis.fitness_level}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-slate-300">
            Generate a workout plan to receive AI insights.
          </p>
        )}
      </div>

      {/* Quick Actions */}

      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-800">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
          🚀 Quick Actions
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          <button
            onClick={() => setActivePage("workout")}
            className="rounded-xl bg-green-600 p-5 text-white transition hover:bg-green-700"
          >
            💪 Generate Workout
          </button>

          <button
            onClick={() => setActivePage("diet")}
            className="rounded-xl bg-blue-600 p-5 text-white transition hover:bg-blue-700"
          >
            🥗 View Diet
          </button>

          <button
            onClick={() => setActivePage("progress")}
            className="rounded-xl bg-purple-600 p-5 text-white transition hover:bg-purple-700"
          >
            📊 Track Progress
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;