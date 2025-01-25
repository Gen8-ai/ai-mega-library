import React from 'react';

const VerticalLogo = ({ className = "" }) => (
  <svg viewBox="0 0 100 200" className={className}>
    <g fill="currentColor">
      {/* STN letters stacked vertically with speed lines */}
      <path d="M20,20 H80 V40 H40 V60 H70 V80 H20 Z" /> {/* S */}
      <path d="M20,90 H80 V110 H40 V130 H80 V150 H20 Z" /> {/* T */}
      <path d="M20,160 H40 V180 H60 V160 H80 V200 H20 Z" /> {/* N */}
      {/* Speed lines */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="85" y={40 + (i * 50)} width="15" height="3" />
      ))}
    </g>
  </svg>
);

const GeometricPattern = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <path d="M0,0 L30,0 L60,100 L0,100 Z" className="fill-red-700" />
    <path d="M35,0 L100,0 L80,100 L65,100 Z" className="fill-black" />
    <path d="M85,0 L100,0 L100,100 L85,40 Z" className="fill-red-700" />
  </svg>
);

const SubscriptionPoster = () => {
  const seasons = ['AUTUMN', 'WINTER', 'SPRING', 'SUMMER'];
  const products = ['HOODIE', 'T-SHIRT', 'SHORTS', 'KEYCHAIN'];

  return (
    <div className="w-full max-w-6xl mx-auto bg-black p-8">
      {/* Header */}
      <div className="relative text-center mb-16 flex items-center justify-center gap-8">
        <VerticalLogo className="h-48 text-red-600" />
        <div>
          <h1 className="text-6xl font-bold text-red-600 tracking-widest font-mono mb-4">STN STR</h1>
          <h2 className="text-2xl font-bold text-white tracking-widest font-mono">
            YEARLY 4 RELEASES SUBSCRIPTION
          </h2>
        </div>
        <VerticalLogo className="h-48 text-red-600 transform rotate-180" />
      </div>

      {/* Seasons Grid */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {seasons.map((season, index) => (
          <div key={index} className="group">
            <div className="relative overflow-hidden bg-zinc-900 aspect-square">
              <GeometricPattern className={`absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-110 ${index % 2 === 0 ? 'rotate-0' : 'rotate-180'}`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white font-bold tracking-wider font-mono text-xl z-10">{season}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Grid */}
      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {products.map((product, index) => (
          <div key={index} className="bg-zinc-900 p-4 border-2 border-red-600 group hover:bg-red-600 transition-colors duration-300">
            <div className="flex flex-col items-center">
              <p className="text-white font-bold tracking-wider font-mono mb-2">{product}</p>
              <VerticalLogo className="w-12 h-24 text-white transform transition-transform duration-300 group-hover:scale-110" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative text-center border-t-2 border-red-600 pt-8">
        <p className="text-white text-xl font-bold tracking-wider font-mono">
          AUSDAY RELEASE 2025 - EARLY ACCESS
        </p>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black px-4">
          <VerticalLogo className="h-12 text-red-600" />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPoster;