import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../assets/icons';

export const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  color = '#4CAF50',
  onClick,
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (route) {
      navigate(route);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className={`
        bg-white p-6 rounded-xl shadow-lg border border-[#E0E0E0] 
        hover:shadow-xl transition-all duration-300 cursor-pointer
        group ${className}
      `}
    >
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon name={icon} className="w-6 h-6" style={{ color }} />
      </div>
      
      <h3 className="text-xl font-semibold text-[#212121] mb-2 group-hover:text-[#4CAF50] transition-colors">
        {title}
      </h3>
      
      <p className="text-[#424242] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};