import React, { useState } from 'react';
import { Plus, Trash2, ArrowRight, Layout, Component, File } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface PageConfig {
  name: string;
  route: string;
  components: string[];
}

interface ProjectConfig {
  name: string;
  framework: string;
  pages: PageConfig[];
}

const ConfigurationPage = ({ onComplete }: { onComplete: (config: ProjectConfig) => void }) => {
  const [config, setConfig] = useState<ProjectConfig>({
    name: '',
    framework: 'react',
    pages: []
  });

  const [currentPage, setCurrentPage] = useState<PageConfig>({
    name: '',
    route: '',
    components: []
  });

  const addPage = () => {
    if (currentPage.name && currentPage.route) {
      setConfig(prev => ({
        ...prev,
        pages: [...prev.pages, currentPage]
      }));
      setCurrentPage({ name: '', route: '', components: [] });
    }
  };

  const removePage = (index: number) => {
    setConfig(prev => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Layout className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl font-semibold">App Configuration</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Configure your application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">App Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={config.name}
                  onChange={e => setConfig(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Awesome App"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Framework</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={config.framework}
                  onChange={e => setConfig(prev => ({ ...prev, framework: e.target.value }))}
                >
                  <option value="react">React</option>
                  <option value="next">Next.js</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Pages Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Pages Configuration</CardTitle>
              <CardDescription>Define the pages and routes of your application</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="add" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="add">Add Page</TabsTrigger>
                  <TabsTrigger value="list">Pages List</TabsTrigger>
                </TabsList>

                <TabsContent value="add" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Page Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={currentPage.name}
                        onChange={e => setCurrentPage(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Home"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Route</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={currentPage.route}
                        onChange={e => setCurrentPage(prev => ({ ...prev, route: e.target.value }))}
                        placeholder="/home"
                      />
                    </div>
                  </div>
                  <Button onClick={addPage} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Page
                  </Button>
                </TabsContent>

                <TabsContent value="list" className="mt-4">
                  <div className="space-y-2">
                    {config.pages.map((page, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center space-x-3">
                          <File className="w-4 h-4 text-gray-500" />
                          <span>{page.name}</span>
                          <span className="text-gray-500 text-sm">{page.route}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removePage(index)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            size="lg"
            className="w-full"
            onClick={() => onComplete(config)}
            disabled={!config.name || config.pages.length === 0}
          >
            Continue to Development
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ConfigurationPage;