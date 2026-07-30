function GoalAnalysisCard({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
        🧠 AI Goal Analysis
      </h2>

      <div className="space-y-6">

        {/* Recommended Goal */}

        <div className="bg-green-50 dark:bg-slate-800 border-l-4 border-green-500 rounded-lg p-5">
          <p className="text-gray-500 dark:text-slate-300 text-sm">
            Recommended Goal
          </p>

          <h3 className="text-2xl font-bold text-green-700 dark:text-green-300 mt-2">
            {analysis.goal}
          </h3>
        </div>

        {/* Reason */}

        <div>
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
            Why this goal?
          </h3>

          <p className="text-gray-600 dark:text-slate-300 leading-7">
            {analysis.reason}
          </p>
        </div>

        {/* Recommendation */}

        <div>
          <h3 className="font-semibold text-lg mb-2 text-slate-900 dark:text-slate-100">
            AI Recommendation
          </h3>

          <p className="text-gray-600 dark:text-slate-300 leading-7">
            {analysis.recommendation}
          </p>
        </div>

      </div>
    </div>
  );
}

export default GoalAnalysisCard;
