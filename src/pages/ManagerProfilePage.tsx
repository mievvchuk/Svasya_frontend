import React, { useState } from 'react';
import { useAuth, type MockOrder } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  User,
  ShieldCheck,
  Check,
  LogOut,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

export const ManagerProfilePage: React.FC = () => {
  const {
    currentUser,
    orders,
    updateOrderStatus,
    logout,
  } = useAuth();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<string | null>(null);

  const handleStatusChange = (orderId: number, nextStatus: MockOrder['status']) => {
    updateOrderStatus(orderId, nextStatus);
    setNotification(`Статус замовлення #${orderId} оновлено на "${nextStatus}"`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* Верхній навігаційний тулбар */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#343438] gap-4">
        <div>
          <div className="text-[10px] text-[#B7FFB0] tracking-widest uppercase mb-1 font-mono">
            STAFF_TERMINAL // MANAGER_ID: #{currentUser.id.toString().padStart(4, '0')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F0] tracking-tight uppercase font-sans">
            ПРОФІЛЬ МЕНЕДЖЕРА
          </h1>
          <p className="text-xs text-[#99999F] font-mono mt-1">
            Оператор: <span className="text-[#F5F5F0] font-bold">{currentUser.name}</span> ({currentUser.email})
          </p>
        </div>

        {/* Швидкі посилання на інші кабінети */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-[#99999F] uppercase tracking-wider mr-1 hidden sm:inline font-mono">
            ПЕРЕЙТИ В КАБІНЕТ:
          </span>
          <Link
            to="/profile"
            className="px-3 py-1.5 border border-[#343438] bg-[#141416] text-[#99999F] hover:text-[#00FFFF] hover:border-[#00FFFF] text-[11px] font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Користувач</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            to="/admin"
            className="px-3 py-1.5 border border-[#343438] bg-[#141416] text-[#99999F] hover:text-[#FF00FF] hover:border-[#FF00FF] text-[11px] font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Адміністратор</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 border border-[#343438] bg-[#141416] text-[#99999F] hover:text-[#FF4444] hover:border-[#FF4444] text-[11px] font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Вийти</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="mb-6 p-4 bg-[#B7FFB0]/10 border border-[#B7FFB0] text-[#B7FFB0] text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4" />
          <span>[ ОНОВЛЕНО ] {notification}</span>
        </div>
      )}

      {/* Панель Менеджера // Обробка замовлень (Дизайн зі скріншота із зеленою неоновою рамкою) */}
      <section className="bg-[#141416] border border-[#B7FFB0] p-6 sm:p-8 relative">
        <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
        <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#343438]">
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-[#B7FFB0]" />
            <h2 className="text-base sm:text-lg font-bold text-[#F5F5F0] uppercase tracking-wider font-mono">
              ПАНЕЛЬ МЕНЕДЖЕРА // ОБРОБКА ЗАМОВЛЕНЬ
            </h2>
          </div>
          <span className="text-xs text-[#B7FFB0] font-mono tracking-widest font-bold">
            [ MANAGER_FEED ]
          </span>
        </div>

        <p className="text-xs text-[#99999F] font-mono mb-6">
          Керуйте чергою та змінюйте статуси замовлень клієнтів у реальному часі:
        </p>

        {/* Список замовлень зі скріншота */}
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-5 bg-[#080808] border border-[#343438] hover:border-[#B7FFB0]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="text-sm font-bold text-[#F5F5F0] font-mono">
                  Замовлення #{ord.id} <span className="text-[#99999F] font-normal">({ord.date})</span>
                </div>
                <div className="text-xs text-[#99999F] font-mono">
                  Клієнт: <span className="text-[#F5F5F0]">{ord.customerName}</span> • {ord.items}
                </div>
                <div className="text-sm font-bold text-[#00FFFF] font-mono pt-1">
                  {ord.total} UAH
                </div>
              </div>

              {/* Селектор статусу замовлення */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select
                    value={ord.status}
                    onChange={(e) =>
                      handleStatusChange(
                        ord.id,
                        e.target.value as MockOrder['status']
                      )
                    }
                    className="appearance-none bg-[#141416] border border-[#343438] hover:border-[#B7FFB0] text-[#F5F5F0] text-xs font-mono py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#B7FFB0] cursor-pointer"
                  >
                    <option value="Нове">Нове</option>
                    <option value="В обробці">В обробці</option>
                    <option value="В дорозі">В дорозі</option>
                    <option value="Доставлено">Доставлено</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#99999F] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
export default ManagerProfilePage;
