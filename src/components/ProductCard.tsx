import React from 'react';
import { Star, ShoppingCart, Zap } from 'lucide-react';
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
      className="bg-card/80 backdrop-blur-sm rounded-xl border-2 border-border overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-float relative"
    >
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10"></div>
      
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-card">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter group-hover:brightness-110"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-3 bg-card/90 backdrop-blur-sm rounded-lg border-2 border-border hover:border-ring transition-all duration-200">
            <Zap className="h-5 w-5 text-primary" />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Power indicator */}
        <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border">
          <span className="text-xs font-arcade text-accent-foreground">POWER ON</span>
        </div>
      </div>
      
      <div className="p-6 relative z-20">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-arcade gradient-text bg-primary/20 px-3 py-2 rounded-lg border border-border">
            {product.category.toUpperCase()}
          </span>
          <div className="flex items-center space-x-2 bg-card/50 px-3 py-1 rounded-lg border border-border">
            <Star className="h-4 w-4 fill-warning text-warning animate-pulse" />
            <span className="text-sm font-retro font-bold text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground font-retro">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-retro font-bold text-lg text-foreground mb-4 group-hover:gradient-text transition-all duration-300 leading-tight">
          {product.name.toUpperCase()}
        </h3>
        
        <p className="text-muted-foreground text-sm font-retro mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-arcade gradient-text">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground font-retro">PREMIUM GEAR</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="btn-arcade hover:opacity-90 text-primary-foreground px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 transform hover:scale-110 active:scale-95 font-retro font-bold text-sm"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
};