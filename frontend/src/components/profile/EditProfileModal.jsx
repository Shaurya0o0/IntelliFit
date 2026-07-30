import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose, user, onSave, loading }) => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    goal: "",
    activityLevel: "",
    diet: "Non-Veg",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        age: user.age || "",
        gender: user.gender || "",
        height: user.height || "",
        weight: user.weight || "",
        goal: user.goal || "",
        activityLevel: user.activityLevel || "",
        diet: user.diet || "Non-Veg",
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.age ||
      !formData.gender ||
      !formData.height ||
      !formData.weight ||
      !formData.goal ||
      !formData.activityLevel ||
      !formData.diet
    ) {
      return toast.error("Please fill all fields");
    }

    if (formData.age < 10 || formData.age > 100) {
      return toast.error("Please enter a valid age");
    }

    if (formData.height < 100 || formData.height > 250) {
      return toast.error("Please enter a valid height");
    }

    if (formData.weight < 20 || formData.weight > 250) {
      return toast.error("Please enter a valid weight");
    }

    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-7 py-5 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Update your fitness information.
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-500 transition-all duration-300 hover:bg-red-100 hover:text-red-500 dark:text-slate-400 dark:hover:bg-red-900/30"
          >
            ×
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-7 md:grid-cols-2"
        >
          {/* Age */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Gender */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          {/* Height */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Height (cm)
            </label>

            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="e.g. 180"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Weight */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Weight (kg)
            </label>

            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="e.g. 75"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>
          {/* Goal */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Fitness Goal
            </label>

            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select Goal</option>
              <option>Bulk</option>
              <option>Lean Bulk</option>
              <option>Cut</option>
              <option>Maintain</option>
            </select>
          </div>

          {/* Activity Level */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Activity Level
            </label>

            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="">Select Level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          {/* Diet Preference */}

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              🍽️ Diet Preference
            </label>

            <select
              name="diet"
              value={formData.diet}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition-all duration-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            >
              <option value="Non-Veg">🥩 Non-Veg</option>
              <option value="Veg">🥗 Veg</option>
            </select>
          </div>

          {/* Footer */}

          <div className="mt-2 flex justify-end gap-4 border-t border-slate-200 pt-6 dark:border-slate-700 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all duration-300 hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving Changes..." : "💾 Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
