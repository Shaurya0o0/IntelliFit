const BMICard = ({ height, weight }) => {
  const calculateBMI = () => {
    if (!height || !weight) return null;

    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const bmi = calculateBMI();

  const getStatus = () => {
    if (!bmi)
      return {
        text: "Not Available",
        color: "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-200",
      };

    if (bmi < 18.5)
      return {
        text: "Underweight",
        color: "bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-300",
      };

    if (bmi < 25)
      return {
        text: "Normal",
        color: "bg-green-100 dark:bg-slate-800 text-green-700 dark:text-emerald-300",
      };

    if (bmi < 30)
      return {
        text: "Overweight",
        color: "bg-yellow-100 dark:bg-slate-800 text-yellow-700 dark:text-amber-300",
      };

    return {
      text: "Obese",
      color: "bg-red-100 dark:bg-slate-800 text-red-700 dark:text-rose-300",
    };
  };

  const status = getStatus();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
        Body Mass Index (BMI)
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between">

        <div>
          <h1 className="text-5xl font-bold text-blue-600 dark:text-sky-300">
            {bmi || "--"}
          </h1>

          <p className="text-gray-500 dark:text-slate-400 mt-2">
            BMI Score
          </p>
        </div>

        <span
          className={`mt-5 md:mt-0 px-4 py-2 rounded-full font-semibold ${status.color}`}
        >
          {status.text}
        </span>

      </div>
    </div>
  );
};

export default BMICard;
