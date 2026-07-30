function AuthButton({
  text,
  loading = false,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300
      ${
        loading
          ? "bg-green-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"
      }`}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
}

export default AuthButton;
