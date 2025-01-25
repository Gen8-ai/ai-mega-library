import React, { useState } from 'react';
import { Terminal, Folder, File, Brain, Code, Command, ArrowRight, GitBranch } from 'lucide-react';

const FlowNode = ({ title, description, isActive, onClick, connections }) => (
  <div
    onClick={onClick}
    className={`
      p-2 border rounded cursor-pointer transition-all duration-200
      ${isActive 
        ? 'border-purple-500 bg-gray-800 text-purple-400' 
        : 'border-green-800 hover:border-green-600 text-green-400'}
    `}
  >
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
      <span className="text-xs font-bold">{title}</span>
    </div>
    {isActive && (
      <div className="mt-2 text-xs opacity-80">{description}</div>
    )}
  </div>
);

const ConnectionLine = ({ isActive }) => (
  <div className={`flex-1 border-b ${isActive ? 'border-purple-500' : 'border-green-800'}`} />
);

const CLIInterface = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [history, setHistory] = useState([
    { type: 'system', content: 'QAUZ0 Neural IDE v1.0.0' },
    { type: 'system', content: 'Flow Visualization System Initialized' },
  ]);

  const nodes = {
    fileExplorer: {
      title: 'FILE EXPLORER',
      description: `
[SYSTEM]: File Management Interface
════════════════════════════════

CAPABILITIES:
├─[NAV] Project Navigation
│  ├── Directory Traversal
│  └── File Selection
│
├─[OP] File Operations
│  ├── Create/Delete
│  ├── Rename/Move
│  └── Version Control
│
└─[STATE] System Status
    ├── File Watch: ACTIVE
    ├── Cache: ENABLED
    └── Index: CURRENT

CONNECTIONS:
► CODE EDITOR: File Loading/Saving
► NEURAL TERMINAL: Command Interface
► PREVIEW: File Analysis`,
      connections: ['editor', 'terminal'],
      states: {
        watching: true,
        indexed: true,
        cacheEnabled: true
      }
    },
    editor: {
      title: 'CODE EDITOR',
      description: `
[SYSTEM]: Neural Code Interface
═══════════════════════════════

CAPABILITIES:
├─[EDIT] Code Manipulation
│  ├── Syntax Analysis
│  ├── Auto-Completion
│  └── Error Detection
│
├─[PROC] Neural Processing
│  ├── Code Intelligence
│  ├── Pattern Recognition
│  └── Optimization Hints
│
└─[VIEW] Display Modes
    ├── Neural Overlay: ON
    ├── Syntax Highlight: ON
    └── Mini-map: ACTIVE

CONNECTIONS:
► FILE EXPLORER: Source Management
► NEURAL ENGINE: Code Analysis
► PREVIEW: Live Rendering`,
      connections: ['terminal', 'preview'],
      states: {
        neuralOverlay: true,
        syntaxHighlight: true,
        minimap: true
      }
    },
    terminal: {
      title: 'NEURAL TERMINAL',
      description: `
[SYSTEM]: Command Neural Interface
════════════════════════════════

CAPABILITIES:
├─[CMD] Command Processing
│  ├── Neural Interpretation
│  ├── Context Awareness
│  └── History Analysis
│
├─[AI] Neural Assistant
│  ├── Code Generation
│  ├── Debug Support
│  └── Query Resolution
│
└─[ENV] Environment
    ├── Neural Link: ACTIVE
    ├── Context: LOADED
    └── History: ENABLED

CONNECTIONS:
► NEURAL ENGINE: Direct Link
► CODE EDITOR: Command Output
► FILE SYSTEM: Operation Access`,
      connections: ['neural'],
      states: {
        neuralLink: true,
        contextAware: true,
        historyEnabled: true
      }
    },
    neural: {
      title: 'NEURAL ENGINE',
      description: `
[SYSTEM]: Core Neural Processor
════════════════════════════════

CAPABILITIES:
├─[PROC] Neural Processing
│  ├── Pattern Analysis
│  ├── Code Synthesis
│  └── Logic Optimization
│
├─[DATA] Data Management
│  ├── Stream Processing
│  ├── Cache Management
│  └── State Tracking
│
└─[NET] Neural Network
    ├── Status: ONLINE
    ├── Load: 42%
    └── Accuracy: 99.9%

CONNECTIONS:
► ALL SYSTEMS: Neural Link
► PREVIEW: Analysis Output
► TERMINAL: Command Processing`,
      connections: ['preview'],
      states: {
        status: 'online',
        load: 42,
        accuracy: 99.9
      }
    },
    preview: {
      title: 'PREVIEW WINDOW',
      description: `
[SYSTEM]: Visual Output Interface
═══════════════════════════════

CAPABILITIES:
├─[VIZ] Visualization
│  ├── Code Rendering
│  ├── Data Plotting
│  └── Flow Diagrams
│
├─[SYNC] Real-time Updates
│  ├── Live Preview
│  ├── State Tracking
│  └── Change Detection
│
└─[OUT] Output Modes
    ├── Render: ACTIVE
    ├── Updates: REAL-TIME
    └── Format: NEURAL

CONNECTIONS:
► CODE EDITOR: Live Preview
► NEURAL ENGINE: Process View
► FILE EXPLORER: File Preview`,
      connections: ['fileExplorer', 'editor'],
      states: {
        render: true,
        updates: 'real-time',
        format: 'neural'
      }
    }
  };

  const handleNodeClick = (nodeId) => {
    setActiveNode(nodeId);
    const node = nodes[nodeId];
    setHistory(prev => [...prev, 
      { type: 'input', content: `> Accessing ${node.title}` },
      { type: 'output', content: node.description }
    ]);
  };

  const isConnectionActive = (node1, node2) => {
    if (!activeNode) return false;
    const activeConnections = nodes[activeNode].connections;
    return activeNode === node1 && activeConnections.includes(node2) ||
           activeNode === node2 && nodes[node2].connections.includes(node1);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-green-400 font-mono overflow-hidden">
      {/* Header - 40px */}
      <div className="h-10 border-b border-green-800 px-4 flex items-center justify-between bg-gray-950">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4" />
          <span className="text-sm">neural@qauz0:~</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-green-600">FLOW:ACTIVE</span>
          <Brain className="w-4 h-4 text-purple-400" />
        </div>
      </div>

      {/* Flow Visualization - 300px */}
      <div className="h-72 border-b border-green-800 bg-gray-950 p-4">
        <div className="relative h-full">
          {/* Top Row */}
          <div className="flex justify-between mb-8">
            <FlowNode 
              {...nodes.fileExplorer}
              isActive={activeNode === 'fileExplorer'}
              onClick={() => handleNodeClick('fileExplorer')}
            />
            <FlowNode 
              {...nodes.editor}
              isActive={activeNode === 'editor'}
              onClick={() => handleNodeClick('editor')}
            />
            <FlowNode 
              {...nodes.terminal}
              isActive={activeNode === 'terminal'}
              onClick={() => handleNodeClick('terminal')}
            />
          </div>
          
          {/* Middle Row */}
          <div className="flex justify-center mb-8">
            <FlowNode 
              {...nodes.neural}
              isActive={activeNode === 'neural'}
              onClick={() => handleNodeClick('neural')}
            />
          </div>
          
          {/* Bottom Row */}
          <div className="flex justify-center">
            <FlowNode 
              {...nodes.preview}
              isActive={activeNode === 'preview'}
              onClick={() => handleNodeClick('preview')}
            />
          </div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 pointer-events-none">
            {Object.entries(nodes).map(([nodeId, node]) => 
              node.connections.map(targetId => (
                <path
                  key={`${nodeId}-${targetId}`}
                  d="M 0,0 C 50,0 50,100 100,100"
                  stroke={isConnectionActive(nodeId, targetId) ? '#bd93f9' : '#1b4b32'}
                  strokeWidth="2"
                  fill="none"
                  className="transition-colors duration-300"
                />
              ))
            )}
          </svg>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex-1 flex">
        <div className="w-1/5 border-r border-green-800 bg-gray-950 p-2">
          <div className="text-xs">SYSTEM OVERVIEW</div>
          <div className="mt-2 text-xs opacity-70">
            {activeNode ? nodes[activeNode].description : 'Select a node to view details'}
          </div>
        </div>
        
        <div className="flex-1 p-2 bg-gray-950">
          <div className="text-xs mb-2">FLOW LOGS</div>
          <div className="h-full overflow-y-auto">
            {history.map((entry, index) => (
              <div 
                key={index}
                className={`text-xs ${
                  entry.type === 'system' ? 'text-blue-400' :
                  entry.type === 'input' ? 'text-green-400' :
                  'text-purple-400'
                } mb-1`}
              >
                {entry.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-10 bg-gray-950 text-xs px-4 flex items-center justify-between border-t border-green-800">
        <div className="flex items-center space-x-4">
          <span className="text-green-400">▲ FLOW:ACTIVE</span>
          <span className="text-blue-400">■ NODES:READY</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-purple-400">● SELECTED: {activeNode?.toUpperCase() || 'NONE'}</span>
          <span className="text-gray-600">⬡ SYSTEM:STABLE</span>
        </div>
      </div>
    </div>
  );
};

export default CLIInterface;