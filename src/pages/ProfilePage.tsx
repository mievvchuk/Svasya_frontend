import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Briefcase,
  Package,
  Edit3,
  Check,
  LogOut,
  ArrowRight
} from 'lucide-react';

interface MockOrder {
  id: number;
  date: string;
  items: string;
  total: number;
  status: 'Нове' | 'В обробці' | 'В дорозі' | 'Доставлено';
  customerName?: string;
}

const initialOrders: MockOrder[] = [
  {
    id: 15,
    date: '08.10.2026',
    items: 'White Hoodie (L) x1',
    total: 2800,
    status: 'В дорозі',
    customerName: 'Михайло Шевченко',
  },
  {
    id: 12,
    date: '02.10.2026',
    items: 'Alien T-shirt (M) x2, Olive Cap x1',
    total: 3850,
    status: 'Доставлено',
    customerName: 'Михайло Шевченко',
  },
  {
    id: 9,
    date: '25.09.2026',
    items: 'Tote Bag x1, Black Mug x1',
    total: 1100,
    status: 'Доставлено',
    customerName: 'Дарина Коваль',
  },
  {
    id: 8,
    date: '20.09.2026',
    items: 'White Hoodie (XL) x1',
    total: 2800,
    status: 'Доставлено',
    customerName: 'Іван Мельник',
  },
];

