import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar = ({ categories, selectedCategory, onCategoryChange }: FilterBarProps) => {
  return (
    <div className="bg-card border-b border-border py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filter:</span>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                selectedCategory === 'All'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
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