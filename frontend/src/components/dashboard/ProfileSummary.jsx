function ProfileSummary({ user, bmi, bodyGoal }) {
  if (!user) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

        {/* Left */}

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {user.name}
            </h2>

            <p className="text-gray-500 dark:text-slate-400 mt-1">
              {user.gender} • {user.age} Years
            </p>

            <div className="flex gap-2 mt-3">

              <span className="bg-green-100 text-green-700 dark:bg-emerald-900 dark:text-emerald-200 px-3 py-1 rounded-full text-sm font-semibold">
                {bodyGoal || user.goal}
              </span>

              <span className="bg-blue-100 text-blue-700 dark:bg-sky-950 dark:text-sky-200 px-3 py-1 rounded-full text-sm font-semibold">
                {user.activityLevel}
              </span>

            </div>

          </div>

        </div>

        {/* BMI */}

        <div className="mt-8 md:mt-0 text-center">

          <p className="text-gray-500 dark:text-slate-400">
            BMI
          </p>

          <h2 className="text-5xl font-bold text-green-600 mt-2">
            {bmi || "--"}
          </h2>

          <p className="text-gray-400 dark:text-slate-400 mt-2">
            Healthy Range
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-5 mt-8">

        <Stat
          title="Height"
          value={`${user.height} cm`}
        />

        <Stat
          title="Weight"
          value={`${user.weight} kg`}
        />

        <Stat
          title="Goal"
          value={user.goal}
        />

      </div>

    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-5 text-center">

      <p className="text-gray-500 dark:text-slate-400">
        {title}
      </p>

      <h3 className="text-xl font-bold mt-2 text-slate-900 dark:text-slate-100">
        {value}
      </h3>

    </div>
  );
}

export default ProfileSummary;
