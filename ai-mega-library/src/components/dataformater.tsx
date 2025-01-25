import React, { useState, useEffect } from 'react';
import {
  Monitor,
  FileJson,
  Database,
  Sparkles,
  Zap,
  Code,
  Layout,
  Grid,
  Search,
  Bell,
  User,
  Settings,
  Plus,
  ArrowRight,
  Command,
  Moon,
  Sun,
  Binary,
  Table,
  Network
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const usePersistentState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, state]);

  return [state, setState];
};

const UnifiedInterface = () => {
  // Persistent States
  const [activeFormat, setActiveFormat] = usePersistentState('activeFormat', 'json');
  const [isDarkMode, setIsDarkMode] = usePersistentState('isDarkMode', true);
  const [activeTab, setActiveTab] = usePersistentState('activeTab', 0);
  const [recentFiles, setRecentFiles] = usePersistentState('recentFiles', []);
  const [compressionPrefs, setCompressionPrefs] = usePersistentState('compressionPrefs', {
    json: 'gzip',
    csv: 'brotli',
    vector: 'sparse'
  });

  const navigationItems = [
    { icon: <FileJson className="w-5 h-5" />, label: 'JSON Format', shortcut: '⌘1', format: 'json' },
    { icon: <Table className="w-5 h-5" />, label: 'CSV Analysis', shortcut: '⌘2', format: 'csv' },
    { icon: <Network className="w-5 h-5" />, label: 'Vector Embeddings', shortcut: '⌘3', format: 'vector' },
    { icon: <Binary className="w-5 h-5" />, label: 'Compression', shortcut: '⌘4', format: 'compression' }
  ];

  const formatDetails = {
    json: {
      title: 'JSON Processing',
      features: [
        { label: 'UTF-8 Encoding', value: 'Enabled' },
        { label: 'Compression', value: compressionPrefs.json },
        { label: 'Parser', value: 'SAX/Streaming' }
      ]
    },
    csv: {
      title: 'CSV Analysis',
      features: [
        { label: 'Delimiter', value: 'Auto-detect' },
        { label: 'Compression', value: compressionPrefs.csv },
        { label: 'Schema', value: 'Dynamic' }
      ]
    },
    vector: {
      title: 'Vector Embeddings',
      features: [
        { label: 'Precision', value: '32-bit float' },
        { label: 'Compression', value: compressionPrefs.vector },
        { label: 'Normalization', value: 'L2' }
      ]
    }
  };

  const suggestionBadges = [
    { icon: <ArrowRight />, label: 'Optimize JSON' },
    { icon: <ArrowRight />, label: 'Convert Format' },
    { icon: <ArrowRight />, label: 'Compress Data' },
    { icon: <ArrowRight />, label: 'Analyze Structure' }
  ];

  // Format-specific content renderer
  const renderFormatContent = () => {
    const format = formatDetails[activeFormat];
    if (!format) return null;

    return (
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">{format.title}</h2>
          <div className="grid grid-cols-3 gap-4">
            {format.features.map((feature, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">{feature.label}</p>
                <p className="text-white font-medium mt-1">{feature.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Processing Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Streaming Processing</span>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Memory Optimization</span>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Error Handling</span>
              <Badge variant="secondary">Strict</Badge>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} flex`}>
      {/* Left Navigation Panel */}
      <nav className={`w-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} flex flex-col items-center py-4 border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="space-y-6">
          {/* Logo */}
          <div className="p-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            <TooltipProvider>
              {navigationItems.map((item, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <button 
                      className={`w-10 h-10 rounded-lg flex items-center justify-center
                        ${activeFormat === item.format 
                          ? 'bg-blue-500 text-white' 
                          : `text-gray-400 hover:text-${isDarkMode ? 'white' : 'black'} hover:bg-gray-700`
                        } transition-colors`}
                      onClick={() => setActiveFormat(item.format)}
                    >
                      {item.icon}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="flex items-center gap-2">
                    <span>{item.label}</span>
                    <kbd className="bg-gray-700 px-2 py-0.5 text-xs rounded">
                      {item.shortcut}
                    </kbd>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-auto space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <header className="h-14 bg-gray-800 border-b border-gray-700 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Advanced Data Formats
            </Badge>
          </div>
        </header>

        {/* Workspace Area */}
        <div className="flex-1 flex">
          {/* Content Panel */}
          <div className="flex-1 bg-gray-800 p-6">
            {renderFormatContent()}
          </div>

          {/* Right Assistant Panel */}
          <aside className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <h2 className="text-lg font-medium text-white">Format Assistant</h2>
                </div>
                <Badge variant="secondary" className="bg-gray-700">AI</Badge>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-gray-300">How can I help optimize your data format?</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {suggestionBadges.map((badge, index) => (
                      <Badge 
                        key={index}
                        className="bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors"
                      >
                        {badge.icon}
                        <span className="ml-1">{badge.label}</span>
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
                  placeholder="Ask about data formats..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <Button 
                  size="sm" 
                  className="absolute right-1 top-1 bg-blue-500 hover:bg-blue-600"
                >
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default UnifiedInterface;