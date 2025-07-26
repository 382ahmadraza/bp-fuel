// import FoodAnalyzer from "../components/food-analyzer"
// import SetupGuide from "@/components/setup-guide"

import FoodAnalyzer from "../components/meal/food-analysis"

export default function Home() {
  // Check if API key is configured
// Vite-based React project
const hasApiKey = !!import.meta.env.VITE_GOOGLE_AI_API_KEY;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">AI Food Analyzer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of your food and get instant AI-powered nutritional analysis with blood pressure insights and
            personalized diet plans.
          </p>
        </div>

        {hasApiKey && <FoodAnalyzer /> }
      </div>
    </div>
  )
}
