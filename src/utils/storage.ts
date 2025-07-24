import { BPReading, Meal, User } from '../types';

const STORAGE_KEYS = {
  USER: 'bp_fuel_user',
  BP_READINGS: 'bp_fuel_readings',
  MEALS: 'bp_fuel_meals',
  SETTINGS: 'bp_fuel_settings'
};

export const storage = {
  // User data
  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  // BP readings
  getBPReadings: (): BPReading[] => {
    const readings = localStorage.getItem(STORAGE_KEYS.BP_READINGS);
    return readings ? JSON.parse(readings) : [];
  },

  addBPReading: (reading: BPReading): void => {
    const readings = storage.getBPReadings();
    readings.unshift(reading);
    localStorage.setItem(STORAGE_KEYS.BP_READINGS, JSON.stringify(readings));
  },

  // Meals
  getMeals: (): Meal[] => {
    const meals = localStorage.getItem(STORAGE_KEYS.MEALS);
    return meals ? JSON.parse(meals) : [];
  },

  addMeal: (meal: Meal): void => {
    const meals = storage.getMeals();
    meals.unshift(meal);
    localStorage.setItem(STORAGE_KEYS.MEALS, JSON.stringify(meals));
  }
};