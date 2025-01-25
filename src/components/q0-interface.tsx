import React, { useState } from 'react';
import { Cpu, Send, Code, Server, Users } from 'lucide-react';

type Stage = 'initial' | 'analyzing' | 'live';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="font-semibold mb-2 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

interface StageViewProps {
  onSubmit: () => void;
}

const InitialView: React.FC<StageViewProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="max-w-xl w-full space-y-6">
        <header className="text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <Cpu className="h-8 w-8 text-blue-500" />
            Q0 ENGINE
          </h1>
          <p className="mt-2 text-xl">What would you like to create?</p>
        </header>

        <div className="bg-gray-800 rounded-lg p-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your application idea..."
            className="w-full h-32 bg-gray-900 text-gray-100 p-4 rounded-lg resize-none"
          />
          <button
            onClick={onSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Initialize Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            icon={<Code className="h-5 w-5 text-blue-400" />}
            title="Starter Templates"
            description="Generate and customize boilerplate code"
          />
          <FeatureCard
            icon={<Server className="h-5 w-5 text-green-400" />}
            title="API Integration"
            description="Connect services seamlessly"
          />
          <FeatureCard
            icon={<Users className="h-5 w-5 text-purple-400" />}
            title="HQ0 Community"
            description="Share and discover templates"
          />
        </div>
      </div>
    </div>
  );
};

const AnalyzingView: React.FC = () => (
  <div className="flex-1 p-6 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="animate-spin text-blue-500 mx-auto h-12 w-12 border-4 border-t-blue-500 rounded-full" />
      <h2 className="text-2xl font-bold">Analyzing Requirements</h2>
      <p className="text-gray-400">Configuring development environment...</p>
    </div>
  </div>
);

const LiveView: React.FC = () => (
  <div className="flex-1 p-6 overflow-hidden flex gap-4">
    <div className="flex-1 bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Server className="h-5 w-5 text-green-400" />
          <span className="text-green-400">Development Server</span>
        </div>
        <span className="text-sm text-gray-400">localhost:5173</span>
      </div>
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <Code className="h-12 w-12 text-gray-700" />
      </div>
    </div>
  </div>
);

const Q0Interface: React.FC = () => {
  const [stage, setStage] = useState<Stage>('initial');

  const handleSubmit = () => {
    setStage('analyzing');
    setTimeout(() => setStage('live'), 3000);
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
      <main className="flex-1 overflow-hidden">
        {stage === 'initial' && <InitialView onSubmit={handleSubmit} />}
        {stage === 'analyzing' && <AnalyzingView />}
        {stage === 'live' && <LiveView />}
      </main>
    </div>
  );
};

export default Q0Interface;