import React, { useState, useEffect } from 'react';
import { 
  Boxes, ShoppingBag, Users, Truck, Bell,
  PackageOpen, PackagePlus, PackageSearch,
  BarChart, ClipboardList, AlertTriangle, 
  History, ArrowDownUp, Plus, Pencil, 
  ImagePlus, Tags, DollarSign, Eye, 
  Archive, Settings, Clock, CheckCircle,
  XCircle, Package, CreditCard, Printer,
  MessageCircle, Activity, Mail, FileWarning,
  Zap, DatabaseBackup, UserPlus, Search,
  Heart, MessageSquare, Shield, BarChart2,
  Tag, FileText
} from 'lucide-react';

const WidgetContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="stolen-street-widget fixed bottom-4 right-4 z-50">
    {children}
  </div>
);

const WidgetButton: React.FC<{ onClick: () => void, isOpen: boolean }> = ({ onClick, isOpen }) => (
  <button
    onClick={onClick}
    className={`
      fixed bottom-4 right-4
      bg-black border-2 border-red-600
      text-white p-4 rounded-full
      shadow-lg hover:scale-105
      transition-all duration-300
      z-50 flex items-center gap-2
      ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `}
  >
    <Boxes className="text-red-500" />
    <span className="font-bold">Open Dashboard</span>
  </button>
);

const WidgetPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  // ... [Previous cell definitions remain the same] ...

  return (
    <div className={`
      fixed bottom-4 right-4
      bg-zinc-900 rounded-lg
      shadow-2xl
      transition-all duration-500 ease-in-out
      transform
      ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
      max-h-[90vh] overflow-auto
      max-w-[90vw]
      border border-red-600
    `}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <XCircle size={24} />
      </button>

      {/* Widget content */}
      <AnimatedGrid />
    </div>
  );
};

const AnimatedGrid = () => {
  // ... [Previous AnimatedGrid component code remains the same] ...
};

const StolenStreetWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const widget = document.querySelector('.stolen-street-widget');
      if (widget && !widget.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <WidgetButton onClick={() => setIsOpen(true)} isOpen={isOpen} />
      <WidgetPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default StolenStreetWidget;