import React from "react";
import { Container } from "../../shared/layout/Container";
import { Heading } from "../../shared/common/Heading";
import { Button } from "../../shared/common/Button";
import { Icon } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center">
      <Container>
        <div className="text-center">
          {/* Heart Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-[#4CAF50] rounded-full mx-auto flex items-center justify-center mb-6">
              <Icon name="heart" className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Main Heading */}
          <Heading level={1} align="center" className="mb-6 max-w-4xl mx-auto">
            Take Control of Your Health
          </Heading>

          {/* Description */}
          <p className="text-xl text-[#424242] mb-12 max-w-3xl mx-auto leading-relaxed">
            BP Fuel uses advanced camera technology and AI to monitor your blood
            pressure and analyze your meals. Get instant health insights without
            any external devices.
          </p>

          {/* CTA Button */}
          <div className="mb-16">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 text-lg"
            >
              Go to Dashboard
            </Button>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/bp-check")}
              className="h-16 flex items-center justify-center space-x-3"
            >
              <Icon name="heart" className="w-6 h-6" />
              <span>Check BP Now</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/meal-check")}
              className="h-16 flex items-center justify-center space-x-3"
            >
              <Icon name="camera" className="w-6 h-6" />
              <span>Log Meal</span>
            </Button>

            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="h-16 flex items-center justify-center space-x-3"
            >
              <Icon name="dashboard" className="w-6 h-6" />
              <span>View Dashboard</span>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
