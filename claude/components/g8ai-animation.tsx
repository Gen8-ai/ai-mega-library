import React, { useState, useEffect } from 'react';

interface AnimatedTextProps {
  text?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text = 'G8AI' }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const letters = text.split('');

  return (
    <div className="h-96 w-full flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-red-900 overflow-hidden">
      <div 
        className={`
          relative 
          flex 
          transform-gpu 
          transition-transform 
          duration-1000
          ${hover ? 'scale-110' : 'scale-100'}
        `}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {letters.map((letter, index) => (
          <div
            key={index}
            className={`
              text-8xl 
              font-bold 
              text-transparent 
              bg-clip-text 
              bg-gradient-to-br 
              from-purple-400 
              to-pink-300
              transform-gpu 
              transition-all 
              duration-1000
              hover:from-pink-400 
              hover:to-purple-300
              ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-80'}
              animate-float
            `}
            style={{
              animation: `float 3s ease-in-out infinite`,
              animationDelay: `${index * 0.2}s`,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {letter}
          </div>
        ))}
        <div 
          className={`
            absolute 
            inset-0 
            blur-xl 
            opacity-50 
            bg-gradient-to-r 
            from-purple-500 
            to-pink-500
            transition-opacity 
            duration-1000
            ${isAnimating ? 'opacity-50' : 'opacity-30'}
          `}
        />
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
`;
document.head.appendChild(style);

export default AnimatedText;