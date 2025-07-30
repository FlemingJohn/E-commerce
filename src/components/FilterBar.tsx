import React from 'react';
import { Filter, Target, Star } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FilterBar = ({ categories, selectedCategory, onCategoryChange }: FilterBarProps) => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b-2 border-cyan-400 py-6 shadow-2xl relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ 
               background: 'repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(0,255,255,0.1) 100px, rgba(0,255,255,0.1) 102px)' 
             }}>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="arcade-button p-3 relative">
              <Filter className="h-6 w-6 neon-cyan" />
              <div className="absolute -top-1 -right-1">
                <Target className="h-3 w-3 neon-yellow arcade-blink" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-black text-lg neon-text font-mono tracking-wider">SELECT</span>
              <div className="text-xs neon-cyan font-mono tracking-widest">CATEGORY</div>
            </div>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-2">
            <button
              onClick={() => onCategoryChange('All')}
              className={`px-6 py-3 font-mono font-black text-sm tracking-wider uppercase transition-all duration-300 whitespace-nowrap relative overflow-hidden group ${
                selectedCategory === 'All'
                  ? 'arcade-gradient text-black border-2 border-yellow-400 arcade-glow'
                  : 'arcade-button hover:scale-105'
              }`}
              style={{ clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)' }}
            >
              <div className="flex items-center space-x-2 relative z-10">
                <Star className="h-4 w-4" />
                <span>ALL ITEMS</span>
              </div>
              {selectedCategory === 'All' && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-ping"></div>
              )}
            </button>
            
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`px-6 py-3 font-mono font-black text-sm tracking-wider uppercase transition-all duration-300 whitespace-nowrap relative overflow-hidden group ${
                  selectedCategory === category
                    ? 'arcade-gradient text-black border-2 border-yellow-400 arcade-glow'
                    : 'arcade-button hover:scale-105'
                }`}
                style={{ 
                  clipPath: 'polygon(15px 0, 100% 0, calc(100% - 15px) 100%, 0 100%)',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span className="relative z-10">{category}</span>
                {selectedCategory === category && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-ping"></div>
                )}
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 w-full flex">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="flex-1 h-1 bg-gradient-to-r from-cyan-400 to-magenta-400 opacity-30 arcade-blink"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};