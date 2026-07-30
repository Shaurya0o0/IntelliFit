const InfoCard = ({ label, value, unit = "" }) => (
  <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
    <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mt-1">
      {value ? `${value}${unit}` : "Not Set"}
    </h3>
  </div>
);

const ProfileInfo = ({ user }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 mt-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-5">
        Fitness Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

        <InfoCard
          label="Age"
          value={user?.age}
          unit=" years"
        />

        <InfoCard
          label="Gender"
          value={user?.gender}
        />

        <InfoCard
          label="Height"
          value={user?.height}
          unit=" cm"
        />

        <InfoCard
          label="Weight"
          value={user?.weight}
          unit=" kg"
        />

        <InfoCard
          label="Goal"
          value={user?.goal}
        />

        <InfoCard
          label="Activity Level"
          value={user?.activityLevel}
        />

      </div>
    </div>
  );
};

export default ProfileInfo;
