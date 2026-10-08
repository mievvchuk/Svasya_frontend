import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';
import { CheckoutPage } from '../../pages/CheckoutPage';

const renderCheckoutPage = () => {
  return render(
    <CartProvider>
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    </CartProvider>
  );
};

describe('Integration Test: CheckoutPage Form & Validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('повинен відображати всі обов`язкові поля форми', () => {
    renderCheckoutPage();

    expect(screen.getByLabelText(/CUSTOMER_NAME \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PHONE_NUMBER \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/EMAIL_ADDRESS \*/i)).toBeInTheDocument();
  });

  it('повинен показувати помилки валідації при спробі відправити порожню форму', async () => {
    const user = userEvent.setup();
    renderCheckoutPage();

    const submitBtn = screen.getByRole('button', { name: /CONFIRM & TRANSMIT ORDER ↗/i });
    await user.click(submitBtn);

    expect(screen.getByText(/ВКАЖІТЬ ІМ'Я/i)).toBeInTheDocument();
    expect(screen.getByText(/ВКАЖІТЬ ТЕЛЕФОН/i)).toBeInTheDocument();
    expect(screen.getByText(/ВКАЖІТЬ EMAIL/i)).toBeInTheDocument();
  });

  it('повинен заповнювати поля форми кнопкою автозаповнення', async () => {
    const user = userEvent.setup();
    renderCheckoutPage();

    const autofillBtn = screen.getByText(/АВТОЗАПОВНИТИ ТЕСТ/i);
    await user.click(autofillBtn);

    const nameInput = screen.getByLabelText(/CUSTOMER_NAME \*/i) as HTMLInputElement;
    const phoneInput = screen.getByLabelText(/PHONE_NUMBER \*/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/EMAIL_ADDRESS \*/i) as HTMLInputElement;

    expect(nameInput.value).toBe('Михайло');
    expect(phoneInput.value).toBe('+380991234567');
    expect(emailInput.value).toBe('example@gmail.com');
  });
});

