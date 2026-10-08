import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './i18n/useLang';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LorePage } from './pages/LorePage';
import { FaqPage } from './pages/FaqPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { AuthPage } from './pages/AuthPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { ManagerProfilePage } from './pages/ManagerProfilePage';
import { AdminProfilePage } from './pages/AdminProfilePage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-[#080808] text-[#F5F5F0] selection:bg-[#FF00FF] selection:text-[#080808]">
              <Header />
              <div className="flex-1">
                <Routes>
                  {/* Головні сторінки */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/lore" element={<LorePage />} />
                  <Route path="/faq" element={<FaqPage />} />

                  {/* Кошик та замовлення */}
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-success" element={<OrderSuccessPage />} />

                  {/* Авторизація */}
                  <Route path="/auth" element={<AuthPage />} />

                  {/* Профілі */}
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/profile/user" element={<UserProfilePage />} />
                  <Route path="/manager" element={<ManagerProfilePage />} />
                  <Route path="/profile/manager" element={<ManagerProfilePage />} />
                  <Route path="/admin" element={<AdminProfilePage />} />
                  <Route path="/profile/admin" element={<AdminProfilePage />} />

                  {/* Деталі замовлення */}
                  <Route path="/orders/:id" element={<OrderDetailsPage />} />
                  <Route path="/manager/orders/:id" element={<OrderDetailsPage />} />

                  {/* Fallback — на головну */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;