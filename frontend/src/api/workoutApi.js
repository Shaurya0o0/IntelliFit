import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getWorkoutRecommendation = async (userData) => {
  const response = await API.post(
    "/workout/recommend",
    userData
  );

  return response.data;
};