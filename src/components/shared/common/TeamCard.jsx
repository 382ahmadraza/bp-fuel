import React from "react";
import { motion } from "framer-motion";

export const TeamCard = ({
  name,
  role,
  description,
  image,
  color = "#4CAF50",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className="w-32 h-32 rounded-full mb-4 bg-cover bg-center border-4"
          style={{
            backgroundImage: `url(${image})`,
            borderColor: color,
          }}
        />

        <h3 className="text-xl font-bold text-[#212121] mb-1">{name}</h3>

        <div
          className="text-sm font-semibold mb-3 px-3 py-1 rounded-full"
          style={{
            backgroundColor: `${color}20`,
            color: color,
          }}
        >
          {role}
        </div>

        <p className="text-[#424242] leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};
