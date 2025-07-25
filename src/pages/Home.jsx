// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";

// const Home = () => {
//   const webcamRef = useRef(null);
//   const [formData, setFormData] = useState({
//     age: "",
//     gender: "",
//     diet: "",
//     salt_intake: "",
//     exercise: "",
//     smoker: "",
//     alcohol: "",
//     prev_conditions: "",
//     height: "",
//     weight: "",
//     cholesterol: "",
//     gluc: ""
//   });
//   const [response, setResponse] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const captureAndSend = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();

//     if (!imageSrc) {
//       alert("Failed to capture image.");
//       return;
//     }

//     const base64Data = imageSrc.split(",")[1]; // remove data:image/... header

//     const payload = {
//       ...formData,
//       age: parseInt(formData.age),
//       height: parseInt(formData.height),
//       weight: parseInt(formData.weight),
//       cholesterol: parseInt(formData.cholesterol),
//       gluc: parseInt(formData.gluc),
//       prev_conditions: formData.prev_conditions.split(","), // convert string to array
//       image_data: base64Data
//     };

//     try {
//       const res = await fetch("http://127.0.0.1:5000/predict_health", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await res.json();
//       setResponse(result);
//     } catch (error) {
//       console.error("Error sending request:", error);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-4 space-y-4">
//       <h1 className="text-2xl font-bold text-center">BP Health Prediction</h1>

//       {/* Form */}
//       <div className="grid grid-cols-2 gap-4">
//         <input name="age" placeholder="Age" onChange={handleChange} className="border p-2 rounded" />
//         <input name="gender" placeholder="Gender (Male/Female)" onChange={handleChange} className="border p-2 rounded" />
//         <input name="diet" placeholder="Diet" onChange={handleChange} className="border p-2 rounded" />
//         <input name="salt_intake" placeholder="Salt Intake" onChange={handleChange} className="border p-2 rounded" />
//         <input name="exercise" placeholder="Exercise" onChange={handleChange} className="border p-2 rounded" />
//         <input name="smoker" placeholder="Smoker (Yes/No)" onChange={handleChange} className="border p-2 rounded" />
//         <input name="alcohol" placeholder="Alcohol (Yes/No)" onChange={handleChange} className="border p-2 rounded" />
//         <input name="prev_conditions" placeholder="Previous Conditions (comma separated)" onChange={handleChange} className="border p-2 rounded" />
//         <input name="height" placeholder="Height (cm)" onChange={handleChange} className="border p-2 rounded" />
//         <input name="weight" placeholder="Weight (kg)" onChange={handleChange} className="border p-2 rounded" />
//         <input name="cholesterol" placeholder="Cholesterol (1/2/3)" onChange={handleChange} className="border p-2 rounded" />
//         <input name="gluc" placeholder="Glucose (1/2/3)" onChange={handleChange} className="border p-2 rounded" />
//       </div>

//       {/* Webcam */}
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         className="rounded shadow-md mx-auto"
//         videoConstraints={{ width: 640, height: 480, facingMode: "user" }}
//       />

//       <button
//         onClick={captureAndSend}
//         className="px-4 py-2 bg-blue-600 text-white rounded shadow block mx-auto"
//       >
//         Capture & Predict
//       </button>

//       {/* Result */}
//       {response && (
//         <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
//           <p><strong>Systolic BP:</strong> {response.systolic_bp}</p>
//           <p><strong>Diastolic BP:</strong> {response.diastolic_bp}</p>
//           <p><strong>Tips:</strong> {response.tips?.join(", ")}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
















import React from 'react';
import { Hero } from '../components/home/sections/Hero';
import { Features } from '../components/home/sections/Features';
import { Stats } from '../components/home/sections/Stats';
import { Team } from '../components/home/sections/Team';
import { CTA } from '../components/home/sections/CTA';

export const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Stats />
      <Team />
      <CTA />
    </main>
  );
};