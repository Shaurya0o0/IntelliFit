import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
        {label}
      </label>

      <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition">

        <Lock size={20} className="text-gray-400 dark:text-slate-400 mr-3" />

        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent text-slate-900 dark:text-slate-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-500 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

      </div>
    </div>
  );
}

export default PasswordInput;
