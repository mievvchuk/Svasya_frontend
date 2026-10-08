import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { OrderResponse } from '../types/cart';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const order = (location.state as { order?: OrderResponse })?.order;

  const orderId = order?.id ?? 15;
  const totalPrice = order?.total_price ?? 2297;
  const status = order?.status ?? 'new';

  return (
    <main className="max-w-xl mx-auto px-4 py-16 text-center text-white">
      <div className="bg-zinc-900 border border-zinc-700 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-emerald-400">
          Замовлення успішно оформлено!
        </h1>
        <p className="text-zinc-400 mb-6">
          Дякуємо за покупку. Ми зв'яжемося з вами для підтвердження.
        </p>

        <div className="bg-zinc-800 p-4 rounded text-left space-y-2 mb-6">
          <div className="flex justify-between">
            <span>Номер:</span>
            <span className="font-bold">#{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Сума:</span>
            <span className="font-bold">{totalPrice} грн</span>
          </div>
          <div className="flex justify-between">
            <span>Статус:</span>
            <span className="text-emerald-400 uppercase font-semibold">{status}</span>
          </div>
        </div>

        <Link
          to="/cart"
          className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded font-bold"
        >
          Повернутися до покупок
        </Link>
      </div>
    </main>
  );
};
