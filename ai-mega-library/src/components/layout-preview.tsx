import React, { useState } from 'react';
import { BookOpen, Menu, Bell, Settings, User, Search, Code, FileText, MessageSquare, X } from 'lucide-react';

// Type definitions
type ViewMode = 'grid' | 'list';
type SidebarState = 'expanded' | 'collapsed';

interface PreviewItem {
  id: string;
  title: string;
  type: 'code' | 'document' | 'chat';
  preview: string;
  date: string;
}

const PreviewLayout = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sidebarState, setSidebarState] = useState<SidebarState>('expanded');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarState(prev => prev === 'expanded' ? 'collapsed' : 'expanded');
  };

  const getIcon = (type: PreviewItem['type']) => {
    switch (type) {
      case 'code': return <Code className="h-5 w-5 text-blue-400" />;
      case 'document': return <FileText className="h-5 w-5 text-green-400" />;
      case 'chat': return <MessageSquare className="h-5 w-5 text-purple-400" />;
    }
  };

  const previewItems: PreviewItem[] = [
    { id: '1', title: 'React Component', type: 'code', preview: 'TypeScript implementation...', date: '2h ago' },
    { id: '2', title: 'API Documentation', type: 'document', preview: 'REST endpoints...', date: '3h ago' },
    { id: '3', title: 'Code Review', type: 'chat', preview: 'Performance discussion...', date: '5h ago' },
    { id: '4', title: 'UI Components', type: 'code', preview: 'Tailwind styles...', date: '1d ago' },
  ];

  return (
    <div className="h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-gray-800 px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden">
            <Menu className="h-6 w-6 text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold">GenR8</span>
          </div>
        </div>

        <div className="hidden md:block flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search artifacts..."
              className="w-full bg-gray-800 pl-10 pr-4 py-2 rounded-lg text-gray-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="h-6 w-6 text-gray-400" />
          <Settings className="h-6 w-6 text-gray-400" />
          <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 z-50 lg:hidden">
          <div className="p-4">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4"
            >
              <X className="h-6 w-6 text-gray-400" />
            </button>
            <div className="flex flex-col gap-4 mt-16">
              <a href="#" className="flex items-center gap-2 text-gray-100 p-2">
                <BookOpen className="h-5 w-5" /> Library
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-400 p-2">
                <Search className="h-5 w-5" /> Explore
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-400 p-2">
                <Settings className="h-5 w-5" /> Settings
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`hidden lg:block border-r border-gray-800 ${
          sidebarState === 'expanded' ? 'w-64' : 'w-20'
        } transition-all duration-300`}>
          <div className="p-4">
            <nav className="space-y-2">
              {['Library', 'Explore', 'Settings'].map((item, index) => (
                <div key={item} className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                  ${index === 0 ? 'bg-gray-800 text-blue-400' : 'text-gray-400 hover:bg-gray-800/50'}
                `}>
                  {index === 0 ? <BookOpen className="h-5 w-5" /> :
                   index === 1 ? <Search className="h-5 w-5" /> :
                                <Settings className="h-5 w-5" />}
                  {sidebarState === 'expanded' && <span>{item}</span>}
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Artifacts</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-800' : ''}`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-800' : ''}`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 
              'space-y-4'
            }>
              {previewItems.map(item => (
                <div key={item.id} className={`
                  bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-750
                  ${viewMode === 'list' ? 'flex items-center gap-4' : ''}
                `}>
                  <div className={`
                    ${viewMode === 'list' ? 'flex-shrink-0' : 'mb-3'}
                  `}>
                    {getIcon(item.type)}
                  </div>
                  <div className={viewMode === 'list' ? 'flex-1' : ''}>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{item.preview}</p>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PreviewLayout;