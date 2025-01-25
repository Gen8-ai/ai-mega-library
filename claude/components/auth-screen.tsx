import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const InputField = ({ icon: Icon, type, placeholder }) => (
  <div className="relative w-full mb-4">
    <Icon className="absolute left-3 top-3 text-gray-400" size={20} />
    <input
      type={type}
      placeholder={placeholder}
      className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg 
        focus:outline-none focus:border-blue-500 transition-colors"
    />
  </div>
);

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Forms */}
      <div className="w-1/2 p-12 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Sign in to access your account' 
                : 'Join us and start your journey'}
            </p>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <InputField
                icon={User}
                type="text"
                placeholder="Full Name"
              />
            )}
            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
            />
            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
            />
            
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg
              hover:bg-blue-700 transition-colors duration-300 flex items-center 
              justify-center gap-2 group">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel - CTA */}
      <div className="w-1/2 bg-blue-600 p-12 flex items-center justify-center text-white relative overflow-hidden">
        <div className="relative z-10 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </h3>
          <p className="mb-8 text-blue-100">
            {isLogin 
              ? 'Join us and start your journey today'
              : 'Sign in to access your account'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="border-2 border-white px-8 py-2 rounded-lg
              hover:bg-white hover:text-blue-600 transition-colors duration-300"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>

        {/* Decorative Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full 
              opacity-20 animate-float" />
            <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-400 rounded-full 
              opacity-20 animate-float-delayed" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-delayed {
    animation: float 6s ease-in-out infinite;
    animation-delay: -3s;
  }
`;
document.head.appendChild(style);

export default AuthScreen;