import { useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/authApi";

import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import BMICard from "./BMICard";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
  const { user, loading: authLoading, updateUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async (formData) => {
    try {
      setSaving(true);

      const data = await updateProfile(formData);

      updateUser(data.user);

      toast.success(data.message);

      setEditing(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-lg font-medium text-slate-700 dark:text-slate-300">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
            User not found.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Profile Header */}
      <ProfileHeader
        user={user}
        onEdit={() => setEditing(true)}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        {/* Profile Information */}
        <div className="xl:col-span-2">
          <ProfileInfo user={user} />
        </div>

        {/* BMI Card */}
        <div>
          <BMICard
            height={user.height}
            weight={user.weight}
          />
        </div>

      </div>

      {/* Edit Modal */}
      <EditProfileModal
        isOpen={editing}
        onClose={() => setEditing(false)}
        user={user}
        onSave={handleSave}
        loading={saving}
      />

    </div>
  );
};

export default Profile;
