import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

export const CheckoutPage: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phone || !email) {
      setError("Всі поля обов'язкові для заповнення!");
      return;
    }

    try {
      const response = await createOrder({
        customer_name: customerName,
        phone,
        email,
        items: items.map((i) => ({
          variant_id: i.variantId,
          quantity: i.quantity,
        })),
      });

      clearCart();
      navigate('/order-success', { state: { order: response } });
    } catch (err: any) {
      setError(err.message || 'Помилка замовлення');
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Оформлення замовлення</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-900 border border-red-700 text-red-200 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Форма */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Ім'я:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Телефон:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded font-bold"
          >
            Підтвердити замовлення
          </button>
        </form>

        {/* Список товарів справа */}
        <div className="p-4 bg-zinc-900 border border-zinc-700 rounded">
          <h2 className="font-bold text-lg mb-4">Ваше замовлення</h2>
          <div className="space-y-2 mb-4">
            {items.map((i) => (
              <div key={i.variantId} className="flex justify-between text-sm text-zinc-300">
                <span>{i.name} (x{i.quantity})</span>
                <span>{i.price * i.quantity} грн</span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-zinc-700 flex justify-between font-bold">
            <span>Разом:</span>
            <span>{totalAmount} грн</span>
          </div>
        </div>
      </div>
    </main>
  );
};
