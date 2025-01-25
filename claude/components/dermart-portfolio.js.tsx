import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Palette, Zap, Box, Star, Eye, Share2, MessageSquare, Heart } from 'lucide-react';

const DermArtPortfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const projects = [
    {
      id: 1,
      title: "Urban Decay Series",
      category: "Street Art",
      year: "2024",
      description: "Exploring the beauty in urban deterioration through mixed media",
      techniques: ["Spray Paint", "Digital Collage", "Photography"],
      dimensions: "Various Sizes",
      annotations: [
        "Raw concrete textures mixed with digital elements",
        "Color palette inspired by oxidized metals",
        "Site-specific installations documented digitally"
      ]
    },
    {
      id: 2,
      title: "Digital Dystopia",
      category: "Digital Art",
      year: "2023",
      description: "A commentary on technology through glitch aesthetics",
      techniques: ["Glitch Art", "3D Rendering", "Animation"],
      dimensions: "4K Digital",
      annotations: [
        "Custom processing algorithms",
        "Databending techniques",
        "Projection mapping ready"
      ]
    },
    {
      id: 3,
      title: "DERMART x VOID",
      category: "Collaboration",
      year: "2023",
      description: "Limited edition merchandise collection",
      techniques: ["Fashion Design", "Screen Printing", "Brand Collaboration"],
      dimensions: "Apparel Collection",
      annotations: [
        "Limited run of 100 pieces",
        "Sustainable materials",
        "Hand-finished details"
      ]
    }
  ];

  const communityPosts = [
    {
      id: 1,
      username: "glitch_master",
      title: "Digital Entropy",
      description: "Corrupted my family photos through databending",
      timestamp: "2 hours ago",
      likes: 42,
      comments: 7,
      tags: ["glitch", "corruption", "memory"]
    },
    {
      id: 2,
      username: "chaos_theory",
      title: "System Failure",
      description: "Generated through broken LCD screen captures",
      timestamp: "5 hours ago",
      likes: 38,
      comments: 4,
      tags: ["hardware", "abstract", "decay"]
    },
    {
      id: 3,
      username: "pixel_destroyer",
      title: "404_emotions.jpg",
      description: "Emotional states represented through corrupted data",
      timestamp: "1 day ago",
      likes: 56,
      comments: 12,
      tags: ["emotional", "digital", "abstract"]
    }
  ];

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(postId)) {
        newLikes.delete(postId);
      } else {
        newLikes.add(postId);
      }
      return newLikes;
    });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-6xl font-black tracking-tighter">
              DERM<span className="text-red-500">ART</span>
            </h1>
            <Badge className="bg-red-500 text-lg py-2">
              EST. 2020
            </Badge>
          </div>
          <p className="text-xl mt-4 text-gray-400">Disrupting the Digital // Breaking the Physical</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <Tabs defaultValue="works" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 mb-8">
            <TabsTrigger value="works" className="data-[state=active]:bg-red-500">
              <Eye className="w-4 h-4 mr-2" />
              Works
            </TabsTrigger>
            <TabsTrigger value="process" className="data-[state=active]:bg-red-500">
              <Zap className="w-4 h-4 mr-2" />
              Process
            </TabsTrigger>
            <TabsTrigger value="exhibitions" className="data-[state=active]:bg-red-500">
              <Star className="w-4 h-4 mr-2" />
              Shows
            </TabsTrigger>
            <TabsTrigger value="share" className="data-[state=active]:bg-red-500">
              <Share2 className="w-4 h-4 mr-2" />
              Chaos Wall
            </TabsTrigger>
          </TabsList>

          <TabsContent value="works" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <Card 
                  key={project.id}
                  className="bg-gray-900 border-gray-800 cursor-pointer transform transition hover:scale-105"
                  onClick={() => setActiveProject(project)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        {project.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.techniques.map((technique) => (
                        <Badge key={technique} variant="secondary" className="bg-gray-800">
                          {technique}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Artist Statement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-l-2 border-red-500 pl-4">
                  <p className="text-gray-400">
                    DERMART exists in the space between order and chaos. Each piece is an exploration
                    of digital degradation and physical reconstruction. The work challenges the
                    boundaries between traditional and digital mediums, often destroying both to
                    create something new.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-4 flex items-center">
                      <Palette className="w-5 h-5 mr-2 text-red-500" />
                      Techniques
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Digital Manipulation</li>
                      <li>• Physical Media Destruction</li>
                      <li>• Glitch Processing</li>
                      <li>• Large Format Printing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-4 flex items-center">
                      <Box className="w-5 h-5 mr-2 text-red-500" />
                      Materials
                    </h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Found Objects</li>
                      <li>• Digital Waste</li>
                      <li>• Custom Software</li>
                      <li>• Industrial Materials</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exhibitions" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Exhibition History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-l-2 border-red-500 pl-4">
                    <h3 className="font-bold text-xl">DIGITAL DECAY // SOLO SHOW</h3>
                    <p className="text-gray-400">Contemporary Arts Space, 2024</p>
                  </div>
                  <div className="border-l-2 border-red-500 pl-4">
                    <h3 className="font-bold text-xl">BYTE/SITE // GROUP EXHIBITION</h3>
                    <p className="text-gray-400">Digital Arts Festival, 2023</p>
                  </div>
                  <div className="border-l-2 border-red-500 pl-4">
                    <h3 className="font-bold text-xl">DERMART x VOID // POP-UP</h3>
                    <p className="text-gray-400">Underground Gallery, 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">Community Chaos Wall</CardTitle>
                <p className="text-gray-400">Share your experiments in digital destruction</p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                          <Share2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold">Share Your Chaos</h3>
                          <p className="text-gray-400">Drag and drop or click to upload your work</p>
                        </div>
                      </div>
                      <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition-colors">
                        <p className="text-gray-400">JPG, PNG, GIF up to 10MB</p>
                      </div>
                    </CardContent>
                  </Card>

                  {communityPosts.map((post) => (
                    <Card key={post.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{post.title}</h3>
                            <p className="text-gray-400">by @{post.username}</p>
                          </div>
                          <Badge variant="outline" className="text-gray-400">
                            {post.timestamp}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{post.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-gray-900">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-6 text-gray-400">
                          <button 
                            className={`flex items-center gap-2 hover:text-red-500 transition-colors ${
                              likedPosts.has(post.id) ? 'text-red-500' : ''
                            }`}
                            onClick={() => handleLike(post.id)}
                          >
                            <Heart className="w-4 h-4" />
                            {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                          </button>
                          <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            {post.comments}
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {activeProject && (
          <Card className="mt-8 bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl">{activeProject.title}</CardTitle>
                <Badge className="bg-red-500">{activeProject.category}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    {activeProject.dimensions}
                  </Badge>
                  <Badge variant="outline" className="border-red-500 text-red-500">
                    {activeProject.year}
                  </Badge>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-bold mb-3">Project Notes</h3>
                  <ul className="space-y-2">
                    {activeProject.annotations.map((note, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-400">
                        <span className="font-mono text-red-500">{(index + 1).toString().padStart(2, '0')}</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default DermArtPortfolio;
