import { useState } from "react";

const WorkoutForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    fitness_level: "Beginner",
    goal: "Muscle Gain"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      age: Number(formData.age),
      gender: formData.gender,
      height: Number(formData.height),
      weight: Number(formData.weight),
      fitness_level: formData.fitness_level,
      goal: formData.goal
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6"
      >

        <div>
          <label className="block mb-2 font-medium">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Height (cm)
          </label>

          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Weight (kg)
          </label>

          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Fitness Level
          </label>

          <select
            name="fitness_level"
            value={formData.fitness_level}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">
              Intermediate
            </option>
            <option value="Advanced">
              Advanced
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Goal
          </label>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="Muscle Gain">
              Muscle Gain
            </option>
            <option value="Fat Loss">
              Fat Loss
            </option>
            <option value="Endurance">
              Endurance
            </option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading
              ? "Generating..."
              : "Generate Workout Plan"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default WorkoutForm;