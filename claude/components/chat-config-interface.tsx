import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Sparkles, 
  Zap, 
  Code2, 
  Palette, 
  Box, 
  Cpu,
  Hammer,
  RefreshCw,
  ChevronRight,
  Loader
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  status?: 'thinking' | 'complete';
  metadata?: {
    suggestions?: string[];
    codePreview?: string;
    configUpdate?: any;
  };
}

const ChatConfigInterface = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    type: 'ai',
    content: "Hi! I'm your AI app builder assistant. Let's create something amazing together. Would you like to start with a template or build from scratch?",
    metadata: {
      suggestions: ['Start with a template', 'Build from scratch', 'Show me examples']
    }
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsProcessing(true);
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: '',
      status: 'thinking'
    };
    
    setMessages(prev => [...prev, newMessage]);

    // Simulate AI processing
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id 
          ? {
              ...msg,
              content: "I understand you want to create a new app. Let's start by defining the core features. What kind of functionality do you need?",
              status: 'complete',
              metadata: {
                suggestions: ['Add authentication', 'Database integration', 'API endpoints'],
                codePreview: '// Generated project structure\n/src\n  /components\n  /pages\n  /api'
              }
            }
          : msg
      ));
      setIsProcessing(false);
      setActiveFeatures(prev => [...prev, 'structure']);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateAIResponse(inputValue);
  };

  const handleSuggestion = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(suggestion);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-semibold">AI App Builder</h1>
            </div>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>AI Powered</span>
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {activeFeatures.includes('structure') && (
              <Badge variant="outline" className="animate-fade-in">
                <Box className="w-3 h-3 mr-1" />
                Structure Defined
              </Badge>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Chat
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start a new configuration</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      {/* Feature Pills */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-2 flex items-center space-x-4">
          <TooltipProvider>
            {[
              { icon: <Code2 className="w-4 h-4" />, label: 'Code Generation' },
              { icon: <Palette className="w-4 h-4" />, label: 'UI Components' },
              { icon: <Cpu className="w-4 h-4" />, label: 'AI Assistance' },
              { icon: <Hammer className="w-4 h-4" />, label: 'Build Tools' }
            ].map((feature, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 px-3 py-1 rounded-full bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                    {feature.icon}
                    <span>{feature.label}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure {feature.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-auto px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[80%] rounded-lg p-4 
                  ${message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border shadow-sm'
                  }
                `}>
                  {message.content}
                  
                  {message.status === 'thinking' && (
                    <div className="flex items-center space-x-2 mt-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span className="text-sm opacity-70">Thinking...</span>
                    </div>
                  )}

                  {message.metadata?.suggestions && (
                    <div className="mt-4 space-y-2">
                      {message.metadata.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleSuggestion(suggestion)}
                        >
                          <ChevronRight className="w-3 h-3 mr-1" />
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}

                  {message.metadata?.codePreview && (
                    <div className="mt-4 bg-gray-50 rounded p-3">
                      <pre className="text-sm">
                        <code>{message.metadata.codePreview}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Describe your app or ask for suggestions..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              {isProcessing && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Loader className="w-4 h-4 animate-spin text-gray-400" />
                </div>
              )}
            </div>
            <Button onClick={handleSend} disabled={isProcessing}>
              <Zap className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatConfigInterface;