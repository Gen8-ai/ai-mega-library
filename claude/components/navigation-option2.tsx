import React, { useState, useEffect } from 'react';
import {
  Home,
  Monitor,
  FileCode,
  Users,
  Database,
  Brain,
  FileText,
  CheckSquare,
  Book,
  Settings,
  CreditCard,
  AlertCircle,
  Pen,
  TrendingUp,
  Plane,
  GitFork
} from 'lucide-react';

const NavigationLink = ({ href, icon: Icon, children }) => {
  const isActive = typeof window !== 'undefined' && window.location.pathname.startsWith(href);
  
  return (
    <a 
      href={href} 
      className={`flex items-center p-2 rounded-lg transition-colors
        ${isActive ? 'bg-zinc-700 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="font-medium">{children}</span>
    </a>
  );
};

const Navigation = () => {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handlePathChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  return (
    <nav className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">
      <div className="mb-8">
        <NavigationLink href="/" icon={Home}>Index</NavigationLink>
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Playground</h2>
          <div className="space-y-1">
            <NavigationLink href="/playground/Realtimedev" icon={Monitor}>Realtime Dev</NavigationLink>
            <NavigationLink href="/playground/commits" icon={GitFork}>Commits</NavigationLink>
            <NavigationLink href="/playground/dev-config" icon={FileCode}>Dev Config</NavigationLink>
            <NavigationLink href="/playground/teams" icon={Users}>Team Members</NavigationLink>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Integrations</h2>
          <div className="space-y-1">
            <NavigationLink href="/integrations/databases" icon={Database}>Databases</NavigationLink>
            <NavigationLink href="/integrations/git" icon={GitFork}>Git Repository</NavigationLink>
            <NavigationLink href="/integrations/brain" icon={Brain}>q0's Brain</NavigationLink>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Dev Notes</h2>
          <div className="space-y-1">
            <NavigationLink href="/dev-notes/MainOverlook" icon={FileText}>README</NavigationLink>
            <NavigationLink href="/dev-notes/tasks" icon={CheckSquare}>Tasks</NavigationLink>
            <NavigationLink href="/dev-notes/tutorials" icon={Book}>Tutorials</NavigationLink>
            <NavigationLink href="/dev-notes/technical-debt" icon={Settings}>Technical Debt</NavigationLink>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Settings</h2>
          <div className="space-y-1">
            <NavigationLink href="/settings/general" icon={Settings}>General</NavigationLink>
            <NavigationLink href="/settings/team" icon={Users}>Team</NavigationLink>
            <NavigationLink href="/settings/billing" icon={CreditCard}>Billing</NavigationLink>
            <NavigationLink href="/settings/limits" icon={AlertCircle}>Limits</NavigationLink>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-zinc-500 mb-2">Projects</h2>
          <div className="space-y-1">
            <NavigationLink href="/projects/design" icon={Pen}>Design Engineering</NavigationLink>
            <NavigationLink href="/projects/sales" icon={TrendingUp}>Sales & Marketing</NavigationLink>
            <NavigationLink href="/projects/travel" icon={Plane}>Travel</NavigationLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;