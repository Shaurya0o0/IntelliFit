import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ======================================
// Helper: Authorization Header
// ======================================

const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ======================================
// Generate AI Workout
// POST /api/workout/generate
// ======================================

export const getWorkoutRecommendation = async () => {
  const response = await API.post(
    "/workout/generate",
    {},
    getAuthConfig()
  );

  return response.data;
};

// ======================================
// Get Latest Workout
// GET /api/workout/latest
// ======================================

export const getLatestWorkout = async () => {
  const response = await API.get(
    "/workout/latest",
    getAuthConfig()
  );

  return response.data;
};

// ======================================
// Get Workout History
// GET /api/workout/history
// ======================================

export const getWorkoutHistory = async () => {
  const response = await API.get(
    "/workout/history",
    getAuthConfig()
  );

  return response.data;
};

// ======================================
// Get Single Workout
// GET /api/workout/:id
// ======================================

export const getWorkoutById = async (id) => {
  const response = await API.get(
    `/workout/${id}`,
    getAuthConfig()
  );

  return response.data;
};

// ======================================
// Delete Workout
// DELETE /api/workout/:id
// ======================================

export const deleteWorkout = async (id) => {
  const response = await API.delete(
    `/workout/${id}`,
    getAuthConfig()
  );

  return response.data;
};

export default API;
