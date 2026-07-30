import {
  Home,
  Dumbbell,
  Utensils,
  TrendingUp,
  User,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Sidebar({ activePage, setActivePage }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menu = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <Home size={20} />,
    },
    {
      id: "workout",
      name: "Workout",
      icon: <Dumbbell size={20} />,
    },
    {
      id: "diet",
      name: "Diet",
      icon: <Utensils size={20} />,
    },
    {
      id: "progress",
      name: "Progress",
      icon: <TrendingUp size={20} />,
    },
    {
      id: "profile",
      name: "Profile",
      icon: <User size={20} />,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-60 flex-col justify-between border-r border-slate-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 md:flex">
      {/* Logo */}

      <div>
        <div className="flex items-center justify-center gap-3 border-b border-slate-200 py-8 dark:border-zinc-800">
          <img
            src="/IntelliFit.png"
            alt="IntelliFit"
            className="h-10 w-10 object-contain transition-all duration-300 dark:invert"
          />

          <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            IntelliFit
          </h1>
        </div>

        {/* Menu */}

        <nav className="mt-8 space-y-3 px-4">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex w-full items-center gap-4 rounded-xl px-5 py-3 font-medium transition-all duration-300 ${
                activePage === item.id
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-700 hover:bg-slate-100 hover:text-emerald-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
              }`}
            >
              {item.icon}

              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Bottom */}

      <div className="space-y-3 border-t border-slate-200 p-5 dark:border-zinc-800">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;