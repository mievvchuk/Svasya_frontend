import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '../../context/CartContext';
import type { CartItem } from '../../types/cart';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const sampleItem: CartItem = {
  variantId: 10,
  productId: 2,
  name: 'СВАСЬ Test T-Shirt',
  price: 500,
  color: 'black',
  size: 'M',
  imageUrl: '/test.png',
  quantity: 1,
};

describe('Unit Test: CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('повинен ініціалізуватися та підраховувати початкові товари', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items.length).toBeGreaterThan(0);
    expect(result.current.totalItemsCount).toBeGreaterThan(0);
    expect(result.current.totalAmount).toBeGreaterThan(0);
  });

  it('повинен додавати новий товар у кошик', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(sampleItem);
    });

    const added = result.current.items.find((i) => i.variantId === 10);
    expect(added).toBeDefined();
    expect(added?.name).toBe('СВАСЬ Test T-Shirt');
  });

  it('повинен збільшувати quantity, якщо variantId вже існує в кошику', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(sampleItem);
    });

    act(() => {
      result.current.addToCart({ ...sampleItem, quantity: 2 });
    });

    const item = result.current.items.find((i) => i.variantId === 10);
    expect(item?.quantity).toBe(3);
  });

  it('не повинен дозволяти встановити quantity менше 1', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(sampleItem);
    });

    act(() => {
      result.current.updateQuantity(10, 0); // Спроба встановити 0
    });

    const item = result.current.items.find((i) => i.variantId === 10);
    expect(item?.quantity).toBe(1); // Має залишитися 1
  });

  it('повинен коректно видаляти товар за variantId', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(sampleItem);
    });

    expect(result.current.items.some((i) => i.variantId === 10)).toBe(true);

    act(() => {
      result.current.removeFromCart(10);
    });

    expect(result.current.items.some((i) => i.variantId === 10)).toBe(false);
  });

  it('повинен повністю очищати кошик та localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items.length).toBe(0);
    expect(result.current.totalItemsCount).toBe(0);
    expect(result.current.totalAmount).toBe(0);
    expect(localStorage.getItem('svasya_cart')).toBeNull();
  });
});

