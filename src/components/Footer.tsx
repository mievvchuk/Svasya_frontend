import React from 'react';
import { useLang } from '../i18n/useLang';

export const Footer: React.FC = () => {
  const { t } = useLang();

  const ticker = [
    t.footerTicker1,
    t.footerTicker2,
    t.footerTicker3,
    t.footerTicker1,
    t.footerTicker2,
    t.footerTicker3,
  ];

  return (
    <footer className="mt-auto bg-[#080808] border-t border-[#343438]">
      {/* Marquee ticker */}
      <div className="overflow-hidden py-4 border-b border-[#343438]">
        <div className="marquee-track text-[11px] tracking-[0.3em] uppercase text-[#99999F]">
          {ticker.concat(ticker).map((txt, i) => (
            <span key={i} className="px-6 inline-flex items-center gap-6 whitespace-nowrap">
              {txt}
              <span className="text-[#FF00FF]">✕</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.25em] uppercase text-[#99999F]">
        <div className="flex items-center gap-3">
          <span className="font-black text-sm text-[#F5F5F0] font-sans">CBACb®</span>
          <span>{t.footerTagline}</span>
        </div>
        <div className="flex items-center gap-6">
          <span>© 2026 CBACb. {t.footerRights}</span>
          <span className="text-[#00FFFF]">{t.footerEject}</span>
        </div>
      </div>
    </footer>
  );
};