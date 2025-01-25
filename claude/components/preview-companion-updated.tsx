import React, { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  MessageCircle, Code, Layout, Eye, Pencil, 
  Save, Undo, Import, X, Check 
} from 'lucide-react';

const PreviewCompanion = () => {
  const [activeTab, setActiveTab] = useState('preview');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showGrid, setShowGrid] = useState(false);
  const [editHistory, setEditHistory] = useState([]);
  const [importState, setImportState] = useState({
    isImporting: false,
    artifactId: '',
    status: null,
    preview: null
  });
  const [importedLayout, setImportedLayout] = useState(null);

  const previewModes = {
    desktop: { width: 'w-full', height: 'h-[600px]' },
    tablet: { width: 'w-[768px]', height: 'h-[1024px]' },
    mobile: { width: 'w-[375px]', height: 'h-[812px]' }
  };

  const handleImport = async () => {
    setImportState(prev => ({ ...prev, status: 'loading' }));
    
    try {
      // Simulated API call to fetch artifact
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example imported layout content
      const mockLayout = {
        type: 'grid',
        columns: 2,
        components: [
          { id: 'header', type: 'header', content: 'Imported Header' },
          { id: 'main', type: 'content', content: 'Main Content Area' }
        ]
      };

      setImportedLayout(mockLayout);
      setImportState(prev => ({
        ...prev,
        status: 'success',
        preview: mockLayout
      }));

      // Add to edit history
      setEditHistory(prev => [
        { description: `Imported layout from artifact: ${importState.artifactId}`, timestamp: new Date() },
        ...prev
      ]);

    } catch (error) {
      setImportState(prev => ({
        ...prev,
        status: 'error',
        preview: null
      }));
    }
  };

  const ImportDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Import Claude Artifact</h3>
          <button 
            onClick={() => setImportState(prev => ({ ...prev, isImporting: false }))}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Artifact ID</label>
            <input
              type="text"
              value={importState.artifactId}
              onChange={(e) => setImportState(prev => ({ ...prev, artifactId: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter artifact ID"
            />
          </div>

          {importState.status === 'loading' && (
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle>Loading...</AlertTitle>
              <AlertDescription>Fetching artifact layout...</AlertDescription>
            </Alert>
          )}

          {importState.status === 'success' && (
            <Alert className="bg-green-50 border-green-200">
              <Check className="w-4 h-4 text-green-500" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Layout imported successfully</AlertDescription>
            </Alert>
          )}

          {importState.status === 'error' && (
            <Alert className="bg-red-50 border-red-200">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to import artifact layout</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setImportState(prev => ({ ...prev, isImporting: false }))}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={!importState.artifactId || importState.status === 'loading'}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 disabled:opacity-50"
            >
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Preview Panel */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-lg h-full">
          {/* Preview Header */}
          <div className="border-b p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Layout className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-semibold">Live Preview</h2>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setImportState(prev => ({ ...prev, isImporting: true }))}
                className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200"
              >
                <Import className="w-4 h-4" />
                <span>Import Artifact</span>
              </button>
              {/* Viewport controls */}
              <button 
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-purple-100 text-purple-700' : 'text-gray-500'}`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                </svg>
              </button>
              {/* ... other viewport buttons ... */}
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6 h-[calc(100%-4rem)] overflow-auto flex justify-center">
            <div 
              className={`${previewModes[previewMode].width} ${previewModes[previewMode].height} 
                         border rounded-lg bg-white shadow transition-all duration-300
                         ${showGrid ? 'bg-grid-pattern' : ''}`}
            >
              {importedLayout ? (
                <div className="w-full h-full p-4">
                  {/* Render imported layout */}
                  <div className="grid grid-cols-2 gap-4 h-full">
                    {importedLayout.components.map(component => (
                      <div 
                        key={component.id}
                        className="border rounded p-4 bg-gray-50"
                      >
                        <h3 className="font-medium mb-2">{component.type}</h3>
                        <p>{component.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Eye className="w-6 h-6 mr-2" />
                  <span>Import an artifact to preview layout</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      {/* ... existing controls panel code ... */}

      {/* Import Dialog */}
      {importState.isImporting && <ImportDialog />}
    </div>
  );
};

export default PreviewCompanion;