import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F5F0] selection:bg-[#FF00FF] selection:text-[#080808]">
          <Header />
          <div className="flex-1">
            <Routes>
              {/* Три основні сторінки Frontend 2 */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />

              {/* Дефолтний редирект на кошик */}
              <Route path="/" element={<Navigate to="/cart" replace />} />
              <Route path="*" element={<Navigate to="/cart" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
