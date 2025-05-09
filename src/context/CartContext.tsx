import { createContext, useContext, useState, ReactNode } from 'react';
import { Car } from '../types';

export interface CartItem {
  car: Car;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (carId: number) => void;
  updateCartItem: (carId: number, updates: Partial<CartItem>) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    // Check if the car is already in the cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.car.id === item.car.id
    );

    if (existingItemIndex >= 0) {
      // If the car is already in the cart, update it
      updateCartItem(item.car.id, item);
    } else {
      // Otherwise, add it to the cart
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (carId: number) => {
    setCartItems(cartItems.filter((item) => item.car.id !== carId));
  };

  const updateCartItem = (carId: number, updates: Partial<CartItem>) => {
    setCartItems(
      cartItems.map((item) =>
        item.car.id === carId ? { ...item, ...updates } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};