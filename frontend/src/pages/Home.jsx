import { useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutResult from "../components/WorkoutResult";
import LoadingSpinner from "../components/LoadingSpinner";

import { getWorkoutRecommendation } from "../api/workoutApi";

const Home = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      const response =
        await getWorkoutRecommendation(
          formData
        );

      setResult(response);

      toast.success(
        "AI fitness plan generated successfully!"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to generate recommendation"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">

        <div className="max-w-7xl mx-auto">

          {/* HERO SECTION */}

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-12 mb-10 shadow-2xl">

            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6">

                <span>🤖</span>

                <span className="text-sm font-medium text-white">
                  AI Powered Fitness Coach
                </span>

              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">

                Transform Your Fitness
                <br />
                With Machine Learning

              </h1>

              <p className="text-xl text-slate-300 max-w-3xl">

                Get personalized workout plans,
                nutrition recommendations,
                body goal predictions and
                progress forecasting powered by AI.

              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl text-white">
                  💪 Workout Plans
                </div>

                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl text-white">
                  🥗 Diet Planning
                </div>

                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl text-white">
                  📈 Progress Prediction
                </div>

                <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl text-white">
                  🎯 Goal Analysis
                </div>

              </div>

            </div>

          </div>

          {/* FEATURE CARDS */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">

              <div className="text-4xl mb-3">
                💪
              </div>

              <h3 className="text-2xl font-bold text-blue-600">
                AI Workout
              </h3>

              <p className="text-gray-600 mt-2">
                Personalized training plans
                generated using ML.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">

              <div className="text-4xl mb-3">
                ⚖️
              </div>

              <h3 className="text-2xl font-bold text-green-600">
                BMI Analysis
              </h3>

              <p className="text-gray-600 mt-2">
                Calculate BMI and health
                category instantly.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">

              <div className="text-4xl mb-3">
                🥗
              </div>

              <h3 className="text-2xl font-bold text-purple-600">
                Nutrition
              </h3>

              <p className="text-gray-600 mt-2">
                Custom calorie and macro
                recommendations.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">

              <div className="text-4xl mb-3">
                📈
              </div>

              <h3 className="text-2xl font-bold text-orange-600">
                Forecast
              </h3>

              <p className="text-gray-600 mt-2">
                Predict progress for
                30, 60 and 90 days.
              </p>

            </div>

          </div>

          {/* FORM */}

          <div className="mb-10">

            <WorkoutForm
              onSubmit={handleSubmit}
              loading={loading}
            />

          </div>

          {/* LOADING */}

          {loading && (
            <div className="mt-10">
              <LoadingSpinner />
            </div>
          )}

          {/* RESULTS */}

          {!loading && result && (
            <WorkoutResult
              result={result}
            />
          )}

        </div>

      </div>
    </>
  );
};

export default Home;