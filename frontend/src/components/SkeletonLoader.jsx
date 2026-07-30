function SkeletonLoader() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 animate-pulse">
      {/* Navbar */}
      <div className="bg-white dark:bg-slate-800 shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="h-8 w-40 bg-gray-200 dark:bg-slate-800 rounded"></div>

          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-800"></div>
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-slate-800"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Hero */}
        <div className="h-40 bg-gray-200 dark:bg-slate-800 rounded-3xl"></div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow"
            >
              <div className="h-4 w-20 bg-gray-200 dark:bg-slate-800 rounded mb-4"></div>

              <div className="h-8 w-28 bg-gray-200 dark:bg-slate-800 rounded"></div>

              <div className="mt-6 h-12 w-12 rounded-xl bg-gray-200 dark:bg-slate-800"></div>
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow"
            >
              <div className="h-6 w-48 bg-gray-200 dark:bg-slate-800 rounded mb-6"></div>

              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="h-5 bg-gray-200 dark:bg-slate-800 rounded mb-4"
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow">
          <div className="h-6 w-48 bg-gray-200 dark:bg-slate-800 rounded mb-6"></div>

          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-gray-200 dark:bg-slate-800"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
