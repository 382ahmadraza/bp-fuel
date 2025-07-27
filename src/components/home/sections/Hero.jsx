import React from "react";
import { Container } from "../../shared/layout/Container";
import { Heading } from "../../shared/common/Heading";
import { Button } from "../../shared/common/Button";
import { Icon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center">
      <Container>
       <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-8 text-green-600">
            <svg fill="currentColor" viewBox="0 0 24 24" className="animate-pulse">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in-up">
            Take Control of Your Health
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" 
             style={{ animationDelay: '0.2s' }}>
            BP Fuel uses advanced camera technology and AI to monitor your blood pressure and analyze your meals. 
            Get instant health insights without any external devices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" 
               style={{ animationDelay: '0.4s' }}>
           
              <>
                <Link to="/meal-check">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors">
                    Get Started Free
                  </button>
                </Link>
                <Link to="/bp-check">
                  <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors">
                    Try BP Detection
                  </button>
                </Link>
              </>
            {/* )} */}
          </div>
        </div>
      </Container>
    </section>
  );
};
