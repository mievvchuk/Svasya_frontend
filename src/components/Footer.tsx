import React from 'react';

export const Footer: React.FC = () => {
  const ticker = [
    'NO TRENDS. JUST LORE.',
    'WEAR THE BRAINROT.',
    '100% HUMAN. ALLEGEDLY.',
    'NO TRENDS. JUST LORE.',
    'WEAR THE BRAINROT.',
    '100% HUMAN. ALLEGEDLY.',
  ];

  return (
    <footer className="mt-auto bg-[#080808] border-t border-[#343438]">
      <div className="overflow-hidden py-4 border-b border-[#343438]">
        <div className="marquee-track text-[11px] tracking-[0.3em] uppercase text-[#99999F]">
          {ticker.concat(ticker).map((t, i) => (
            <span key={i} className="px-6 inline-flex items-center gap-6 whitespace-nowrap">
              {t}
              <span className="text-[#FF00FF]">✕</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.25em] uppercase text-[#99999F]">
        <div className="flex items-center gap-3">
          <span className="font-black text-sm text-[#F5F5F0] font-sans">CBACb®</span>
          <span>// Independent. Ukrainian. Unhinged.</span>
        </div>
        <div className="flex items-center gap-6">
          <span>© 2026 CBACb. All Rights Reserved.</span>
          <span className="text-[#00FFFF]">[ EJECT ⏏️ ]</span>
        </div>
      </div>
    </footer>
  );
};
