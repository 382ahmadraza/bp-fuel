import React from "react";

const iconMap = {
  heart: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
  food: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      />
    </svg>
  ),
  chart: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
};

const StatCard = ({ number, label, description, icon, delay = 0 }) => {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <article
      className="text-center animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {IconComponent && (
        <IconComponent className="w-12 h-12 text-green-600 mx-auto mb-3" />
      )}
      <h3 className="text-4xl font-bold text-green-600 mb-2">{number}</h3>
      <p className="text-lg font-medium text-gray-800 mb-1">{label}</p>
      {description && (
        <p className="text-sm font-medium text-gray-600">{description}</p>
      )}
    </article>
  );
};

export default StatCard;
