 

const STORAGE_KEYS = {
  USER: 'bp_fuel_user',
  BP_READINGS: 'bp_fuel_readings',
  MEALS: 'bp_fuel_meals',
  SETTINGS: 'bp_fuel_settings'
};

export const storage = {
  // User data
  getUser: ()  => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user ) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // BP readings
  getBPReadings: () => {
    const readings = localStorage.getItem(STORAGE_KEYS.BP_READINGS);
    return readings ? JSON.parse(readings) : [];
  },

  addBPReading: (reading ) => {
    const readings = storage.getBPReadings();
    readings.unshift(reading);
    localStorage.setItem(STORAGE_KEYS.BP_READINGS, JSON.stringify(readings));
  },

  // Meals
  getMeals: ()  => {
    const meals = localStorage.getItem(STORAGE_KEYS.MEALS);
    return meals ? JSON.parse(meals) : [];
  },

  addMeal: (meal )  => {
    const meals = storage.getMeals();
    meals.unshift(meal);
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
  }
};