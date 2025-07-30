import React from 'react';
import { Star, ShoppingCart, Zap, Coins, Shield } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={() => onProductClick(product)}
      className="arcade-card cursor-pointer group hover:scale-105 transition-all duration-500 arcade-bounce relative overflow-hidden"
      style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
    >
      {/* Power indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 arcade-button px-2 py-1">
        <Zap className="h-3 w-3 neon-yellow" />
        <span className="text-xs font-mono neon-yellow">PWR</span>
      </div>

      {/* Rarity indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="arcade-button p-2">
          <Shield className="h-4 w-4 neon-cyan" />
        </div>
      </div>

      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-b-2 border-cyan-400">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 screen-flicker"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Scan lines overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)' 
             }}>
        </div>
      </div>
      
      <div className="p-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="flex items-center justify-between mb-4">
          <div className="arcade-button px-3 py-1 text-xs">
            <span className="neon-green font-mono tracking-wider uppercase">
              {product.category}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-300 arcade-blink" />
            <span className="text-sm font-mono neon-cyan">{product.rating}</span>
            <span className="text-xs text-gray-400 font-mono">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-black text-lg neon-text mb-3 leading-tight font-mono tracking-wide uppercase">
          {product.name}
        </h3>
        
        <p className="text-gray-300 text-sm mb-6 line-clamp-2 leading-relaxed font-mono">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Coins className="h-5 w-5 neon-yellow arcade-blink" />
              <span className="text-2xl font-black neon-yellow font-mono">
                {product.price.toFixed(0)}
              </span>
            </div>
            <span className="text-xs neon-cyan font-mono tracking-wider">CREDITS</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="arcade-button px-6 py-3 group hover:scale-110 transition-all duration-300 font-mono font-black tracking-wider relative overflow-hidden"
            style={{ clipPath: 'polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)' }}
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4 neon-cyan group-hover:neon-text transition-colors duration-300" />
              <span className="hidden sm:inline text-xs">ADD</span>
            </div>
            
            {/* Button effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          </button>
        </div>

        {/* Level indicator */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono">
          <span className="neon-green">LVL {Math.ceil(product.rating)}</span>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-1 ${i < product.rating ? 'bg-green-400' : 'bg-gray-600'} arcade-blink`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom border effect */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );
};