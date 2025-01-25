import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Menu, Globe, Mail } from 'lucide-react';

const Webpage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">MyWebsite</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Services</Button>
              <Button variant="ghost">Contact</Button>
            </div>
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to MyWebsite
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-5 md:text-xl">
              A modern web experience built with React and Tailwind CSS
            </p>
            <div className="mt-5 sm:mt-8">
              <Button className="mx-2">Get Started</Button>
              <Button variant="outline" className="mx-2">Learn More</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Feature {i}</CardTitle>
                <CardDescription>
                  A brief description of this amazing feature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" className="w-full">Learn More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
            <p className="mt-2 text-gray-600">We'd love to hear from you</p>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="space-y-4">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" type="email" />
              <Button className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-300">
            <p>&copy; 2025 MyWebsite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Webpage;