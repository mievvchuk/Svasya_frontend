import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { App } from '../../App';

describe('E2E Test: Full User Flow (Cart -> Checkout -> Order Success)', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, 'Test', '/cart');
  });

  it('повинен успішно пройти повний шлях замовлення: від кошика до підтвердження', async () => {
    const user = userEvent.setup();
    render(<App />);

    // 1. Користувач на сторінці кошика
    expect(screen.getByText(/КОШИК/i)).toBeInTheDocument();
    expect(screen.getByText(/CART_BUFFER/i)).toBeInTheDocument();

    // 2. Збільшує кількість
    const plusBtn = screen.getByRole('button', { name: /Збільшити кількість/i });
    await user.click(plusBtn);
    expect(screen.getByText('2')).toBeInTheDocument();

    // 3. Переходить на сторінку Checkout
    const checkoutBtn = screen.getByRole('button', { name: /CHECKOUT ↗/i });
    await user.click(checkoutBtn);

    // 4. Перевіряємо, що ми на /checkout
    await waitFor(() => {
      expect(screen.getByText(/ОФОРМЛЕННЯ ЗАМОВЛЕННЯ/i)).toBeInTheDocument();
    });

    // 5. Заповнюємо дані покупця
    const autofillBtn = screen.getByText(/АВТОЗАПОВНИТИ ТЕСТ/i);
    await user.click(autofillBtn);

    // 6. Відправляємо замовлення
    const submitBtn = screen.getByRole('button', { name: /CONFIRM & TRANSMIT ORDER ↗/i });
    await user.click(submitBtn);

    // 7. Потрапляємо на сторінку підтвердження
    await waitFor(() => {
      expect(screen.getByText(/СВАСЬ ВЖЕ В ДОРОЗІ/i)).toBeInTheDocument();
      expect(screen.getByText(/REC ● 00:00:01/i)).toBeInTheDocument();
      expect(screen.getByText(/НОМЕР ЗАМОВЛЕННЯ:/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});

