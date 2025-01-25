import React from 'react';
import { Card } from '@/components/ui/card';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export const CodeEditor = ({ value, onChange }: CodeEditorProps) => {
  return (
    <Card className="min-h-[400px] overflow-hidden">
      <Editor
        height="400px"
        defaultLanguage="typescript"
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
    </Card>
  );
};