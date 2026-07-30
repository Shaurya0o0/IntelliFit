import {
  Home,
  Dumbbell,
  Utensils,
  TrendingUp,
  User,
  X,
} from "lucide-react";

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

function MobileSidebar({
  activePage,
  setActivePage,
  isOpen,
  onClose,
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen
          ? "pointer-events-auto"
          : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}

      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar */}

      <aside
        className={`absolute left-0 top-0 h-full w-72 bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800 shadow-2xl transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src="/IntelliFit.png"
              alt="IntelliFit"
              className="w-10 h-10 object-contain"
            />

            <div>
              <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                IntelliFit
              </h1>

              <p className="text-sm text-slate-500 dark:text-zinc-400">
                Smart Fitness
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition"
          >
            <X
              size={20}
              className="text-slate-700 dark:text-zinc-300"
            />
          </button>
        </div>

        {/* Menu */}

        <nav className="px-4 py-6 space-y-2">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActivePage(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activePage === item.id
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-700 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-emerald-600 dark:hover:text-emerald-400"
              }`}
            >
              {item.icon}

              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default MobileSidebar;