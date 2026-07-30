import BMIChart from "../workout/BMIChart";

function BMIChartCard({ bmi }) {
  if (!bmi) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100">
        📊 BMI Analysis
      </h2>

      <BMIChart bmi={bmi} />
    </div>
  );
}

export default BMIChartCard;
