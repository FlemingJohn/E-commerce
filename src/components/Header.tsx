import React from 'react';
import { ShoppingBag, Search, Menu, Sparkles } from 'lucide-react';
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
    <header className="gradient-bg shadow-xl border-b border-white/20 sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-white animate-pulse-slow" />
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Luxe Store
              </h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search premium products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border-0 rounded-full leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 shadow-lg"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
              <Menu className="h-6 w-6" />
            </button>

            {/* Theme toggle */}
            <div className="bg-white/10 rounded-full p-1">
              <ThemeToggle />
            </div>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative p-3 text-white/80 hover:text-white transition-all duration-200 group bg-white/10 rounded-full hover:bg-white/20"
            >
              <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-900 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-bounce shadow-lg">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search premium products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-0 rounded-full leading-5 bg-white/90 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white transition-all duration-300 shadow-lg"
            />
          </div>
        </div>
      </div>
    </header>
  );
};