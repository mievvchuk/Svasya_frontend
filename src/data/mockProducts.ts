import type { Product } from '../types/cart';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'СВАСЬ Hoodie Classic',
    description: 'Легендарне фірмове худі "СВАСЬ" із щільної тринитки з начісом. Оверсайз крій, глибокий капюшон та фірмова вишивка.',
    base_price: 999,
    imageUrl: '/images/t-shirt.png',
    variants: [
      { id: 1, product_id: 1, color: 'forest_green', size: 'S', price: 999 },
      { id: 2, product_id: 1, color: 'forest_green', size: 'M', price: 999 },
      { id: 5, product_id: 1, color: 'forest_green', size: 'L', price: 999 },
      { id: 6, product_id: 1, color: 'deep_black', size: 'M', price: 999 },
      { id: 7, product_id: 1, color: 'deep_black', size: 'L', price: 999 },
      { id: 8, product_id: 1, color: 'deep_black', size: 'XL', price: 1099 },
    ],
  },
  {
    id: 2,
    name: 'СВАСЬ Oversize T-Shirt',
    description: 'Базова футболка з преміальної 100% бавовни (220 г/м²). Стійкий шевронний принт СВАСЬ на грудях.',
    base_price: 599,
    imageUrl: '/images/cap.jpg',
    variants: [
      { id: 11, product_id: 2, color: 'pure_white', size: 'M', price: 599 },
      { id: 12, product_id: 2, color: 'pure_white', size: 'L', price: 599 },
      { id: 13, product_id: 2, color: 'stealth_black', size: 'M', price: 599 },
      { id: 14, product_id: 2, color: 'stealth_black', size: 'L', price: 599 },
    ],
  },
  {
    id: 3,
    name: 'СВАСЬ Cargo Pants',
    description: 'Зручні штани-карго з міцного ріп-стопу з великою кількістю кишень та регульованими манжетами.',
    base_price: 1299,
    imageUrl: '/images/hoodie.png',
    variants: [
      { id: 21, product_id: 3, color: 'olive', size: 'M', price: 1299 },
      { id: 22, product_id: 3, color: 'olive', size: 'L', price: 1299 },
      { id: 23, product_id: 3, color: 'black', size: 'L', price: 1299 },
    ],
  },
  {
    id: 4,
    name: 'СВАСЬ Beanie Hat',
    description: 'Тепла вʼязана шапка з відворотом та мінімалістичним патчем СВАСЬ.',
    base_price: 349,
    imageUrl: '/images/t-shirt.png',
    variants: [
      { id: 31, product_id: 4, color: 'graphite', size: 'ONE SIZE', price: 349 },
      { id: 32, product_id: 4, color: 'forest_green', size: 'ONE SIZE', price: 349 },
    ],
  },
];