import React from 'react';
import { Container } from '../../shared/layout/Container';
import { Heading } from '../../shared/common/Heading';
import { Icon } from '../../../assets/icons';

export const Features = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <Container>
        <div className="text-center mb-16">
          <Heading level={2} align="center" className="mb-4">
            Advanced Health <span className="text-[#4CAF50]">Technology</span>
          </Heading>
          <p className="text-xl text-[#424242] max-w-3xl mx-auto">
            Experience the future of health monitoring with our AI-powered camera-based detection and analysis tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* BP Detection - Red/Pink Background */}
          <div className="bg-red-50 p-8 rounded-xl shadow-lg border border-[#E0E0E0] text-center">
            <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <Icon name="heart" className="w-8 h-8 text-[#F44336]" />
            </div>
            <h3 className="text-xl font-bold text-[#212121] mb-4">BP Detection</h3>
            <p className="text-[#424242] mb-6">
              Monitor your blood pressure using advanced camera-based detection technology with real-time analysis.
            </p>
            <ul className="text-sm text-[#424242] space-y-2 text-left">
              <li>• Camera-based detection</li>
              <li>• Real-time analysis</li>
              <li>• No contact required</li>
              <li>• Instant results</li>
            </ul>
          </div>

          {/* Meal Analysis - Green Background */}
          <div className="bg-green-50 p-8 rounded-xl shadow-lg border border-[#E0E0E0] text-center">
            <div className="w-16 h-16 bg-green-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <Icon name="utensils" className="w-8 h-8 text-[#4CAF50]" />
            </div>
            <h3 className="text-xl font-bold text-[#212121] mb-4">Meal Analysis</h3>
            <p className="text-[#424242] mb-6">
              Analyze your meals using AI-powered food recognition and get detailed nutritional insights.
            </p>
            <ul className="text-sm text-[#424242] space-y-2 text-left">
              <li>• AI food recognition</li>
              <li>• Nutritional breakdown</li>
              <li>• Health recommendations</li>
              <li>• Calorie tracking</li>
            </ul>
          </div>

          {/* Health Tracking - Blue Background */}
          <div className="bg-blue-50 p-8 rounded-xl shadow-lg border border-[#E0E0E0] text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <Icon name="dashboard" className="w-8 h-8 text-[#2196F3]" />
            </div>
            <h3 className="text-xl font-bold text-[#212121] mb-4">Health Tracking</h3>
            <p className="text-[#424242] mb-6">
              Track your health progress with detailed analytics and personalized insights over time.
            </p>
            <ul className="text-sm text-[#424242] space-y-2 text-left">
              <li>• Progress tracking</li>
              <li>• Health analytics</li>
              <li>• Trend analysis</li>
              <li>• Goal setting</li>
            </ul>
          </div>

          {/* Health Reports - Purple Background */}
          <div className="bg-purple-50 p-8 rounded-xl shadow-lg border border-[#E0E0E0] text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-lg mx-auto mb-6 flex items-center justify-center">
              <Icon name="fileText" className="w-8 h-8 text-[#9C27B0]" />
            </div>
            <h3 className="text-xl font-bold text-[#212121] mb-4">Health Reports</h3>
            <p className="text-[#424242] mb-6">
              Generate comprehensive health reports for medical consultations and tracking.
            </p>
            <ul className="text-sm text-[#424242] space-y-2 text-left">
              <li>• Comprehensive reports</li>
              <li>• Medical consultations</li>
              <li>• Export capabilities</li>
              <li>• Progress summaries</li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};