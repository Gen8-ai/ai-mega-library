import React, { useState, useMemo } from 'react';
import { Search, Tag, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
}

interface FilterButtonProps {
  tag: string;
  active: boolean;
  onClick: () => void;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "Full-stack dashboard with React, TypeScript, and Node.js. Features real-time analytics and inventory management.",
    tags: ["React", "TypeScript", "Node.js"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates and team features. Built with Next.js and Firebase.",
    tags: ["Next.js", "Firebase", "TypeScript"],
    image: "/api/placeholder/400/250",
    githubUrl: "https://github.com",
    featured: true
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "Weather forecasting app with location-based services and interactive maps.",
    tags: ["React", "APIs", "Maps"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://example.com",
    featured: false
  }
];

const FilterButton: React.FC<FilterButtonProps> = ({ tag, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1 rounded-full text-sm font-medium transition-colors duration-300
      ${active 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
  >
    {tag}
  </button>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg 
      transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        {project.featured && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 
            py-1 rounded text-xs font-medium">
            Featured
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
            >
              <Tag size={14} className="inline mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 
                transition-colors"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-700 hover:text-gray-900 
                transition-colors"
            >
              <Github size={18} />
              Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesTag = !selectedTag || project.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Projects</h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
                  focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <FilterButton
                tag="All"
                active={selectedTag === ''}
                onClick={() => setSelectedTag('')}
              />
              {allTags.map(tag => (
                <FilterButton
                  key={tag}
                  tag={tag}
                  active={selectedTag === tag}
                  onClick={() => setSelectedTag(tag)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No projects found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;