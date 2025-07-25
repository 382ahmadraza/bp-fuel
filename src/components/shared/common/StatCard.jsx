import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '../../../assets/icons';

export const StatCard = ({ 
  label, 
  value, 
  icon, 
  color = '#4CAF50',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg text-center group hover:shadow-xl transition-all duration-300"
    >
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon name={icon} className="w-8 h-8" style={{ color }} />
      </div>
      
      <div className="text-3xl font-bold text-[#212121] mb-2" style={{ color }}>
        {value}
      </div>
      
      <div className="text-[#424242] font-medium">
        {label}
      </div>
    </motion.div>
  );
};