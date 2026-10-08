import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Check } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';

export const ProductsPage: React.FC = () => {
  const { addToCart, items } = useCart();
  const [addedVariantId, setAddedVariantId] = React.useState<number | null>(null);

  const handleQuickAdd = (product: typeof MOCK_PRODUCTS[0]) => {
    const v = product.variants[0];
    addToCart({
      variantId: v.id,
      productId: product.id,
      name: product.name,
      price: v.price,
      color: v.color,
      size: v.size,
      imageUrl: product.imageUrl,
      quantity: 1,
    });

    setAddedVariantId(v.id);
    setTimeout(() => setAddedVariantId(null), 1500);
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase mb-4">
          <span className="text-[#00FFFF]">CATALOG</span>
          <span className="text-[#99999F]">/</span>
          <span className="text-[#FF00FF]">VOL. 001</span>
        </div>
        <h1 className="font-black font-sans tracking-tight uppercase text-[#F5F5F0] text-4xl sm:text-6xl leading-none mb-4">
          SHOP THE <span className="text-[#FF00FF]">DROP</span>
        </h1>
        <p className="text-[#99999F] text-xs sm:text-sm max-w-lg leading-relaxed">
          Оригінальний брендовий одяг та аксесуари. Оберіть свій розмір
          та додайте в кошик.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PRODUCTS.map((product) => {
          const firstVariant = product.variants[0];
          const isJustAdded = addedVariantId === firstVariant.id;
          const isInCart = items.some((i) => i.productId === product.id);

          return (
            <div
              key={product.id}
              className="border border-[#343438] bg-[#141416] hover:border-[#FF00FF] transition-colors group relative"
            >
              <div className="absolute top-2 left-2 text-[#B7FFB0] text-[10px] z-20">⌜</div>
              <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-[10px] z-20">⌟</div>

              <Link to={`/products/${product.id}`} className="block relative">
                <div className="aspect-square bg-[#0A0A0C] border-b border-[#343438] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                {isInCart && (
                  <span className="absolute top-3 left-3 bg-[#B7FFB0] text-[#080808] text-[9px] tracking-[0.25em] uppercase font-bold px-2 py-1 z-10">
                    IN BAG
                  </span>
                )}

                <span className="absolute top-3 right-3 text-[9px] tracking-[0.25em] uppercase text-[#FF00FF] z-10">
                  #{String(product.id).padStart(3, '0')}
                </span>
              </Link>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <Link
                    to={`/products/${product.id}`}
                    className="font-black text-sm text-[#F5F5F0] uppercase tracking-wide hover:text-[#00FFFF] transition-colors font-sans"
                  >
                    {product.name}
                  </Link>
                  <div className="text-[9px] tracking-[0.25em] uppercase text-[#99999F] whitespace-nowrap">
                    {firstVariant.size}
                  </div>
                </div>

                <p className="text-[11px] text-[#99999F] leading-relaxed line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#343438]">
                  <div className="font-black text-[#B7FFB0] text-base">
                    {firstVariant.price.toLocaleString('uk-UA')} ₴
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="p-2 border border-[#343438] text-[#99999F] hover:text-[#00FFFF] hover:border-[#00FFFF] transition-colors"
                      title="Детальніше"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={isJustAdded}
                      className={`px-3 py-2 text-[10px] tracking-[0.2em] uppercase font-bold flex items-center gap-1.5 transition-all ${
                        isJustAdded
                          ? 'bg-[#B7FFB0] text-[#080808]'
                          : 'btn-svasya-outline !text-[10px] !py-2 !px-3'
                      }`}
                      title="Швидко додати в кошик"
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>ADDED</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>BAG</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};