import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
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
      className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden cursor-pointer group hover:shadow-2xl hover:border-primary/30 transition-all duration-500 transform hover:-translate-y-2 card-glow animate-float"
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/30 to-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-lg">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold gradient-text bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg text-foreground mb-3 group-hover:gradient-text transition-all duration-300 leading-tight">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold gradient-text">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">Premium Quality</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="gradient-bg hover:opacity-90 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl font-medium"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};