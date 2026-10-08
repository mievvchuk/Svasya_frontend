import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const { totalItemsCount } = useCart();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#343438]">
      <div className="bg-[#FF00FF] text-[#080808] text-[10px] font-bold py-1.5 px-4 text-center tracking-[0.2em] uppercase">
        INDEPENDENT MERCH FROM UKRAINE // FREE SHIPPING ON ORDERS 3000+ UAH // WORLDWIDE TRANSMISSION
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">

          <Link to="/" className="flex items-baseline gap-2 group">
            <span className="font-black text-2xl tracking-tighter text-[#F5F5F0] font-sans">
              CBACb
            </span>
            <span className="text-[#FF00FF] text-xs">®</span>
            <span className="text-[9px] text-[#99999F] tracking-[0.25em] uppercase border-l border-[#343438] pl-2 leading-tight">
              Bootleg<br />Dept.
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase">
            <Link
              to="/products"
              className={`transition-colors ${
                isActive('/products')
                  ? 'text-[#00FFFF]'
                  : 'text-[#F5F5F0] hover:text-[#FF00FF]'
              }`}
            >
              [ Shop The Drop ]
            </Link>
           <Link
  to="/lore"
  className={`transition-colors uppercase ${
    isActive('/lore')
      ? 'text-[#00FFFF] font-bold'
      : 'text-[#99999F] hover:text-[#FF00FF]'
  }`}
>
  The Lore
</Link>
            <span className="text-[#99999F] hover:text-[#F5F5F0] cursor-pointer transition-colors">
              Shipping / FAQ
            </span>
          </nav>

          <div className="flex items-center gap-5 text-[11px] tracking-[0.2em] uppercase">
            <span className="hidden sm:inline text-[#99999F] hover:text-[#F5F5F0] cursor-pointer transition-colors">
              UA / EN
            </span>
            <button
              className="text-[#99999F] hover:text-[#FF00FF] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <Link
              to="/cart"
              className={`transition-colors flex items-center gap-1 ${
                isActive('/cart')
                  ? 'text-[#00FFFF]'
                  : 'text-[#F5F5F0] hover:text-[#00FFFF]'
              }`}
            >
              BAG <span className="text-[#FF00FF]">[ {totalItemsCount} ]</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};