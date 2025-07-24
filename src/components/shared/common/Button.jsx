import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false, 
  className = '', 
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#4CAF50] text-white hover:bg-[#45a049] focus:ring-[#4CAF50]',
    secondary: 'bg-[#2196F3] text-white hover:bg-[#1976D2] focus:ring-[#2196F3]',
    accent: 'bg-[#FF9800] text-white hover:bg-[#F57C00] focus:ring-[#FF9800]',
    outline: 'border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white',
    danger: 'bg-[#F44336] text-white hover:bg-[#D32F2F] focus:ring-[#F44336]',
    ghost: 'text-[#424242] hover:bg-[#F5F5F5]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};