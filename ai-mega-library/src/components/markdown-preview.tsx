import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is a **markdown** preview.');
  
  const createHtml = (markdown) => {
    // Basic markdown to HTML conversion
    return markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mb-3">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  const previewHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif;
            padding: 1rem;
            margin: 0;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>${createHtml(markdown)}</body>
    </html>
  `;

  return (
    <Card className="w-full max-w-4xl mx-auto p-4">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-64 font-mono"
            placeholder="Enter markdown here..."
          />
        </TabsContent>
        
        <TabsContent value="preview" className="h-64">
          <iframe
            srcDoc={previewHtml}
            className="w-full h-full border-0"
            title="Markdown Preview"
            sandbox="allow-same-origin"
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default MarkdownPreview;