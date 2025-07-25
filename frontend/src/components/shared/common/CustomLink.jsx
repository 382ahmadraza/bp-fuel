import React from 'react';
import { Link } from 'react-router-dom';

export const CustomLink = ({ 
  to, 
  children, 
  variant = 'default', 
  className = '', 
  external = false,
  ...props 
}) => {
  const variants = {
    default: 'text-[#4CAF50] hover:text-[#45a049] transition-colors',
    button: 'bg-[#4CAF50] text-white px-4 py-2 rounded-lg hover:bg-[#45a049] transition-colors inline-block',
    nav: 'text-[#424242] hover:text-[#4CAF50] transition-colors font-medium',
    footer: 'text-[#9E9E9E] hover:text-white transition-colors'
  };

  const linkClasses = `${variants[variant]} ${className}`;

  if (external) {
    return (
      <a 
        href={to} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={linkClasses}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={linkClasses} {...props}>
      {children}
    </Link>
  );
};