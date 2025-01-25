import React from 'react';
import { Card } from '@/components/ui/card';

const MenuGrid = () => {
  const menuItems = [
    { id: 1, name: "STOLEN HOODIE", price: "$89.99", category: "Hoodies" },
    { id: 2, name: "STREET BOMBER", price: "$129.99", category: "Jackets" },
    { id: 3, name: "REBEL TEE", price: "$39.99", category: "T-Shirts" },
    { id: 4, name: "URBAN CARGO", price: "$79.99", category: "Pants" },
    { id: 5, name: "MIDNIGHT CAP", price: "$34.99", category: "Accessories" },
    { id: 6, name: "SHADOW JOGGER", price: "$69.99", category: "Pants" },
    { id: 7, name: "STEALTH VEST", price: "$79.99", category: "Outerwear" },
    { id: 8, name: "CRYPT TEE", price: "$39.99", category: "T-Shirts" },
    // Row 2
    { id: 9, name: "GHOST HOODIE", price: "$89.99", category: "Hoodies" },
    { id: 10, name: "BANDIT JACKET", price: "$149.99", category: "Jackets" },
    { id: 11, name: "RIOT SWEATS", price: "$59.99", category: "Pants" },
    { id: 12, name: "STOLEN BEANIE", price: "$29.99", category: "Accessories" },
    { id: 13, name: "STREET BAG", price: "$49.99", category: "Accessories" },
    { id: 14, name: "REBEL SHORTS", price: "$54.99", category: "Shorts" },
    { id: 15, name: "PHANTOM TEE", price: "$39.99", category: "T-Shirts" },
    { id: 16, name: "CAMO CARGO", price: "$84.99", category: "Pants" },
    // Row 3
    { id: 17, name: "DRIP HOODIE", price: "$94.99", category: "Hoodies" },
    { id: 18, name: "URBAN PARKA", price: "$159.99", category: "Jackets" },
    { id: 19, name: "STOLEN MASK", price: "$24.99", category: "Accessories" },
    { id: 20, name: "STREET TANK", price: "$34.99", category: "T-Shirts" },
    { id: 21, name: "REBEL SOCKS", price: "$14.99", category: "Accessories" },
    { id: 22, name: "GHOST PANTS", price: "$74.99", category: "Pants" },
    { id: 23, name: "BANDIT TEE", price: "$39.99", category: "T-Shirts" },
    { id: 24, name: "CRYPT JACKET", price: "$139.99", category: "Jackets" },
    // Row 4
    { id: 25, name: "STEALTH HOOD", price: "$89.99", category: "Hoodies" },
    { id: 26, name: "RIOT BOMBER", price: "$134.99", category: "Jackets" },
    { id: 27, name: "PHANTOM CAP", price: "$34.99", category: "Accessories" },
    { id: 28, name: "DRIP JOGGER", price: "$69.99", category: "Pants" },
    { id: 29, name: "URBAN BAG", price: "$54.99", category: "Accessories" },
    { id: 30, name: "STOLEN TANK", price: "$34.99", category: "T-Shirts" },
    { id: 31, name: "STREET MASK", price: "$24.99", category: "Accessories" },
    { id: 32, name: "REBEL JACKET", price: "$144.99", category: "Jackets" },
    // Row 5
    { id: 33, name: "GHOST SHORTS", price: "$54.99", category: "Shorts" },
    { id: 34, name: "BANDIT HOOD", price: "$89.99", category: "Hoodies" },
    { id: 35, name: "CRYPT CARGO", price: "$79.99", category: "Pants" },
    { id: 36, name: "STEALTH TEE", price: "$39.99", category: "T-Shirts" },
    { id: 37, name: "RIOT CAP", price: "$34.99", category: "Accessories" },
    { id: 38, name: "PHANTOM BAG", price: "$49.99", category: "Accessories" },
    { id: 39, name: "DRIP MASK", price: "$24.99", category: "Accessories" },
    { id: 40, name: "URBAN HOOD", price: "$89.99", category: "Hoodies" },
    // Row 6
    { id: 41, name: "STOLEN CARGO", price: "$79.99", category: "Pants" },
    { id: 42, name: "STREET HOOD", price: "$89.99", category: "Hoodies" },
    { id: 43, name: "REBEL BAG", price: "$54.99", category: "Accessories" },
    { id: 44, name: "GHOST TEE", price: "$39.99", category: "T-Shirts" },
    { id: 45, name: "BANDIT CAP", price: "$34.99", category: "Accessories" },
    { id: 46, name: "CRYPT MASK", price: "$24.99", category: "Accessories" },
    { id: 47, name: "STEALTH BAG", price: "$49.99", category: "Accessories" },
    { id: 48, name: "RIOT HOOD", price: "$89.99", category: "Hoodies" }
  ];

  return (
    <div className="bg-black p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 text-center mb-8">STOLEN STREET</h1>
        <h2 className="text-xl text-white text-center italic mb-12">Run the Streets, Own Your Style.</h2>
        
        <div className="grid grid-cols-8 gap-4">
          {menuItems.map((item) => (
            <Card key={item.id} className="bg-neutral-900 border-red-600 border p-4 hover:bg-red-900 transition-colors">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">{item.name}</h3>
                  <p className="text-neutral-400 text-xs">{item.category}</p>
                </div>
                <p className="text-red-600 font-bold mt-2">{item.price}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center text-neutral-400">
          <p className="text-sm">All products are limited edition.</p>
          <p className="text-sm">Once it's gone, it's gone.</p>
        </div>
      </div>
    </div>
  );
};

export default MenuGrid;