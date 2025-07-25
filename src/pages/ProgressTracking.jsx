import React from 'react';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Button } from '../components/shared/common/Button';
import { Icon } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

export const ProgressTracking = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12">
      <Container>
        <div className="text-center mb-12">
          <Heading level={1} align="center" className="mb-4">
            Progress <span className="text-[#FF9800]">Tracking</span>
          </Heading>
          <p className="text-xl text-[#424242] max-w-2xl mx-auto">
            Monitor your health journey with detailed progress tracking and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#212121] mb-6">Blood Pressure Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg">
                <span className="text-[#424242]">Weekly Average</span>
                <span className="font-semibold text-[#4CAF50]">120/80 mmHg</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg">
                <span className="text-[#424242]">Monthly Trend</span>
                <span className="font-semibold text-[#4CAF50]">↓ Improving</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg">
                <span className="text-[#424242]">Readings This Month</span>
                <span className="font-semibold text-[#212121]">24</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-[#212121] mb-6">Nutrition Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg">
                <span className="text-[#424242]">Healthy Meals</span>
                <span className="font-semibold text-[#4CAF50]">78%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg">
                <span className="text-[#424242]">Average Calories</span>
                <span className="font-semibold text-[#2196F3]">1,850/day</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#FAFAFA] rounded-lg">
                <span className="text-[#424242]">Meals Logged</span>
                <span className="font-semibold text-[#212121]">156</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-[#212121] mb-6">Health Goals</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="w-16 h-16 bg-[#4CAF50] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="heart" className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-[#212121] mb-2">BP Control</h4>
              <div className="text-2xl font-bold text-[#4CAF50] mb-2">85%</div>
              <p className="text-[#424242] text-sm">Target: &lt;120/80 mmHg</p>
            </div>

            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <div className="w-16 h-16 bg-[#2196F3] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="utensils" className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-[#212121] mb-2">Healthy Eating</h4>
              <div className="text-2xl font-bold text-[#2196F3] mb-2">78%</div>
              <p className="text-[#424242] text-sm">Target: 80% healthy meals</p>
            </div>

            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-[#FF9800] rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="dashboard" className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-[#212121] mb-2">Consistency</h4>
              <div className="text-2xl font-bold text-[#FF9800] mb-2">92%</div>
              <p className="text-[#424242] text-sm">Daily tracking rate</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/dashboard')}
          >
            View Detailed Dashboard
          </Button>
        </div>
      </Container>
    </main>
  );
};