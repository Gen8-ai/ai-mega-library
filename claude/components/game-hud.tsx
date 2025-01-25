import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

// HealthBar Component
const HealthBar: React.FC<{
  current: number;
  max: number;
  showText?: boolean;
  className?: string;
}> = ({ current, max, showText = true, className = '' }) => {
  const percentage = (current / max) * 100;
  const barColor = percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className={`w-full ${className}`}>
      <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${barColor} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <p className="text-sm text-white mt-1">
          {current}/{max} HP
        </p>
      )}
    </div>
  );
};

// GameNotification Component
const GameNotification: React.FC<{
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>;
  onDismiss: (id: string) => void;
}> = ({ notifications, onDismiss }) => {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            p-4 rounded-lg shadow-lg backdrop-blur-sm cursor-pointer
            ${notification.type === 'success' ? 'bg-green-500/80' :
              notification.type === 'error' ? 'bg-red-500/80' :
              'bg-blue-500/80'} text-white
          `}
          onClick={() => onDismiss(notification.id)}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

// InventorySlot Component
const InventorySlot: React.FC<{
  item?: {
    id: string;
    name: string;
    icon: string;
    quantity?: number;
    rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  };
  onItemClick?: (itemId: string) => void;
  className?: string;
}> = ({ item, onItemClick, className = '' }) => {
  const rarityColors = {
    common: 'border-gray-400',
    rare: 'border-blue-400',
    epic: 'border-purple-400',
    legendary: 'border-orange-400'
  };

  return (
    <div 
      className={`
        w-16 h-16 border-2 rounded-lg
        ${item ? rarityColors[item.rarity || 'common'] : 'border-gray-600'}
        bg-gray-800/50 backdrop-blur-sm
        hover:brightness-110 transition-all duration-200
        cursor-pointer relative
        ${className}
      `}
      onClick={() => item && onItemClick?.(item.id)}
    >
      {item && (
        <>
          <img 
            src={item.icon} 
            alt={item.name}
            className="w-full h-full object-contain p-2"
          />
          {item.quantity && item.quantity > 1 && (
            <span className="absolute bottom-1 right-1 text-xs text-white bg-black/50 px-1 rounded">
              {item.quantity}
            </span>
          )}
        </>
      )}
    </div>
  );
};

// GameTooltip Component
const GameTooltip: React.FC<{
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ content, children, className = '' }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div 
        className={`
          absolute z-50 invisible group-hover:visible
          opacity-0 group-hover:opacity-100
          transition-all duration-200
          bg-gray-900/95 text-white p-2 rounded
          backdrop-blur-sm border border-blue-500/20
          w-48 shadow-xl
          ${className}
        `}
      >
        {content}
      </div>
    </div>
  );
};

// GameProgress Component
const GameProgress: React.FC<{
  level: number;
  currentXP: number;
  requiredXP: number;
  className?: string;
}> = ({ level, currentXP, requiredXP, className = '' }) => {
  const percentage = (currentXP / requiredXP) * 100;

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="text-white text-lg font-bold">
        Lvl {level}
      </div>
      <div className="flex-1">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-sm text-blue-400 mt-1">
          {currentXP}/{requiredXP} XP
        </div>
      </div>
    </div>
  );
};

// Main GameHUD Component
const GameHUD: React.FC = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>>([]);

  const [playerStats] = useState({
    health: 75,
    maxHealth: 100,
    level: 5,
    currentXP: 350,
    requiredXP: 500
  });

  const [inventory] = useState([
    {
      id: '1',
      name: 'Health Potion',
      icon: '/api/placeholder/32/32',
      quantity: 3,
      rarity: 'rare' as const
    },
    {
      id: '2',
      name: 'Magic Sword',
      icon: '/api/placeholder/32/32',
      rarity: 'epic' as const
    }
  ]);

  const handleItemClick = (itemId: string) => {
    const newNotification = {
      id: Date.now().toString(),
      message: `Used item ${itemId}`,
      type: 'info' as const
    };
    setNotifications(prev => [...prev, newNotification]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-black via-blue-950 to-blue-900 p-4">
      {/* Top HUD - Health and Level */}
      <Card className="absolute top-4 left-4 space-y-4 w-64 bg-black/40 border-blue-500/30">
        <div className="p-4 space-y-4">
          <HealthBar 
            current={playerStats.health} 
            max={playerStats.maxHealth} 
          />
          <GameProgress 
            level={playerStats.level}
            currentXP={playerStats.currentXP}
            requiredXP={playerStats.requiredXP}
          />
        </div>
      </Card>

      {/* Inventory Quickbar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {inventory.map(item => (
          <GameTooltip
            key={item.id}
            content={
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-300">Click to use</p>
              </div>
            }
          >
            <InventorySlot
              item={item}
              onItemClick={handleItemClick}
            />
          </GameTooltip>
        ))}
      </div>

      {/* Notifications */}
      <GameNotification
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
};

export default GameHUD;