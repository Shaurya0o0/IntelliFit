export const calculateBMI = (height, weight) => {
  const heightInMeters = height / 100;

  const bmi = weight / (heightInMeters * heightInMeters);

  return Number(bmi.toFixed(2));
};