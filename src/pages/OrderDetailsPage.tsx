import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth, type MockOrder } from '../context/AuthContext';
import {
  ArrowLeft,
  Package,
  User,
  Truck,
  Check,
  ChevronDown
} from 'lucide-react';

export const OrderDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, updateOrderStatus, currentUser } = useAuth();
  const orderId = Number(id);

  const order = orders.find((o) => o.id === orderId) || orders[0];
  const [notification, setNotification] = useState<string | null>(null);

  const handleStatusChange = (nextStatus: MockOrder['status']) => {
    updateOrderStatus(order.id, nextStatus);
    setNotification(`Статус замовлення оновлено на "${nextStatus}"`);
    setTimeout(() => setNotification(null), 3000);
  };

  const backUrl = currentUser.role === 'manager' ? '/manager' : currentUser.role === 'admin' ? '/admin' : '/profile';

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* Кнопка назад */}
      <div className="mb-6">
        <Link
          to={backUrl}
          className="inline-flex items-center text-xs text-[#99999F] hover:text-[#00FFFF] transition-colors gap-2 font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ НАЗАД ДО СПИСКУ ЗАМОВЛЕНЬ ]</span>
        </Link>
      </div>

      {notification && (
        <div className="mb-6 p-4 bg-[#B7FFB0]/10 border border-[#B7FFB0] text-[#B7FFB0] text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4" />
          <span>[ ОНОВЛЕНО ] {notification}</span>
        </div>
      )}

      {/* Головна картка замовлення */}
      <div className="bg-[#141416] border border-[#B7FFB0] p-6 sm:p-10 relative">
        <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
        <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

        {/* Заголовок замовлення */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#343438] gap-4">
          <div>
            <div className="text-[10px] text-[#B7FFB0] tracking-widest uppercase mb-1 font-mono">
              ORDER_SPECIFICATION // ID: #{order.id.toString().padStart(4, '0')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F0] tracking-tight uppercase font-sans">
              ЗАМОВЛЕННЯ #{order.id}
            </h1>
            <div className="text-xs text-[#99999F] font-mono mt-1">
              Дата оформлення: <span className="text-[#F5F5F0]">{order.date}</span>
            </div>
          </div>

          {/* Керування статусом замовлення */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#99999F] font-mono uppercase tracking-wider hidden sm:inline">
              СТАТУС:
            </span>
            <div className="relative">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e.target.value as MockOrder['status'])}
                className="appearance-none bg-[#080808] border border-[#B7FFB0] text-[#B7FFB0] text-xs font-mono font-bold py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[#B7FFB0] cursor-pointer"
              >
                <option value="Нове">Нове</option>
                <option value="В обробці">В обробці</option>
                <option value="В дорозі">В дорозі</option>
                <option value="Доставлено">Доставлено</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#B7FFB0] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Інформація про замовника та доставку */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Дані клієнта */}
          <div className="p-5 bg-[#080808] border border-[#343438]">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1C1C1F]">
              <User className="w-4 h-4 text-[#00FFFF]" />
              <h3 className="text-xs font-bold text-[#F5F5F0] uppercase tracking-wider font-mono">
                КЛІЄНТ // CUSTOMER_DATA
              </h3>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-[#99999F]">ПІБ:</span>{' '}
                <span className="text-[#F5F5F0] font-bold">{order.customerName}</span>
              </div>
              <div>
                <span className="text-[#99999F]">Email:</span>{' '}
                <span className="text-[#F5F5F0]">{order.customerEmail}</span>
              </div>
              <div>
                <span className="text-[#99999F]">Телефон:</span>{' '}
                <span className="text-[#F5F5F0]">+38 (099) 123-45-67</span>
              </div>
            </div>
          </div>

          {/* Доставка та оплата */}
          <div className="p-5 bg-[#080808] border border-[#343438]">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#1C1C1F]">
              <Truck className="w-4 h-4 text-[#B7FFB0]" />
              <h3 className="text-xs font-bold text-[#F5F5F0] uppercase tracking-wider font-mono">
                ДОСТАВКА ТА ОПЛАТА
              </h3>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div>
                <span className="text-[#99999F]">Перевізник:</span>{' '}
                <span className="text-[#F5F5F0]">Нова Пошта (Київ, Відділення №42)</span>
              </div>
              <div>
                <span className="text-[#99999F]">Спосіб оплати:</span>{' '}
                <span className="text-[#F5F5F0]">Онлайн картою (LiqPay / Apple Pay)</span>
              </div>
              <div>
                <span className="text-[#99999F]">Статус оплати:</span>{' '}
                <span className="text-[#B7FFB0] font-bold">[ ОПЛАЧЕНО УСПІШНО ]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Склад замовлення */}
        <div className="mb-8">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#343438]">
            <Package className="w-4 h-4 text-[#FF00FF]" />
            <h3 className="text-xs font-bold text-[#F5F5F0] uppercase tracking-wider font-mono">
              ТОВАРИ В ЗАМОВЛЕННІ // ORDER_ITEMS
            </h3>
          </div>

          <div className="p-5 bg-[#080808] border border-[#343438] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1F]">
              <div>
                <div className="text-sm font-bold text-[#F5F5F0] font-mono">
                  {order.items}
                </div>
                <div className="text-xs text-[#99999F] font-mono mt-0.5">
                  SKU: CBAC-MERCH-{order.id} • Преміум бавовна
                </div>
              </div>
              <div className="text-sm font-bold text-[#00FFFF] font-mono">
                {order.total} UAH
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs font-mono">
              <span className="text-[#99999F]">Доставка:</span>
              <span className="text-[#B7FFB0]">БЕЗКОШТОВНО (Акція 3000+)</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#343438]">
              <span className="text-sm font-bold text-[#F5F5F0] uppercase font-mono">
                РАЗОМ ДО СПЛАТИ:
              </span>
              <span className="text-xl font-black text-[#00FFFF] font-mono">
                {order.total} UAH
              </span>
            </div>
          </div>
        </div>

        {/* Нижня панель дій */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#343438]">
          <Link
            to={backUrl}
            className="w-full sm:w-auto px-6 py-2.5 border border-[#343438] hover:border-[#00FFFF] text-xs font-mono text-[#99999F] hover:text-[#00FFFF] transition-colors uppercase tracking-wider text-center"
          >
            [ ↵ НАЗАД ДО СПИСКУ ЗАМОВЛЕНЬ ]
          </Link>

          <button
            type="button"
            onClick={() => handleStatusChange('Доставлено')}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#B7FFB0] hover:bg-white text-[#080808] text-xs font-mono font-bold uppercase tracking-wider transition-colors text-center"
          >
            ПОЗНАЧИТИ ЯК ДОСТАВЛЕНО ✓
          </button>
        </div>
      </div>
    </main>
  );
};
export default OrderDetailsPage;
