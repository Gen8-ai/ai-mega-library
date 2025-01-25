import React, { useState } from 'react';
import { Search, Plus, Database, RefreshCw } from 'lucide-react';

interface Document {
  id: string;
  text: string;
  similarity?: number;
}

const VectorStoreDemo: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulate vector similarity with simple text matching for demo
  const calculateSimilarity = (text1: string, text2: string): number => {
    const words1 = text1.toLowerCase().split(' ');
    const words2 = text2.toLowerCase().split(' ');
    const intersection = words1.filter(word => words2.includes(word));
    return intersection.length / Math.max(words1.length, words2.length);
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      const doc: Document = {
        id: crypto.randomUUID(),
        text: newDocument
      };
      setDocuments(prev => [...prev, doc]);
      setNewDocument('');
    }
  };

  const searchDocuments = () => {
    if (searchQuery.trim()) {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const updatedDocs = documents.map(doc => ({
          ...doc,
          similarity: calculateSimilarity(doc.text, searchQuery)
        }))
        .sort((a, b) => (b.similarity || 0) - (a.similarity || 0));
        
        setDocuments(updatedDocs);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="h-6 w-6 text-blue-500" />
        <h2 className="text-xl font-semibold">Vector Store Demo</h2>
      </div>

      {/* Add Document Section */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newDocument}
            onChange={(e) => setNewDocument(e.target.value)}
            placeholder="Add new document..."
            className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addDocument}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Search Section */}
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents..."
            className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={searchDocuments}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Documents Display */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Stored Documents</h3>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div 
              key={doc.id}
              className={`p-4 rounded-lg border transition-colors ${
                doc.similarity ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <p className="flex-1">{doc.text}</p>
                {doc.similarity !== undefined && (
                  <span className="ml-4 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                    {(doc.similarity * 100).toFixed(1)}% match
                  </span>
                )}
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No documents stored yet. Add some documents to get started.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VectorStoreDemo;