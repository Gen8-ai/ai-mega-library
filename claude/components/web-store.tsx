import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation',
    image: '/api/placeholder/300/300'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracking and notifications on your wrist',
    image: '/api/placeholder/300/300'
  },
  {
    id: 3,
    name: 'Wireless Speaker',
    price: 149.99,
    description: '360-degree sound with deep bass',
    image: '/api/placeholder/300/300'
  }
];

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl 
        hover:scale-102 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex">
        {/* Product Image Section */}
        <div className="w-1/2 p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-md transition-transform duration-500"
          />
        </div>

        {/* Product Details Section */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              ${product.price}
            </p>
            
            <div className="space-y-2 text-gray-700">
              <p>• Free Shipping</p>
              <p>• 2-Year Warranty</p>
              <p>• 30-Day Returns</p>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full mt-6
              hover:bg-blue-700 transition-all duration-300 flex items-center gap-2
              justify-center hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const WebStore = () => {
  const [cart, setCart] = useState([]);
  const [cartBounce, setCartBounce] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">Web Store</h1>
          <div className="relative">
            <ShoppingCart 
              size={28} 
              className={`text-gray-800 transition-transform duration-300
                ${cartBounce ? 'scale-125' : 'scale-100'}`} 
            />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white 
                w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WebStore;