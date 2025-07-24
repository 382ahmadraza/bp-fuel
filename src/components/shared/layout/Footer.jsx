import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './Container';
import { Icon } from '../../../assets/icons';

export const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="heart" className="w-8 h-8 text-[#4CAF50]" />
              <span className="text-2xl font-bold">BP-Fuel</span>
            </div>
            <p className="text-[#9E9E9E]">
              Your health companion for blood pressure monitoring and nutritional analysis.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/bp-check" className="text-[#9E9E9E] hover:text-white transition-colors">
                  BP Detection
                </Link>
              </li>
              <li>
                <Link to="/meal-check" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Meal Analysis
                </Link>
              </li>
              <li>
                <Link to="/health-reports" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Health Reports
                </Link>
              </li>
              <li>
                <Link to="/progress-tracking" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/bp-check" className="text-[#9E9E9E] hover:text-white transition-colors">
                  BP Check
                </Link>
              </li>
              <li>
                <Link to="/meal-check" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Meal Check
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#9E9E9E] hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-[#9E9E9E] hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#424242] mt-8 pt-8 text-center">
          <p className="text-[#9E9E9E]">
            © 2024 BP-Fuel. All rights reserved. Built with ❤️ for better health.
          </p>
        </div>
      </Container>
    </footer>
  );
};