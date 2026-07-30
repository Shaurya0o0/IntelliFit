import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Dumbbell } from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthButton from "../components/auth/AuthButton";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);

      if (!res.success) {
        toast.error(res.message || "Login Failed");
        return;
      }

      login(res.user, res.token);

      toast.success(res.message || "Login Successful");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      {/* LEFT PANEL */}

      <div className="relative hidden w-1/2 overflow-hidden lg:flex">
        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600" />

        <div className="absolute -left-32 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        {/* Content */}

        <div className="relative z-10 flex w-full flex-col justify-center px-20 text-white">
          <img
            src="/IntelliFit.png"
            alt="IntelliFit"
            className="mb-8 h-28 w-28 object-contain"
          />

          <h1 className="text-6xl font-extrabold tracking-tight">IntelliFit</h1>

          <p className="mt-5 max-w-md text-lg leading-8 text-emerald-100">
            Your AI-powered personal fitness coach that creates smart workout
            plans, personalized meal recommendations and tracks your fitness
            journey.
          </p>

          {/* Features */}

          <div className="mt-14 space-y-5">
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <div className="rounded-xl bg-white/20 p-3">🏋️</div>

              <div>
                <h3 className="font-semibold">Personalized Workouts</h3>

                <p className="text-sm text-emerald-100">
                  AI generated plans based on your goals.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <div className="rounded-xl bg-white/20 p-3">🥗</div>

              <div>
                <h3 className="font-semibold">Smart Diet Plans</h3>

                <p className="text-sm text-emerald-100">
                  Meal recommendations tailored to your body.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
              <div className="rounded-xl bg-white/20 p-3">📈</div>

              <div>
                <h3 className="font-semibold">Progress Tracking</h3>

                <p className="text-sm text-emerald-100">
                  Monitor BMI, calories and weekly improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex flex-1 items-center justify-center px-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
        >
          {/* Mobile Logo */}

          <div className="mb-8 flex flex-col items-center lg:hidden">
            <div className="rounded-2xl bg-emerald-100 p-4 dark:bg-emerald-900/40">
              <Dumbbell
                size={34}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>

            <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
              IntelliFit
            </h1>
          </div>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h2>

          <p className="mb-8 mt-3 text-slate-500 dark:text-slate-400">
            Login to continue your fitness journey.
          </p>

          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={<Mail size={20} />}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <div className="mt-8">
            <AuthButton text="Login" loading={loading} />
          </div>

          {/* Divider */}

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />

            <span className="mx-4 text-sm font-medium text-slate-400">OR</span>

            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Footer */}

          <div className="space-y-4">
            <p className="text-center text-slate-600 dark:text-slate-300">
              Don't have an account?
            </p>

            <Link
              to="/signup"
              className="block w-full rounded-xl border border-emerald-600 bg-white py-3 text-center font-semibold text-emerald-600 transition-all duration-300 hover:bg-emerald-50 dark:border-emerald-500 dark:bg-slate-900 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
            >
              Create Account
            </Link>
          </div>

          {/* Footer Text */}

          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-700">
            <p className="text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
              Powered by{" "}
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                IntelliFit AI
              </span>
              <br />
              Personalized Workouts • Smart Nutrition • Progress Tracking
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
