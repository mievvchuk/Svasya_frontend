import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Truck, Globe, MapPin } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  const shipping = [
    {
      icon: Truck,
      title: 'NOVA POSHTA',
      subtitle: 'Ukraine',
      price: '1–3 дні',
      details: 'Доставка у відділення або курʼєром. Від 80 ₴, безкоштовно від 3000 ₴.',
    },
    {
      icon: Globe,
      title: 'INTERNATIONAL',
      subtitle: 'Worldwide',
      price: '7–21 день',
      details: 'Укрпошта або Nova Post Global. Від 450 ₴ залежно від країни.',
    },
    {
      icon: MapPin,
      title: 'PICKUP',
      subtitle: 'Kyiv',
      price: 'Same day',
      details: 'Самовивіз у Києві, вул. Хрещатик. За домовленістю в Telegram.',
    },
  ];

  const faq: FaqItem[] = [
    {
      q: 'Скільки йде доставка по Україні?',
      a: '1–3 робочі дні Новою Поштою. Зазвичай — наступний день після відправки. Відправляємо щодня о 14:00, крім вихідних.',
    },
    {
      q: 'Чи можна повернути товар?',
      a: 'Так, протягом 14 днів з моменту отримання. Умови: товар не ношений, бирки на місці, без слідів використання. Повернення — Новою Поштою за наш рахунок, якщо брак наш.',
    },
    {
      q: 'Як вибрати розмір?',
      a: 'Всі речі — оверсайз. Якщо любиш вільніше — бери свій звичайний. Якщо приталено — на розмір менше. Детальна таблиця на кожній картці товару.',
    },
    {
      q: 'Чи є знижки або промокоди?',
      a: 'Ні. Ми не робимо знижок — ні на чорну пʼятницю, ні на свята. Ціна одна для всіх. Це принцип, а не жадібність.',
    },
    {
      q: 'Коли наступний дроп?',
      a: 'Ми не анонсуємо дати. Дроп зʼявляється несподівано, без попереджень. Слідкуй за Telegram-каналом — там першими.',
    },
    {
      q: 'Чи можна замовити кастомний принт?',
      a: 'Не зараз. Ми робимо тільки свої дизайни. Можливо, колись відкриємо кастом — але не в 2026.',
    },
    {
      q: 'Що робити, якщо прийшов брак?',
      a: 'Напиши в Telegram або на пошту протягом 3 днів. Скинь фото — замінимо або повернемо гроші. Без зайвих питань.',
    },
    {
      q: 'Чи доставляєте в окупацію?',
      a: 'Ні. Працюємо тільки з підконтрольною Україною та міжнародкою. Нова Пошта сама не возить туди — і ми тим паче.',
    },
  ];

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">

      {/* ============ HERO ============ */}
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
            FILE 002 <span className="text-[#FF00FF] mx-2">/</span>
            SHIPPING & FAQ <span className="text-[#FF00FF] mx-2">/</span>
            READ BEFORE ASKING
          </div>

          <h1 className="font-black font-sans tracking-tighter uppercase text-[#F5F5F0] text-4xl sm:text-6xl lg:text-7xl leading-none mb-6">
            SHIPPING<span className="text-[#FF00FF]">.</span><br />
            FAQ<span className="text-[#00FFFF]">.</span>
          </h1>

          <p className="text-[#99999F] text-sm sm:text-base leading-relaxed max-w-2xl">
            Усе, що треба знати перед покупкою. Якщо тут немає відповіді на твоє
            питання — напиши в Telegram, ми не кусаємось.
          </p>
        </div>
      </section>

      {/* ============ SHIPPING OPTIONS ============ */}
      <section className="mt-16 sm:mt-20">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase mb-8">
          <span className="text-[#00FFFF]">01</span>
          <span className="text-[#99999F]">/</span>
          <span className="text-[#F5F5F0]">SHIPPING OPTIONS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shipping.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className="border border-[#343438] bg-[#141416] p-6 relative hover:border-[#FF00FF] transition-colors group"
              >
                <div className="absolute top-2 left-2 text-[#B7FFB0] text-[10px]">⌜</div>
                <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-[10px]">⌟</div>

                <Icon className="w-6 h-6 text-[#FF00FF] mb-4" />

                <div className="font-black text-[#F5F5F0] text-lg uppercase tracking-wider font-sans mb-1">
                  {s.title}
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[#99999F] mb-4">
                  {s.subtitle}
                </div>

                <div className="font-black text-[#B7FFB0] text-xl mb-4">
                  {s.price}
                </div>

                <p className="text-[#99999F] text-xs leading-relaxed">
                  {s.details}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mt-16 sm:mt-20">
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] uppercase mb-8">
          <span className="text-[#00FFFF]">02</span>
          <span className="text-[#99999F]">/</span>
          <span className="text-[#F5F5F0]">FREQUENTLY ASKED</span>
        </div>

        <div className="border border-[#343438] divide-y divide-[#343438] bg-[#0A0A0C]">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-6 sm:p-8 text-left hover:bg-[#141416] transition-colors group"
                >
                  <div className="flex items-start gap-5">
                    <span className="text-[#FF00FF] text-[10px] tracking-[0.3em] font-bold pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-black font-sans tracking-tight uppercase text-sm sm:text-base transition-colors ${
                        isOpen ? 'text-[#00FFFF]' : 'text-[#F5F5F0] group-hover:text-[#FF00FF]'
                      }`}
                    >
                      {item.q}
                    </span>
                  </div>
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center border border-[#343438] group-hover:border-[#FF00FF] transition-colors">
                    {isOpen ? (
                      <Minus className="w-3 h-3 text-[#FF00FF]" />
                    ) : (
                      <Plus className="w-3 h-3 text-[#99999F] group-hover:text-[#FF00FF]" />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                    <div className="pl-0 sm:pl-10 text-[#99999F] text-xs sm:text-sm leading-relaxed max-w-3xl">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mt-16 sm:mt-20 border border-[#343438] bg-[#101214] p-8 sm:p-12 relative">
        <div className="absolute top-3 left-3 text-[#B7FFB0] text-xs">⌜</div>
        <div className="absolute bottom-3 right-3 text-[#B7FFB0] text-xs">⌟</div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-[#99999F] mb-3">
              // 03 / STILL HAVE QUESTIONS?
            </div>
            <h3 className="font-black font-sans tracking-tight uppercase text-[#F5F5F0] text-2xl sm:text-3xl">
              ПИШИ В <span className="text-[#00FFFF]">TELEGRAM</span>.<br />
              МИ ВІДПОВІДАЄМО ШВИДКО.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://t.me/+7ZTcKRZgYyxmYmFi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-svasya"
            >
              Telegram ↗
            </a>
            <Link to="/products" className="btn-svasya-outline">
              Shop The Drop ↗
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
};