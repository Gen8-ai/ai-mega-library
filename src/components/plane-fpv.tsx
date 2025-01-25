import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Compass, Navigation } from 'lucide-react';

interface FlightData {
  altitude: number;
  speed: number;
  heading: number;
  pitch: number;
  roll: number;
}

const PlaneFPV: React.FC = () => {
  const [flightData, setFlightData] = useState<FlightData>({
    altitude: 1000,
    speed: 250,
    heading: 0,
    pitch: 0,
    roll: 0
  });

  // Simulate flight data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlightData(prev => ({
        ...prev,
        heading: (prev.heading + 1) % 360,
        pitch: 5 * Math.sin(Date.now() / 1000),
        roll: 10 * Math.cos(Date.now() / 1000)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Artificial Horizon Component
  const ArtificialHorizon: React.FC<{ pitch: number; roll: number }> = ({ pitch, roll }) => (
    <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gray-600 bg-black">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          transform: `rotate(${roll}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div 
          className="absolute w-full h-full"
          style={{ 
            background: 'linear-gradient(to bottom, #87CEEB 50%, #8B4513 50%)',
            transform: `translateY(${pitch}%)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        {/* Center Reference */}
        <div className="absolute w-40 h-1 bg-yellow-400"/>
        <div className="absolute h-40 w-1 bg-yellow-400"/>
      </div>
    </div>
  );

  // Heading Indicator Component
  const HeadingIndicator: React.FC<{ heading: number }> = ({ heading }) => (
    <div className="relative w-48 h-12 bg-black rounded-lg border-2 border-gray-600 overflow-hidden">
      <div 
        className="absolute top-0 left-0 w-[200%] h-full flex items-center justify-center text-white"
        style={{ 
          transform: `translateX(${-heading * (100 / 360)}%)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {Array.from({ length: 720 }).map((_, i) => {
          const degree = i % 360;
          const isMainTick = degree % 30 === 0;
          return (
            <div 
              key={i}
              className="absolute"
              style={{ left: `${i * (100 / 360)}%` }}
            >
              {isMainTick && (
                <>
                  <div className="h-6 w-0.5 bg-white"/>
                  <div className="text-xs mt-1">{degree}</div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 left-1/2 h-full w-0.5 bg-red-500 -translate-x-1/2"/>
    </div>
  );

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      {/* Sky/Ground Visual */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(to bottom, #1a365d 0%, #2d3748 100%)',
        }}
      />

      {/* HUD Elements */}
      <div className="absolute inset-0 flex flex-col items-center">
        {/* Top Bar - Speed and Altitude */}
        <Card className="mt-4 bg-black/40 border-blue-500/30">
          <div className="p-4 flex gap-8 text-blue-400">
            <div>
              <div className="text-sm">SPEED</div>
              <div className="text-2xl font-mono">{flightData.speed.toFixed(0)}</div>
            </div>
            <div>
              <div className="text-sm">ALT</div>
              <div className="text-2xl font-mono">{flightData.altitude.toFixed(0)}</div>
            </div>
          </div>
        </Card>

        {/* Center HUD */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative">
            <ArtificialHorizon pitch={flightData.pitch} roll={flightData.roll} />
            
            {/* Flight Path Vector */}
            <div 
              className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                transform: `translate(-50%, -50%) rotate(${flightData.roll}deg)`
              }}
            >
              <div className="w-4 h-4 border-2 border-green-500 rounded-full"/>
              <div className="absolute left-1/2 top-1/2 w-6 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-green-500"/>
              <div className="absolute left-1/2 top-1/2 w-0.5 h-6 -translate-x-1/2 -translate-y-1/2 bg-green-500"/>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Heading Indicator */}
        <div className="mb-4 flex flex-col items-center gap-2">
          <HeadingIndicator heading={flightData.heading} />
          <div className="flex items-center gap-2 text-blue-400">
            <Compass className="w-4 h-4" />
            <span className="font-mono text-xl">
              {flightData.heading.toFixed(0).padStart(3, '0')}°
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaneFPV;