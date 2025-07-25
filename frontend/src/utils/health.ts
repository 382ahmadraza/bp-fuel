export const getBPLevel = (systolic: number, diastolic: number): {
  level: 'normal' | 'elevated' | 'high1' | 'high2' | 'crisis';
  label: string;
  color: string;
} => {
  if (systolic >= 180 || diastolic >= 120) {
    return { level: 'crisis', label: 'Crisis', color: '#D32F2F' };
  } else if (systolic >= 140 || diastolic >= 90) {
    return { level: 'high2', label: 'High Stage 2', color: '#F44336' };
  } else if (systolic >= 130 || diastolic >= 80) {
    return { level: 'high1', label: 'High Stage 1', color: '#FF5722' };
  } else if (systolic >= 120 && diastolic < 80) {
    return { level: 'elevated', label: 'Elevated', color: '#FF9800' };
  } else {
    return { level: 'normal', label: 'Normal', color: '#4CAF50' };
  }
};

export const analyzeMeal = (calories: number, protein: number, carbs: number, fat: number) => {
  const isHighCalorie = calories > 600;
  const isBalanced = protein >= 15 && carbs <= 50 && fat <= 20;
  const isHealthy = !isHighCalorie && isBalanced;

  return {
    isHealthy,
    recommendations: isHealthy 
      ? ["Great balanced meal!", "Keep up the good work!"]
      : [
          isHighCalorie ? "Consider smaller portions" : "",
          !isBalanced ? "Try to balance macronutrients" : "",
          "Add more vegetables for fiber"
        ].filter(Boolean)
  };
};