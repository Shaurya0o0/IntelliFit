import { X } from "lucide-react";

const ExerciseModal = ({ exercise, gif, onClose }) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-slate-800"
        >
          <X size={20} />
        </button>

        {/* Exercise Name */}
        <h2 className="mb-4 text-2xl font-bold text-center text-slate-900 dark:text-slate-100">{exercise}</h2>

        {/* GIF */}
        <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <img
            src={gif}
            alt={exercise}
            className="w-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/gifs/not_found.gif";
            }}
          />
        </div>

        {/* Tips */}
        <div className="mt-5">
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">Tips</h3>

          <ul className="list-disc pl-5 text-gray-700 dark:text-slate-300 space-y-1">
            <li>Perform every rep with control.</li>
            <li>Use a full range of motion.</li>
            <li>Maintain proper posture throughout.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseModal;

