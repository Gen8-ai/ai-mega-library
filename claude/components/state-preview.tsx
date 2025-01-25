import React from 'react';
import { useForumContext } from './DocumentForum';

const StatePreview: React.FC = () => {
  const context = useForumContext();

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-gray-800 rounded-lg shadow-lg w-96">
      <h3 className="font-semibold mb-2">Forum State</h3>
      <pre className="text-xs overflow-auto max-h-60 bg-gray-900 p-2 rounded">
        {JSON.stringify({
          sortOption: context.sortOption,
          viewMode: context.viewMode,
          selectedTags: context.selectedTags,
          documentCount: context.documents.length
        }, null, 2)}
      </pre>
    </div>
  );
};

export default StatePreview;