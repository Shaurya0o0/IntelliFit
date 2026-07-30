import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

const BMIChart = ({ bmi }) => {
  const data = [
    {
      name: "BMI",
      value: bmi,
      fill: "#2563eb",
    },
  ];

  const getBMICategory = (value) => {
    if (value < 18.5) return "Underweight";
    if (value < 25) return "Normal";
    if (value < 30) return "Overweight";
    return "Obese";
  };

  const getCategoryColor = (value) => {
    if (value < 18.5) return "text-blue-600 dark:text-blue-400";
    if (value < 25) return "text-green-600 dark:text-green-400";
    if (value < 30) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <div className="w-full">
      <div className="w-full h-72 min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="60%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={12}
              background
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center mt-4">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          {bmi}
        </h2>

        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Body Mass Index
        </p>

        <span
          className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold bg-slate-100 dark:bg-slate-800 ${getCategoryColor(
            bmi
          )}`}
        >
          {getBMICategory(bmi)}
        </span>
      </div>
    </div>
  );
};

export default BMIChart;
