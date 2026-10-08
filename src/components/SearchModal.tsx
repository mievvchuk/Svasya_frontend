import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useLang } from '../i18n/useLang';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Фокус на інпут при відкритті
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Esc закриває
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  // Блокуємо скрол body, поки відкрито
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Фільтр товарів
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#080808]/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="max-w-[720px] mx-auto mt-20 sm:mt-32 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Пошуковий рядок */}
        <div className="border border-[#343438] bg-[#0A0A0C] relative">
          <div className="absolute top-2 left-2 text-[#B7FFB0] text-[10px]">⌜</div>
          <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-[10px]">⌟</div>

          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#343438]">
            <Search className="w-5 h-5 text-[#FF00FF] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="TYPE TO SEARCH..."
              className="flex-1 bg-transparent text-[#F5F5F0] font-mono text-base outline-none placeholder:text-[#99999F] placeholder:tracking-[0.2em] placeholder:uppercase placeholder:text-[11px]"
            />
            <button
              onClick={onClose}
              className="text-[#99999F] hover:text-[#FF00FF] transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Результати */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === '' ? (
              <div className="p-6 text-[10px] tracking-[0.3em] uppercase text-[#99999F] text-center">
                // START TYPING TO SEARCH
              </div>
            ) : results.length === 0 ? (
              <div className="p-6 text-[10px] tracking-[0.3em] uppercase text-[#99999F] text-center">
                // NO RESULTS FOR "{query}"
              </div>
            ) : (
              <ul className="divide-y divide-[#343438]">
                {results.map((product) => {
                  const v = product.variants[0];
                  return (
                    <li key={product.id}>
                      <Link
                        to={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-4 hover:bg-[#141416] transition-colors group"
                      >
                        <div className="w-16 h-16 shrink-0 border border-[#343438] overflow-hidden bg-[#080808]">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="font-black text-sm text-[#F5F5F0] uppercase tracking-wide font-sans group-hover:text-[#00FFFF] transition-colors truncate">
                            {product.name}
                          </div>
                          <div className="text-[10px] text-[#99999F] tracking-[0.2em] uppercase mt-1 truncate">
                            {v.size} / {v.color.replace('_', ' ')}
                          </div>
                        </div>

                        <div className="font-black text-[#B7FFB0] text-sm whitespace-nowrap">
                          {v.price.toLocaleString('uk-UA')} ₴
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer модалки */}
          <div className="border-t border-[#343438] px-6 py-3 flex items-center justify-between text-[9px] tracking-[0.3em] uppercase text-[#99999F]">
            <span>ESC TO CLOSE</span>
            <span>{results.length} / {MOCK_PRODUCTS.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};