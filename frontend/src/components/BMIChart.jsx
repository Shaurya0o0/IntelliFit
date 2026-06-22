import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";

const BMIChart = ({ bmi }) => {
  const data = [
    {
      name: "BMI",
      value: bmi,
      fill: "#2563eb"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h3 className="text-xl font-bold mb-4">
        BMI Analysis
      </h3>

      <div className="h-72">

        <ResponsiveContainer>
          <RadialBarChart
            innerRadius="60%"
            outerRadius="100%"
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar dataKey="value" />
          </RadialBarChart>
        </ResponsiveContainer>

      </div>

      <h2 className="text-center text-3xl font-bold">
        {bmi}
      </h2>

    </div>
  );
};

export default BMIChart;