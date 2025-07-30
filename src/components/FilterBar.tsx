import React from 'react';
import { Filter, Sparkles } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar = ({ categories, selectedCategory, onCategoryChange }: FilterBarProps) => {
  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="p-2 rounded-full bg-primary/10">
              <Filter className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Categories:</span>
          </div>
          
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                selectedCategory === 'All'
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>All Products</span>
              </div>
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'gradient-bg text-white shadow-lg'
                    : 'bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary border border-border/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};