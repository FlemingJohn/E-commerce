import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
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
      className="bg-card rounded-xl shadow-sm border border-border overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground/70">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 transform hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};