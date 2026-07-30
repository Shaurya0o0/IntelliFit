import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [latestWorkout, setLatestWorkout] = useState(() => {
    const savedWorkout = localStorage.getItem("latestWorkout");
    return savedWorkout ? JSON.parse(savedWorkout) : null;
  });

  const [loading, setLoading] = useState(true);

  // ==========================
  // Restore User on Refresh
  // ==========================
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getProfile();

        setUser(res.user);

        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );

        if (res.user?.latestRecommendation) {
          setLatestWorkout(res.user.latestRecommendation);

          localStorage.setItem(
            "latestWorkout",
            JSON.stringify(res.user.latestRecommendation)
          );
        }
      } catch (error) {
        console.error("Session restore failed:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("latestWorkout");

        setUser(null);
        setLatestWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ==========================
  // Login
  // ==========================
  const login = (userData, token) => {
    localStorage.setItem("token", token);

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);

    if (userData?.latestRecommendation) {
      localStorage.setItem(
        "latestWorkout",
        JSON.stringify(userData.latestRecommendation)
      );

      setLatestWorkout(userData.latestRecommendation);
    }
  };

  // ==========================
  // Logout
  // ==========================
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("latestWorkout");

    setUser(null);
    setLatestWorkout(null);
  };

  // ==========================
  // Update User
  // ==========================
  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );
  };

  // ==========================
  // Update Latest Workout
  // ==========================
  const updateLatestWorkout = (workout) => {
    setLatestWorkout(workout);

    if (workout) {
      localStorage.setItem(
        "latestWorkout",
        JSON.stringify(workout)
      );
    } else {
      localStorage.removeItem("latestWorkout");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        updateUser,
        latestWorkout,
        setLatestWorkout: updateLatestWorkout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
