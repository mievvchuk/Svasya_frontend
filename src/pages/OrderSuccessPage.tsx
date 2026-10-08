import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import type { OrderResponse } from '../types/cart';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const order = (location.state as { order?: OrderResponse })?.order;

  const orderId = order?.id ?? 15;
  const totalPrice = order?.total_price ?? 2297;
  const status = order?.status ?? 'new';
  const createdAt = order?.created_at
    ? new Date(order.created_at).toLocaleString('uk-UA')
    : new Date().toLocaleString('uk-UA');

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24">
      {/* CRT монітор успішного замовлення */}
      <div className="max-w-2xl mx-auto bg-[#141416] border border-[#343438] p-8 sm:p-14 relative text-center">
        {/* Куточки в стилі Фігми */}
        <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
        <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

        {/* Статус запису */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#343438] text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF00FF] animate-ping"></span>
            <span className="text-[#FF00FF] font-bold">REC ● 00:00:01</span>
          </div>
          <span className="text-[#B7FFB0]">AV_1 / STATUS: CONFIRMED</span>
        </div>

        <div className="text-xs text-[#00FFFF] font-bold tracking-widest uppercase mb-2">
          TRANSMISSION SUCCESSFUL // 200 OK
        </div>

        {/* Головний слоган за ТЗ */}
        <h1 className="text-3xl sm:text-5xl font-black text-[#F5F5F0] tracking-tight uppercase mb-4 font-sans">
          СВАСЬ ВЖЕ В ДОРОЗІ
        </h1>

        <p className="text-[#99999F] text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Твій дроп зафіксовано на плівці. Менеджер уже готує пакування для швидкої відправки Новою Поштою.
        </p>

        {/* Табличка деталей замовлення */}
        <div className="bg-[#080808] border border-[#343438] p-6 max-w-md mx-auto text-left space-y-3 mb-8 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-[#343438]">
            <span className="text-[#99999F]">НОМЕР ЗАМОВЛЕННЯ:</span>
            <span className="text-[#F5F5F0] font-black text-sm">
              #{orderId}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#343438]">
            <span className="text-[#99999F]">СУМА ДО СПЛАТИ:</span>
            <span className="text-[#B7FFB0] font-black text-base">
              {totalPrice.toLocaleString('uk-UA')} UAH
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-[#343438]">
            <span className="text-[#99999F]">СТАТУС:</span>
            <span className="text-[#00FFFF] uppercase font-bold tracking-wider">
              {status}
            </span>
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#99999F] pt-1">
            <span>ДАТА ФІКСАЦІЇ:</span>
            <span>{createdAt}</span>
          </div>

          {order?.customer_name && (
            <div className="flex justify-between items-center text-[10px] text-[#99999F]">
              <span>ОТРИМУВАЧ:</span>
              <span className="text-[#F5F5F0] font-semibold">{order.customer_name}</span>
            </div>
          )}
        </div>

        {/* Кнопка повернення */}
        <div className="flex items-center justify-center">
          <Link to="/cart" className="btn-svasya">
            [ ПОВЕРНУТИСЯ ДО КОШИКА ↗ ]
          </Link>
        </div>
      </div>
    </main>
  );
};
