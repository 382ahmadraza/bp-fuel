import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Button } from '../components/shared/common/Button';
import { Icon } from '../assets/icons';

export const Recommendations = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
            <Icon name="dashboard" className="w-8 h-8 text-[#4CAF50]" />
          </div>
          <Heading level={1} align="center" className="mb-4">
            Health <span className="text-[#4CAF50]">Recommendations</span>
          </Heading>
          <p className="text-lg text-[#424242] max-w-2xl mx-auto">
            Evidence-based recommendations to help you maintain healthy blood pressure through diet, lifestyle, and monitoring.
          </p>
        </div>

        {/* Dietary Recommendations */}
        <div className="mb-16">
          <Heading level={2} align="center" className="mb-8">
            Dietary Recommendations
          </Heading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BP-Lowering Foods */}
            <div className="bg-green-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-[#212121]">BP-Lowering Foods</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Leafy Greens</h4>
                    <p className="text-sm text-[#424242]">Spinach, Kale, Arugula</p>
                  </div>
                  <span className="text-xs text-[#4CAF50] bg-green-100 px-2 py-1 rounded">Rich in potassium</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Berries</h4>
                    <p className="text-sm text-[#424242]">Blueberries, Strawberries</p>
                  </div>
                  <span className="text-xs text-[#4CAF50] bg-green-100 px-2 py-1 rounded">Antioxidants and nitrates</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Fatty Fish</h4>
                    <p className="text-sm text-[#424242]">Salmon, Mackerel, Sardines</p>
                  </div>
                  <span className="text-xs text-[#4CAF50] bg-green-100 px-2 py-1 rounded">Omega-3 fatty acids</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Whole Grains</h4>
                    <p className="text-sm text-[#424242]">Oats, Quinoa, Brown Rice</p>
                  </div>
                  <span className="text-xs text-[#4CAF50] bg-green-100 px-2 py-1 rounded">Fiber and magnesium</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Nuts & Seeds</h4>
                    <p className="text-sm text-[#424242]">Almonds, Chia Seeds, Flax</p>
                  </div>
                  <span className="text-xs text-[#4CAF50] bg-green-100 px-2 py-1 rounded">Healthy fats and minerals</span>
                </div>
              </div>
            </div>

            {/* Foods to Limit */}
            <div className="bg-red-50 p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">⚠</span>
                </div>
                <h3 className="text-2xl font-bold text-[#212121]">Foods to Limit</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Processed Foods</h4>
                    <p className="text-sm text-[#424242]">Packaged snacks, Deli meats</p>
                  </div>
                  <span className="text-xs text-[#F44336] bg-red-100 px-2 py-1 rounded">High sodium content</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Added Salt</h4>
                    <p className="text-sm text-[#424242]">Table salt, Seasonings</p>
                  </div>
                  <span className="text-xs text-[#F44336] bg-red-100 px-2 py-1 rounded">Increases fluid retention</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Sugary Drinks</h4>
                    <p className="text-sm text-[#424242]">Soda, Sweet tea, Energy drinks</p>
                  </div>
                  <span className="text-xs text-[#F44336] bg-red-100 px-2 py-1 rounded">Can lead to weight gain</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Alcohol</h4>
                    <p className="text-sm text-[#424242]">Limit to 1-2 drinks per day</p>
                  </div>
                  <span className="text-xs text-[#F44336] bg-red-100 px-2 py-1 rounded">Can raise blood pressure</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-[#212121]">Saturated Fats</h4>
                    <p className="text-sm text-[#424242]">Fried foods, High-fat dairy</p>
                  </div>
                  <span className="text-xs text-[#F44336] bg-red-100 px-2 py-1 rounded">Can affect heart health</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Modifications */}
        <div className="mb-16">
          <Heading level={2} align="center" className="mb-8">
            Lifestyle Modifications
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">🏃</span>
                </div>
                <h3 className="text-xl font-bold text-[#212121]">Exercise Regularly</h3>
              </div>
              <p className="text-[#424242] mb-4">Aim for 150 minutes of moderate aerobic activity per week</p>
              <ul className="text-sm text-[#424242] space-y-2">
                <li>• Start with 30-minute walks and gradually increase</li>
                <li>• Try swimming, cycling, or dancing</li>
                <li>• Include strength training 2 days per week</li>
                <li>• Take stairs instead of elevators</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">🧘</span>
                </div>
                <h3 className="text-xl font-bold text-[#212121]">Manage Stress</h3>
              </div>
              <p className="text-[#424242] mb-4">Chronic stress can contribute to high blood pressure</p>
              <ul className="text-sm text-[#424242] space-y-2">
                <li>• Practice deep breathing exercises</li>
                <li>• Try meditation or yoga</li>
                <li>• Get adequate sleep (7-8 hours)</li>
                <li>• Consider talking to a counselor</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">💧</span>
                </div>
                <h3 className="text-xl font-bold text-[#212121]">Stay Hydrated</h3>
              </div>
              <p className="text-[#424242] mb-4">Proper hydration helps maintain healthy blood pressure</p>
              <ul className="text-sm text-[#424242] space-y-2">
                <li>• Drink 6-10 glasses of water daily</li>
                <li>• Limit caffeine intake</li>
                <li>• Choose water over sugary drinks</li>
                <li>• Eat water-rich fruits and vegetables</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">📊</span>
                </div>
                <h3 className="text-xl font-bold text-[#212121]">Monitor Regularly</h3>
              </div>
              <p className="text-[#424242] mb-4">Regular monitoring helps track your progress</p>
              <ul className="text-sm text-[#424242] space-y-2">
                <li>• Check BP at the same time daily</li>
                <li>• Keep a record of readings</li>
                <li>• Note factors that affect your BP</li>
                <li>• Share data with your healthcare provider</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Beneficial Supplements */}
        <div className="mb-16">
          <Heading level={2} align="center" className="mb-8">
            Beneficial Supplements
          </Heading>
          
          <div className="bg-blue-50 p-6 rounded-xl mb-8">
            <p className="text-center text-[#424242]">
              <strong>Important:</strong> Consult with your healthcare provider before starting any supplements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h4 className="font-bold text-[#212121] mb-2">Potassium</h4>
              <p className="text-sm text-[#424242] mb-2">Helps balance sodium levels</p>
              <p className="text-xs text-[#9E9E9E]">3,500-4,700mg daily</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h4 className="font-bold text-[#212121] mb-2">Magnesium</h4>
              <p className="text-sm text-[#424242] mb-2">Helps relax blood vessels</p>
              <p className="text-xs text-[#9E9E9E]">310-420mg daily</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h4 className="font-bold text-[#212121] mb-2">Omega-3</h4>
              <p className="text-sm text-[#424242] mb-2">Reduces inflammation</p>
              <p className="text-xs text-[#9E9E9E]">1-3g daily</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <h4 className="font-bold text-[#212121] mb-2">Coenzyme Q10</h4>
              <p className="text-sm text-[#424242] mb-2">Supports heart health</p>
              <p className="text-xs text-[#9E9E9E]">100-200mg daily</p>
            </div>
          </div>
        </div>

        {/* DASH Diet Plan */}
        <div className="mb-16">
          <Heading level={2} align="center" className="mb-8">
            DASH Diet Plan
          </Heading>
          
          <p className="text-center text-[#424242] mb-8 max-w-3xl mx-auto">
            The Dietary Approaches to Stop Hypertension (DASH) eating plan is proven to help lower blood pressure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <Icon name="utensils" className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-bold text-[#212121] mb-4">Daily Servings</h3>
              <div className="text-left space-y-2 text-sm text-[#424242]">
                <p>6-8 servings of grains</p>
                <p>4-5 servings of vegetables</p>
                <p>4-5 servings of fruits</p>
                <p>2-3 servings of dairy</p>
                <p>2 or fewer servings of meat</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <Icon name="heart" className="w-8 h-8 text-[#F44336]" />
              </div>
              <h3 className="text-xl font-bold text-[#212121] mb-4">Key Benefits</h3>
              <div className="text-left space-y-2 text-sm text-[#424242]">
                <p>Lowers systolic BP by 8-14 mmHg</p>
                <p>Reduces risk of heart disease</p>
                <p>Promotes healthy weight</p>
                <p>Improves overall nutrition</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
                <Icon name="dashboard" className="w-8 h-8 text-[#2196F3]" />
              </div>
              <h3 className="text-xl font-bold text-[#212121] mb-4">Implementation</h3>
              <div className="text-left space-y-2 text-sm text-[#424242]">
                <p>Start gradually</p>
                <p>Plan meals in advance</p>
                <p>Read nutrition labels</p>
                <p>Focus on whole foods</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/meal-check')}
            >
              Analyze Your Meals
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/bp-check')}
            >
              Check Your BP
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};