import React, { useState, useEffect } from 'react';
import { Search, Plus, RefreshCw } from 'lucide-react';

interface VectorPoint {
  text: string;
  vector: number[];
  similarity?: number;
}

const VectorEmbeddingDemo: React.FC = () => {
  const [points, setPoints] = useState<VectorPoint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newWord, setNewWord] = useState('');

  // Initialize embedding system
  const embedder = {
    encode: (text: string): number[] => {
      // Simple encoding for demo
      return [
        Math.cos(text.length * 0.5) * 0.8,
        Math.sin(text.length * 0.5) * 0.8
      ];
    },
    
    similarity: (vec1: number[], vec2: number[]): number => {
      const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
      const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
      const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
      return dotProduct / (mag1 * mag2);
    }
  };

  const addWord = () => {
    if (newWord.trim()) {
      const vector = embedder.encode(newWord);
      setPoints(prev => [...prev, { text: newWord, vector }]);
      setNewWord('');
    }
  };

  const searchSimilar = () => {
    if (searchTerm.trim()) {
      const searchVector = embedder.encode(searchTerm);
      const withSimilarity = points.map(point => ({
        ...point,
        similarity: embedder.similarity(searchVector, point.vector)
      }));
      setPoints(withSimilarity);
    }
  };

  // Initialize with some example words
  useEffect(() => {
    const initialWords = ['happy', 'joyful', 'sad', 'angry'];
    const initialPoints = initialWords.map(word => ({
      text: word,
      vector: embedder.encode(word)
    }));
    setPoints(initialPoints);
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <div className="mb-6 space-y-4">
        {/* Add new word */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            placeholder="Add new word..."
            className="flex-1 px-4 py-2 rounded-lg border"
          />
          <button
            onClick={addWord}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Search similar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search similar words..."
            className="flex-1 px-4 py-2 rounded-lg border"
          />
          <button
            onClick={searchSimilar}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Vector space visualization */}
      <div className="relative w-full h-96 bg-white rounded-lg border">
        <svg width="100%" height="100%" viewBox="-1.2 -1.2 2.4 2.4">
          {/* Axes */}
          <line x1="-1" y1="0" x2="1" y2="0" stroke="gray" strokeWidth="0.02" />
          <line x1="0" y1="-1" x2="0" y2="1" stroke="gray" strokeWidth="0.02" />

          {/* Points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.vector[0]}
                cy={-point.vector[1]}
                r="0.05"
                fill={point.similarity ? `rgba(59, 130, 246, ${point.similarity})` : 'blue'}
              />
              <text
                x={point.vector[0] + 0.06}
                y={-point.vector[1]}
                fontSize="0.1"
                fill={point.similarity ? `rgba(0, 0, 0, ${point.similarity})` : 'black'}
              >
                {point.text}
                {point.similarity && ` (${(point.similarity * 100).toFixed(1)}%)`}
              </text>
            </g>
          ))}
        </svg>

        {/* Reset button */}
        <button
          onClick={() => setPoints(points.map(p => ({ text: p.text, vector: p.vector })))}
          className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default VectorEmbeddingDemo;