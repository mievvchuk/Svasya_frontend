import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalAmount, clearCart, addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddSampleItem = () => {
    addToCart({
      variantId: 5,
      productId: 1,
      name: 'СВАСЬ Hoodie Classic',
      price: 999,
      color: 'forest_green',
      size: 'L',
      imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
    });
  };

  if (items.length === 0) {
    return (
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto p-8 sm:p-12 bg-[#141416] border border-[#343438] text-center relative">
          <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
          <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

          <div className="text-xs text-[#FF00FF] font-semibold tracking-widest uppercase mb-3">
            [ BUFFER_EMPTY // 000 ]
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#F5F5F0] uppercase tracking-tight mb-4 font-sans">
            ТВІЙ КОШИК ПОРОЖНІЙ
          </h1>
          <p className="text-[#99999F] text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
            У кошику наразі немає збережених товарів. Натисніть кнопку нижче, щоб додати тестову позицію за контрактом ТЗ.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleAddSampleItem}
              className="btn-svasya"
            >
              + ДОДАТИ ТЕСТОВИЙ СВАСЬ HOODIE (v#5)
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* Заголовок сторінки у стилі Figma */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#343438] gap-4">
        <div>
          <div className="text-xs font-semibold text-[#FF00FF] tracking-widest uppercase flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#B7FFB0] inline-block"></span>
            <span>CART_BUFFER // RECOVERED_FILES [ {items.length} ]</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F5F5F0] tracking-tight uppercase font-sans">
            КОШИК
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#99999F] hover:text-[#FF00FF] transition-colors uppercase self-start sm:self-auto"
        >
          [ × ОЧИСТИТИ ВСЕ ]
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Список товарів у кошику в CRT-стилі */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item, idx) => {
            const subtotal = item.price * item.quantity;
            const channelStr = `CH_0${(idx % 9) + 1} / CART_FEED`;

            return (
              <div
                key={item.variantId}
                className="bg-[#141416] p-4 sm:p-6 border border-[#343438] relative hover:border-[#99999F] transition-colors"
              >
                {/* Куточки в стилі CRT Figma */}
                <div className="absolute top-2 left-2 text-[#B7FFB0] text-xs">⌜</div>
                <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-xs">⌟</div>

                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#343438] text-[11px]">
                  <span className="text-[#B7FFB0]">{channelStr}</span>
                  <span className="text-[#99999F]">VARIANT_ID #{item.variantId}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* Зображення товару */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#101214] border border-[#343438] overflow-hidden flex-shrink-0 relative">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/200x200/101214/B7FFB0?text=СВАСЬ';
                      }}
                    />
                  </div>

                  {/* Опис товару */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#F5F5F0] truncate font-sans">
                      {item.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-[#99999F]">
                      <span className="border border-[#343438] px-2 py-0.5 bg-[#080808]">
                        SIZE: {item.size}
                      </span>
                      <span className="border border-[#343438] px-2 py-0.5 bg-[#080808]">
                        COLOR: {item.color}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-[#00FFFF] font-semibold">
                      {item.price.toLocaleString('uk-UA')} UAH
                    </div>
                  </div>

                  {/* Керування quantity & subtotal */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    {/* Лічильник [-] N [+] */}
                    <div className="flex items-center border border-[#343438] bg-[#080808]">
                      <button
                        type="button"
                        aria-label="Зменшити кількість"
                        disabled={item.quantity <= 1}
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        className="px-3 py-1.5 text-[#F5F5F0] hover:text-[#FF00FF] disabled:opacity-20 disabled:hover:text-[#F5F5F0] transition-colors text-xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-[#F5F5F0]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Збільшити кількість"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        className="px-3 py-1.5 text-[#F5F5F0] hover:text-[#00FFFF] transition-colors text-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] text-[#99999F]">SUBTOTAL:</div>
                        <div className="text-base font-bold text-[#F5F5F0]">
                          {subtotal.toLocaleString('uk-UA')} UAH
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.variantId)}
                        className="text-[#99999F] hover:text-[#FF00FF] transition-colors p-1"
                        title="Видалити"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Разом / Order Summary у стилі терміналу Figma */}
        <div className="lg:col-span-4">
          <div className="bg-[#141416] p-6 sm:p-8 border border-[#343438] sticky top-28">
            <div className="text-xs font-bold text-[#B7FFB0] uppercase tracking-wider pb-3 border-b border-[#343438] flex items-center justify-between">
              <span>ORDER_SPECIFICATION</span>
              <span className="text-[#99999F]">CRT-001</span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between text-[#99999F]">
                <span>ITEMS IN BUFFER:</span>
                <span className="text-[#F5F5F0] font-semibold">
                  {items.reduce((s, i) => s + i.quantity, 0)} UNITS
                </span>
              </div>
              <div className="flex justify-between text-[#99999F]">
                <span>DELIVERY:</span>
                <span className="text-[#B7FFB0]">CALCULATED AT CHECKOUT</span>
              </div>

              <div className="pt-4 border-t border-[#343438] flex justify-between items-baseline">
                <span className="text-sm font-bold text-[#F5F5F0]">
                  TOTAL AMOUNT:
                </span>
                <span className="text-2xl font-black text-[#F5F5F0]">
                  {totalAmount.toLocaleString('uk-UA')} UAH
                </span>
              </div>

              <p className="text-[10px] text-[#99999F] pt-2 border-t border-[#343438]/50 leading-relaxed">
                * FINAL AMOUNT IS RE-VERIFIED BY SERVER POST /api/orders
              </p>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="mt-6 w-full btn-svasya flex items-center justify-center gap-2"
            >
              <span>CHECKOUT ↗</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
