import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#080808] text-[#F5F5F0] border-t border-[#343438] text-xs">
      {/* 3 обіцянки бренду з Figma */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 border-b border-[#343438]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <span className="text-[#00FFFF] text-lg">✦</span>
            <div>
              <div className="font-semibold text-sm text-[#F5F5F0] tracking-wide">
                FAST TRANSMISSION
              </div>
              <p className="text-[#99999F] mt-1 text-[11px] leading-relaxed">
                Nova Poshta in 1–3 business days. Reliable delivery across Ukraine.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-[#B7FFB0] text-lg">✦</span>
            <div>
              <div className="font-semibold text-sm text-[#F5F5F0] tracking-wide">
                BIG FIT. NO GUESSWORK.
              </div>
              <p className="text-[#99999F] mt-1 text-[11px] leading-relaxed">
                Oversized by design. Check the size guide before you commit.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="text-[#FF00FF] text-lg">✦</span>
            <div>
              <div className="font-semibold text-sm text-[#F5F5F0] tracking-wide">
                14 DAYS TO RECONSIDER
              </div>
              <p className="text-[#99999F] mt-1 text-[11px] leading-relaxed">
                Unworn, tags on? Send it back within 14 days. No interrogation required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Нижня частина футера з Figma */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#99999F] text-[11px]">
        <div className="flex items-center gap-3">
          <span className="font-black text-lg text-[#F5F5F0] font-sans">СВАСЬ®</span>
          <span>// INDEPENDENT. UKRAINIAN. UNHINGED.</span>
        </div>

        <div className="flex items-center gap-6">
          <span>© 2026 СВАСЬ. ALL RIGHTS RESERVED.</span>
          <span className="text-[#00FFFF]">[ EJECT ⏏ ]</span>
        </div>
      </div>
    </footer>
  );
};
