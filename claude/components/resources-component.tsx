import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Search, Filter, Tag } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// TypeScript interfaces
interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  tags: string;
  created_at: string;
  updated_at: string;
}

interface ParsedResource extends Omit<Resource, 'tags'> {
  tags: string[];
}

const ResourceList: React.FC = () => {
  const [resources, setResources] = useState<ParsedResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<ParsedResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await window.fs.readFile('resources_rows.csv', { encoding: 'utf8' });
        const result = Papa.parse(response, {
          header: true,
          skipEmptyLines: true
        });

        const parsedResources: ParsedResource[] = result.data.map((resource: Resource) => ({
          ...resource,
          tags: JSON.parse(resource.tags.replace(/\\/g, ''))
        }));

        setResources(parsedResources);
        setFilteredResources(parsedResources);
        
        // Extract unique categories and tags
        const uniqueCategories = [...new Set(parsedResources.map(r => r.category))];
        const uniqueTags = [...new Set(parsedResources.flatMap(r => r.tags))];
        
        setCategories(uniqueCategories);
        setAllTags(uniqueTags);
      } catch (error) {
        console.error('Error loading resources:', error);
      }
    };

    loadResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }

    if (selectedTag) {
      filtered = filtered.filter(resource => resource.tags.includes(selectedTag));
    }

    setFilteredResources(filtered);
  }, [searchTerm, selectedCategory, selectedTag, resources]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6 space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <select
            className="px-4 py-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.replace('_', ' ').charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 border rounded-md"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {formatDate(resource.created_at)}
                  </CardDescription>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                  {resource.category.replace('_', ' ')}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 hover:text-blue-800"
              >
                View Resource →
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No resources found matching your criteria
        </div>
      )}
    </div>
  );
};

export default ResourceList;