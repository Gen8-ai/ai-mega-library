import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Title Slide
    {
      type: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <h1 className="text-6xl font-bold">STOLEN<span className="text-red-600">street</span>2025</h1>
          <h2 className="text-2xl"><span className="text-red-600">online</span> clothing <span className="text-red-600">ecommerce</span> Launch</h2>
        </div>
      )
    },
    // Overview Slide
    {
      title: "Project Overview",
      content: (
        <div className="space-y-6">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Launch Details</h3>
            <p>Target Launch: 2025</p>
            <p>Platform: Online Clothing Ecommerce</p>
            <p>Focus: Contemporary Streetwear</p>
          </div>
        </div>
      )
    },
    // Pages Structure
    {
      title: "Website Structure",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Main Pages</h3>
            <ul className="space-y-2">
              <li>• Index/Landing Page</li>
              <li>• Shop All</li>
              <li>• Mens</li>
              <li>• Womens</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Categories</h3>
            <ul className="space-y-2">
              <li>• Tops</li>
              <li>• Bottoms</li>
              <li>• Extras</li>
            </ul>
          </div>
        </div>
      )
    },
    // UI/UX Components
    {
      title: "UI/UX Components",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Core Components</h3>
            <ul className="space-y-2">
              <li>• Navigation System</li>
              <li>• Product Cards</li>
              <li>• Shopping Cart</li>
              <li>• User Dashboard</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Interactive Elements</h3>
            <ul className="space-y-2">
              <li>• Size Selection</li>
              <li>• Color Picker</li>
              <li>• Quantity Adjuster</li>
              <li>• Wishlist Toggle</li>
            </ul>
          </div>
        </div>
      )
    },
    // Features
    {
      title: "Key Features",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">User Features</h3>
            <ul className="space-y-2">
              <li>• User Authentication</li>
              <li>• Shopping Cart System</li>
              <li>• Wishlist Management</li>
              <li>• Order Tracking</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Shopping Features</h3>
            <ul className="space-y-2">
              <li>• Advanced Search</li>
              <li>• Filter System</li>
              <li>• Size Guide</li>
              <li>• Related Products</li>
            </ul>
          </div>
        </div>
      )
    },
    // Design Elements
    {
      title: "Design Elements",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Theme Colors</h3>
            <div className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-black rounded"></div>
                <span className="text-sm mt-1">Primary</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-red-600 rounded"></div>
                <span className="text-sm mt-1">Accent</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded"></div>
                <span className="text-sm mt-1">Text</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Typography</h3>
            <p className="text-xl">Modern sans-serif for headlines</p>
            <p className="text-base">Clean, readable fonts for body text</p>
          </div>
        </div>
      )
    },
    // Development Notes
    {
      title: "Development Notes",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Technical Stack</h3>
            <ul className="space-y-2">
              <li>• React Frontend</li>
              <li>• RESTful API</li>
              <li>• Secure Payment Gateway</li>
              <li>• CDN Integration</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Performance Focus</h3>
            <ul className="space-y-2">
              <li>• Mobile Responsive</li>
              <li>• Fast Loading</li>
              <li>• SEO Optimized</li>
              <li>• Secure Checkout</li>
            </ul>
          </div>
        </div>
      )
    },
    // Launch Timeline
    {
      title: "Launch Timeline",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-bold mb-2">Key Milestones</h3>
            <ul className="space-y-2">
              <li>• Q1 2025: Development Complete</li>
              <li>• Q2 2025: Testing Phase</li>
              <li>• Q3 2025: Beta Launch</li>
              <li>• Q4 2025: Full Launch</li>
            </ul>
          </div>
        </div>
      )
    },
    // Contact Slide
    {
      type: 'contact',
      content: (
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <h2 className="text-4xl font-bold">Thank You</h2>
          <div className="text-xl">
            <p>Visit: https://www.stolenstreet.com</p>
            <p>Contact: support@stolenstreet.com</p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full h-screen bg-black text-white">
      <div className="relative h-full flex flex-col">
        {/* Slide Content */}
        <div className="flex-1 p-8">
          {slides[currentSlide].type !== 'title' && slides[currentSlide].type !== 'contact' && (
            <h2 className="text-3xl font-bold mb-8">{slides[currentSlide].title}</h2>
          )}
          {slides[currentSlide].content}
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between items-center p-4 bg-gray-900">
          <button 
            onClick={prevSlide}
            className="p-2 hover:bg-gray-800 rounded"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-sm">
            Slide {currentSlide + 1} of {slides.length}
          </div>
          
          <button 
            onClick={nextSlide}
            className="p-2 hover:bg-gray-800 rounded"
            disabled={currentSlide === slides.length - 1}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;