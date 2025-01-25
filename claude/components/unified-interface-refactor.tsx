import React from 'react';
import {
  Monitor, Smartphone, Tablet, Maximize2, ChevronLeft, 
  MessageSquare, Sparkles, Zap, Code, Layout, Grid,
  Search, Bell, User, Settings, Plus, ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

// Navigation items configuration
const NAV_ITEMS = [
  { icon: <Monitor />, label: 'Dashboard' },
  { icon: <Code />, label: 'Editor' },
  { icon: <MessageSquare />, label: 'Chat' },
  { icon: <Grid />, label: 'Components' }
];

// Subcomponents for better organization
const NavigationButton = ({ icon, label }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
        {React.cloneElement(icon, { className: 'w-5 h-5' })}
      </button>
    </TooltipTrigger>
    <TooltipContent side="right">
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

const SideNavigation = () => (
  <div className="w-16 bg-gray-800 flex flex-col items-center py-4 border-r border-gray-700">
    <div className="space-y-6">
      <div className="p-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <Layout className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="space-y-4">
        <TooltipProvider>
          {NAV_ITEMS.map((item, index) => (
            <NavigationButton key={index} {...item} />
          ))}
        </TooltipProvider>
      </div>
    </div>
    <div className="mt-auto">
      <TooltipProvider>
        <NavigationButton icon={<Settings />} label="Settings" />
      </TooltipProvider>
    </div>
  </div>
);

const TopBar = () => (
  <header className="h-14 bg-gray-800 border-b border-gray-700 px-4 flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
        <Sparkles className="w-3 h-3 mr-1" />
        AI Powered
      </Badge>
      <div className="flex items-center space-x-2">
        {[<Monitor />, <Tablet />, <Smartphone />].map((icon, index) => (
          <Button key={index} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            {React.cloneElement(icon, { className: 'w-4 h-4' })}
          </Button>
        ))}
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 bg-gray-900 border border-gray-700 rounded-lg px-4 py-1.5 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-2 w-4 h-4 text-gray-500" />
      </div>
      <Button variant="ghost" size="sm" className="relative text-gray-400 hover:text-white">
        <Bell className="w-5 h-5" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
      </Button>
      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
        <User className="w-5 h-5 text-gray-300" />
      </div>
    </div>
  </header>
);

const EmptyWorkspace = () => (
  <div className="h-full rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
        <Plus className="w-8 h-8 text-blue-400" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-white">Start Building</h3>
        <p className="text-gray-400 mt-1">Create your first component or choose a template</p>
      </div>
      <div className="flex items-center justify-center space-x-3">
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          New Component
        </Button>
        <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
          Choose Template
        </Button>
      </div>
    </div>
  </div>
);

const AIAssistant = () => (
  <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
    <div className="p-4 border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <Zap className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-medium text-white">AI Assistant</h2>
      </div>
    </div>
    <div className="flex-1 p-4">
      <div className="space-y-4">
        <div className="bg-gray-900 rounded-lg p-4">
          <p className="text-gray-300">How can I help you build your application today?</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Create Component', 'Add Page'].map((label, index) => (
              <Badge key={index} className="bg-gray-800 hover:bg-gray-700 cursor-pointer">
                <ArrowRight className="w-3 h-3 mr-1" />
                {label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 border-t border-gray-700">
      <div className="relative">
        <input
          type="text"
          placeholder="Ask me anything..."
          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button size="sm" className="absolute right-1 top-1 bg-blue-500 hover:bg-blue-600">
          <Zap className="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
);

const UnifiedInterface = () => {
  return (
    <div className="h-screen bg-gray-900 flex">
      <SideNavigation />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 flex">
          <div className="flex-1 bg-gray-800 p-6">
            <EmptyWorkspace />
          </div>
          <AIAssistant />
        </div>
      </div>
    </div>
  );
};

export default UnifiedInterface;