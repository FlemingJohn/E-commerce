import React from 'react';
import { X, Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-card rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-card">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Product Details</h3>
              <button
                onClick={onClose}
                className="rounded-md text-muted-foreground hover:text-foreground hover:bg-muted p-2 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-4">{product.name}</h1>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-emerald-600 font-medium">In Stock</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};