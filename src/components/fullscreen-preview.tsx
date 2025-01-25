import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Tablet,
  Maximize2,
  Minimize2,
  RefreshCcw,
  ChevronLeft,
  Settings,
  Code,
  Share2,
  Palette,
  Grid
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const FullscreenPreview = () => {
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Viewport size configurations
  const viewportDimensions = {
    desktop: { width: 'w-full', height: 'h-full' },
    tablet: { width: 'w-[768px]', height: 'h-[1024px]' },
    mobile: { width: 'w-[375px]', height: 'h-[667px]' }
  };

  // Mouse move handler for controls visibility
  const handleMouseMove = () => {
    setShowControls(true);
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div 
      className="h-screen bg-gray-900 flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Controls - Top */}
      <div className={`
        fixed top-0 left-0 right-0 p-4 transition-opacity duration-300
        ${showControls ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="bg-gray-800/50 text-white border-gray-700">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
            <div className="h-4 w-px bg-gray-700" />
            <Badge variant="outline" className="bg-gray-800/50 text-white border-gray-700">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              Live Preview
            </Badge>
          </div>

          {/* Center Controls */}
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`${viewportSize === 'desktop' ? 'bg-gray-700' : ''} text-white`}
                    onClick={() => setViewportSize('desktop')}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Desktop View</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`${viewportSize === 'tablet' ? 'bg-gray-700' : ''} text-white`}
                    onClick={() => setViewportSize('tablet')}
                  >
                    <Tablet className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Tablet View</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`${viewportSize === 'mobile' ? 'bg-gray-700' : ''} text-white`}
                    onClick={() => setViewportSize('mobile')}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Mobile View</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-800/50 text-white border-gray-700"
                    onClick={() => setShowGrid(!showGrid)}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Grid</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button 
              variant="outline" 
              size="sm" 
              className="bg-gray-800/50 text-white border-gray-700"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex-1 flex items-center justify-center overflow-auto">
        <div 
          className={`
            bg-white rounded-lg shadow-2xl transition-all duration-300
            ${viewportDimensions[viewportSize].width}
            ${viewportDimensions[viewportSize].height}
            ${viewportSize !== 'desktop' ? 'shadow-2xl' : ''}
            relative
          `}
        >
          {/* Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full grid grid-cols-12 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-full border-r border-blue-200/20 last:border-r-0"
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Preview Frame */}
          <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
            {/* Example Content - Replace with actual preview */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Preview Content</h1>
                <p className="text-gray-600">Your app preview will appear here</p>
                <div className="mt-4 text-sm text-gray-400">
                  Current viewport: {viewportSize}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Controls - Bottom */}
      <div className={`
        fixed bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300
        ${showControls ? 'opacity-100' : 'opacity-0'}
      `}>
        <div className="bg-gray-800/50 rounded-full backdrop-blur-sm p-1 flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <RefreshCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh Preview</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Code className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Code</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Share2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
                <TooltipContent>Share Preview</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white">
                  <Palette className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Theme Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default FullscreenPreview;