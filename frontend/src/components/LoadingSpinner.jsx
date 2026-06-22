const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">

      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600">
        Generating your personalized workout plan...
      </p>

    </div>
  );
};

export default LoadingSpinner;