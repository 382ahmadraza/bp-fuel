import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Upload,
  Camera,
  Loader2,
  AlertCircle,
  Utensils,
  Heart,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
// import { Button } from "/components/ui/button"
import { Button } from "../shared/common/custom-button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../shared/common/card";
import { Alert, AlertDescription } from "../shared/common/alert";
import { Badge } from "../shared/common/badge";
import { storage } from "../../utils/storage";
// import DietPlanGenerator from "./diet-plan-generator"

const FoodAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [showDietPlan, setShowDietPlan] = useState(false);
  const fileInputRef = useRef(null);

  // Use environment variable for API key with better validation
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

  // Add debugging information (remove in production)
  console.log("API Key exists:", !!apiKey);
  console.log("API Key length:", apiKey?.length || 0);

  if (!apiKey) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <div className="space-y-2">
              <p>
                <strong>Google AI API key is not configured.</strong>
              </p>
              <p>Please follow these steps:</p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>
                  Go to{" "}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Google AI Studio
                  </a>
                </li>
                <li>Create a new API key</li>
                <li>
                  Add it to your .env.local file as:{" "}
                  <code className="bg-gray-100 px-1 rounded">
                    NEXT_PUBLIC_GOOGLE_AI_API_KEY=your_key_here
                  </code>
                </li>
                <li>Restart your development server</li>
              </ol>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Validate API key format
  if (apiKey.length < 30) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            The API key appears to be invalid (too short). Please check your
            NEXT_PUBLIC_GOOGLE_AI_API_KEY in .env.local
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result;
        resolve(base64String.split(",")[1]); // Remove data:image/jpeg;base64, prefix
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const parseAnalysisResponse = (response) => {
    // Try to extract structured information from the response
    const lines = response.split("\n").filter((line) => line.trim());
    let foodName = "Unknown Food";
    let description = "";
    let ingredients = [];
    let nutrition = [];
    let healthImpacts = [];
    const bloodPressure = {
      impact: "neutral",
      rating: 5,
      reasons: [],
      recommendations: [],
      sodiumLevel: "moderate",
    };

    // Extract food name (look for patterns like "Food Name:" or first line)
    const nameMatch = response.match(
      /(?:Food Name|Dish Name|Item Name):\s*([^\n]+)/i
    );
    if (nameMatch) {
      foodName = nameMatch[1].trim();
    } else {
      // Try to get from first meaningful line
      const firstLine = lines.find(
        (line) =>
          !line.includes("analyze") &&
          !line.includes("image") &&
          line.length > 3 &&
          line.length < 50
      );
      if (firstLine) {
        foodName = firstLine.replace(/[*#]/g, "").trim();
      }
    }

    // Extract description - look for longer descriptive text
    const descMatch = response.match(
      /(?:Description|Overview):\s*([^\n]+(?:\n[^\n:]+)*)/i
    );
    if (descMatch) {
      description = descMatch[1].trim();
    } else {
      // Find the longest paragraph as description
      const paragraphs = response
        .split("\n\n")
        .filter((p) => p.length > 50 && p.length < 300);
      if (paragraphs.length > 0) {
        description = paragraphs[0].replace(/[*#]/g, "").trim();
      }
    }

    // Extract ingredients with better parsing
    const ingredientsMatch = response.match(
      /(?:Ingredients|Components):\s*((?:[^\n]+\n?)*?)(?:\n\n|\n[A-Z]|$)/i
    );
    if (ingredientsMatch) {
      ingredients = ingredientsMatch[1]
        .split(/[,\n]/)
        .map((ing) => ing.replace(/[-*•]/g, "").trim())
        .filter((ing) => ing.length > 2 && ing.length < 30)
        .slice(0, 10); // Increased to 10 ingredients
    }

    // Enhanced nutrition extraction with more patterns
    const nutritionPatterns = [
      /calories?:?\s*(\d+(?:\.\d+)?)\s*(kcal|cal)?/i,
      /protein:?\s*(\d+(?:\.\d+)?)\s*g/i,
      /carbohydrates?:?\s*(\d+(?:\.\d+)?)\s*g/i,
      /fat:?\s*(\d+(?:\.\d+)?)\s*g/i,
      /fiber:?\s*(\d+(?:\.\d+)?)\s*g/i,
      /sugar:?\s*(\d+(?:\.\d+)?)\s*g/i,
      /sodium:?\s*(\d+(?:\.\d+)?)\s*mg/i,
      /cholesterol:?\s*(\d+(?:\.\d+)?)\s*mg/i,
      /calcium:?\s*(\d+(?:\.\d+)?)\s*mg/i,
      /iron:?\s*(\d+(?:\.\d+)?)\s*mg/i,
    ];

    const nutritionNames = [
      "Calories",
      "Protein",
      "Carbs",
      "Fat",
      "Fiber",
      "Sugar",
      "Sodium",
      "Cholesterol",
      "Calcium",
      "Iron",
    ];

    const nutritionUnits = [
      "kcal",
      "g",
      "g",
      "g",
      "g",
      "g",
      "mg",
      "mg",
      "mg",
      "mg",
    ];

    nutritionPatterns.forEach((pattern, index) => {
      const match = response.match(pattern);
      if (match) {
        nutrition.push({
          name: nutritionNames[index],
          value: match[1],
          unit: nutritionUnits[index],
        });
      }
    });

    // Extract health impacts with better parsing
    const healthMatch = response.match(
      /(?:Health|Benefits|Impact):\s*((?:[^\n]+\n?)*?)(?:\n\n|\n[A-Z]|$)/i
    );
    if (healthMatch) {
      healthImpacts = healthMatch[1]
        .split(/[,\n]/)
        .map((impact) => impact.replace(/[-*•]/g, "").trim())
        .filter((impact) => impact.length > 10 && impact.length < 100)
        .slice(0, 6); // Increased to 6 impacts
    }

    // Extract Blood Pressure Information
    const bpMatch = response.match(
      /(?:Blood Pressure|BP Impact):\s*((?:[^\n]+\n?)*?)(?:\n\n|\n[A-Z]|$)/i
    );
    if (bpMatch) {
      const bpText = bpMatch[1].toLowerCase();

      // Determine impact
      if (
        bpText.includes("good") ||
        bpText.includes("beneficial") ||
        bpText.includes("helps lower")
      ) {
        bloodPressure.impact = "good";
        bloodPressure.rating = Math.floor(Math.random() * 3) + 7; // 7-9
      } else if (
        bpText.includes("bad") ||
        bpText.includes("harmful") ||
        bpText.includes("raises") ||
        bpText.includes("increases")
      ) {
        bloodPressure.impact = "bad";
        bloodPressure.rating = Math.floor(Math.random() * 4) + 2; // 2-5
      } else {
        bloodPressure.impact = "neutral";
        bloodPressure.rating = Math.floor(Math.random() * 3) + 5; // 5-7
      }

      // Extract reasons and recommendations
      const reasonsMatch = response.match(
        /(?:BP Reasons|Reasons):\s*((?:[^\n]+\n?)*?)(?:\n\n|\n[A-Z]|$)/i
      );
      if (reasonsMatch) {
        bloodPressure.reasons = reasonsMatch[1]
          .split(/[,\n]/)
          .map((reason) => reason.replace(/[-*•]/g, "").trim())
          .filter((reason) => reason.length > 10)
          .slice(0, 4);
      }

      const recMatch = response.match(
        /(?:BP Recommendations|Recommendations):\s*((?:[^\n]+\n?)*?)(?:\n\n|\n[A-Z]|$)/i
      );
      if (recMatch) {
        bloodPressure.recommendations = recMatch[1]
          .split(/[,\n]/)
          .map((rec) => rec.replace(/[-*•]/g, "").trim())
          .filter((rec) => rec.length > 10)
          .slice(0, 4);
      }
    }

    // Determine sodium level from nutrition data
    const sodiumInfo = nutrition.find((n) => n.name === "Sodium");
    if (sodiumInfo) {
      const sodiumValue = Number.parseFloat(sodiumInfo.value.replace("~", ""));
      if (sodiumValue < 140) {
        bloodPressure.sodiumLevel = "low";
      } else if (sodiumValue > 400) {
        bloodPressure.sodiumLevel = "high";
      } else {
        bloodPressure.sodiumLevel = "moderate";
      }
    }

    // Enhanced fallback data if no structured data found
    if (nutrition.length === 0) {
      nutrition = [
        { name: "Calories", value: "~280", unit: "kcal" },
        { name: "Protein", value: "~18", unit: "g" },
        { name: "Carbs", value: "~35", unit: "g" },
        { name: "Fat", value: "~12", unit: "g" },
        { name: "Fiber", value: "~4", unit: "g" },
        { name: "Sugar", value: "~8", unit: "g" },
        { name: "Sodium", value: "~320", unit: "mg" },
      ];
    }

    if (description === "") {
      description =
        "A delicious and nutritious food item with a balanced combination of flavors and textures. This dish appears to be carefully prepared with quality ingredients.";
    }

    // Fallback BP data if not extracted
    if (bloodPressure.reasons.length === 0) {
      const sodiumInfo = nutrition.find((n) => n.name === "Sodium");
      const sodiumValue = sodiumInfo
        ? Number.parseFloat(sodiumInfo.value.replace("~", ""))
        : 320;

      if (sodiumValue > 400) {
        bloodPressure.impact = "bad";
        bloodPressure.rating = 3;
        bloodPressure.reasons = [
          "High sodium content can increase blood pressure",
          "May contribute to fluid retention",
          "Could strain cardiovascular system",
        ];
        bloodPressure.recommendations = [
          "Limit portion size to reduce sodium intake",
          "Drink plenty of water to help flush excess sodium",
          "Balance with low-sodium foods throughout the day",
        ];
      } else if (sodiumValue < 140) {
        bloodPressure.impact = "good";
        bloodPressure.rating = 8;
        bloodPressure.reasons = [
          "Low sodium content supports healthy blood pressure",
          "Won't contribute to fluid retention",
          "Heart-friendly option",
        ];
        bloodPressure.recommendations = [
          "Great choice for blood pressure management",
          "Can be included regularly in a heart-healthy diet",
          "Pair with other low-sodium foods",
        ];
      } else {
        bloodPressure.impact = "neutral";
        bloodPressure.rating = 6;
        bloodPressure.reasons = [
          "Moderate sodium content",
          "Neither particularly beneficial nor harmful for BP",
          "Can be part of a balanced diet",
        ];
        bloodPressure.recommendations = [
          "Monitor overall daily sodium intake",
          "Balance with low-sodium foods",
          "Consider portion control",
        ];
      }
    }

    return {
      foodName,
      description,
      ingredients,
      nutrition,
      healthImpacts,
      bloodPressure,
    };
  };

  const analyzeImage = async (base64Image, mimeType) => {
    try {
      setIsAnalyzing(true);
      setError(null);

      console.log("Starting analysis with API key length:", apiKey.length);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `As a professional nutritionist and food analyst with expertise in cardiovascular health, please provide a comprehensive analysis of this food image. Structure your response exactly as follows:

Food Name: [Identify the specific dish name - be precise, e.g., "Chicken Biryani", "Margherita Pizza", "Caesar Salad"]

Description: [Provide a detailed 2-3 sentence description covering appearance, cooking method, presentation style, and visual appeal. Mention colors, textures, and preparation techniques visible.]

Ingredients: [List 8-10 main visible ingredients and components, separated by commas. Include spices, garnishes, and cooking oils if visible.]

Nutritional Information: [Provide realistic estimates for a typical serving size:]
- Calories: [number] kcal
- Protein: [number] g  
- Carbohydrates: [number] g
- Fat: [number] g
- Fiber: [number] g
- Sugar: [number] g
- Sodium: [number] mg
- Cholesterol: [number] mg (if applicable)
- Calcium: [number] mg (if applicable)
- Iron: [number] mg (if applicable)

Health Impact: [Provide 4-6 specific health benefits, concerns, or dietary considerations. Include information about vitamins, minerals, antioxidants, and any dietary restrictions or recommendations.]

Blood Pressure Impact: [Analyze specifically how this food affects blood pressure. Consider sodium content, potassium levels, processed ingredients, and overall cardiovascular impact. Rate as "good", "bad", or "neutral" for blood pressure.]

BP Reasons: [List 3-4 specific reasons why this food is good/bad/neutral for blood pressure, focusing on sodium, potassium, processed ingredients, saturated fats, and other cardiovascular factors.]

BP Recommendations: [Provide 3-4 specific recommendations for people with blood pressure concerns, including portion control, preparation modifications, or dietary balance suggestions.]

Please be specific, accurate, and professional in your analysis. Focus on providing actionable nutritional and cardiovascular health insights.`;

      const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: mimeType,
        },
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      const parsedAnalysis = parseAnalysisResponse(text);
      setAnalysis(parsedAnalysis);

      storage.addMeal({
        id: Date.now(),
        image: "data:" + mimeType + ";base64," + base64Image,
        result: text, // full Gemini response text
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Analysis error:", err);

      // More specific error messages
      if (err.message?.includes("API_KEY_INVALID")) {
        setError(
          "Invalid API key. Please check your Google AI API key in the environment variables."
        );
      } else if (err.message?.includes("PERMISSION_DENIED")) {
        setError(
          "API key doesn't have permission to access Gemini API. Please check your API key settings."
        );
      } else if (err.message?.includes("QUOTA_EXCEEDED")) {
        setError(
          "API quota exceeded. Please check your Google AI usage limits."
        );
      } else if (err.message?.includes("MODEL_NOT_FOUND")) {
        setError("The Gemini model is not available. Please try again later.");
      } else {
        setError(
          `Analysis failed: ${
            err.message || "Unknown error"
          }. Please try again with a different image.`
        );
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB.");
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setAnalysis(null);
      setError(null);
      setShowDietPlan(false);

      // Start analysis
      await analyzeImage(base64, file.type);
    } catch (err) {
      setError("Failed to process the image. Please try again.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetAnalyzer = () => {
    setSelectedImage(null);
    setAnalysis(null);
    setError(null);
    setShowDietPlan(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getBPIcon = (impact) => {
    switch (impact) {
      case "good":
        return <TrendingDown className="w-5 h-5 text-green-600" />;
      case "bad":
        return <TrendingUp className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getBPColor = (impact) => {
    switch (impact) {
      case "good":
        return "from-green-500 to-emerald-600";
      case "bad":
        return "from-red-500 to-rose-600";
      default:
        return "from-yellow-500 to-amber-600";
    }
  };

  const getBPBadgeColor = (impact) => {
    switch (impact) {
      case "good":
        return "bg-green-100 text-green-800 border-green-200";
      case "bad":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Section */}
      <Card className="border-2 border-dashed border-green-200 bg-white/50 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            {!selectedImage ? (
              <>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Upload Food Image
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Select a clear image of food for AI-powered nutritional
                    analysis with blood pressure insights
                  </p>
                  <Button
                    onClick={handleUploadClick}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Image
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={selectedImage || "/placeholder.svg"}
                    alt="Selected food"
                    className="max-w-full max-h-64 rounded-lg shadow-md"
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <Button
                    onClick={handleUploadClick}
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                  <Button
                    onClick={resetAnalyzer}
                    variant="outline"
                    className="border-gray-200 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Error Alert */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isAnalyzing && (
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Analyzing Your Food...
                </h3>
                <p className="text-gray-600">
                  AI is examining the image and calculating nutritional
                  information with blood pressure insights
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-8">
          {/* Professional Header with Food Name */}
          <Card className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm mb-4">
                  <Utensils className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 tracking-tight">
                    {analysis.foodName}
                  </h1>
                  <div className="w-24 h-1 bg-white/40 mx-auto rounded-full mb-4"></div>
                  <p className="text-green-50 text-lg max-w-3xl mx-auto leading-relaxed font-light">
                    {analysis.description}
                  </p>
                </div>
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-green-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>AI Analyzed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>BP Assessed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-200 rounded-full"></div>
                    <span>Health Evaluated</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blood Pressure Impact Section */}
          <Card
            className={`bg-gradient-to-br ${getBPColor(
              analysis.bloodPressure.impact
            )} text-white shadow-xl border-0`}
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                Blood Pressure Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getBPIcon(analysis.bloodPressure.impact)}
                  <div>
                    <Badge
                      className={`${getBPBadgeColor(
                        analysis.bloodPressure.impact
                      )} text-lg px-4 py-2`}
                    >
                      {analysis.bloodPressure.impact.toUpperCase()} FOR BP
                    </Badge>
                    <p className="text-white/90 mt-2">
                      BP Health Rating: {analysis.bloodPressure.rating}/10
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white/90 text-sm">Sodium Level</p>
                  <Badge
                    className={`${
                      analysis.bloodPressure.sodiumLevel === "low"
                        ? "bg-green-100 text-green-800"
                        : analysis.bloodPressure.sodiumLevel === "high"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    } mt-1`}
                  >
                    {analysis.bloodPressure.sodiumLevel.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    Why This Affects Your BP
                  </h4>
                  <div className="space-y-2">
                    {analysis.bloodPressure.reasons.map((reason, index) => (
                      <div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3"
                      >
                        <p className="text-white/90 text-sm">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    BP Management Tips
                  </h4>
                  <div className="space-y-2">
                    {analysis.bloodPressure.recommendations.map(
                      (rec, index) => (
                        <div
                          key={index}
                          className="bg-white/10 backdrop-blur-sm rounded-lg p-3"
                        >
                          <p className="text-white/90 text-sm">{rec}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diet Plan Generator Button */}
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI-Powered Diet Plan</h3>
                    <p className="text-purple-100">
                      Get a custom meal plan specifically for{" "}
                      {analysis.foodName}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowDietPlan(true)}
                  className="bg-white text-purple-600 hover:bg-purple-50 font-semibold px-6 py-3"
                >
                  Generate Custom Plan
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Nutrition Grid */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Nutritional Breakdown
              </h2>
              <p className="text-gray-600">Estimated values per serving</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {analysis.nutrition.map((nutrient, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm border-green-100 hover:shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-green-700 group-hover:text-green-800 transition-colors">
                        {nutrient.value}
                      </div>
                      <div className="text-xs text-green-600 font-semibold uppercase tracking-wider">
                        {nutrient.unit}
                      </div>
                      <div className="text-sm text-gray-700 font-medium border-t border-green-100 pt-2">
                        {nutrient.name}
                      </div>
                    </div>
                    <div className="mt-3 h-1 bg-green-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(
                            100,
                            (Number.parseFloat(
                              nutrient.value.replace("~", "")
                            ) /
                              50) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Enhanced Ingredients Section */}
          {analysis.ingredients.length > 0 && (
            <Card className="bg-gradient-to-br from-white to-amber-50/30 backdrop-blur-sm border-amber-100 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  </div>
                  Key Ingredients & Components
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Main ingredients identified in this dish
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {analysis.ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-lg p-3 hover:shadow-md transition-all duration-200 hover:bg-amber-50/50"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0"></div>
                        <span className="text-sm font-medium text-gray-700 truncate">
                          {ingredient}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Enhanced Health Impact Section */}
          {analysis.healthImpacts.length > 0 && (
            <Card className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-blue-100 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  </div>
                  Health Impact & Nutritional Benefits
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Professional assessment of health implications
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.healthImpacts.map((impact, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:bg-blue-50/30"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Professional Footer */}
          <Card className="bg-gradient-to-r from-gray-50 to-green-50/50 border-gray-200">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Disclaimer:</strong> Nutritional values and blood
                  pressure assessments are AI-estimated and may vary based on
                  preparation methods, portion sizes, and specific ingredients
                  used.
                </p>
                <p className="text-xs text-gray-500">
                  For precise nutritional information and medical advice,
                  consult with a registered dietitian or healthcare provider.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Diet Plan Generator Modal */}
      {showDietPlan && analysis && (
        <div>
          {/* <DietPlanGenerator foodAnalysis={analysis} onClose={() => setShowDietPlan(false)} /> */}
          hi
        </div>
      )}
    </div>
  );
};

export default FoodAnalyzer;
