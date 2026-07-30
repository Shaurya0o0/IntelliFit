function DashboardHeader({ user, result }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-3xl bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 shadow-xl p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        {/* Left */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome Back, {user?.name} 👋
          </h1>

          <p className="mt-2 text-black dark:text-white">
            Stay consistent. Every workout gets you closer to your goal.
          </p>
        </div>

        {/* Right */}
        <div className="mt-6 md:mt-0 text-right">
          <p className="text-green-100 dark:text-slate-300">
            {today}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {result?.body_goal || user?.goal}
          </h2>
        </div>

      </div>
    </div>
  );
}

export default DashboardHeader;