import React from 'react';

export const Heading = ({ 
  level = 1, 
  children, 
  className = '', 
  color = 'primary',
  align = 'left',
  weight = 'bold'
}) => {
  const colors = {
    primary: 'text-[#212121]',
    secondary: 'text-[#424242]',
    muted: 'text-[#9E9E9E]',
    green: 'text-[#4CAF50]',
    blue: 'text-[#2196F3]',
    white: 'text-white'
  };

  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  const baseClasses = `${colors[color]} ${alignments[align]} ${weights[weight]} ${className}`;

  const HeadingTag = `h${level}`;
  
  const sizes = {
    1: 'text-4xl md:text-5xl lg:text-6xl',
    2: 'text-3xl md:text-4xl lg:text-5xl',
    3: 'text-2xl md:text-3xl lg:text-4xl',
    4: 'text-xl md:text-2xl lg:text-3xl',
    5: 'text-lg md:text-xl lg:text-2xl',
    6: 'text-base md:text-lg lg:text-xl'
  };

  return React.createElement(
    HeadingTag,
    { className: `${baseClasses} ${sizes[level]}` },
    children
  );
};