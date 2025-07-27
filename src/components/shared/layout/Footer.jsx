import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "../../../assets/icons";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-borders mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 ">
              <img src="/logo.png" alt="bp-fuel" className="w-52" />
            </Link>
            <p className="text-mutedText">
              Your comprehensive health companion for blood pressure monitoring
              and meal analysis.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-heading mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/bp-check"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  BP Detection
                </Link>
              </li>
              <li>
                <Link
                  to="/meal-check"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  Meal Analysis
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  Health History
                </Link>
              </li>
              <li>
                <Link
                  to="/reports"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-heading mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/recommendations"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  Recommendations
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-mutedText hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-heading mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-mutedText">support@bpfuel.com</li>
              <li className="text-mutedText">+92 302 0408062</li>
              <li className="text-mutedText">+92 323 1763887</li>
              <li className="text-mutedText">Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-borders mt-8 pt-8 text-center">
          <p className="text-mutedText">
            © 2025 BP Fuel. All rights reserved. Made with ❤️ for better health.
          </p>
        </div>
      </div>
    </footer>
  );
};
