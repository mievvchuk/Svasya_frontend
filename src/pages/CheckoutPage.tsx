import React, { useState } from 'react';

export const CheckoutPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <h1>Оформлення замовлення</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Ім'я:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Телефон:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Відправити замовлення</button>
      </form>
    </div>
  );
};
