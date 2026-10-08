import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Plus, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLang } from '../i18n/useLang';
import { MOCK_PRODUCTS } from '../data/mockProducts';

export const HomePage: React.FC = () => {
  const { addToCart } = useCart();
  const { t } = useLang();

  const featured = MOCK_PRODUCTS[0];
  const v = featured.variants[0];

  const handleAddFeatured = () => {
    addToCart({
      variantId: v.id,
      productId: featured.id,
      name: featured.name,
      price: v.price,
      color: v.color,
      size: v.size,
      imageUrl: featured.imageUrl,
      quantity: 1,
    });
  };

  const handleQuickAdd = (product: typeof MOCK_PRODUCTS[0]) => {
    const pv = product.variants[0];
    addToCart({
      variantId: pv.id,
      productId: product.id,
      name: product.name,
      price: pv.price,
      color: pv.color,
      size: pv.size,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  const upcoming = MOCK_PRODUCTS.slice(1, 4);

  const tickerPhrases = [
    'NO RESTOCKS.',
    'SHIP WORLDWIDE.',
    'MADE IN UA.',
    'OVERSIZED BY DESIGN.',
    'NO APOLOGIES.',
    'BOOTLEG DEPT.',
  ];

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">

      {/* HERO */}
      <div className="crt-frame crt-scanlines p-6 sm:p-10 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent 2px,
              rgba(71, 75, 75, 0.38) 15px
            )`,
          }}
        />

        <div className="relative z-20">
          <div className="text-center text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-8">
            {t.homeVol} <span className="text-[#FF00FF] mx-2">/</span>
            {t.homeTransmission} <span className="text-[#FF00FF] mx-2">/</span>
            {t.homeEst}
          </div>

          <h1 className="text-center font-black font-sans tracking-tighter uppercase text-[14vw] sm:text-[10vw] lg:text-[120px] leading-none mb-10 select-none">
            <span className="glitch" data-text="СВАСЬ DROP">СВАСЬ DROP</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            <div className="lg:col-span-3 order-2 lg:order-1 space-y-4">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase">
                <span className="text-[#FF00FF]">● REC</span>
                <span className="text-[#B7FFB0]">● 00:00:01</span>
              </div>
              <h2 className="font-black text-xl sm:text-2xl text-[#F5F5F0] uppercase leading-tight font-sans">
                {t.homeBadSignal}<br />{t.homeGoodMerch}
              </h2>
              <p className="text-[11px] text-[#99999F] leading-relaxed">
                {t.homeRecTagline}
              </p>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#00FFFF] pt-2">
                SP / HI-FI / STEREO
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
              <Link to={`/products/${featured.id}`} className="block group">
                <img
                  src={featured.imageUrl}
                  alt={featured.name}
                  className="hero-img w-full max-w-[760px] h-auto object-contain animate-float-hue"
                />
              </Link>
            </div>

            <div className="lg:col-span-3 order-3 space-y-3 text-right">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#FF00FF]">
                {t.homeFeaturedFile}
              </div>
              <Link
                to={`/products/${featured.id}`}
                className="block font-black text-lg text-[#F5F5F0] uppercase font-sans tracking-tight hover:text-[#00FFFF] transition-colors"
              >
                {featured.name}
              </Link>
              <ul className="text-[11px] text-[#99999F] space-y-1 leading-relaxed">
                <li>{v.color.replace('_', ' ')} / oversized</li>
                <li>240 GSM cotton</li>
                <li>Sizes S–XXL</li>
              </ul>
              <div className="font-black text-xl text-[#F5F5F0] pt-2">
                {v.price.toLocaleString('uk-UA')} UAH
              </div>
              <div className="flex items-center justify-end gap-2 text-[10px] tracking-[0.25em] uppercase text-[#B7FFB0]">
                <span>●</span> {t.homeInStock}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-3">
            <Link to="/products" className="btn-svasya">
              {t.homeShopDrop} ↗
            </Link>
            <button onClick={handleAddFeatured} className="btn-svasya-outline">
              {t.homeAddFeatured}
            </button>
          </div>

          <div className="mt-10 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-[#99999F]">
            <Link
              to="/products"
              className="flex items-center gap-2 hover:text-[#FF00FF] transition-colors"
            >
              <Play className="w-3 h-3" /> {t.homePlayTracking}
            </Link>
            <span>© CBACb 2026 / 001</span>
          </div>
        </div>
      </div>

      {/* ABOUT / THE LORE */}
      <section className="mt-12 sm:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-5 relative">
          <div className="absolute -top-2 -left-2 text-[#B7FFB0] text-xs z-10">⌜</div>
          <div className="absolute -bottom-2 -right-2 text-[#B7FFB0] text-xs z-10">⌟</div>

          <div className="absolute top-4 left-4 z-20 text-[9px] tracking-[0.3em] uppercase text-[#F5F5F0] bg-[#080808]/80 backdrop-blur-sm px-2.5 py-1 border border-[#343438]">
            FOUND_FOOTAGE_001.AVI
          </div>

          <div className="relative border border-[#343438] overflow-hidden aspect-[4/3]">
            <img
              src="/images/car.png"
              alt="Found footage 001"
              className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:grayscale-0 hover:contrast-100 hover:brightness-100 transition-all duration-700"
            />
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                backgroundSize: '3px 3px',
              }}
            />
          </div>

          <div className="absolute bottom-4 left-4 z-20">
            <span className="bg-[#FF00FF] text-[#080808] text-[9px] tracking-[0.3em] uppercase font-bold px-3 py-1.5">
              YOUR BIGGEST FLEX IS KNOWLEDGE
            </span>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase">
            <span className="text-[#00FFFF]">{t.homeAbout}</span>
            <span className="text-[#99999F]">/</span>
            <span className="text-[#FF00FF]">{t.homeTheLore}</span>
          </div>

          <h2 className="font-black font-sans tracking-tight uppercase text-[#F5F5F0] text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
            {t.homeLoreTitle1}<br />{t.homeLoreTitle2}
          </h2>

          <p className="text-[#99999F] text-sm sm:text-[15px] leading-relaxed max-w-2xl">
            {t.homeLoreText}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] tracking-[0.3em] uppercase text-[#99999F] pt-2">
            <span><span className="text-[#B7FFB0]">01</span> / {t.homeTags1}</span>
            <span><span className="text-[#B7FFB0]">02</span> / {t.homeTags2}</span>
            <span><span className="text-[#B7FFB0]">03</span> / {t.homeTags3}</span>
          </div>

          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#FF00FF] hover:text-[#00FFFF] transition-colors"
            >
              {t.homeWelcome} <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="mt-6 border-y border-[#343438] bg-[#101214] overflow-hidden py-3">
        <div className="marquee-track text-[11px] tracking-[0.3em] uppercase text-[#B7FFB0]">
          {tickerPhrases.concat(tickerPhrases).map((txt, i) => (
            <span key={i} className="px-6 inline-flex items-center gap-6">
              {txt}
              <span className="text-[#FF00FF]">✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* NEXT TRANSMISSION */}
      <section className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 border border-[#343438] bg-[#141416] p-6 sm:p-10 relative">
          <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
          <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

          <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-4">
            {t.homeNextTransmission}
          </div>
          <h2 className="font-black text-3xl sm:text-5xl text-[#F5F5F0] uppercase font-sans tracking-tight mb-4">
            DROP_002<br />
            <span className="text-[#00FFFF]">LOADING</span>
            <span className="text-[#FF00FF] animate-pulse">_</span>
          </h2>
          <p className="text-[#99999F] text-xs sm:text-sm leading-relaxed max-w-xl">
            {t.homeDropDesc}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
            {['00', '14', '36'].map((n, i) => (
              <div key={i} className="border border-[#343438] bg-[#0A0A0C] p-3 text-center">
                <div className="font-black text-2xl sm:text-3xl text-[#B7FFB0] font-sans tabular-nums">
                  {n}
                </div>
                <div className="text-[9px] tracking-[0.3em] text-[#99999F] uppercase mt-1">
                  {['DAYS', 'HRS', 'MIN'][i]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#FF00FF] hover:text-[#00FFFF] transition-colors"
            >
              {t.homeGetNotified} <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4 border border-[#343438] bg-[#101214] p-6 sm:p-8 flex flex-col justify-between relative">
          <div className="absolute top-2 left-3 text-[#FF00FF] text-xs">⌜</div>
          <div className="absolute bottom-2 right-3 text-[#FF00FF] text-xs">⌟</div>

          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#FF00FF] mb-4">
              {t.homeSignalLog}
            </div>
            <ul className="space-y-3 text-[11px] text-[#99999F] leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#B7FFB0]">01</span>
                <span>{t.homeSignalLog1}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#B7FFB0]">02</span>
                <span>{t.homeSignalLog2}</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#B7FFB0]">03</span>
                <span>{t.homeSignalLog3}</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-[10px] tracking-[0.3em] uppercase text-[#00FFFF]">
            {t.homeTransmitting}
          </div>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="mt-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-2">
              {t.homeInTheAir}
            </div>
            <h2 className="font-black text-2xl sm:text-4xl text-[#F5F5F0] uppercase font-sans tracking-tight">
              {t.homeStillOnAir}
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#99999F] hover:text-[#FF00FF] transition-colors"
          >
            {t.homeScrollMore} <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {upcoming.map((product) => {
            const pv = product.variants[0];
            return (
              <div
                key={product.id}
                className="border border-[#343438] bg-[#141416] p-5 hover:border-[#FF00FF] transition-colors group relative"
              >
                <div className="absolute top-2 left-2 text-[#B7FFB0] text-[10px]">⌜</div>
                <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-[10px]">⌟</div>

                <Link
                  to={`/products/${product.id}`}
                  className="block aspect-square bg-[#0A0A0C] border border-[#343438] overflow-hidden mb-4"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </Link>

                <div className="flex items-center justify-between mb-1">
                  <div className="text-[9px] tracking-[0.3em] uppercase text-[#99999F]">
                    #{String(product.id).padStart(3, '0')} / {pv.size}
                  </div>
                  <div className="text-[9px] tracking-[0.3em] uppercase text-[#FF00FF]">
                    {t.homeNew}
                  </div>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="block font-black text-sm text-[#F5F5F0] uppercase tracking-wide mb-3 font-sans hover:text-[#00FFFF] transition-colors"
                >
                  {product.name}
                </Link>

                <div className="flex items-center justify-between pt-3 border-t border-[#343438]">
                  <div className="font-black text-[#B7FFB0]">
                    {pv.price.toLocaleString('uk-UA')} ₴
                  </div>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="btn-svasya-outline !text-[9px] !py-1.5 !px-2.5"
                    title="Add to bag"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {t.homeBagShort}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 sm:hidden">
          <Link to="/products" className="btn-svasya-outline w-full justify-center">
            {t.homeWholeCatalog} ↗
          </Link>
        </div>
      </section>

      {/* MANIFEST */}
      <section className="mt-16 border border-[#343438] bg-[#101214] relative overflow-hidden">
        <div className="absolute top-2 left-3 text-[#FF00FF] text-xs">⌜</div>
        <div className="absolute bottom-2 right-3 text-[#FF00FF] text-xs">⌟</div>

        <div className="p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-3">
              // 01
            </div>
            <div className="font-black text-[#F5F5F0] text-lg uppercase mb-2 font-sans">
              {t.homeManifest1Title}
            </div>
            <p className="text-[#99999F] text-xs leading-relaxed">
              {t.homeManifest1Text}
            </p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-3">
              // 02
            </div>
            <div className="font-black text-[#F5F5F0] text-lg uppercase mb-2 font-sans">
              {t.homeManifest2Title}
            </div>
            <p className="text-[#99999F] text-xs leading-relaxed">
              {t.homeManifest2Text}
            </p>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-3">
              // 03
            </div>
            <div className="font-black text-[#F5F5F0] text-lg uppercase mb-2 font-sans">
              {t.homeManifest3Title}
            </div>
            <p className="text-[#99999F] text-xs leading-relaxed">
              {t.homeManifest3Text}
            </p>
          </div>
        </div>

        <div className="px-8 sm:px-12 pb-8 sm:pb-12">
          <Link to="/products" className="btn-svasya">
            {t.homeShopDrop} ↗
          </Link>
        </div>
      </section>

    </main>
  );
};