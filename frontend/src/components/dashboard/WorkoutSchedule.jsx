import { useState } from "react";
import {
  CheckCircle,
  Dumbbell,
  Eye,
} from "lucide-react";

import ExerciseModal from "./ExerciseModal";

function WorkoutSchedule({ recommendation }) {
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (!recommendation) return null;

  const { plan, schedule } = recommendation;

  // Automatically generate GIF path from exercise name
  const getGif = (exercise) => {
    const exerciseName = exercise
      .split(" - ")[0] // Remove sets/reps
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");

    return `/gifs/${exerciseName}.gif`;
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              🏋️ Weekly Workout Program
            </h2>

            <p className="text-gray-500 dark:text-slate-400 mt-1">
              Your AI-generated weekly training split
            </p>
          </div>

          <span className="mt-4 md:mt-0 bg-green-100 text-green-700 dark:bg-emerald-900 dark:text-emerald-200 px-5 py-2 rounded-full font-semibold">
            {plan}
          </span>
        </div>

        {/* Weekly Schedule */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Object.entries(schedule).map(([day, exercises]) => (
            <div
              key={day}
              className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:shadow-lg transition bg-slate-50 dark:bg-slate-800"
            >
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell
                  className="text-green-600 dark:text-emerald-300"
                  size={20}
                />

                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {day}
                </h3>
              </div>

              <div className="space-y-3">
                {exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <CheckCircle
                        className="text-green-500 dark:text-emerald-300 mt-1"
                        size={18}
                      />

                      <span className="text-slate-900 dark:text-slate-100">
                        {exercise}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        setSelectedExercise(exercise)
                      }
                      className="ml-3 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-800 transition"
                      title="View Exercise"
                    >
                      <Eye
                        className="text-blue-600 dark:text-sky-300"
                        size={20}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Exercise Modal */}
      <ExerciseModal
        exercise={selectedExercise}
        gif={
          selectedExercise
            ? getGif(selectedExercise)
            : ""
        }
        onClose={() => setSelectedExercise(null)}
      />
    </>
  );
}

export default WorkoutSchedule;
