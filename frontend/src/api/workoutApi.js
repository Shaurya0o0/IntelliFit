import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getWorkoutRecommendation = async (userData) => {
  const response = await API.post(
    "/workout/recommend",
    userData
  );

  return response.data;
};