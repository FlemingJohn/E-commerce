import React from 'react';
import { Filter, Gamepad2 } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar = ({ categories, selectedCategory, onCategoryChange }: FilterBarProps) => {
  return (
    <div className="bg-card/60 backdrop-blur-sm border-b-2 border-neon-blue neon-glow-blue py-8 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="p-3 rounded-lg neon-border-pink bg-primary/20">
              <Filter className="h-6 w-6 text-neon-pink" />
            </div>
            <span className="font-arcade text-foreground text-sm">SELECT CATEGORY:</span>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-8 py-4 rounded-lg font-retro text-sm font-bold transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                selectedCategory === 'All'
                  ? 'btn-arcade text-white neon-glow-pink'
                  : 'neon-border-blue bg-card/40 text-muted-foreground hover:bg-primary/20 hover:text-neon-blue border-2'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Gamepad2 className="h-5 w-5" />
                <span>ALL GAMES</span>
              </div>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-8 py-4 rounded-lg font-retro text-sm font-bold transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'btn-arcade text-white neon-glow-pink'
                    : 'neon-border-blue bg-card/40 text-muted-foreground hover:bg-primary/20 hover:text-neon-blue border-2'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};