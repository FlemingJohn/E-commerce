import React from 'react';
import { X, Star, ShoppingCart, Zap, Shield, Award } from 'lucide-react';
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
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-card/90 backdrop-blur-sm rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full neon-border-pink border-2 relative scanlines">
          <div className="bg-card/80">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b-2 border-neon-blue neon-glow-blue">
              <h3 className="text-xl font-arcade text-foreground gradient-text">EQUIPMENT DETAILS</h3>
              <button
                onClick={onClose}
                className="rounded-lg text-muted-foreground hover:text-foreground btn-arcade p-3 transition-all duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-muted/30 to-card neon-border-green border-2 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover filter brightness-110"
                />
                <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-lg neon-border-green border">
                  <span className="text-sm font-arcade text-accent-foreground">POWER ON</span>
                </div>
                <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-4 py-2 rounded-lg neon-border-pink border">
                  <span className="text-sm font-arcade text-white">READY</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-arcade gradient-text bg-primary/20 px-4 py-2 rounded-lg neon-border-pink border">
                      {product.category.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-2 bg-card/50 px-4 py-2 rounded-lg neon-border-blue border">
                      <Star className="h-5 w-5 fill-warning text-warning animate-pulse" />
                      <span className="font-retro font-bold text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground font-retro">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl font-retro font-bold text-foreground mb-4 gradient-text">
                    {product.name.toUpperCase()}
                  </h1>
                  
                  <p className="text-muted-foreground font-retro leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <div className="text-4xl font-arcade gradient-text mb-6 neon-glow-pink">
                    ${product.price.toFixed(2)}
                  </div>
                </div>

                {/* Features */}
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 neon-border-blue border">
                  <h3 className="text-lg font-arcade text-foreground mb-4 flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-neon-green" />
                    <span>SPECIFICATIONS</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-card/40 rounded-lg border border-border/30">
                        <Zap className="h-4 w-4 text-neon-green flex-shrink-0" />
                        <span className="text-sm font-retro text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-3 bg-accent/20 p-4 rounded-lg neon-border-green border">
                  <Award className="h-6 w-6 text-accent" />
                  <div>
                    <span className="font-arcade text-sm text-accent-foreground">STATUS: </span>
                    <span className="font-retro font-bold text-accent">
                      {product.inStock ? 'IN STOCK - READY TO DEPLOY' : 'OUT OF STOCK'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 btn-arcade text-white py-4 rounded-lg flex items-center justify-center space-x-3 font-retro font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>ADD TO LOADOUT</span>
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="px-8 py-4 bg-card/60 text-muted-foreground border-2 border-border/50 rounded-lg font-retro font-bold hover:bg-muted/40 hover:text-foreground transition-all duration-300"
                  >
                    CLOSE
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