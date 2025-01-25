import React, { useState } from 'react';
import { 
  Search, Copy, Moon, Sun, Code, Check, AlertCircle 
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ComponentLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCode, setShowCode] = useState({});
  const [selectedSize, setSelectedSize] = useState('md');

  const categories = [
    'all',
    'buttons',
    'cards',
    'forms',
    'navigation',
    'feedback',
    'overlays',
    'data-display',
    'inputs',
    'loaders'
  ];

  const components = [
    // Basic Buttons
    {
      id: 1,
      category: 'buttons',
      name: 'Primary Button',
      description: 'Main call-to-action button',
      component: (
        <button className="px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors">
          ADD TO CART
        </button>
        <button type="button" className="px-6 py-3 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition-colors">
    },
    {
      id: 2,
      category: 'buttons',
      name: 'Secondary Button',
      description: 'Alternative action button',
      component: (
        <button className="px-6 py-3 border-2 border-red-600 text-red-600 font-bold rounded hover:bg-red-600 hover:text-white transition-all">
          VIEW DETAILS
        </button>
        <button type="button" className="px-6 py-3 border-2 border-red-600 text-red-600 font-bold rounded hover:bg-red-600 hover:text-white transition-all">
    },
    // Size Variants
    {
      id: 3,
      category: 'buttons',
      name: 'Size Variants',
      description: 'Button size variations',
      component: (
        <div className="flex space-x-4">
          {['sm', 'md', 'lg'].map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
            <button type="button"
                ${size === 'sm' ? 'px-4 py-2 text-sm' : 
                  size === 'md' ? 'px-6 py-3' : 'px-8 py-4 text-lg'}
                ${selectedSize === size ? 'bg-red-600' : 'bg-neutral-800'}
                text-white font-bold rounded hover:bg-red-700 transition-colors
              `}
            >
              {size.toUpperCase()}
            </button>
          ))}
        </div>
      )
    },
    // Cards
    {
      id: 4,
      category: 'cards',
      name: 'Product Card',
      description: 'Display product information',
      component: (
        <Card className="bg-neutral-900 p-6 border-red-600">
          <div className="w-full h-40 bg-neutral-800 rounded mb-4" />
          <h3 className="text-lg font-bold">STOLEN HOODIE</h3>
          <p className="text-red-600 font-bold mt-2">$89.99</p>
        </Card>
      )
    },
    // Forms
    {
      id: 5,
      category: 'forms',
      name: 'Input Field',
      description: 'Text input with label',
      component: (
        <div className="space-y-2">
          <label className="text-sm font-bold">Email</label>
          <input 
            type="email" 
            className="w-full p-3 bg-neutral-800 rounded border border-neutral-700 focus:border-red-600 outline-none transition-colors"
            placeholder="Enter your email"
          />
        </div>
      )
    },
    // Navigation
    {
      id: 6,
      category: 'navigation',
      name: 'Progress Steps',
      description: 'Multi-step progress indicator',
      component: (
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= 2 ? 'bg-red-600' : 'bg-neutral-800'
              }`}>
                {step < 2 ? <Check className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className="w-16 h-1 mx-2 rounded bg-neutral-800">
                  <div className={`h-full rounded bg-red-600 ${
                    step < 2 ? 'w-full' : 'w-0'
                  }`} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )
    },
    // Feedback
    {
      id: 7,
      category: 'feedback',
      name: 'Alert',
      description: 'Important notifications',
      component: (
        <Alert className="bg-red-900/50 border-red-600">
          <AlertCircle className="w-5 h-5" />
          <AlertDescription>New drop coming soon!</AlertDescription>
        </Alert>
      )
    },
    // Loaders
    {
      id: 8,
      category: 'loaders',
      name: 'Loading States',
      description: 'Various loading indicators',
      component: (
        <div className="flex space-x-4">
          <div className="animate-spin w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full" />
          <div className="animate-pulse w-6 h-6 bg-red-600 rounded" />
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )
    },
    // Data Display
    {
      id: 9,
      category: 'data-display',
      name: 'Data Table',
      description: 'Sortable data table',
      component: (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-neutral-800">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
              </tr>
            </thead>
            <tbody>
              {[
                { product: 'STOLEN HOODIE', price: '$89.99', stock: 45 },
                { product: 'STREET BOMBER', price: '$129.99', stock: 23 }
              ].map((item, i) => (
                <tr key={i} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                  <td className="p-3">{item.product}</td>
                  <td className="p-3">{item.price}</td>
                  <td className="p-3">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
    // Inputs
    {
      id: 10,
      category: 'inputs',
      name: 'Toggle Switch',
      description: 'Custom toggle switch',
      component: (
        <button className="relative w-12 h-6 rounded-full bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black">
          <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 transform translate-x-6" />
        </button>
        <button type="button" className="relative w-12 h-6 rounded-full bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black" title="Toggle">
    }
  ];

  // Enhanced filtering with search
  const filteredComponents = components.filter(comp => {
    const matchesCategory = activeCategory === 'all' || comp.category === activeCategory;
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle code visibility
  const toggleCode = (id) => {
    setShowCode(prev => ({
      ...prev,
  const toggleCode = (id: number) => {
    }));
  };
      [id as keyof typeof prev]: !prev[id as keyof typeof prev]
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'} text-white transition-colors`}>
      {/* Header */}
      <header className="bg-neutral-900 p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-red-600">STOLEN STREET UI</h1>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
            <button type="button" title="Copy Code"
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input 
              type="search"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-800 rounded border border-neutral-700 focus:border-red-600 outline-none"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Category Navigation */}
        <nav className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap ${
                activeCategory === category 
                  ? 'bg-red-600 text-white' 
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              } transition-colors`}
            >
              {category}
            </button>
          ))}
        </nav>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComponents.map((comp) => (
            <Card key={comp.id} className="bg-neutral-900 p-6 border-red-600">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{comp.name}</h3>
                  <p className="text-sm text-neutral-400">{comp.description}</p>
                </div>
                <button
                  onClick={() => toggleCode(comp.id)}
                  className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
                >
                  <Code className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-black/50 rounded-lg p-6 flex items-center justify-center min-h-[120px]">
                {comp.component}
              </div>

              {showCode[comp.id] && (
                <div className="mt-4 p-4 bg-neutral-800 rounded-lg relative">
                  <button 
              {showCode[comp.id as keyof typeof showCode] && (
                    onClick={() => {/* Copy to clipboard */}}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <pre className="text-sm overflow-x-auto">
                    <code>{/* Component code */}</code>
                  </pre>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-neutral-800">
                <p className="text-sm text-neutral-400 capitalize">
                  Category: {comp.category}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ComponentLibrary;