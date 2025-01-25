import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2, ArrowRight } from "lucide-react";

const PromptInitiator = () => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return;
    setIsProcessing(true);
    // Simulate processing - replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsProcessing(false);
    // Navigate to preview page or handle next step
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Transform Your Ideas Into Code</h1>
          <p className="text-xl text-muted-foreground">
            Describe your app idea and let AI handle the development
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5" />
              AI App Generator
            </CardTitle>
            <CardDescription>
              Start by describing what you want to build
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Create a task management app with team collaboration..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="text-lg"
              />
              <Button 
                onClick={handlePromptSubmit}
                disabled={isProcessing || !prompt.trim()}
                size="lg"
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </Button>
            </div>
          </CardContent>

          <CardFooter className="justify-between text-sm text-muted-foreground">
            <div className="flex gap-2">
              Supported stacks:
              <span className="font-mono">React</span> •
              <span className="font-mono">TypeScript</span> •
              <span className="font-mono">Tailwind</span>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center p-6">
            <h3 className="font-semibold mb-2">Describe</h3>
            <p className="text-sm text-muted-foreground">
              Share your app idea in plain English
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <h3 className="font-semibold mb-2">Generate</h3>
            <p className="text-sm text-muted-foreground">
              AI creates your application structure
            </p>
          </Card>
          
          <Card className="text-center p-6">
            <h3 className="font-semibold mb-2">Customize</h3>
            <p className="text-sm text-muted-foreground">
              Fine-tune the generated code
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PromptInitiator;