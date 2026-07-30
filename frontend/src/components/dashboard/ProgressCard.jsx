import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ProgressCard({ progress }) {
  if (!progress) return null;

  const {
    current_weight,
    predicted_weight_30_days,
    predicted_weight_60_days,
    predicted_weight_90_days,
  } = progress;

  const chartData = [
    {
      day: "Current",
      weight: current_weight,
    },
    {
      day: "30 Days",
      weight: predicted_weight_30_days,
    },
    {
      day: "60 Days",
      weight: predicted_weight_60_days,
    },
    {
      day: "90 Days",
      weight: predicted_weight_90_days,
    },
  ];

  const gain = (
    predicted_weight_90_days - current_weight
  ).toFixed(1);

  let status = "Excellent Progress 🚀";
  let badge =
    "bg-green-100 text-green-700 border-green-300 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700";

  if (gain < 2) {
    status = "Slow Progress";
    badge =
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700";
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mt-8">
      {/* Heading */}

      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">📈</span>

        <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          Progress Prediction
        </h2>
      </div>

      {/* Line Chart */}

      <div className="h-80 mb-10">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="5 5"
            />

            <XAxis dataKey="day" />

            <YAxis
              domain={[
                current_weight - 1,
                predicted_weight_90_days + 1,
              ]}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="weight"
              stroke="#16a34a"
              strokeWidth={4}
              dot={{
                r: 6,
                fill: "#16a34a",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <InfoCard
          title="Current Weight"
          value={`${current_weight} kg`}
        />

        <InfoCard
          title="Goal Weight"
          value={`${predicted_weight_90_days} kg`}
        />

        <InfoCard
          title="Expected Gain"
          value={`+${gain} kg`}
        />

        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-md flex flex-col justify-center items-center">
          <p className="text-gray-500 dark:text-slate-400 mb-4">
            Status
          </p>

          <span
            className={`px-5 py-2 rounded-full border font-semibold ${badge}`}
          >
            {status}
          </span>
        </div>

      </div>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
      <p className="text-gray-500 dark:text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-3 text-gray-900 dark:text-slate-100">
        {value}
      </h3>
    </div>
  );
}

export default ProgressCard;
