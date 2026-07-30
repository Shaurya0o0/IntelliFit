import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import MobileSidebar from "../components/dashboard/MobileSidebar";
import DashboardHome from "../components/dashboard/DashboardHome";
import WorkoutDashboard from "../components/dashboard/WorkoutDashboard";
import NutritionCard from "../components/dashboard/NutritionCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import MealPlanCard from "../components/dashboard/MealPlanCard";
import Profile from "../components/profile/Profile";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { latestWorkout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const diet = latestWorkout?.diet;
  const progress = latestWorkout?.progress_prediction;
  const bodyGoal = latestWorkout?.body_goal;

  const pageLabels = {
    dashboard: "Dashboard",
    workout: "Workout",
    diet: "Diet",
    progress: "Progress",
    profile: "Profile",
  };

  return (
    <div className="bg-slate-100 dark:bg-slate-900 dark:text-slate-100 min-h-screen">
      <div className="md:hidden bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-slate-700 dark:text-slate-100 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          ☰
        </button>

        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold">
            {pageLabels[activePage]}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            IntelliFit mobile dashboard
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="text-slate-700 dark:text-slate-100 rounded-full bg-slate-100 dark:bg-slate-800 p-2"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <MobileSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content */}

      <main className="md:ml-60 min-h-screen overflow-y-auto px-4 py-6 md:px-8 md:py-8">
        {/* Dashboard */}

        {activePage === "dashboard" && (
          <DashboardHome setActivePage={setActivePage} />
        )}

        {/* Workout */}

        {activePage === "workout" && (
          <WorkoutDashboard />
        )}

        {/* Diet */}

        {activePage === "diet" && (
          <div className="space-y-8 mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                🥗 Diet Planner
              </h1>

              <p className="text-gray-500 dark:text-slate-300 mt-3 max-w-2xl">
                Your personalized nutrition and meal plan are generated
                from your latest AI recommendation. Review your daily macro
                targets and meal breakdown below.
              </p>
            </div>

            {!diet ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
                <p className="text-gray-500 dark:text-slate-300">
                  No diet recommendation is available yet. Generate a workout
                  recommendation from the Workout page to unlock your diet plan.
                </p>
              </div>
            ) : (
              <>
                <NutritionCard diet={diet} />
                <MealPlanCard diet={diet} bodyGoal={bodyGoal} />
              </>
            )}
          </div>
        )}

        {/* Progress */}

        {activePage === "progress" && (
          <div className="space-y-8 mt-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                📈 Progress Tracker
              </h1>

              <p className="text-gray-500 dark:text-slate-300 mt-3 max-w-2xl">
                Track your current and predicted weight progress over time.
                The AI prediction is powered by your current goal and body data.
              </p>
            </div>

            {!progress ? (
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
                <p className="text-gray-500 dark:text-slate-300">
                  Progress predictions are not available yet. Generate a workout
                  recommendation first to see your weight forecast.
                </p>
              </div>
            ) : (
              <ProgressCard progress={progress} />
            )}
          </div>
        )}

        {/* Profile */}

        {activePage === "profile" && (
          <Profile />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
