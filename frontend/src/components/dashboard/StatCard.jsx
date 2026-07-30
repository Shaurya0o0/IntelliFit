function StatCard({
  title,
  value,
  icon,
  color = "bg-green-500",
}) {
  const badgeTitles = ["Goal", "Fitness Level"];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-slate-100 dark:border-slate-700">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">
            {title}
          </p>

          {badgeTitles.includes(title) ? (
            <span className="inline-block mt-4 px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-emerald-900 dark:text-emerald-200 font-semibold text-lg">
              {value}
            </span>
          ) : (
            <h2 className="text-4xl font-bold mt-3 text-gray-900 dark:text-slate-100">
              {value}
            </h2>
          )}
        </div>

        <div
          className={`${color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl shadow-md`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default StatCard;
