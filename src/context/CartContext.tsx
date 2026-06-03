'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string; // maps to productName
  gsm: string;
  image: string;
  quantity: number; // in meters
  fabricType?: string;
  width?: string;
  moq?: string;
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
  toast: { message: string } | null;
  setToast: (toast: { message: string } | null) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [toast, setToast] = useState<{ message: string } | null>(null);

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

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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
    setToast({ message: 'Added to Inquiry' });
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
        shouldPulse,
        toast,
        setToast
      }}
    >
      {children}
      {toast && (
        <div 
          className="fixed bottom-8 right-8 z-[9999] p-4 border border-[#b8924a]/30 bg-[#11100e] text-[#f5f0e8] rounded shadow-2xl flex items-center justify-between gap-4 animate-slide-in max-w-md"
        >
          <div className="flex items-center gap-3">
            <span className="text-[#d4a96a] font-bold">✓</span>
            <span className="text-xs leading-relaxed font-sans">{toast.message}</span>
          </div>
          <button 
            type="button"
            onClick={() => setToast(null)} 
            className="text-white/40 hover:text-white transition-colors text-xs font-bold leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
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
