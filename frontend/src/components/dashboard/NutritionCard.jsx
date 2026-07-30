function NutritionCard({ diet }) {
  if (!diet) return null;

  const macros = diet?.daily_macros || {};

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
        🍽️ Nutrition Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NutritionItem
          label="Calories"
          value={`${macros.calories ?? "--"} kcal`}
          color="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200"
        />

        <NutritionItem
          label="Protein"
          value={`${macros.protein ?? "--"} g`}
          color="bg-green-100 text-green-700 dark:bg-emerald-900 dark:text-emerald-200"
        />

        <NutritionItem
          label="Carbs"
          value={`${macros.carbs ?? "--"} g`}
          color="bg-blue-100 text-blue-700 dark:bg-sky-950 dark:text-sky-200"
        />

        <NutritionItem
          label="Fats"
          value={`${macros.fats ?? "--"} g`}
          color="bg-yellow-100 text-yellow-700 dark:bg-amber-900 dark:text-amber-200"
        />
      </div>

      <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4 text-sm text-gray-600 dark:text-slate-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="font-semibold">Goal:</span>
            <p>{diet.goal || "--"}</p>
          </div>

          <div>
            <span className="font-semibold">Diet Type:</span>
            <p>{diet.diet_type || "--"}</p>
          </div>

          <div>
            <span className="font-semibold">BMR:</span>
            <p>{diet.bmr ?? "--"} kcal</p>
          </div>

          <div>
            <span className="font-semibold">TDEE:</span>
            <p>{diet.tdee ?? "--"} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NutritionItem({ label, value, color }) {
  return (
    <div className={`${color} rounded-xl p-5 text-center dark:text-slate-100`}>
      <p className="text-sm font-medium dark:text-slate-200">{label}</p>

      <h3 className="text-2xl font-bold mt-2 dark:text-slate-100">
        {value}
      </h3>
    </div>
  );
}

export default NutritionCard;
