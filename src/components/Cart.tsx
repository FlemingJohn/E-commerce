import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard, Gamepad2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      onClose();
      alert('MISSION COMPLETE! Your gear has been delivered to the staging area.');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card/90 backdrop-blur-sm shadow-xl transform transition-transform duration-300 neon-border-pink border-l-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-neon-blue neon-glow-blue">
          <h2 className="text-lg font-arcade text-foreground flex items-center space-x-3">
            <ShoppingBag className="h-6 w-6 text-neon-pink" />
            <span>INVENTORY ({cart.itemCount})</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg text-muted-foreground hover:text-foreground btn-arcade p-3 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 relative scanlines">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <Gamepad2 className="mx-auto h-16 w-16 text-muted-foreground/50 mb-6 animate-pulse-neon" />
              <h3 className="text-lg font-retro font-bold text-foreground mb-2">INVENTORY EMPTY</h3>
              <p className="text-muted-foreground font-retro text-sm">Add some gear to your loadout</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-card/60 rounded-lg p-4 neon-border-blue border backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg neon-border-green border filter brightness-110"
                    />
                    <div className="flex-1">
                      <h3 className="font-retro font-bold text-sm text-foreground mb-1">
                        {item.name.toUpperCase()}
                      </h3>
                      <p className="text-xs text-muted-foreground font-retro mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-arcade text-sm gradient-text">${item.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/50 flex items-center justify-center transition-colors duration-200"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-retro font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded bg-accent/20 text-accent hover:bg-accent/30 border border-accent/50 flex items-center justify-center transition-colors duration-200"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive/80 p-2 rounded-lg bg-destructive/10 border border-destructive/30 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t-2 border-neon-pink p-6 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="font-arcade text-lg text-foreground">TOTAL CREDITS:</span>
              <span className="font-arcade text-2xl gradient-text neon-glow-pink">
                ${cart.total.toFixed(2)}
              </span>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full btn-arcade text-white py-4 rounded-lg flex items-center justify-center space-x-3 font-retro font-bold transition-all duration-300 disabled:opacity-50"
              >
                <CreditCard className="h-5 w-5" />
                <span>{isCheckingOut ? 'PROCESSING...' : 'DEPLOY EQUIPMENT'}</span>
              </button>
              
              <button
                onClick={clearCart}
                className="w-full bg-destructive/20 text-destructive border-2 border-destructive/50 py-3 rounded-lg font-retro font-bold hover:bg-destructive/30 transition-all duration-300"
              >
                CLEAR INVENTORY
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};