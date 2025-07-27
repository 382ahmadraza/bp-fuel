import React from "react";
import { Container } from "../../shared/layout/Container";
import FeatureCard from "../../shared/common/FeatureCard";
import {
  HeartIcon,
  FoodIcon,
  ChartIcon,
  ReportIcon,
} from "../../../assets/icons";
import Heading from "../../shared/common/custom-heading";

export const Features = () => {
  const featuresData = [
    {
      id: "bp-detection",
      title: "BP Detection",
      description:
        "Monitor your blood pressure using advanced camera-based detection technology with real-time analysis.",
      icon: <HeartIcon className="w-12 h-12 text-red-600" />,
      route: "/bp-detection",
      color: "bg-red-50",
      iconColor: "text-red-600",
      table: [
        "Camera-based detection",
        "Real-time analysis",
        "No contact required",
        "Instant results",
      ],
    },
    {
      id: "meal-analysis",
      title: "Meal Analysis",
      description:
        "Analyze your meals using AI-powered food recognition and get detailed nutritional insights.",
      icon: <FoodIcon className="w-12 h-12 text-green-600" />,
      route: "/meal-analysis",
      color: "bg-green-50",
      iconColor: "text-green-600",
      table: [
        "AI food recognition",
        "Nutritional breakdown",
        "Health recommendations",
        "Calorie tracking",
      ],
    },
    {
      id: "health-tracking",
      title: "Health Tracking",
      description:
        "Track your health progress with detailed analytics and personalized insights over time.",
      icon: <ChartIcon className="w-12 h-12 text-blue-600" />,
      route: "/dashboard",
      color: "bg-blue-50",
      iconColor: "text-blue-600",
      table: [
        "Progress tracking",
        "Health analytics",
        "Trend analysis",
        "Goal setting",
      ],
    },
    {
      id: "reports",
      title: "Health Reports",
      description:
        "Generate comprehensive health reports for medical consultations and tracking.",
      icon: <ReportIcon className="w-12 h-12 text-purple-600" />,
      route: "/reports",
      color: "bg-purple-50",
      iconColor: "text-purple-600",
      // No table property - will be conditionally skipped
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <Container>
        <div className="text-center mb-12">
          <Heading
            CustomHeading="Advanced Health Technology"
            CustomHeadingStyle="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          />
           
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of health monitoring with our AI-powered
            camera-based detection and analysis tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
