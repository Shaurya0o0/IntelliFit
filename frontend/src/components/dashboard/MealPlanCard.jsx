function MealPlanCard({ diet, bodyGoal }) {
  if (!diet?.meals) return null;

  const formatValue = (value, decimals = 1) => {
    if (value === null || value === undefined) return "--";
    if (Number.isInteger(value)) return value;
    return Number(value).toFixed(decimals);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-2xl dark:shadow-black/40">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          🍽️ Meal Plan
        </h2>

        <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700 dark:bg-emerald-900/60 dark:text-green-300">
          {bodyGoal}
        </span>

      </div>

      {/* Daily Macros */}

      {diet.daily_macros && (
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calories
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {diet.daily_macros.calories}
            </h3>
          </div>

          <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Protein
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {diet.daily_macros.protein} g
            </h3>
          </div>

          <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-4 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Carbs
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {diet.daily_macros.carbs} g
            </h3>
          </div>

          <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-center dark:border-slate-700 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fats
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              {diet.daily_macros.fats} g
            </h3>
          </div>

        </div>
      )}

      {/* Meals */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {Object.entries(diet.meals).map(([mealName, mealData]) => (

          <div
            key={mealName}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-600 dark:bg-slate-800 dark:shadow-lg dark:shadow-black/30"
          >

            <h3 className="mb-4 text-xl font-bold capitalize text-slate-900 dark:text-white">
              {mealName.replaceAll("_", " ")}
            </h3>

            {/* Foods */}

            <div className="mb-6 space-y-3">

              {Object.entries(mealData.foods).map(([food, quantity]) => (

                <div
                  key={food}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors dark:border-slate-600 dark:bg-slate-700"
                >
                  <span className="font-medium text-slate-900 dark:text-white">
                    {food}
                  </span>

                  <span className="font-semibold text-sky-600 dark:text-sky-300">
                    {quantity}
                    {typeof quantity === "number" && quantity > 10 ? " g" : ""}
                  </span>

                </div>

              ))}

            </div>

            {/* Nutrition */}

            <div className="border-t border-slate-200 pt-4 dark:border-slate-600">

              <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                Nutrition
              </h4>

              <div className="grid grid-cols-2 gap-2 text-sm">

                <div className="text-slate-600 dark:text-slate-400">
                  Calories
                </div>

                <div className="text-right font-semibold text-slate-900 dark:text-white">
                  {formatValue(mealData.totals.calories, 0)}
                </div>

                <div className="text-slate-600 dark:text-slate-400">
                  Protein
                </div>

                <div className="text-right font-semibold text-slate-900 dark:text-white">
                  {formatValue(mealData.totals.protein)} g
                </div>

                <div className="text-slate-600 dark:text-slate-400">
                  Carbs
                </div>

                <div className="text-right font-semibold text-slate-900 dark:text-white">
                  {formatValue(mealData.totals.carbs)} g
                </div>

                <div className="text-slate-600 dark:text-slate-400">
                  Fats
                </div>

                <div className="text-right font-semibold text-slate-900 dark:text-white">
                  {formatValue(mealData.totals.fats)} g
                </div>

              </div>

            </div>

            {/* Target */}

            <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">

              <h4 className="mb-2 font-semibold text-green-700 dark:text-green-300">
                🎯 Target
              </h4>

              <div className="space-y-1 text-sm text-slate-700 dark:text-slate-300">

                <p>Calories: {mealData.target.calories}</p>

                <p>Protein: {mealData.target.protein} g</p>

                <p>Carbs: {mealData.target.carbs} g</p>

                <p>Fats: {mealData.target.fats} g</p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default MealPlanCard;