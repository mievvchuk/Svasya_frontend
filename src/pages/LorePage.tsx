import React from 'react';
import { Link } from 'react-router-dom';

export const LorePage: React.FC = () => {
  const chapters = [
    {
      year: '2018',
      title: 'ПЕРШИЙ ДРУК',
      text: 'Перший принт зробили на кухні в панельці. 12 футболок, з них 8 — брак. Дві продали, одну носимо досі. Тоді ще не знали, що це стане брендом.',
    },
    {
      year: '2024',
      title: 'ПЕРШИЙ ДРОП',
      text: 'Перший офіційний дроп розлетівся за 4 дні. Без реклами, без інфлюенсерів, без бюджету. Тільки сарафанне радіо і люди, яким сподобалось.',
    },
    {
      year: '2026',
      title: 'BOOTLEG DEPT.',
      text: 'Тепер нас читають у 14 країнах. Ми не робимо "колекції". Ми робимо речі, які хочемо носити самі. Решта — не наша проблема.',
    },
  ];

  const rules = [
    {
      num: '01',
      title: 'NO RESTOCKS',
      text: 'Дроп виходить один раз. Продали — молодці. Не встиг — чекай наступний сезон.',
    },
    {
      num: '02',
      title: 'NO INFLUENCERS',
      text: 'Ми не платимо за згадки. Якщо наш мерч носять — то тому що хочуть, а не тому що заплатили.',
    },
    {
      num: '03',
      title: 'NO APOLOGIES',
      text: 'Ми не вибачаємось за ціни, за дизайн, за те, що не подобаємось. Це мерч, а не психотерапія.',
    },
    {
      num: '04',
      title: 'NO DISCOUNTS',
      text: 'Знижок не буде. Ні на чорну пʼятницю, ні на день народження. Ціна одна для всіх.',
    },
  ];

  const dontCare = [
    'МОДНІ ТРЕНДИ',
    'АЛГОРИТМИ',
    'СТАЛИЙ РОЗВИТОК',
  ];

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">

      <section className="relative border border-[#343438] bg-[#0A0A0C] p-8 sm:p-16 overflow-hidden">
        <div className="absolute top-3 left-3 text-[#B7FFB0] text-xs">⌜</div>
        <div className="absolute bottom-3 right-3 text-[#B7FFB0] text-xs">⌟</div>

        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(circle, #00FFFF 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative">
          <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-6">
            FILE 001 <span className="text-[#FF00FF] mx-2">/</span>
            ACCESS GRANTED <span className="text-[#FF00FF] mx-2">/</span>
            READ AT YOUR OWN RISK
          </div>

          <h1 className="font-black font-sans tracking-tighter uppercase text-[#F5F5F0] text-4xl sm:text-6xl lg:text-7xl leading-none mb-6">
            THE LORE<span className="text-[#FF00FF]">.</span><br />
            WE DON'T DO FASHION.
          </h1>

          <p className="text-[#99999F] text-sm sm:text-base leading-relaxed max-w-2xl">
            CBACb — це не бренд. Це спосіб сказати "мені насрати на твої тренди"
            через одяг. Ми беремо дивне, смішне і забуте з інтернету і робимо
            з цього речі, які хочеться носити.
          </p>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase mb-8">
          <span className="text-[#00FFFF]">01</span>
          <span className="text-[#99999F]">/</span>
          <span className="text-[#F5F5F0]">HOW IT STARTED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chapters.map((ch) => (
            <div
              key={ch.year}
              className="border border-[#343438] bg-[#141416] p-6 relative hover:border-[#FF00FF] transition-colors group"
            >
              <div className="absolute top-2 left-2 text-[#B7FFB0] text-[10px]">⌜</div>
              <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-[10px]">⌟</div>

              <div className="font-black text-[#FF00FF] text-3xl sm:text-4xl font-sans tracking-tighter mb-4">
                {ch.year}
              </div>
              <div className="font-black text-[#F5F5F0] text-sm uppercase tracking-wider mb-3 font-sans">
                {ch.title}
              </div>
              <p className="text-[#99999F] text-xs leading-relaxed">
                {ch.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase mb-8">
          <span className="text-[#00FFFF]">02</span>
          <span className="text-[#99999F]">/</span>
          <span className="text-[#F5F5F0]">THE RULES</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rules.map((r) => (
            <div
              key={r.num}
              className="border border-[#343438] bg-[#101214] p-6 flex gap-5 hover:border-[#00FFFF] transition-colors relative"
            >
              <div className="absolute top-2 left-2 text-[#FF00FF] text-[10px]">⌜</div>
              <div className="absolute bottom-2 right-2 text-[#FF00FF] text-[10px]">⌟</div>

              <div className="font-black text-[#B7FFB0] text-3xl font-sans tabular-nums leading-none">
                {r.num}
              </div>
              <div>
                <div className="font-black text-[#F5F5F0] text-sm uppercase tracking-wider mb-2 font-sans">
                  {r.title}
                </div>
                <p className="text-[#99999F] text-xs leading-relaxed">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20 border border-[#343438] bg-[#141416] p-8 sm:p-16 relative overflow-hidden">
        <div className="absolute top-3 left-3 text-[#FF00FF] text-xs">⌜</div>
        <div className="absolute bottom-3 right-3 text-[#FF00FF] text-xs">⌟</div>

        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent 2px,
              rgba(71, 75, 75, 0.3) 15px
            )`,
          }}
        />

        <div className="relative text-center">
          <div className="text-[10px] tracking-[0.35em] uppercase text-[#FF00FF] mb-6">
            // 03 / MANIFESTO
          </div>
          <blockquote className="font-black font-sans tracking-tight uppercase text-[#F5F5F0] text-2xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-4xl mx-auto">
            "WE DON'T SELL CLOTHES.<br />
            WE SELL <span className="text-[#FF00FF]">A BAD DECISION</span><br />
            THAT LOOKS GOOD ON YOU."
          </blockquote>
          <div className="mt-8 text-[10px] tracking-[0.35em] uppercase text-[#99999F]">
            — CBACb MANIFESTO, 2026
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase mb-8">
          <span className="text-[#00FFFF]">04</span>
          <span className="text-[#99999F]">/</span>
          <span className="text-[#F5F5F0]">WE DON'T CARE ABOUT</span>
        </div>

        <div className="border border-[#343438] bg-[#0A0A0C] divide-y divide-[#343438]">
          {dontCare.map((item, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 flex items-center justify-between hover:bg-[#141416] transition-colors group"
            >
              <div className="font-black font-sans tracking-tight uppercase text-[#F5F5F0] text-xl sm:text-3xl group-hover:text-[#FF00FF] transition-colors">
                {item}
              </div>
              <div className="text-[#99999F] text-xs tracking-[0.3em] uppercase hidden sm:block">
                / SKIP
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 sm:mt-20 border border-[#343438] bg-[#101214] p-8 sm:p-12 relative">
        <div className="absolute top-3 left-3 text-[#B7FFB0] text-xs">⌜</div>
        <div className="absolute bottom-3 right-3 text-[#B7FFB0] text-xs">⌟</div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-3">
              // 05 / NEXT STEP
            </div>
            <h3 className="font-black font-sans tracking-tight uppercase text-[#F5F5F0] text-2xl sm:text-3xl">
              ЧИТАВ ДОСТАТНЬО.<br />
              <span className="text-[#FF00FF]">ТЕПЕР КУПИ ЩОСЬ.</span>
            </h3>
          </div>
          <Link to="/products" className="btn-svasya">
            Shop The Drop ↗
          </Link>
        </div>
      </section>

    </main>
  );
};