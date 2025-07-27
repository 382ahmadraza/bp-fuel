import React from 'react';

const Heading = ({ 
  CustomHeading, 
  CustomHeadingStyle, 
  level = 2 
}) => {
  const Tag = `h${level}`; // Dynamically create the heading tag (h1, h2, etc.)
  
  return (
    <Tag className={`alegreya-sc w-full leading-4 sm:leading-12 text-lg sm:text-2xl lg:text-4xl ${CustomHeadingStyle}`}>
      {CustomHeading}
    </Tag>
  );
};

export default Heading;