export const ProfilePage: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    switchRole,
    usersList,
    toggleUserRole,
    logout,
  } = useAuth();

  // Редагування профілю
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    city: currentUser.city || 'Київ',
    novaPoshta: currentUser.novaPoshta || 'Відділення №42',
  });
  const [saveNotice, setSaveNotice] = useState(false);

  // Менеджерські замовлення
  const [orders, setOrders] = useState<MockOrder[]>(initialOrders);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2500);
  };

  const handleStatusChange = (orderId: number, nextStatus: MockOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
    );
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* Верхня панель профілю з вибором активної ролі */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#343438] gap-4">
        <div>
          <div className="text-xs font-semibold text-[#00FFFF] tracking-widest uppercase flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#B7FFB0] inline-block animate-pulse"></span>
            <span>OPERATOR_TERMINAL // USER_ID #{currentUser.id}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#F5F5F0] uppercase font-sans">
            ОСОБИСТИЙ КАБІНЕТ
          </h1>
        </div>

        {/* Перемикач ролі для демонстрації дизайну */}
        <div className="flex flex-wrap items-center gap-2 bg-[#141416] p-1.5 border border-[#343438]">
          <span className="text-[10px] text-[#99999F] uppercase px-2">РОЛЬ:</span>
          <button
            type="button"
            onClick={() => switchRole('user')}
            className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentUser.role === 'user'
                ? 'bg-[#00FFFF] text-[#080808]'
                : 'text-[#99999F] hover:text-[#F5F5F0]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Користувач</span>
          </button>

          <button
            type="button"
            onClick={() => switchRole('manager')}
            className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentUser.role === 'manager'
                ? 'bg-[#B7FFB0] text-[#080808]'
                : 'text-[#99999F] hover:text-[#F5F5F0]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Менеджер</span>
          </button>

          <button
            type="button"
            onClick={() => switchRole('admin')}
            className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentUser.role === 'admin'
                ? 'bg-[#FF00FF] text-[#080808]'
                : 'text-[#99999F] hover:text-[#F5F5F0]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Адмін</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 1. БЛОК: ІНФОРМАЦІЯ ПРО ЗАМОВНИКА (РЕДАГУВАННЯ) */}
        <div className="lg:col-span-5 bg-[#141416] border border-[#343438] p-6 sm:p-8 relative">
          <div className="absolute top-2 left-2 text-[#B7FFB0] text-xs">⌜</div>
          <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-xs">⌟</div>

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#343438]">
            <h2 className="text-base font-bold text-[#F5F5F0] flex items-center gap-2 font-sans uppercase">
              <User className="w-4 h-4 text-[#00FFFF]" />
              <span>Дані покупця</span>
            </h2>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs text-[#00FFFF] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>[ РЕДАГУВАТИ ]</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-xs text-[#99999F] hover:text-[#F5F5F0]"
              >
                [ СКАСУВАТИ ]
              </button>
            )}
          </div>

          {saveNotice && (
            <div className="mb-4 p-3 bg-[#B7FFB0]/10 border border-[#B7FFB0] text-[#B7FFB0] text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Зміни профілю збережено!</span>
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[#99999F] block text-[10px] uppercase">CUSTOMER_NAME</span>
                <span className="text-sm font-bold text-[#F5F5F0]">{currentUser.name}</span>
              </div>
              <div>
                <span className="text-[#99999F] block text-[10px] uppercase">EMAIL_ADDRESS</span>
                <span className="text-sm text-[#F5F5F0]">{currentUser.email}</span>
              </div>
              <div>
                <span className="text-[#99999F] block text-[10px] uppercase">PHONE_NUMBER</span>
                <span className="text-sm text-[#F5F5F0]">{currentUser.phone}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#343438]">
                <div>
                  <span className="text-[#99999F] block text-[10px] uppercase">МІСТО</span>
                  <span className="text-xs text-[#F5F5F0]">{currentUser.city || 'Київ'}</span>
                </div>
                <div>
                  <span className="text-[#99999F] block text-[10px] uppercase">НОВА ПОШТА</span>
                  <span className="text-xs text-[#F5F5F0]">{currentUser.novaPoshta || 'Відділення №42'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#343438] flex items-center justify-between">
                <span className="text-[11px] text-[#99999F]">ПОТОЧНИЙ СТАТУС:</span>
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-[#FF00FF]/20 text-[#FF00FF] border border-[#FF00FF]">
                  {currentUser.role}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#99999F] text-[10px] uppercase mb-1">
                  CUSTOMER_NAME
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#99999F] text-[10px] uppercase mb-1">
                  EMAIL_ADDRESS
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#99999F] text-[10px] uppercase mb-1">
                  PHONE_NUMBER
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#99999F] text-[10px] uppercase mb-1">
                    МІСТО
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#99999F] text-[10px] uppercase mb-1">
                    НОВА ПОШТА
                  </label>
                  <input
                    type="text"
                    value={formData.novaPoshta}
                    onChange={(e) => setFormData({ ...formData, novaPoshta: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full btn-svasya py-2.5 text-xs">
                  ЗБЕРЕГТИ ЗМІНИ ↗
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#343438] flex justify-between items-center text-xs">
            <Link to="/cart" className="text-[#00FFFF] hover:underline flex items-center gap-1">
              <span>До кошика</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={logout}
              className="text-[#FF00FF] hover:underline flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Вийти</span>
            </button>
          </div>
        </div>

        {/* 2. ПРАВИЙ БЛОК: ЗАЛЕЖНО ВІД РОЛІ */}
        <div className="lg:col-span-7 space-y-8">
          {/* СЕКЦІЯ АДМІНА: КЕРУВАННЯ РОЛЯМИ (Зміна користувача на менеджера) */}
          {currentUser.role === 'admin' && (
            <div className="bg-[#141416] border border-[#FF00FF] p-6 sm:p-8 relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#343438]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#FF00FF]" />
                  <h2 className="text-base font-bold text-[#F5F5F0] uppercase font-sans">
                    Панель Адміністратора // Керування користувачами
                  </h2>
                </div>
                <span className="text-[10px] text-[#FF00FF] font-mono">[ ADMIN_ACCESS ]</span>
              </div>

              <p className="text-xs text-[#99999F] mb-4">
                Адміністратор може змінювати статус будь-якого простого користувача на менеджера та навпаки:
              </p>

              <div className="divide-y divide-[#343438] border border-[#343438] bg-[#080808]">
                {usersList.map((user) => (
                  <div
                    key={user.id}
                    className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#F5F5F0] flex items-center gap-2">
                        <span>{user.name}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 font-mono uppercase ${
                            user.role === 'admin'
                              ? 'bg-[#FF00FF]/20 text-[#FF00FF]'
                              : user.role === 'manager'
                              ? 'bg-[#B7FFB0]/20 text-[#B7FFB0]'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#99999F] mt-0.5">
                        {user.email} • {user.phone}
                      </div>
                    </div>

                    {user.role !== 'admin' && (
                      <button
                        type="button"
                        onClick={() => toggleUserRole(user.id)}
                        className={`px-3 py-1.5 text-xs font-semibold uppercase transition-all border self-start sm:self-auto ${
                          user.role === 'user'
                            ? 'border-[#B7FFB0] text-[#B7FFB0] hover:bg-[#B7FFB0]/10'
                            : 'border-[#99999F] text-[#99999F] hover:border-[#FF00FF] hover:text-[#FF00FF]'
                        }`}
                      >
                        {user.role === 'user' ? '⚡ Зробити Менеджером' : '↳ Зробити Користувачем'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* СЕКЦІЯ МЕНЕДЖЕРА: КЕРУВАННЯ ЗАМОВЛЕННЯМИ ВСІХ КЛІЄНТІВ */}
          {(currentUser.role === 'manager' || currentUser.role === 'admin') && (
            <div className="bg-[#141416] border border-[#B7FFB0] p-6 sm:p-8 relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#343438]">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#B7FFB0]" />
                  <h2 className="text-base font-bold text-[#F5F5F0] uppercase font-sans">
                    Панель Менеджера // Обробка замовлень
                  </h2>
                </div>
                <span className="text-[10px] text-[#B7FFB0] font-mono">[ MANAGER_FEED ]</span>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 bg-[#080808] border border-[#343438] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 font-bold text-[#F5F5F0]">
                        <span>Замовлення #{ord.id}</span>
                        <span className="text-[#99999F]">({ord.date})</span>
                      </div>
                      <div className="text-[11px] text-[#99999F] mt-0.5">
                        Клієнт: {ord.customerName} • {ord.items}
                      </div>
                      <div className="text-sm font-bold text-[#00FFFF] mt-1">
                        {ord.total} UAH
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          handleStatusChange(ord.id, e.target.value as MockOrder['status'])
                        }
                        className="px-3 py-1.5 bg-[#141416] border border-[#343438] text-[#F5F5F0] text-xs focus:outline-none focus:border-[#B7FFB0]"
                      >
                        <option value="Нове">Нове</option>
                        <option value="В обробці">В обробці</option>
                        <option value="В дорозі">В дорозі</option>
                        <option value="Доставлено">Доставлено</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* СЕКЦІЯ ЗВИЧАЙНОГО КОРИСТУВАЧА: ІСТОРІЯ ВЛАСНИХ ЗАМОВЛЕНЬ */}
          <div className="bg-[#141416] border border-[#343438] p-6 sm:p-8 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#343438]">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#00FFFF]" />
                <h2 className="text-base font-bold text-[#F5F5F0] uppercase font-sans">
                  Історія замовлень клієнта
                </h2>
              </div>
              <span className="text-[10px] text-[#99999F]">Всього: {orders.slice(0, 2).length}</span>
            </div>

            <div className="space-y-3">
              {orders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-[#080808] border border-[#343438] text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#F5F5F0]">
                      <span>Замовлення #{order.id}</span>
                      <span className="text-[#99999F]">від {order.date}</span>
                    </div>
                    <div className="text-[#99999F] mt-1">{order.items}</div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider mb-1 ${
                        order.status === 'В дорозі'
                          ? 'bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]'
                          : 'bg-[#B7FFB0]/20 text-[#B7FFB0] border border-[#B7FFB0]'
                      }`}
                    >
                      {order.status}
                    </span>
                    <div className="font-black text-sm text-[#F5F5F0]">
                      {order.total} UAH
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

