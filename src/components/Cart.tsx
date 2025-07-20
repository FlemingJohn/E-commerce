import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
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
      alert('Order placed successfully! Thank you for your purchase.');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-xl transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" />
            <span>Shopping Cart ({cart.itemCount})</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-md text-muted-foreground hover:text-foreground hover:bg-muted p-2 transition-colors duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-1">Your cart is empty</h3>
              <p className="text-muted-foreground">Start shopping to add items to your cart</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-muted rounded-lg p-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                    
                    <div className="flex items-center mt-2 space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-md hover:bg-muted/80 transition-colors duration-200"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-md hover:bg-muted/80 transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-destructive hover:text-destructive/80 text-sm mt-1 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 active:scale-95 font-medium"
            >
              <CreditCard className="h-5 w-5" />
              <span>{isCheckingOut ? 'Processing...' : 'Checkout'}</span>
            </button>
            
            <button
              onClick={clearCart}
              className="w-full text-muted-foreground hover:text-foreground py-2 text-sm transition-colors duration-200"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};