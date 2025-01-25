import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Send, 
  Code,
  Terminal,
  Folder,
  Settings,
  ChevronRight,
  ChevronDown,
  Split,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface FileStructure {
  [key: string]: FileStructure | 'file';
}

const DevInterface = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(250);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(200);
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
  const [isBottomPanelCollapsed, setIsBottomPanelCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('editor');

  const fileStructure: FileStructure = {
    src: {
      components: {
        'Editor.tsx': 'file',
        'Preview.tsx': 'file',
        'Terminal.tsx': 'file'
      },
      'App.tsx': 'file',
      'main.tsx': 'file'
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex">
      {/* Left Panel */}
      <div 
        className={`border-r border-gray-700 transition-all duration-200 ${
          isLeftPanelCollapsed ? 'w-12' : `w-${leftPanelWidth}`
        }`}
      >
        <div className="flex items-center justify-between p-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-400" />
            {!isLeftPanelCollapsed && <span>Project Explorer</span>}
          </div>
          <button 
            onClick={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
            className="p-1 hover:bg-gray-800 rounded"
          >
            {isLeftPanelCollapsed ? <ChevronRight /> : <ChevronDown />}
          </button>
        </div>
        
        {!isLeftPanelCollapsed && (
          <div className="p-2">
            {/* File tree structure would go here */}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-2 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1 rounded ${
                activeView === 'editor' ? 'bg-blue-500' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActiveView('editor')}
            >
              <Code className="h-4 w-4" />
            </button>
            <button
              className={`px-3 py-1 rounded ${
                activeView === 'preview' ? 'bg-blue-500' : 'hover:bg-gray-800'
              }`}
              onClick={() => setActiveView('preview')}
            >
              <Split className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex">
          <div className="flex-1 bg-gray-800 p-4">
            {activeView === 'editor' ? (
              <div className="h-full rounded border border-gray-700 bg-gray-900 p-4">
                <code className="text-sm">// Your code here</code>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <span className="text-gray-500">Preview Area</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Panel */}
        <div 
          className={`border-t border-gray-700 transition-all duration-200 ${
            isBottomPanelCollapsed ? 'h-12' : `h-${bottomPanelHeight}`
          }`}
        >
          <div className="flex items-center justify-between p-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span>Terminal</span>
            </div>
            <button 
              onClick={() => setIsBottomPanelCollapsed(!isBottomPanelCollapsed)}
              className="p-1 hover:bg-gray-800 rounded"
            >
              {isBottomPanelCollapsed ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
          </div>
          
          {!isBottomPanelCollapsed && (
            <div className="p-2 font-mono text-sm">
              <span className="text-green-400">$</span> npm run dev
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DevInterface;