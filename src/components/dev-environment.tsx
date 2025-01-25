import React, { useState } from 'react';
import { Code, Eye, MessageCircle, Play, Save } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageConfig {
  name: string;
  route: string;
  components: string[];
}

interface ProjectConfig {
  name: string;
  framework: string;
  pages: PageConfig[];
}

interface DevEnvironmentProps {
  config?: ProjectConfig;
}

// Default configuration
const defaultConfig: ProjectConfig = {
  name: 'New Project',
  framework: 'react',
  pages: [{
    name: 'Home',
    route: '/',
    components: []
  }]
};

const DevEnvironment: React.FC<DevEnvironmentProps> = ({ config = defaultConfig }) => {
  const [activePage, setActivePage] = useState<string>(config.pages[0]?.name || 'Home');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
      setInputMessage('');
      // Here you would typically trigger the AI response
      // For now, we'll just simulate it
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: `I can help you with the ${activePage} page. What would you like to know?` 
        }]);
      }, 500);
    }
  };

  const currentPage = config.pages.find(page => page.name === activePage) || config.pages[0];

  return (
    <div className="h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b h-14 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">{config.name}</h1>
          <Select value={activePage} onValueChange={setActivePage}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select page" />
            </SelectTrigger>
            <SelectContent>
              {config.pages.map(page => (
                <SelectItem key={page.name} value={page.name}>
                  {page.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="default" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Deploy
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-3.5rem)]">
        {/* Preview & Code Panel */}
        <ResizablePanel defaultSize={60}>
          <div className="h-full flex flex-col">
            <div className="bg-white border-b p-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setIsPreviewing(!isPreviewing)}
                >
                  {isPreviewing ? <Code className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {isPreviewing ? 'Code' : 'Preview'}
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Run Preview
              </Button>
            </div>
            
            <div className="flex-1 bg-white p-4">
              {isPreviewing ? (
                <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Preview: {currentPage.name}</h2>
                    <p className="text-gray-500">Route: {currentPage.route}</p>
                  </div>
                </div>
              ) : (
                <pre className="p-4 bg-gray-50 rounded-lg overflow-auto h-full">
                  {`// ${currentPage.name} Page
import React from 'react';

export default function ${currentPage.name.replace(/\s+/g, '')}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">${currentPage.name}</h1>
      {/* Components will be rendered here */}
      ${currentPage.components.map(comp => `<${comp} />`).join('\n      ')}
    </div>
  );
}`}
                </pre>
              )}
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* AI Assistant Panel */}
        <ResizablePanel defaultSize={40}>
          <div className="h-full flex flex-col">
            <div className="bg-white border-b p-3">
              <h2 className="text-lg font-semibold">AI Assistant</h2>
              <p className="text-sm text-gray-500">Get help with your {currentPage.name} page</p>
            </div>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`p-3 rounded-lg ${
                  msg.type === 'ai' ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  {msg.content}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t bg-white">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Ask me about your current page..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DevEnvironment;