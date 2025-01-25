import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { X, Copy, RefreshCw, Code, ExternalLink } from 'lucide-react';

// Header Component
const Header: React.FC = () => {
  return (
    <header className="bg-neutral-900 text-white p-4 flex justify-between items-center border-b border-red-600">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-red-600">STOLEN STREET</h1>
        <span className="text-neutral-400">Component Editor</span>
      </div>
      <div className="flex items-center space-x-2">
        <Code className="w-5 h-5 text-neutral-400" />
        <span className="text-neutral-400">Live Preview</span>
      </div>
    </header>
  );
};

// Editor Panel Component
const EditorPanel: React.FC<{ 
  code: string; 
  onCodeChange: (value: string) => void 
}> = ({ code, onCodeChange }) => {
  return (
    <div className="w-1/2 h-full border-r border-neutral-800">
      <Editor
        height="100%"
        defaultLanguage="html"
        value={code}
        onChange={(value) => onCodeChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'JetBrains Mono, monospace',
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          roundedSelection: false,
          padding: { top: 16 },
          renderLineHighlight: 'all',
        }}
      />
    </div>
  );
};

// Preview Panel Component
const PreviewPanel: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div className="w-1/2 h-full bg-neutral-900">
      <div className="h-full rounded-md overflow-hidden">
        <iframe
          title="Live Preview"
          srcDoc={`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { 
                    background: #171717; 
                    color: #ffffff; 
                    font-family: Arial, sans-serif;
                    padding: 1rem;
                  }
                  * { box-sizing: border-box; }
                </style>
              </head>
              <body>${code}</body>
            </html>
          `}
          sandbox="allow-scripts"
          className="w-full h-full border-none bg-neutral-900"
        ></iframe>
      </div>
    </div>
  );
};

// Toolbar Component
const Toolbar: React.FC<{ 
  resetCode: () => void;
  copyCode: () => void;
}> = ({ resetCode, copyCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyCode();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-800 p-2 flex justify-between items-center border-b border-neutral-700">
      <div className="flex items-center space-x-2">
        <button
          className="px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-700 transition-colors flex items-center space-x-2"
          onClick={resetCode}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset</span>
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center space-x-2"
          onClick={handleCopy}
        >
          <Copy className="w-4 h-4" />
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-neutral-400 text-sm hidden md:inline">
          Edit code to see live preview
        </span>
        <button className="p-2 hover:bg-neutral-700 rounded transition-colors">
          <ExternalLink className="w-4 h-4 text-neutral-400" />
        </button>
      </div>
    </div>
  );
};

// Layout Component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
      <Header />
      {children}
    </div>
  );
};

// Main Application Component
const CodeEditorApp: React.FC = () => {
  const [code, setCode] = useState<string>(`
<div class="flex flex-col items-center justify-center p-8 space-y-4">
  <h1 class="text-3xl font-bold text-red-600">STOLEN STREET</h1>
  <div class="flex space-x-4">
    <button class="px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors">
      SHOP NOW
    </button>
    <button class="px-6 py-3 border-2 border-red-600 text-red-600 font-bold rounded hover:bg-red-600 hover:text-white transition-all">
      VIEW DROPS
    </button>
  </div>
  <p class="text-neutral-400 mt-4">
    Run the Streets, Own Your Style.
  </p>
</div>
  `.trim());

  const resetCode = () => {
    setCode(`
<div class="flex flex-col items-center justify-center p-8 space-y-4">
  <h1 class="text-3xl font-bold text-red-600">STOLEN STREET</h1>
  <div class="flex space-x-4">
    <button class="px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors">
      SHOP NOW
    </button>
    <button class="px-6 py-3 border-2 border-red-600 text-red-600 font-bold rounded hover:bg-red-600 hover:text-white transition-all">
      VIEW DROPS
    </button>
  </div>
  <p class="text-neutral-400 mt-4">
    Run the Streets, Own Your Style.
  </p>
</div>
    `.trim());
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Layout>
      <Toolbar resetCode={resetCode} copyCode={copyCode} />
      <div className="flex flex-1">
        <EditorPanel code={code} onCodeChange={setCode} />
        <PreviewPanel code={code} />
      </div>
    </Layout>
  );
};

export default CodeEditorApp;