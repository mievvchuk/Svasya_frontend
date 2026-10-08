import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { CartPage } from '../../pages/CartPage';

const renderCartPage = () => {
  return render(
    <CartProvider>
      <MemoryRouter>
        <CartPage />
      </MemoryRouter>
    </CartProvider>
  );
};

describe('Integration Test: CartPage with CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('повинен відображати назву сторінки, товари та кнопку оформлення', () => {
    renderCartPage();

    expect(screen.getByText(/КОШИК/i)).toBeInTheDocument();
    expect(screen.getByText(/CHECKOUT ↗/i)).toBeInTheDocument();
    expect(screen.getByText(/ORDER_SPECIFICATION/i)).toBeInTheDocument();
  });

  it('повинен збільшувати кількість товару при кліку на кнопку +', async () => {
    const user = userEvent.setup();
    renderCartPage();

    const initialQuantity = screen.getByText('1');
    expect(initialQuantity).toBeInTheDocument();

    const plusButton = screen.getByRole('button', { name: /Збільшити кількість/i });
    await user.click(plusButton);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('повинен мати заблоковану кнопку - коли кількість дорівнює 1', () => {
    renderCartPage();

    const minusButton = screen.getByRole('button', { name: /Зменшити кількість/i });
    expect(minusButton).toBeDisabled();
  });

  it('повинен показувати порожній кошик після очищення', async () => {
    const user = userEvent.setup();
    renderCartPage();

    const clearButton = screen.getByText(/ОЧИСТИТИ ВСЕ/i);
    await user.click(clearButton);

    expect(screen.getByText(/ТВІЙ КОШИК ПОРОЖНІЙ/i)).toBeInTheDocument();
  });
});

