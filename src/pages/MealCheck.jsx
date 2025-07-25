import React, { useState, useRef } from 'react';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Button } from '../components/shared/common/Button';
import { CustomInput } from '../components/shared/common/CustomInput';
import { Icon } from '../assets/icons';
import { storage } from '../utils/storage';
import { analyzeMeal } from '../utils/health';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



const GEMINI_API_KEY = 'AIzaSyC0eXKBxm70jNI1hgQhZzj-QtvVSYWMNqw';


export const MealCheck = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [mealName, setMealName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        simulateMealAnalysis(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1]; // remove prefix
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };
  

const simulateMealAnalysis = async (file) => {
  try {
    setIsAnalyzing(true);
    toast.loading('Analyzing your meal...');

    const base64Image = await convertToBase64(file);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a nutritionist. Analyze this meal image and return JSON like:
{
  "name": "Meal Name",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number
}`,
                },
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    toast.dismiss();

    const contentText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!contentText) throw new Error('No response from Gemini.');

    let result;
    try {
      result = JSON.parse(contentText);
    } catch (err) {
      throw new Error('Failed to parse JSON from Gemini response');
    }

    setMealName(result.name || '');
    setCalories(result.calories?.toString() || '');
    setProtein(result.protein?.toString() || '');
    setCarbs(result.carbs?.toString() || '');
    setFat(result.fat?.toString() || '');

    toast.success('Meal analyzed successfully!');
  } catch (error) {
    console.error('Gemini error:', error);
    toast.dismiss();
    toast.error(error.message || 'Could not analyze the meal.');
  } finally {
    setIsAnalyzing(false);
  }
};



  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!mealName || !calories) {
      toast.error('Please enter meal name and calories');
      return;
    }

    const caloriesNum = parseInt(calories);
    const proteinNum = protein ? parseInt(protein) : 0;
    const carbsNum = carbs ? parseInt(carbs) : 0;
    const fatNum = fat ? parseInt(fat) : 0;

    const analysis = analyzeMeal(caloriesNum, proteinNum, carbsNum, fatNum);
    const now = new Date();
    
    const meal = {
      id: Date.now().toString(),
      name: mealName,
      image: uploadedImage,
      calories: caloriesNum,
      protein: proteinNum,
      carbs: carbsNum,
      fat: fatNum,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].slice(0, 5),
      isHealthy: analysis.isHealthy
    };

    storage.addMeal(meal);
    setResult({ meal, analysis });
    toast.success('Meal saved successfully!');
  };

  if (result) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] py-8">
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <div 
                className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  result.analysis.isHealthy ? 'bg-green-100' : 'bg-orange-100'
                }`}
              >
                <Icon 
                  name="utensils" 
                  className={`w-12 h-12 ${
                    result.analysis.isHealthy ? 'text-[#4CAF50]' : 'text-[#FF9800]'
                  }`} 
                />
              </div>
              
              <Heading level={2} align="center" className="mb-2">
                {result.meal.name}
              </Heading>
              
              <div className="text-3xl font-bold text-[#212121] mb-2">
                {result.meal.calories} Calories
              </div>
              
              <div 
                className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
                  result.analysis.isHealthy 
                    ? 'bg-green-100 text-[#4CAF50]' 
                    : 'bg-orange-100 text-[#FF9800]'
                }`}
              >
                {result.analysis.isHealthy ? 'Healthy Choice' : 'Moderate Choice'}
              </div>
            </div>

            {result.meal.image && (
              <div className="mb-6">
                <img 
                  src={result.meal.image} 
                  alt="Meal" 
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-[#FAFAFA] rounded-lg">
                <div className="text-2xl font-bold text-[#4CAF50]">{result.meal.protein}g</div>
                <div className="text-sm text-[#424242]">Protein</div>
              </div>
              <div className="text-center p-4 bg-[#FAFAFA] rounded-lg">
                <div className="text-2xl font-bold text-[#2196F3]">{result.meal.carbs}g</div>
                <div className="text-sm text-[#424242]">Carbs</div>
              </div>
              <div className="text-center p-4 bg-[#FAFAFA] rounded-lg">
                <div className="text-2xl font-bold text-[#FF9800]">{result.meal.fat}g</div>
                <div className="text-sm text-[#424242]">Fat</div>
              </div>
            </div>

            <div className="bg-[#FAFAFA] p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-[#212121] mb-2">Recommendations:</h4>
              <ul className="text-[#424242] space-y-1">
                {result.analysis.recommendations.map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setResult(null);
                  setMealName('');
                  setCalories('');
                  setProtein('');
                  setCarbs('');
                  setFat('');
                  setUploadedImage(null);
                }}
              >
                Log Another Meal
              </Button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-8">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Heading level={1} align="center" className="mb-4">
              Meal <span className="text-[#FF9800]">Analysis</span>
            </Heading>
            <p className="text-[#424242]">
              Upload a photo or manually enter your meal details for nutritional analysis
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Image Upload */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#212121] mb-4">Upload Meal Photo</h3>
                <div className="bg-[#FAFAFA] p-6 rounded-lg border-2 border-dashed border-[#E0E0E0] mb-4">
                  {uploadedImage ? (
                    <div>
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded meal" 
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setUploadedImage(null)}
                      >
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Icon name="upload" className="w-8 h-8 text-[#FF9800]" />
                      </div>
                      <p className="text-[#424242] mb-4">
                        Click to upload meal photo for AI analysis
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button 
                        variant="secondary" 
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Choose Photo'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Entry */}
              <div>
                <h3 className="text-lg font-semibold text-[#212121] mb-4">Manual Entry</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <CustomInput
                    label="Meal Name"
                    placeholder="e.g., Chicken Caesar Salad"
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    required
                  />
                  
                  <CustomInput
                    label="Calories"
                    type="number"
                    placeholder="450"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                  />
                  
                  <div className="grid grid-cols-3 gap-2">
                    <CustomInput
                      label="Protein (g)"
                      type="number"
                      placeholder="35"
                      value={protein}
                      onChange={(e) => setProtein(e.target.value)}
                    />
                    
                    <CustomInput
                      label="Carbs (g)"
                      type="number"
                      placeholder="12"
                      value={carbs}
                      onChange={(e) => setCarbs(e.target.value)}
                    />
                    
                    <CustomInput
                      label="Fat (g)"
                      type="number"
                      placeholder="28"
                      value={fat}
                      onChange={(e) => setFat(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Analyze Meal
                  </Button>
                </form>
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#FF9800] mb-2">Nutrition Tips:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#424242]">
                <div>• Aim for balanced macronutrients</div>
                <div>• Include plenty of vegetables</div>
                <div>• Watch portion sizes</div>
                <div>• Stay hydrated with meals</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};