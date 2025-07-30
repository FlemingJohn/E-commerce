import React from 'react';
import { ShoppingBag, Search, Menu, Gamepad2, Zap, Trophy } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Header = ({ onCartClick, onSearchChange, searchQuery }: HeaderProps) => {
  const { cart } = useCart();

  return (
    <header className="arcade-gradient sticky top-0 z-40 border-b-4 border-cyan-400 shadow-2xl relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 scanlines pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <div className="relative">
                <Gamepad2 className="h-10 w-10 text-white arcade-blink" />
                <div className="absolute -top-1 -right-1">
                  <Zap className="h-4 w-4 text-yellow-300 arcade-bounce" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-black neon-text tracking-wider font-mono">
                  ARCADE
                </h1>
                <div className="text-xs neon-cyan tracking-widest">
                  ▪ STORE ▪
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 neon-cyan" />
              </div>
              <input
                type="text"
                placeholder="SEARCH POWER-UPS..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-cyan-400 text-cyan-300 placeholder-cyan-500/70 focus:outline-none focus:border-magenta-400 focus:ring-2 focus:ring-magenta-400/50 transition-all duration-300 font-mono text-sm tracking-wider uppercase arcade-glow"
                style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)' }}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* High Score Display */}
            <div className="hidden lg:flex items-center space-x-2 arcade-button px-4 py-2">
              <Trophy className="h-5 w-5 neon-yellow" />
              <div className="text-xs">
                <div className="neon-yellow">HIGH SCORE</div>
                <div className="text-white font-mono">999,999</div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden arcade-button p-3">
              <Menu className="h-6 w-6" />
            </button>

            {/* Theme toggle */}
            <div className="arcade-button p-2 relative overflow-hidden">
              <ThemeToggle />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative arcade-button p-4 group hover:scale-110 transition-all duration-300"
            >
              <ShoppingBag className="h-6 w-6 neon-cyan group-hover:neon-text transition-all duration-300" />
              {cart.itemCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-black w-7 h-7 flex items-center justify-center font-mono arcade-bounce border-2 border-white"
                     style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)' }}>
                  {cart.itemCount}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 neon-cyan" />
            </div>
            <input
              type="text"
              placeholder="SEARCH POWER-UPS..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-cyan-400 text-cyan-300 placeholder-cyan-500/70 focus:outline-none focus:border-magenta-400 focus:ring-2 focus:ring-magenta-400/50 transition-all duration-300 font-mono text-sm tracking-wider uppercase arcade-glow"
              style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%)' }}
            />
          </div>
        </div>

        {/* Pixel decorations */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-magenta-400 to-yellow-400 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 opacity-50"></div>
      </div>
    </header>
  );
};