import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-300">
        <h2 className="text-2xl font-bold mb-4">Кошик порожній</h2>
        <p>Немає товарів у кошику.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Кошик замовлень</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Список товарів */}
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-between text-white"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-zinc-400">
                  Розмір: {item.size} | Колір: {item.color}
                </p>
                <p className="text-sm font-bold text-zinc-300 mt-1">
                  Ціна: {item.price} грн
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-zinc-600 rounded px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="px-2"
                  >
                    +
                  </button>
                </div>
                <div className="font-bold">
                  {item.price * item.quantity} грн
                </div>
                <button
                  onClick={() => removeFromCart(item.variantId)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Підсумок */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-6 h-fit text-white">
          <h2 className="text-xl font-bold mb-4">Підсумок</h2>
          <div className="flex justify-between mb-2 text-zinc-300">
            <span>Сума:</span>
            <span>{totalAmount} грн</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 py-3 rounded font-bold transition-colors"
          >
            Перейти до оформлення
          </button>
        </div>
      </div>
    </main>
  );
};
