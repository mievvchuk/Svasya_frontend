import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F5F0] selection:bg-[#FF00FF] selection:text-[#080808]">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;