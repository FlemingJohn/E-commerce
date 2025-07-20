import { useState, createContext, useContext, ReactNode } from 'react';
import { CartState, CartItem, Product } from '../types';

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0
  });

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateItemCount = (items: CartItem[]) => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevCart.items, { product, quantity: 1 }];
      }

      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.product.id !== productId);
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: calculateItemCount(newItems)
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0
    });
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};