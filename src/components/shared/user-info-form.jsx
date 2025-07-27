import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form-input"
import { FormSelect } from "@/components/form-select"

export default function HealthForm() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    diet: "Healthy",
    salt_intake: "Low",
    exercise: "Often",
    smoker: "No",
    alcohol: "No",
    prev_conditions: "normal",
    height: "",
    weight: "",
  })

  const handleFormChange = (e ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSelectChange = (name , value ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFormSubmit = (e ) => {
    e.preventDefault()
    console.log("Form Data Submitted:", formData)
    // Add your logic to proceed to camera or other actions here
    alert("Form submitted! Check console for data.")
  }

  return (
    <div className="mx-auto max-w-lg p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Health Information</h2>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Age"
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleFormChange}
          />
          <FormSelect
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={(value) => handleSelectChange("gender", value)}
            placeholder="Select Gender"
            options={["Male", "Female"]}
          />
          <FormSelect
            label="Diet"
            name="diet"
            value={formData.diet}
            onChange={(value) => handleSelectChange("diet", value)}
            placeholder="Select Diet"
            options={["Healthy", "Average", "Poor"]}
          />
          <FormSelect
            label="Salt Intake"
            name="salt_intake"
            value={formData.salt_intake}
            onChange={(value) => handleSelectChange("salt_intake", value)}
            placeholder="Select Salt Intake"
            options={["Low", "Moderate", "High"]}
          />
          <FormSelect
            label="Exercise"
            name="exercise"
            value={formData.exercise}
            onChange={(value) => handleSelectChange("exercise", value)}
            placeholder="Select Exercise Level"
            options={["Often", "Rarely", "Never"]}
          />
          <FormSelect
            label="Smoker"
            name="smoker"
            value={formData.smoker}
            onChange={(value) => handleSelectChange("smoker", value)}
            placeholder="Are you a Smoker?"
            options={["No", "Yes"]}
          />
          {/* <FormSelect
            label="Alcohol Consumption"
            name="alcohol"
            value={formData.alcohol}
            onChange={(value) => handleSelectChange("alcohol", value)}
            placeholder="Do you consume Alcohol?"
            options={["No", "Yes"]}
          /> */}
          {/* <FormInput
            label="Previous Conditions"
            name="prev_conditions"
            type="text"
            placeholder="e.g., Hypertension"
            value={formData.prev_conditions}
            onChange={handleFormChange}
          /> */}
          <FormInput
            label="Height (cm)"
            name="height"
            type="number"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleFormChange}
          />
          <FormInput
            label="Weight (kg)"
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleFormChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Proceed to Camera
        </Button>
      </form>
    </div>
  )
}
