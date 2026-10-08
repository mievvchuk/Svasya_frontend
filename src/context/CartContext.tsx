import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem } from '../types/cart';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  removeFromCart: (variantId: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalAmount: number;
}

const STORAGE_KEY = 'svasya_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Не вдалося завантажити кошик з localStorage:', e);
    }
    // Початкові тестові дані для зручності перевірки на старті, якщо порожньо
    return [
      {
        variantId: 5,
        productId: 1,
        name: 'СВАСЬ Hoodie',
        price: 999,
        color: 'forest_green',
        size: 'L',
        imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
      },
    ];
  });

  // Зберігаємо зміни у localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Не вдалося зберегти кошик у localStorage:', e);
    }
  }, [items]);

  const addToCart = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.variantId === newItem.variantId
      );

      if (existingIndex > -1) {
        // Якщо товар з цим variantId вже є, збільшуємо quantity
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }

      // Інакше додаємо новий елемент
      return [...prevItems, newItem];
    });
  };

  const updateQuantity = (variantId: number, quantity: number) => {
    if (quantity < 1) {
      return; // Заборонено встановлювати quantity < 1
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (variantId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Не вдалося очистити localStorage:', e);
    }
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

