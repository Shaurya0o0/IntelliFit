import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Dumbbell,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Monitor your fitness journey",
  },
  workout: {
    title: "Workout",
    subtitle: "AI generated training plans",
  },
  diet: {
    title: "Diet",
    subtitle: "Nutrition & meal planning",
  },
  progress: {
    title: "Progress",
    subtitle: "Track your improvements",
  },
  profile: {
    title: "Profile",
    subtitle: "Manage your account",
  },
};

const Topbar = ({ activePage, onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const page = pageTitles[activePage] || pageTitles.dashboard;

  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-slate-200 dark:border-zinc-800">
      <div className="h-20 px-6 flex items-center justify-between">
        {/* Left */}

        <div className="flex items-center gap-5">
          {/* Mobile Menu */}

          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
          >
            <Menu size={22} className="text-slate-700 dark:text-zinc-100" />
          </button>

          {/* Page */}

          <div>
            <p className="text-sm text-emerald-600 font-semibold">
              {greeting()}
            </p>

            <h1 className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
              {page.title}
            </h1>

            <p className="text-sm text-slate-500 dark:text-zinc-400">
              {page.subtitle}
            </p>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          {/* Search */}

          <div className="hidden md:flex items-center w-72 bg-slate-100 dark:bg-zinc-800 rounded-xl px-4 h-11">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent flex-1 outline-none ml-3 text-sm text-slate-700 dark:text-zinc-100 placeholder:text-slate-400"
            />
          </div>

          {/* Theme */}

          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:scale-105 transition flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-slate-700" />
            )}
          </button>

          {/* Notifications */}

          <button className="relative w-11 h-11 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:scale-105 transition flex items-center justify-center">
            <Bell size={20} className="text-slate-700 dark:text-zinc-100" />

            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </button>

          {/* Profile */}

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 bg-slate-100 dark:bg-zinc-800 rounded-xl px-3 py-2 hover:bg-slate-200 dark:hover:bg-zinc-700 transition"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold">
                {initials}
              </div>

              <div className="hidden lg:block text-left">
                <h3 className="font-semibold text-slate-900 dark:text-zinc-100">
                  {user?.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  AI Fitness Member
                </p>
              </div>

              <ChevronDown
                size={18}
                className={`transition ${showProfileMenu ? "rotate-180" : ""}`}
              />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}

                <div className="px-5 py-5 border-b border-slate-200 dark:border-zinc-800">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white text-lg font-bold">
                      {initials}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-zinc-100">
                        {user?.name}
                      </h3>

                      <p className="text-sm text-slate-500 dark:text-zinc-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Coach */}

                <div className="px-5 py-4 border-b border-slate-200 dark:border-zinc-800">
                  <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Dumbbell size={18} />

                      <span className="font-semibold">AI Coach</span>
                    </div>

                    <p className="text-sm text-emerald-50 leading-relaxed">
                      Stay consistent. Based on your latest activity, you're
                      making excellent progress.
                    </p>
                  </div>
                </div>

                {/* Menu */}

                <div className="py-2">
                  <button
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User size={18} className="text-emerald-500" />

                    <span className="text-slate-700 dark:text-zinc-100">
                      My Profile
                    </span>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings size={18} className="text-blue-500" />

                    <span className="text-slate-700 dark:text-zinc-100">
                      Settings
                    </span>
                  </button>
                </div>

                {/* Footer */}

                <div className="border-t border-slate-200 dark:border-zinc-800 p-3">
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-3 rounded-xl bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 py-3 transition"
                  >
                    <LogOut size={18} className="text-red-500" />

                    <span className="font-medium text-red-600 dark:text-red-400">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
