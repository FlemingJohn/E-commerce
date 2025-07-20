import React from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductGrid = ({ products, onProductClick }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.516-.641-6.44-1.759M6.306 8.5c-.355.967-.559 2.012-.559 3.125C5.747 14.966 8.448 18 12 18s6.253-3.034 6.253-6.375c0-1.113-.204-2.158-.559-3.125" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};