import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { totalItemsCount } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#343438]">
      {/* Верхній банер як у Figma */}
      <div className="bg-[#FF00FF] text-[#080808] text-[11px] font-semibold py-1.5 px-4 text-center tracking-wider overflow-hidden">
        <span className="inline-block animate-pulse">
          INDEPENDENT MERCH FROM UKRAINE // FREE SHIPPING ON ORDERS 3000+ UAH // WORLDWIDE TRANSMISSION
        </span>
      </div>

      {/* Головна навігація за макетом Figma */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Бренд: СВАСЬ ® BOOTLEG DEPT. */}
          <Link to="/cart" className="flex items-center gap-3 group focus:outline-none">
            <span className="font-black text-3xl sm:text-4xl tracking-tighter text-[#F5F5F0] group-hover:text-[#00FFFF] transition-colors font-sans">
              СВАСЬ
            </span>
            <div className="text-[10px] leading-tight text-[#FF00FF] font-semibold tracking-widest border-l border-[#343438] pl-2.5">
              ®<br />BOOTLEG DEPT.
            </div>
          </Link>

          {/* Права частина: BAG [ N ] */}
          <div className="flex items-center gap-4 text-xs">
            {/* Посилання на кошик: BAG [ N ] */}
            <Link
              to="/cart"
              className={`px-4 py-2 border transition-all flex items-center gap-2 ${
                isActive('/cart')
                  ? 'bg-[#FF00FF] text-[#080808] border-[#FF00FF] font-bold'
                  : totalItemsCount > 0
                  ? 'border-[#B7FFB0] text-[#B7FFB0] hover:bg-[#B7FFB0]/10'
                  : 'border-[#343438] text-[#F5F5F0] hover:border-[#FF00FF] hover:text-[#FF00FF]'
              }`}
            >
              <span className="font-semibold tracking-wider">BAG</span>
              <span className="font-bold">[ {totalItemsCount} ]</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
