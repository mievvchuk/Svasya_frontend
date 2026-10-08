import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../i18n/useLang';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const { totalItemsCount } = useCart();
  const { currentUser, isAuthenticated } = useAuth();
  const { t, toggleLang } = useLang();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#343438]">
        {/* Top banner */}
        <div className="bg-[#FF00FF] text-[#080808] text-[10px] font-bold py-1.5 px-4 text-center tracking-[0.2em] uppercase">
          {t.banner}
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-baseline gap-2 group">
              <span className="font-black text-2xl tracking-tighter text-[#F5F5F0] font-sans">
                CBACb
              </span>
              <span className="text-[#FF00FF] text-xs">®</span>
              <span className="text-[9px] text-[#99999F] tracking-[0.25em] uppercase border-l border-[#343438] pl-2 leading-tight">
                Bootleg<br />Dept.
              </span>
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase">
              <Link
                to="/products"
                className={`transition-colors ${
                  isActive('/products')
                    ? 'text-[#00FFFF]'
                    : 'text-[#F5F5F0] hover:text-[#FF00FF]'
                }`}
              >
                [ {t.shop} ]
              </Link>
              <Link
                to="/lore"
                className={`transition-colors ${
                  isActive('/lore')
                    ? 'text-[#00FFFF] font-bold'
                    : 'text-[#99999F] hover:text-[#FF00FF]'
                }`}
              >
                {t.lore}
              </Link>
              <Link
                to="/faq"
                className={`transition-colors ${
                  isActive('/faq')
                    ? 'text-[#00FFFF] font-bold'
                    : 'text-[#99999F] hover:text-[#FF00FF]'
                }`}
              >
                {t.faq}
              </Link>
            </nav>

            {/* Right */}
            <div className="flex items-center gap-4 sm:gap-5 text-[11px] tracking-[0.2em] uppercase">

              {/* Language toggle */}
              <button
                onClick={toggleLang}
                className="hidden sm:inline text-[#99999F] hover:text-[#FF00FF] transition-colors font-bold"
                title="Switch language"
              >
                {t.uaEn}
              </button>

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[#99999F] hover:text-[#FF00FF] transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Profile / Auth */}
              {(() => {
                const profileLink = !isAuthenticated
                  ? '/auth'
                  : currentUser.role === 'admin'
                  ? '/admin'
                  : currentUser.role === 'manager'
                  ? '/manager'
                  : '/profile';

                const isProfileActive =
                  isActive('/profile') ||
                  isActive('/profile/user') ||
                  isActive('/manager') ||
                  isActive('/profile/manager') ||
                  isActive('/admin') ||
                  isActive('/profile/admin') ||
                  isActive('/auth');

                return (
                  <Link
                    to={profileLink}
                    className={`transition-colors flex items-center gap-1.5 ${
                      isProfileActive
                        ? 'text-[#00FFFF]'
                        : 'text-[#99999F] hover:text-[#F5F5F0]'
                    }`}
                    title="Особистий кабінет"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">
                      {isAuthenticated ? `[ ${currentUser.role.toUpperCase()} ]` : 'LOGIN'}
                    </span>
                  </Link>
                );
              })()}

              {/* Cart */}
              <Link
                to="/cart"
                className={`transition-colors flex items-center gap-1 ${
                  isActive('/cart')
                    ? 'text-[#00FFFF]'
                    : 'text-[#F5F5F0] hover:text-[#00FFFF]'
                }`}
              >
                {t.bag} <span className="text-[#FF00FF]">[ {totalItemsCount} ]</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Search modal — поза <header> */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};