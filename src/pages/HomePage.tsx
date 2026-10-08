import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-20">
      <h1 className="text-4xl sm:text-7xl font-black text-[#F5F5F0] tracking-tight uppercase font-sans">
        СВАСЬ DROP
      </h1>
      <p className="text-[#99999F] text-xs sm:text-sm mt-4 max-w-lg leading-relaxed">
        For the chronically online. Not approved by anyone. Especially your parents.
      </p>
    </main>
  );
};