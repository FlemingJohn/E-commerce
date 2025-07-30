import React from 'react';
import { ShoppingBag, Search, Menu, Gamepad2 } from 'lucide-react';
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
    <header className="gradient-bg shadow-xl border-b-4 border-neon-pink neon-glow-pink sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <Gamepad2 className="h-10 w-10 text-white animate-pulse-neon" />
              <h1 className="text-2xl md:text-3xl font-arcade text-white tracking-tight animate-flicker">
                NEON ARCADE
              </h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-neon-blue" />
              </div>
              <input
                type="text"
                placeholder="SEARCH INVENTORY..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 border-2 border-neon-blue rounded-lg bg-card/80 backdrop-blur-sm placeholder-muted-foreground font-retro text-foreground focus:outline-none neon-border-blue transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button className="md:hidden p-3 rounded-lg text-white neon-border-blue bg-card/20 hover:bg-card/40 transition-all duration-200 btn-arcade">
              <Menu className="h-6 w-6" />
            </button>

            {/* Theme toggle */}
            <div className="neon-border-green rounded-lg p-1 bg-card/20">
              <ThemeToggle />
            </div>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative p-4 text-white transition-all duration-200 group btn-arcade rounded-lg font-retro text-sm font-bold"
            >
              <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-7 w-7 flex items-center justify-center font-arcade animate-bounce neon-glow-green shadow-lg">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neon-blue" />
            </div>
            <input
              type="text"
              placeholder="SEARCH INVENTORY..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 border-2 border-neon-blue rounded-lg bg-card/80 backdrop-blur-sm placeholder-muted-foreground font-retro text-foreground focus:outline-none neon-border-blue transition-all duration-300 text-sm"
            />
          </div>
        </div>
      </div>
    </header>
  );
};