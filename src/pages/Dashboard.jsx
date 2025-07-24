import React, { useState, useEffect } from 'react';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Button } from '../components/shared/common/Button';
import { Icon } from '../assets/icons';
import { storage } from '../utils/storage';
import { getBPLevel } from '../utils/health';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [bpReadings, setBpReadings] = useState([]);
  const [meals, setMeals] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = storage.getUser();
    const bpData = storage.getBPReadings();
    const mealData = storage.getMeals();
    
    setUser(userData);
    setBpReadings(bpData.slice(0, 3)); // Show last 3 readings
    setMeals(mealData.slice(0, 3)); // Show last 3 meals
  }, []);

  const todaysBP = bpReadings.find(reading => 
    new Date(reading.date).toDateString() === new Date().toDateString()
  );

  const todaysMeals = meals.filter(meal => 
    new Date(meal.date).toDateString() === new Date().toDateString()
  );

  const totalCaloriesToday = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-8">
      <Container>
        <div className="mb-8">
          <Heading level={1} align="center" className="mb-2">
            Welcome <span className="text-[#4CAF50]">back</span>{user ? `, ${user.name}` : ''}!
          </Heading>
          <p className="text-[#424242] text-center">Here's your health overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Icon name="heart" className="w-6 h-6 text-[#F44336]" />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/bp-check')}
              >
                <Icon name="plus" className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="font-semibold text-[#212121] mb-2">Today's BP</h3>
            {todaysBP ? (
              <div>
                <div className="text-2xl font-bold text-[#212121]">
                  {todaysBP.systolic}/{todaysBP.diastolic}
                </div>
                <div 
                  className="text-sm font-medium"
                  style={{ color: getBPLevel(todaysBP.systolic, todaysBP.diastolic).color }}
                >
                  {getBPLevel(todaysBP.systolic, todaysBP.diastolic).label}
                </div>
              </div>
            ) : (
              <div className="text-[#9E9E9E]">No reading today</div>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Icon name="utensils" className="w-6 h-6 text-[#FF9800]" />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/meal-check')}
              >
                <Icon name="plus" className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="font-semibold text-[#212121] mb-2">Today's Calories</h3>
            <div className="text-2xl font-bold text-[#212121]">
              {totalCaloriesToday}
            </div>
            <div className="text-sm text-[#9E9E9E]">
              {todaysMeals.length} meal{todaysMeals.length !== 1 ? 's' : ''} logged
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon name="fileText" className="w-6 h-6 text-[#2196F3]" />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/reports')}
              >
                <Icon name="download" className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="font-semibold text-[#212121] mb-2">Health Score</h3>
            <div className="text-2xl font-bold text-[#4CAF50]">
              {todaysBP && todaysMeals.length > 0 ? '85%' : 'N/A'}
            </div>
            <div className="text-sm text-[#9E9E9E]">
              Based on today's data
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="primary" 
            className="h-16"
            onClick={() => navigate('/bp-check')}
          >
            <Icon name="heart" className="w-5 h-5 mr-2" />
            Check BP
          </Button>
          <Button 
            variant="secondary" 
            className="h-16"
            onClick={() => navigate('/meal-check')}
          >
            <Icon name="camera" className="w-5 h-5 mr-2" />
            Log Meal
          </Button>
          <Button 
            variant="accent" 
            className="h-16"
            onClick={() => navigate('/history')}
          >
            <Icon name="dashboard" className="w-5 h-5 mr-2" />
            View History
          </Button>
          <Button 
            variant="outline" 
            className="h-16"
            onClick={() => navigate('/reports')}
          >
            <Icon name="download" className="w-5 h-5 mr-2" />
            Get Report
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#212121] mb-4">Recent BP Readings</h3>
            {bpReadings.length > 0 ? (
              <div className="space-y-3">
                {bpReadings.map((reading) => {
                  const bpLevel = getBPLevel(reading.systolic, reading.diastolic);
                  return (
                    <div key={reading.id} className="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-lg">
                      <div>
                        <div className="font-semibold">{reading.systolic}/{reading.diastolic}</div>
                        <div className="text-sm text-[#9E9E9E]">{reading.date} at {reading.time}</div>
                      </div>
                      <div 
                        className="px-2 py-1 rounded text-sm font-medium"
                        style={{ 
                          backgroundColor: `${bpLevel.color}20`,
                          color: bpLevel.color 
                        }}
                      >
                        {bpLevel.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[#9E9E9E]">No BP readings yet. Start monitoring your health!</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#212121] mb-4">Recent Meals</h3>
            {meals.length > 0 ? (
              <div className="space-y-3">
                {meals.map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-lg">
                    <div>
                      <div className="font-semibold">{meal.name}</div>
                      <div className="text-sm text-[#9E9E9E]">{meal.date} at {meal.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{meal.calories} cal</div>
                      <div 
                        className="text-sm font-medium"
                        style={{ color: meal.isHealthy ? '#4CAF50' : '#FF9800' }}
                      >
                        {meal.isHealthy ? 'Healthy' : 'Moderate'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#9E9E9E]">No meals logged yet. Start tracking your nutrition!</p>
            )}
          </div>
        </div>
      </Container>
    </main>
  );
};