import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Settings, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MenuOption {
  label: string;
  action: () => void;
}

const GameMenu: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const menuOptions: MenuOption[] = [
    {
      label: "Start Game",
      action: () => console.log("Start game")
    },
    {
      label: "Continue",
      action: () => console.log("Continue game")
    },
    {
      label: "Load Game",
      action: () => console.log("Load game")
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-blue-950 to-blue-900">
      {/* Game Title */}
      <div className="mb-12 text-center">
        <h1 className="text-6xl font-bold text-white mb-2 animate-pulse">
          Game Title
        </h1>
        <p className="text-blue-400 text-xl">Your Epic Adventure Awaits</p>
      </div>

      {/* Main Menu Options */}
      <div className="space-y-4 min-w-64">
        {menuOptions.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full text-lg py-6 bg-black/50 hover:bg-blue-900/50 text-white border-blue-500/50 hover:border-blue-400 transition-all duration-300"
            onClick={option.action}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 right-8 flex gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-blue-900/50"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX /> : <Volume2 />}
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-900/50"
            >
              <Settings />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white border-blue-500/50">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription className="text-gray-400">
                Adjust your game settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Graphics Quality</span>
                <select className="bg-gray-800 p-2 rounded">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <span>Sound Volume</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  className="w-32"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-900/50"
            >
              <Info />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 text-white border-blue-500/50">
            <DialogHeader>
              <DialogTitle>About</DialogTitle>
              <DialogDescription className="text-gray-400">
                Game version 1.0.0
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p>© 2025 Your Game Studio</p>
              <p>Made with ❤️ by awesome developers</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Version Number */}
      <div className="absolute bottom-4 left-4 text-blue-500/70 text-sm">
        v1.0.0
      </div>
    </div>
  );
};

export default GameMenu;