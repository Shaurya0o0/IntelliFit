import BMIChart from "./BMIChart";

const WorkoutResult = ({ result }) => {
  const {
    bmi,
    user,
    body_goal,
    goal_analysis,
    recommendation,
    diet,
    progress_prediction
  } = result;

  return (
    <div className="mt-8 space-y-8">

      {/* Top Section */}
      <div className="grid lg:grid-cols-3 gap-6">

        <BMIChart bmi={bmi} />

        <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">

          <h2 className="text-2xl font-bold mb-6">
            User Profile
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <p className="text-gray-500">Age</p>
              <p className="font-bold text-xl">{user.age}</p>
            </div>

            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-bold text-xl">{user.gender}</p>
            </div>

            <div>
              <p className="text-gray-500">Fitness Level</p>
              <p className="font-bold text-xl">
                {user.fitness_level}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Goal</p>
              <p className="font-bold text-xl">
                {user.goal}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Goal Analysis */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-4">
          AI Goal Analysis
        </h2>

        <div className="flex items-center gap-4 mb-4">

          <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
            {body_goal}
          </span>

        </div>

        <p className="text-gray-700 text-lg">
          {goal_analysis.reason}
        </p>

      </div>

      {/* Workout Plan */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-bold">
              Workout Plan
            </h2>

            <p className="text-green-600 font-semibold">
              AI Generated
            </p>

          </div>

          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-full">
            {recommendation.plan}
          </span>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {Object.entries(
            recommendation.schedule
          ).map(([day, exercises]) => (
            <div
              key={day}
              className="bg-slate-50 rounded-xl p-4 border"
            >
              <h3 className="font-bold text-blue-600 text-xl mb-4">
                {day}
              </h3>

              <ul className="space-y-3">

                {exercises.map(
                  (exercise, index) => (
                    <li
                      key={index}
                      className="bg-white p-3 rounded-lg shadow-sm"
                    >
                      {exercise}
                    </li>
                  )
                )}

              </ul>

            </div>
          ))}

        </div>

      </div>

      {/* Diet Macros */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-3xl font-bold mb-6">
          Nutrition Plan
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-orange-100 p-5 rounded-xl">
            <p className="text-gray-600">
              Calories
            </p>
            <p className="text-3xl font-bold">
              {diet.calories}
            </p>
          </div>

          <div className="bg-blue-100 p-5 rounded-xl">
            <p className="text-gray-600">
              Protein
            </p>
            <p className="text-3xl font-bold">
              {diet.protein}g
            </p>
          </div>

          <div className="bg-green-100 p-5 rounded-xl">
            <p className="text-gray-600">
              Carbs
            </p>
            <p className="text-3xl font-bold">
              {diet.carbs}g
            </p>
          </div>

          <div className="bg-purple-100 p-5 rounded-xl">
            <p className="text-gray-600">
              Fats
            </p>
            <p className="text-3xl font-bold">
              {diet.fats}g
            </p>
          </div>

        </div>

      </div>

      {/* Meal Plan */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex items-center justify-between mb-6">
  <h2 className="text-3xl font-bold">Meal Plan</h2>
  <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg font-semibold">
    {body_goal}
  </span>
</div>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {Object.entries(diet.meals).map(
            ([mealName, foods]) => (
              <div
                key={mealName}
                className="bg-slate-50 p-5 rounded-xl border"
              >
                <h3 className="font-bold text-lg mb-3 capitalize">
                  {mealName.replaceAll("_", " ")}
                </h3>

                <ul className="space-y-2">

                  {foods.map(
                    (food, index) => (
                      <li
                        key={index}
                        className="bg-white rounded-lg p-2"
                      >
                        {food}
                      </li>
                    )
                  )}

                </ul>

              </div>
            )
          )}

        </div>

      </div>

      {/* Progress Prediction */}

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-3xl font-bold mb-6">
          Progress Prediction
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-100 rounded-xl p-6 text-center">
            <h3 className="font-semibold">
              30 Days
            </h3>

            <p className="text-4xl font-bold">
              {progress_prediction.predicted_weight_30_days}
              kg
            </p>
          </div>

          <div className="bg-green-100 rounded-xl p-6 text-center">
            <h3 className="font-semibold">
              60 Days
            </h3>

            <p className="text-4xl font-bold">
              {progress_prediction.predicted_weight_60_days}
              kg
            </p>
          </div>

          <div className="bg-purple-100 rounded-xl p-6 text-center">
            <h3 className="font-semibold">
              90 Days
            </h3>

            <p className="text-4xl font-bold">
              {progress_prediction.predicted_weight_90_days}
              kg
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default WorkoutResult;