import React, { useState, useEffect } from 'react';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Button } from '../components/shared/common/Button';
import { Icon } from '../assets/icons';
import { storage } from '../utils/storage';
import { getBPLevel } from '../utils/health';
import toast from 'react-hot-toast';

export const History = () => {
  const [bpReadings, setBpReadings] = useState([]);
  const [meals, setMeals] = useState([]);
  const [activeTab, setActiveTab] = useState('bp');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setBpReadings(storage.getBPReadings());
    setMeals(storage.getMeals());
  };

  const deleteBPReading = (id) => {
    const updatedReadings = bpReadings.filter(reading => reading.id !== id);
    localStorage.setItem('bp_fuel_readings', JSON.stringify(updatedReadings));
    setBpReadings(updatedReadings);
    toast.success('BP reading deleted successfully');
  };

  const deleteMeal = (id) => {
    const updatedMeals = meals.filter(meal => meal.id !== id);
    localStorage.setItem('bp_fuel_meals', JSON.stringify(updatedMeals));
    setMeals(updatedMeals);
    toast.success('Meal deleted successfully');
  };

  const clearAllBP = () => {
    localStorage.setItem('bp_fuel_readings', JSON.stringify([]));
    setBpReadings([]);
    toast.success('All BP readings cleared');
  };

  const clearAllMeals = () => {
    localStorage.setItem('bp_fuel_meals', JSON.stringify([]));
    setMeals([]);
    toast.success('All meals cleared');
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-8">
      <Container>
        <div className="mb-8">
          <Heading level={1} align="center" className="mb-4">
            Health <span className="text-[#2196F3]">History</span>
          </Heading>
          <p className="text-[#424242] text-center">View and manage your BP readings and meal records</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-[#E0E0E0] p-1 rounded-lg mb-8 max-w-md">
          <button
            onClick={() => setActiveTab('bp')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'bp' 
                ? 'bg-white text-[#4CAF50] shadow-sm' 
                : 'text-[#424242] hover:text-[#4CAF50]'
            }`}
          >
            BP Readings ({bpReadings.length})
          </button>
          <button
            onClick={() => setActiveTab('meals')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'meals' 
                ? 'bg-white text-[#FF9800] shadow-sm' 
                : 'text-[#424242] hover:text-[#FF9800]'
            }`}
          >
            Meals ({meals.length})
          </button>
        </div>

        {/* BP Readings Tab */}
        {activeTab === 'bp' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h3 className="text-xl font-semibold text-[#212121] mb-4 sm:mb-0">
                Blood Pressure Readings
              </h3>
              {bpReadings.length > 0 && (
                <Button variant="danger" size="sm" onClick={clearAllBP}>
                  Clear All
                </Button>
              )}
            </div>

            {bpReadings.length > 0 ? (
              <div className="space-y-4">
                {bpReadings.map((reading) => {
                  const bpLevel = getBPLevel(reading.systolic, reading.diastolic);
                  return (
                    <div key={reading.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#FAFAFA] rounded-lg">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="text-2xl font-bold text-[#212121]">
                            {reading.systolic}/{reading.diastolic}
                          </div>
                          <div 
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${bpLevel.color}20`,
                              color: bpLevel.color 
                            }}
                          >
                            {bpLevel.label}
                          </div>
                        </div>
                        <div className="text-sm text-[#9E9E9E]">
                          {reading.date} at {reading.time}
                          {reading.pulse && ` • Pulse: ${reading.pulse} BPM`}
                        </div>
                      </div>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => deleteBPReading(reading.id)}
                      >
                        <Icon name="x" className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="heart" className="w-8 h-8 text-[#F44336]" />
                </div>
                <p className="text-[#9E9E9E] mb-4">No BP readings recorded yet</p>
                <Button variant="primary" onClick={() => window.location.href = '/bp-check'}>
                  Record First Reading
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Meals Tab */}
        {activeTab === 'meals' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h3 className="text-xl font-semibold text-[#212121] mb-4 sm:mb-0">
                Meal Records
              </h3>
              {meals.length > 0 && (
                <Button variant="danger" size="sm" onClick={clearAllMeals}>
                  Clear All
                </Button>
              )}
            </div>

            {meals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meals.map((meal) => (
                  <div key={meal.id} className="bg-[#FAFAFA] rounded-lg p-4 relative">
                    <button
                      onClick={() => deleteMeal(meal.id)}
                      className="absolute top-2 right-2 p-1 text-[#F44336] hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Icon name="x" className="w-4 h-4" />
                    </button>
                    
                    {meal.image && (
                      <img 
                        src={meal.image} 
                        alt={meal.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    
                    <h4 className="font-semibold text-[#212121] mb-2">{meal.name}</h4>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-[#9E9E9E]">Calories:</span>
                        <span className="font-medium ml-1">{meal.calories}</span>
                      </div>
                      <div>
                        <span className="text-[#9E9E9E]">Protein:</span>
                        <span className="font-medium ml-1">{meal.protein}g</span>
                      </div>
                      <div>
                        <span className="text-[#9E9E9E]">Carbs:</span>
                        <span className="font-medium ml-1">{meal.carbs}g</span>
                      </div>
                      <div>
                        <span className="text-[#9E9E9E]">Fat:</span>
                        <span className="font-medium ml-1">{meal.fat}g</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div 
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          meal.isHealthy 
                            ? 'bg-green-100 text-[#4CAF50]' 
                            : 'bg-orange-100 text-[#FF9800]'
                        }`}
                      >
                        {meal.isHealthy ? 'Healthy' : 'Moderate'}
                      </div>
                      <div className="text-xs text-[#9E9E9E]">
                        {meal.date} {meal.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Icon name="utensils" className="w-8 h-8 text-[#FF9800]" />
                </div>
                <p className="text-[#9E9E9E] mb-4">No meals recorded yet</p>
                <Button variant="secondary" onClick={() => window.location.href = '/meal-check'}>
                  Log First Meal
                </Button>
              </div>
            )}
          </div>
        )}
      </Container>
    </main>
  );
};