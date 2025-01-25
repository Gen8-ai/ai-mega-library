import React, { useState } from 'react';
import { Flame, Lock, Timer, X, ChevronDown, Bell } from 'lucide-react';

// Button Component
const Button = ({ 
  variant = 'primary', 
  size = 'medium',
  children,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-mono font-bold uppercase tracking-wider transition-all duration-200';
  
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white border-2 border-red-600',
    secondary: 'bg-black hover:bg-zinc-900 text-white border-2 border-black',
    outline: 'bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
    ghost: 'bg-transparent border-2 border-transparent text-white hover:border-red-600',
    destructive: 'bg-black hover:bg-red-600 text-white border-2 border-red-600'
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-6 py-2',
    large: 'px-8 py-3 text-lg'
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
const Card = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-black border-2 border-zinc-800 text-white',
    highlight: 'bg-black border-2 border-red-600 text-white',
    premium: 'bg-red-600 text-white border-2 border-red-600',
    dark: 'bg-zinc-900 text-white border-2 border-zinc-800'
  };

  return (
    <div className={`rounded-none p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

// Input Component
const Input = ({ error, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <input
        className={`
          w-full px-4 py-3 
          bg-black border-2 
          ${error ? 'border-red-600' : 'border-zinc-800'}
          text-white font-mono
          focus:outline-none focus:border-red-600
          placeholder-zinc-500
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm font-mono uppercase tracking-wide">
          {error}
        </p>
      )}
    </div>
  );
};

// Badge Component
const Badge = ({ variant = 'default', children }) => {
  const variants = {
    default: 'bg-zinc-800 text-white border-zinc-700',
    exclusive: 'bg-red-600 text-white border-red-500',
    limited: 'bg-black text-red-600 border-red-600',
    soldout: 'bg-black text-white border-white'
  };

  return (
    <span className={`
      inline-flex px-3 py-1 
      text-xs font-mono font-bold uppercase tracking-wider
      border-2 ${variants[variant]}
    `}>
      {children}
    </span>
  );
};

// Alert Component
const Alert = ({ variant = 'info', message, onClose }) => {
  const variants = {
    info: 'bg-black border-zinc-800',
    success: 'bg-black border-red-600',
    warning: 'bg-red-600 border-red-600',
    error: 'bg-black border-red-600'
  };

  return (
    <div className={`
      border-2 p-4 
      flex items-center justify-between 
      font-mono tracking-wide
      text-white
      ${variants[variant]}
    `}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-white hover:text-red-600">
          <X size={20} />
        </button>
      )}
    </div>
  );
};

// NotificationBadge Component
const NotificationBadge = ({ count }) => {
  return (
    <div className="relative inline-block">
      <Bell size={24} className="text-white" />
      {count > 0 && (
        <span className="
          absolute -top-1 -right-1 
          w-5 h-5 
          flex items-center justify-center 
          bg-red-600 text-white 
          text-xs font-mono font-bold
          border-2 border-black
        ">
          {count}
        </span>
      )}
    </div>
  );
};

// Tabs Component
const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex space-x-1 p-1 bg-black">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`
            px-6 py-3
            font-mono font-bold uppercase tracking-wider
            transition-colors
            ${activeTab === tab.id 
              ? 'bg-red-600 text-white' 
              : 'text-zinc-400 hover:text-white'}
          `}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

// Main Preview Component
const UIPreview = () => {
  const [activeTab, setActiveTab] = useState('buttons');
  const [showAlert, setShowAlert] = useState(true);

  const previewTabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'badges', label: 'Badges' },
    { id: 'alerts', label: 'Alerts' }
  ];

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation */}
        <Tabs 
          tabs={previewTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'buttons' && (
            <Card className="space-y-6">
              <h2 className="text-xl font-mono font-bold tracking-wider text-red-600">BUTTONS</h2>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">SHOP NOW</Button>
                  <Button variant="secondary">EXPLORE</Button>
                  <Button variant="outline">JOIN WAITLIST</Button>
                  <Button variant="ghost">LEARN MORE</Button>
                  <Button variant="destructive">SOLD OUT</Button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="small">SMALL</Button>
                  <Button size="medium">MEDIUM</Button>
                  <Button size="large">LARGE</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card variant="default">
                <Flame className="text-red-600 mb-4" size={24} />
                <h3 className="font-mono font-bold text-xl mb-2">MEMBERSHIP</h3>
                <p className="text-zinc-400">Join the rebellion</p>
              </Card>
              <Card variant="highlight">
                <Lock className="text-red-600 mb-4" size={24} />
                <h3 className="font-mono font-bold text-xl mb-2">EXCLUSIVE</h3>
                <p className="text-zinc-400">Limited edition drops</p>
              </Card>
              <Card variant="premium">
                <Timer className="text-white mb-4" size={24} />
                <h3 className="font-mono font-bold text-xl mb-2">PREMIUM</h3>
                <p className="text-zinc-100">Premium streetwear</p>
              </Card>
              <Card variant="dark">
                <h3 className="font-mono font-bold text-xl mb-2">DARK MODE</h3>
                <p className="text-zinc-400">Stealth aesthetic</p>
              </Card>
            </div>
          )}

          {activeTab === 'inputs' && (
            <Card className="space-y-6">
              <h2 className="text-xl font-mono font-bold tracking-wider text-red-600">FORMS</h2>
              <div className="space-y-4 max-w-md">
                <Input placeholder="Enter your email" />
                <Input placeholder="Password" type="password" error="Required field" />
                <Input placeholder="Disabled input" disabled />
              </div>
            </Card>
          )}

          {activeTab === 'badges' && (
            <Card className="space-y-6">
              <h2 className="text-xl font-mono font-bold tracking-wider text-red-600">BADGES</h2>
              <div className="flex flex-wrap gap-4 items-center">
                <Badge variant="default">NEW</Badge>
                <Badge variant="exclusive">EXCLUSIVE</Badge>
                <Badge variant="limited">LIMITED</Badge>
                <Badge variant="soldout">SOLD OUT</Badge>
                <NotificationBadge count={3} />
              </div>
            </Card>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {showAlert && (
                <Alert 
                  variant="warning"
                  message="ONLY 5 ITEMS LEFT IN STOCK"
                  onClose={() => setShowAlert(false)}
                />
              )}
              <Alert 
                variant="info"
                message="NEW DROP COMING SOON"
              />
              <Alert 
                variant="success"
                message="ORDER CONFIRMED"
              />
              <Alert 
                variant="error"
                message="ITEM SOLD OUT"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UIPreview;