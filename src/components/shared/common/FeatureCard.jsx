import React from "react";
import { Link } from "react-router-dom";
// import { HeartIcon, FoodIcon, ChartIcon, ReportIcon } from '../../../assets/icons';

const FeatureCard = ({
  title,
  description,
  table,
  icon,
  route,
  color = "bg-white",
  textColor = "text-heading",
  iconColor = "text-primary",
  hover = true,
  className = "",
}) => {

  return (
    <Link to={route} className="block">
      <article
        className={`${color} rounded-xl shadow-sm border border-borders p-6 transition-all duration-300 ${
          hover ? "hover:shadow-lg hover:scale-105 hover:-translate-y-1" : ""
        } ${className}`}
        style={{
          transformOrigin: "center",
          willChange: "transform, box-shadow",
        }}
      >
        <div className=" ">
          <div className="  mb-4">{icon}</div>

          <h3 className={`text-xl font-semibold ${textColor} mb-3`}>{title}</h3>
          <p className="text-mutedText leading-relaxed">{description}</p>
          {table && table.length > 0 && (
            <ul className="mt-4 space-y-2">
              {table.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-700"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Link>
  );
};

export default FeatureCard;
