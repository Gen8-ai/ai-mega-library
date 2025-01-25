import React, { useState } from 'react';
import { Check, X, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'Basic',
    price: 9.99,
    billing: 'monthly',
    description: 'Perfect for beginners',
    features: [
      { name: 'Basic Features', included: true },
      { name: 'Customer Support', included: true },
      { name: 'Up to 3 Projects', included: true },
      { name: 'API Access', included: false },
      { name: 'Advanced Analytics', included: false }
    ],
    highlighted: false
  },
  {
    name: 'Pro',
    price: 19.99,
    billing: 'monthly',
    description: 'Best for professionals',
    features: [
      { name: 'Basic Features', included: true },
      { name: 'Customer Support', included: true },
      { name: 'Unlimited Projects', included: true },
      { name: 'API Access', included: true },
      { name: 'Advanced Analytics', included: false }
    ],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 49.99,
    billing: 'monthly',
    description: 'For large teams',
    features: [
      { name: 'Basic Features', included: true },
      { name: 'Priority Support', included: true },
      { name: 'Unlimited Projects', included: true },
      { name: 'API Access', included: true },
      { name: 'Advanced Analytics', included: true }
    ],
    highlighted: false
  }
];

const FeatureRow = ({ name, included }) => (
  <div className="flex items-center py-2">
    {included ? (
      <Check className="text-green-500 mr-2" size={18} />
    ) : (
      <X className="text-gray-400 mr-2" size={18} />
    )}
    <span className={included ? 'text-gray-900' : 'text-gray-500'}>
      {name}
    </span>
  </div>
);

const PricingCard = ({ tier }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-xl p-6 transition-all duration-300
        ${tier.highlighted 
          ? 'bg-blue-50 border-2 border-blue-500 shadow-lg transform -translate-y-2' 
          : 'bg-white border border-gray-200 hover:shadow-md hover:-translate-y-1'
        }`}
    >
      {tier.highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium 
            flex items-center gap-1">
            <Zap size={14} />
            Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
        <p className="text-gray-600 mb-4">{tier.description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold">${tier.price}</span>
          <span className="text-gray-500">/{tier.billing}</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {tier.features.map((feature, index) => (
          <FeatureRow key={index} {...feature} />
        ))}
      </div>

      <button
        className={`w-full py-2 rounded-lg transition-all duration-300
          ${tier.highlighted
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }
          ${isHovered ? 'shadow-md scale-102' : ''}`}
      >
        Get Started
      </button>
    </div>
  );
};

const SubscriptionTiers = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-gray-600">
            Select the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PricingCard key={index} tier={tier} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTiers;