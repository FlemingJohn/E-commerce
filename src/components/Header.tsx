import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
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
    <header className="bg-card shadow-sm border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-foreground">Luxe Store</h1>
            </div>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-input rounded-lg leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:placeholder-muted-foreground/70 focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200">
              <Menu className="h-6 w-6" />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Cart button */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <ShoppingBag className="h-6 w-6 group-hover:scale-110 transition-transform duration-200" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
                  {cart.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-input rounded-lg leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:placeholder-muted-foreground/70 focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </header>
  );
};