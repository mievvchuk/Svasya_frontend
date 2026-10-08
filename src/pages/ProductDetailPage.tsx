import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import type { ProductVariant } from '../types/cart';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = MOCK_PRODUCTS.find((p) => p.id === Number(id));
  const currentProduct = product || MOCK_PRODUCTS[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    currentProduct.variants[0]
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    setSelectedVariant(currentProduct.variants[0]);
    setQuantity(1);
  }, [currentProduct.id]);

  const handleAddToCart = () => {
    addToCart({
      variantId: selectedVariant.id,
      productId: currentProduct.id,
      name: currentProduct.name,
      price: selectedVariant.price,
      color: selectedVariant.color,
      size: selectedVariant.size,
      imageUrl: currentProduct.imageUrl,
      quantity,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#99999F] hover:text-[#00FFFF] transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>← BACK TO CATALOG</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

        <div className="relative border border-[#343438] bg-[#141416] overflow-hidden">
          <div className="absolute top-3 left-3 text-[#B7FFB0] text-xs z-20">⌜</div>
          <div className="absolute bottom-3 right-3 text-[#B7FFB0] text-xs z-20">⌟</div>

          <div className="relative w-full h-[500px] sm:h-[600px] bg-[#0A0A0C]">
            <img
              src={currentProduct.imageUrl}
              alt={currentProduct.name}
              onError={(e) => {
                console.error('IMG FAILED:', currentProduct.imageUrl);
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/600x600/141416/FF00FF?text=NO+IMAGE';
              }}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-3 right-3 z-20">
            <span className="bg-[#FF00FF] text-[#080808] text-[9px] tracking-[0.3em] uppercase font-bold px-2.5 py-1">
              #{String(currentProduct.id).padStart(3, '0')}
            </span>
          </div>
        </div>

        <div className="space-y-6">

          <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase">
            <span className="text-[#00FFFF]">CATALOG</span>
            <span className="text-[#99999F]">/</span>
            <span className="text-[#FF00FF]">
              #{String(currentProduct.id).padStart(3, '0')}
            </span>
          </div>

          <h1 className="font-black font-sans tracking-tight uppercase text-[#F5F5F0] text-3xl sm:text-5xl leading-none">
            {currentProduct.name}
          </h1>

          <div className="font-black text-[#B7FFB0] text-3xl">
            {selectedVariant.price.toLocaleString('uk-UA')} ₴
          </div>

          <p className="text-[#99999F] text-sm leading-relaxed max-w-lg">
            {currentProduct.description}
          </p>

          
          <div className="pt-6 border-t border-[#343438]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#99999F] mb-3">
              // SELECT VARIANT
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {currentProduct.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`p-3 border text-left transition-all ${
                      isSelected
                        ? 'border-[#FF00FF] bg-[#FF00FF]/10 text-[#F5F5F0]'
                        : 'border-[#343438] bg-[#141416] text-[#99999F] hover:border-[#00FFFF] hover:text-[#F5F5F0]'
                    }`}
                  >
                    <div className="font-black text-xs tracking-wider uppercase">
                      {v.size}
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase mt-0.5">
                      {v.color.replace('_', ' ')}
                    </div>
                    <div className="text-[9px] text-[#99999F] mt-1">
                      v#{v.id}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-[#343438]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#99999F] mb-3">
              // QUANTITY
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={quantity <= 1}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 border border-[#343438] text-[#F5F5F0] hover:border-[#FF00FF] hover:text-[#FF00FF] disabled:opacity-30 disabled:hover:border-[#343438] disabled:hover:text-[#F5F5F0] transition-colors font-black"
              >
                −
              </button>
              <span className="w-12 text-center font-black text-lg text-[#F5F5F0] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 border border-[#343438] text-[#F5F5F0] hover:border-[#FF00FF] hover:text-[#FF00FF] transition-colors font-black"
              >
                +
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-bold text-xs tracking-[0.25em] uppercase transition-all ${
                isAdded
                  ? 'bg-[#B7FFB0] text-[#080808]'
                  : 'btn-svasya'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
              className="py-4 px-6 font-bold text-xs tracking-[0.25em] uppercase border border-[#343438] text-[#F5F5F0] hover:border-[#00FFFF] hover:text-[#00FFFF] transition-colors"
            >
              BUY NOW
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-[#343438] text-[10px] tracking-[0.25em] uppercase text-[#99999F]">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#B7FFB0]" />
              <span>Nova Poshta 1–3 days</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B7FFB0]" />
              <span>100% original merch</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};