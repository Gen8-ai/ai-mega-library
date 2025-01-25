import React from 'react';
import { Bell, ChevronDown, X } from 'lucide-react';

// Button Component
export const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  children,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-bold rounded transition-all duration-200';
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    navy: 'bg-navy-900 hover:bg-navy-800 text-white',
    ghost: 'bg-transparent hover:bg-zinc-100 text-zinc-800'
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
export const Card = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-white',
    dark: 'bg-zinc-800 text-white',
    red: 'bg-red-600 text-white',
    navy: 'bg-navy-900 text-white'
  };

  return (
    <div className={`rounded-lg p-6 shadow-lg ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Input Component
export const Input = ({ error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <input
        className={`
          w-full px-4 py-2 rounded
          border border-zinc-200 
          focus:outline-none focus:ring-2 focus:ring-red-600
          bg-white text-zinc-800
          ${error ? 'border-red-600' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

// Badge Component
export const Badge = ({ variant = 'default', children }) => {
  const variants = {
    default: 'bg-zinc-200 text-zinc-800',
    red: 'bg-red-600 text-white',
    navy: 'bg-navy-900 text-white',
    pink: 'bg-pink-200 text-pink-800'
  };

  return (
    <span className={`inline-flex px-2 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Alert Component
export const Alert = ({ variant = 'info', message, onClose }) => {
  const variants = {
    info: 'bg-navy-900 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-red-600 text-white',
    error: 'bg-red-600 text-white'
  };

  return (
    <div className={`rounded-lg p-4 flex items-center justify-between ${variants[variant]}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4">
          <X size={20} />
        </button>
      )}
    </div>
  );
};

// Dropdown Component
export const Dropdown = ({ label, options = [], onChange }) => {
  return (
    <div className="relative">
      <button className="flex items-center justify-between w-full px-4 py-2 bg-white border border-zinc-200 rounded text-zinc-800">
        <span>{label}</span>
        <ChevronDown size={20} />
      </button>
      <div className="absolute w-full mt-1 bg-white border border-zinc-200 rounded shadow-lg">
        {options.map((option) => (
          <button
            key={option.value}
            className="w-full px-4 py-2 text-left hover:bg-zinc-100 text-zinc-800"
            onClick={() => onChange(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// Notification Badge
export const NotificationBadge = ({ count }) => {
  return (
    <div className="relative inline-block">
      <Bell size={24} className="text-zinc-800" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs rounded-full">
          {count}
        </span>
      )}
    </div>
  );
};

// Tab Component
export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex space-x-1 p-1 bg-zinc-100 rounded">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            px-4 py-2 rounded transition-colors
            ${activeTab === tab.id 
              ? 'bg-red-600 text-white' 
              : 'text-zinc-800 hover:bg-zinc-200'}
          `}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};