import React, { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'uk' | 'en';

const STORAGE_KEY = 'cbacb_lang';

const dict = {
  uk: {
    banner: 'НЕЗАЛЕЖНИЙ МЕРЧ З УКРАЇНИ // БЕЗКОШТОВНА ДОСТАВКА ВІД 3000 ₴ // СВІТОВА ТРАНСЛЯЦІЯ',
    shop: 'SHOP THE DROP',
    lore: 'THE LORE',
    faq: 'SHIPPING / FAQ',
    bag: 'BAG',
    uaEn: 'UA / EN',

    footerTicker1: 'БЕЗ ТРЕНДІВ. ТІЛЬКИ ЛОР.',
    footerTicker2: 'НОСИ БРЕЙНРОТ.',
    footerTicker3: '100% ЛЮДИ. НІБИ ТО.',
    footerRights: 'ВСІ ПРАВА ЗАХИЩЕНО.',
    footerEject: '[ ВИЙТИ ⏏ ]',
    footerTagline: '// НЕЗАЛЕЖНІ. УКРАЇНСЬКІ. НЕСТРИМНІ.',

    homeVol: 'VOL. 001',
    homeTransmission: 'НЕСАНКЦІОНОВАНА ТРАНСЛЯЦІЯ',
    homeEst: 'EST. 2026',
    homeBadSignal: 'BAD SIGNAL.',
    homeGoodMerch: 'GOOD MERCH.',
    homeRecTagline: 'Для тих, хто завжди онлайн. Не схвалено ніким. Особливо твоїми батьками.',
    homeShopDrop: 'Shop The Drop',
    homeAddFeatured: '+ Додати Featured в кошик',
    homePlayTracking: 'PLAY / TRACKING: QUESTIONABLE',
    homeFeaturedFile: '[ Featured File ]',
    homeInStock: 'IN STOCK / LIMITED RUN',
    homeAbout: 'ABOUT',
    homeTheLore: 'THE LORE',
    homeLoreTitle1: 'DRESSED LIKE',
    homeLoreTitle2: 'A CORRUPTED FILE.',
    homeLoreText: 'CBACb — незалежний мерч-проєкт з України. Ми перетворюємо нічний інтернет-мотлох на речі, які можна носити на вулиці. Bootleg-енергія. Оригінальний арт. Нуль цікавості бути наступним великим брендом.',
    homeWelcome: 'ЛАСКАВО ПРОСИМО НА НЕПРАВИЛЬНІЙ СТОРОНІ ІНТЕРНЕТУ.',
    homeTags1: 'ORIGINAL ART',
    homeTags2: 'HEAVY FABRICS',
    homeTags3: 'SMALL RUNS',
    homeNextTransmission: '// НАСТУПНА ТРАНСЛЯЦІЯ',
    homeDropDesc: 'Ми не анонсуємо дати. Ми просто з\'являємось. Хочеш бути першим — підписуйся на канал і тримай сповіщення увімкненими.',
    homeGetNotified: 'ОТРИМАТИ СПОВІЩЕННЯ ПРО ДРОП',
    homeSignalLog: '// ЖУРНАЛ СИГНАЛУ',
    homeSignalLog1: 'Нова партія оверсайз худі вже на складі.',
    homeSignalLog2: 'Рестоку старих позицій не буде.',
    homeSignalLog3: 'Міжнародка запускається наступного місяця.',
    homeTransmitting: 'STATUS: TRANSMITTING...',
    homeInTheAir: '// В ЕФІРІ',
    homeStillOnAir: 'ЩЕ В ЕФІРІ',
    homeScrollMore: 'ГОРТАЙ ДАЛІ',
    homeWholeCatalog: 'ВЕСЬ КАТАЛОГ',
    homeNew: 'NEW',
    homeBagShort: 'BAG',
    homeManifest1Title: 'NO RESTOCKS',
    homeManifest1Text: 'Дроп виходить один раз. Не сподобалось — чекай наступний сезон. Ми не тримаємо склад заради твого спокою.',
    homeManifest2Title: 'MADE IN UKRAINE',
    homeManifest2Text: 'Все пошите локально. Ніяких "made in PRC" з красивою етикеткою. Тримаємо планку з 2026.',
    homeManifest3Title: 'SHIP WORLDWIDE',
    homeManifest3Text: 'Нова Пошта по Україні за 1–3 дні. Міжнародка — за домовленістю. Пиши в підтримку, ми не кусаємось.',
  },

  en: {
    banner: 'INDEPENDENT MERCH FROM UKRAINE // FREE SHIPPING ON ORDERS 3000+ UAH // WORLDWIDE TRANSMISSION',
    shop: 'SHOP THE DROP',
    lore: 'THE LORE',
    faq: 'SHIPPING / FAQ',
    bag: 'BAG',
    uaEn: 'EN / UA',

    footerTicker1: 'NO TRENDS. JUST LORE.',
    footerTicker2: 'WEAR THE BRAINROT.',
    footerTicker3: '100% HUMAN. ALLEGEDLY.',
    footerRights: 'ALL RIGHTS RESERVED.',
    footerEject: '[ EJECT ⏏ ]',
    footerTagline: '// INDEPENDENT. UKRAINIAN. UNHINGED.',

    homeVol: 'VOL. 001',
    homeTransmission: 'UNAUTHORIZED TRANSMISSION',
    homeEst: 'EST. 2026',
    homeBadSignal: 'BAD SIGNAL.',
    homeGoodMerch: 'GOOD MERCH.',
    homeRecTagline: 'For the chronically online. Not approved by anyone. Especially your parents.',
    homeShopDrop: 'Shop The Drop',
    homeAddFeatured: '+ Add Featured To Bag',
    homePlayTracking: 'PLAY / TRACKING: QUESTIONABLE',
    homeFeaturedFile: '[ Featured File ]',
    homeInStock: 'IN STOCK / LIMITED RUN',
    homeAbout: 'ABOUT',
    homeTheLore: 'THE LORE',
    homeLoreTitle1: 'DRESSED LIKE',
    homeLoreTitle2: 'A CORRUPTED FILE.',
    homeLoreText: 'CBACb is an independent merch project from Ukraine. We turn late-night internet debris into things you can wear outside. Bootleg energy. Original artwork. Zero interest in being the next big fashion thing.',
    homeWelcome: 'WELCOME TO THE WRONG SIDE OF THE INTERNET.',
    homeTags1: 'ORIGINAL ART',
    homeTags2: 'HEAVY FABRICS',
    homeTags3: 'SMALL RUNS',
    homeNextTransmission: '// NEXT TRANSMISSION',
    homeDropDesc: 'We don\'t announce dates. We just show up. Want to be first — subscribe and keep notifications on.',
    homeGetNotified: 'GET NOTIFIED WHEN IT DROPS',
    homeSignalLog: '// SIGNAL LOG',
    homeSignalLog1: 'New batch of oversized hoodies is in stock.',
    homeSignalLog2: 'No restocks on old items.',
    homeSignalLog3: 'International shipping launches next month.',
    homeTransmitting: 'STATUS: TRANSMITTING...',
    homeInTheAir: '// IN THE AIR',
    homeStillOnAir: 'STILL ON AIR',
    homeScrollMore: 'SCROLL FOR MORE',
    homeWholeCatalog: 'WHOLE CATALOG',
    homeNew: 'NEW',
    homeBagShort: 'BAG',
    homeManifest1Title: 'NO RESTOCKS',
    homeManifest1Text: 'Drop happens once. Didn\'t like it — wait for next season. We don\'t hold stock for your comfort.',
    homeManifest2Title: 'MADE IN UKRAINE',
    homeManifest2Text: 'Everything is sewn locally. No "made in PRC" with a pretty label. We\'ve kept the bar since 2026.',
    homeManifest3Title: 'SHIP WORLDWIDE',
    homeManifest3Text: 'Nova Poshta across Ukraine in 1–3 days. International — by arrangement. Write to support, we don\'t bite.',
  },
};

type Dict = typeof dict.uk;

interface LanguageContextValue {
  lang: Lang;
  t: Dict;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<ProviderProps> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'uk' || saved === 'en') return saved;
    } catch {}
    return 'uk';
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {}
  }, [lang]);

  const toggleLang = () => {
    setLangState((prev) => (prev === 'uk' ? 'en' : 'uk'));
  };

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
  };

  const value: LanguageContextValue = {
    lang,
    t: dict[lang],
    toggleLang,
    setLang,
  };

  return React.createElement(
    LanguageContext.Provider,
    { value },
    children
  );
};

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return ctx;
}