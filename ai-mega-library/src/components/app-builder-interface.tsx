import React, { useState } from 'react';
import { Split, MessageCircle, Play, Settings, Code, Layout, Eye } from 'lucide-react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppBuilder = () => {
  const [activeTab, setActiveTab] = useState('config');
  const [messages, setMessages] = useState([]);
  const [isPreviewing, setIsPreviewing] = useState(false);

  return (
    <div className="h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b h-14 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold">AI App Builder</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Code className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-3.5rem)]">
        {/* Configuration Panel */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="p-4 border-b bg-white">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="config">Configuration</TabsTrigger>
                <TabsTrigger value="components">Components</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="config" className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">App Name</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="My Awesome App"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Framework</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>React</option>
                    <option>Next.js</option>
                    <option>Vue</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="components" className="p-4">
              <div className="space-y-2">
                <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  Header Component
                </div>
                <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  Navigation Menu
                </div>
                <div className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  Hero Section
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        <ResizableHandle />

        {/* Preview & Code Panel */}
        <ResizablePanel defaultSize={45}>
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
              <Button variant="default" size="sm">
                <Play className="w-4 h-4 mr-2" />
                Run Preview
              </Button>
            </div>
            
            <div className="flex-1 bg-white p-4">
              {isPreviewing ? (
                <div className="w-full h-full border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                  Live Preview Area
                </div>
              ) : (
                <pre className="p-4 bg-gray-50 rounded-lg overflow-auto h-full">
                  {`// Generated Code will appear here
import React from 'react';

export default function App() {
  return (
    <div>
      {/* Components will be rendered here */}
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
        <ResizablePanel defaultSize={30}>
          <div className="h-full flex flex-col">
            <div className="bg-white border-b p-3">
              <h2 className="text-lg font-semibold">AI Assistant</h2>
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
                  placeholder="Ask me anything about your app..."
                />
                <Button>
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

export default AppBuilder;