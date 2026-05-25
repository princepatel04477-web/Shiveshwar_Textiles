'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  gsm: string;
  image: string;
  quantity: number; // in meters
}

interface CartContextProps {
  cartItems: CartItem[];
  isDrawerOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  animateCartPulse: () => void;
  shouldPulse: boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('shiveshwar_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart items', e);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('shiveshwar_cart', JSON.stringify(items));
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const animateCartPulse = () => {
    setShouldPulse(true);
    setTimeout(() => setShouldPulse(false), 800);
  };

  const addItem = (item: Omit<CartItem, 'quantity'>, quantity = 500) => {
    const existingIndex = cartItems.findIndex(i => i.id === item.id);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { ...item, quantity }]);
    }
    animateCartPulse();
  };

  const removeItem = (id: string) => {
    const filtered = cartItems.filter(item => item.id !== id);
    saveCart(filtered);
  };

  const updateQuantity = (id: string, qty: number) => {
    const updated = cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
    );
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        animateCartPulse,
        shouldPulse
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
