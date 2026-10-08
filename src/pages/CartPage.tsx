import React from 'react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { items } = useCart();

  return (
    <div>
      <h1>Кошик</h1>
      {items.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.variantId}>
              <p>Товар: {item.name}</p>
              <p>Розмір: {item.size}, Колір: {item.color}</p>
              <p>Ціна: {item.price} грн</p>
              <p>Кількість: {item.quantity}</p>
              <button>Видалити</button>
              <hr />
            </div>
          ))}
          <button>Оформити замовлення</button>
        </div>
      )}
    </div>
  );
};
