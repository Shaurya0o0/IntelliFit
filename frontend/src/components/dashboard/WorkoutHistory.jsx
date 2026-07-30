import { Trash2, Calendar, Dumbbell, Target } from "lucide-react";

function WorkoutHistory({ history, onDelete }) {
  if (!history?.length) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
        📜 Workout History
      </h2>

      <div className="space-y-4">

        {history.map((item) => (

          <div
            key={item._id}
            className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl p-5 hover:shadow-md transition"
          >
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">

              <div className="space-y-3">

                <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                  <Calendar size={18} />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <Target className="text-purple-600 dark:text-purple-300" size={18} />
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.workoutData.body_goal|| "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Dumbbell className="text-green-600 dark:text-emerald-300" size={18} />
                  <span className="text-slate-900 dark:text-slate-100">
                    {item.workoutData.recommendation.plan || "N/A"}
                  </span>
                </div>

              </div>

              <button
                onClick={() => onDelete(item._id)}
                className="mt-5 lg:mt-0 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                <Trash2 size={18} />
                Delete
              </button>

            </div>
          </div>

        ))}

      </div>
    </div>
  );
}

export default WorkoutHistory;
