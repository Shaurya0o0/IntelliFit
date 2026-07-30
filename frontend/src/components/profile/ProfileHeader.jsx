import { UserCircle } from "lucide-react";

const ProfileHeader = ({ user, onEdit }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
      
      <div className="flex items-center gap-5">
        <UserCircle size={80} className="text-blue-500 dark:text-sky-300" />

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">
            {user?.name}
          </h2>

          <p className="text-gray-500 dark:text-slate-400">
            {user?.email}
          </p>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="mt-5 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
      >
        Edit Profile
      </button>

    </div>
  );
};

export default ProfileHeader;
