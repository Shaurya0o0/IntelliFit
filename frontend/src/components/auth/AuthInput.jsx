function AuthInput({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    icon
}) {
    return (
        <div className="mb-5">

            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-200 mb-2">
                {label}
            </label>

            <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-xl px-4 py-3 bg-white dark:bg-slate-800 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-200 transition">

                <span className="text-gray-400 dark:text-slate-400 mr-3">
                    {icon}
                </span>

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full outline-none bg-transparent text-slate-900 dark:text-slate-100"
                />

            </div>

        </div>
    );
}

export default AuthInput;
