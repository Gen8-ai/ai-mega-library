import React from 'react';

interface GradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  children,
  className = ''
}) => {
  return (
    <div 
      className={`
        relative min-h-screen w-full
        bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
        before:absolute before:inset-0
        before:bg-[radial-gradient(circle,rgba(25,49,77,0.2)_1px,transparent_1px)]
        before:bg-[length:24px_24px]
        before:opacity-50
        after:absolute after:inset-0
        after:bg-gradient-to-tr from-transparent via-blue-950/10 to-transparent
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GradientBackground;