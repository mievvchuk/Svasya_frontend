import React from 'react';

export const OrderSuccessPage: React.FC = () => {
  return (
    <div>
      <h1>Дякуємо! Замовлення оформлено</h1>
      <p>Номер замовлення: #15</p>
      <p>Сума: 2297 грн</p>
      <a href="/cart">Повернутися назад</a>
    </div>
  );
};
