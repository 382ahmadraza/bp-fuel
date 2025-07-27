import React from "react";

export const CustomInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = "",
  ...props
}) => {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[#424242] mb-1"
        >
          {label} {required && <span className="text-[#F44336]">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50]
          ${error ? "border-[#F44336]" : "border-[#E0E0E0]"}
          bg-white text-[#424242] placeholder-[#9E9E9E]
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-[#F44336]">{error}</p>}
    </div>
  );
};
