import { Dumbbell } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Dumbbell size={32} />

          <h1 className="text-2xl font-bold">
            IntelliFit
          </h1>

        </div>

        <span className="text-slate-300">
          AI Fitness Recommendation System
        </span>

      </div>
    </nav>
  );
};

export default Navbar;