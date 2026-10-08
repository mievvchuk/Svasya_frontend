import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  Edit3,
  Check,
  LogOut,
  ArrowRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const {
    currentUser,
    updateProfile,
    orders,
    logout,
  } = useAuth();
  const navigate = useNavigate();

  // Редагування особистих даних
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    city: currentUser.city || 'Київ',
    novaPoshta: currentUser.novaPoshta || 'Відділення №42',
  });
  const [saveNotice, setSaveNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Фільтруємо замовлення для поточного користувача
  const userOrders = orders.filter(
    (o) =>
      o.customerEmail.toLowerCase() === currentUser.email.toLowerCase() ||
      o.customerName.toLowerCase() === currentUser.name.toLowerCase()
  );

  const displayOrders = userOrders.length > 0 ? userOrders : orders.slice(0, 2);

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* Навігаційний тулбар переходу між ролями/сторінками кабінету */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#343438] gap-4">
        <div>
          <div className="text-[10px] text-[#00FFFF] tracking-widest uppercase mb-1">
            CLIENT_TERMINAL // USER_ID: #{currentUser.id.toString().padStart(4, '0')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F0] tracking-tight uppercase font-sans">
            ПРОФІЛЬ КОРИСТУВАЧА
          </h1>
        </div>

        {/* Швидкі посилання на інші кабінети */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-[#99999F] uppercase tracking-wider mr-1 hidden sm:inline">
            ПЕРЕЙТИ В КАБІНЕТ:
          </span>
          <Link
            to="/manager"
            className="px-3 py-1.5 border border-[#343438] bg-[#141416] text-[#99999F] hover:text-[#B7FFB0] hover:border-[#B7FFB0] text-[11px] font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Менеджер</span>
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

      {saveNotice && (
        <div className="mb-6 p-4 bg-[#00FFFF]/10 border border-[#00FFFF] text-[#00FFFF] text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4" />
          <span>[ СИСТЕМА ] Інформацію користувача успішно збережено та оновлено!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ліва колонка: Інформація про замовника (з можливістю редагувати) */}
        <section className="lg:col-span-5 bg-[#141416] border border-[#00FFFF] p-6 relative flex flex-col justify-between">
          <div className="absolute top-2 left-3 text-[#00FFFF] text-xs">⌜</div>
          <div className="absolute bottom-2 right-3 text-[#00FFFF] text-xs">⌟</div>

          <div>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#343438]">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#00FFFF]" />
                <h2 className="text-sm font-bold text-[#F5F5F0] uppercase tracking-wider font-mono">
                  ІНФОРМАЦІЯ ПРО ЗАМОВНИКА
                </h2>
              </div>
              <span className="text-[10px] text-[#00FFFF] font-mono">[ USER_DATA ]</span>
            </div>

            {!isEditing ? (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-[#99999F] uppercase tracking-widest">
                    ПІБ / CUSTOMER_NAME:
                  </div>
                  <div className="text-sm font-semibold text-[#F5F5F0] mt-0.5">
                    {currentUser.name}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#99999F] uppercase tracking-widest">
                    ТЕЛЕФОН / PHONE:
                  </div>
                  <div className="text-sm text-[#F5F5F0] mt-0.5">
                    {currentUser.phone}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#99999F] uppercase tracking-widest">
                    EMAIL / TRANSMISSION:
                  </div>
                  <div className="text-sm text-[#F5F5F0] mt-0.5">
                    {currentUser.email}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#99999F] uppercase tracking-widest">
                    МІСТО ДОСТАВКИ:
                  </div>
                  <div className="text-sm text-[#F5F5F0] mt-0.5">
                    {formData.city}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-[#99999F] uppercase tracking-widest">
                    ВІДДІЛЕННЯ НОВОЇ ПОШТИ:
                  </div>
                  <div className="text-sm text-[#F5F5F0] mt-0.5">
                    {formData.novaPoshta}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[#343438] text-[#99999F]">
                    Роль: Простий користувач (Client)
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-[10px] text-[#99999F] uppercase mb-1">
                    ПІБ / CUSTOMER_NAME:
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#99999F] uppercase mb-1">
                    ТЕЛЕФОН / PHONE:
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#99999F] uppercase mb-1">
                    EMAIL:
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#99999F] uppercase mb-1">
                    МІСТО:
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#99999F] uppercase mb-1">
                    ВІДДІЛЕННЯ НОВОЇ ПОШТИ:
                  </label>
                  <input
                    type="text"
                    value={formData.novaPoshta}
                    onChange={(e) => setFormData({ ...formData, novaPoshta: e.target.value })}
                    className="w-full px-3 py-2 bg-[#080808] border border-[#343438] text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#00FFFF] text-[#080808] font-bold uppercase tracking-wider hover:bg-white transition-colors"
                  >
                    ЗБЕРЕГТИ ЗМІНИ
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-[#343438] text-[#99999F] hover:text-[#F5F5F0] uppercase tracking-wider transition-colors"
                  >
                    СКАСУВАТИ
                  </button>
                </div>
              </form>
            )}
          </div>

          {!isEditing && (
            <div className="pt-6 mt-6 border-t border-[#343438]">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 border border-[#00FFFF] text-[#00FFFF] bg-[#00FFFF]/5 hover:bg-[#00FFFF] hover:text-[#080808] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>[ РЕДАГУВАТИ ДАНІ ]</span>
              </button>
            </div>
          )}
        </section>

        {/* Права колонка: Історія замовлень клієнта */}
        <section className="lg:col-span-7 bg-[#141416] border border-[#343438] p-6 relative">
          <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
          <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#343438]">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#B7FFB0]" />
              <h2 className="text-sm font-bold text-[#F5F5F0] uppercase tracking-wider font-mono">
                ІСТОРІЯ ЗАМОВЛЕНЬ
              </h2>
            </div>
            <span className="text-[10px] text-[#B7FFB0] font-mono">[ ORDERS_HISTORY ]</span>
          </div>

          <div className="space-y-4">
            {displayOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 bg-[#080808] border border-[#343438] hover:border-[#00FFFF] transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#F5F5F0] font-mono">
                      Замовлення #{ord.id}
                    </span>
                    <span className="text-[10px] text-[#99999F] font-mono">
                      ({ord.date})
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 border ${
                      ord.status === 'Доставлено'
                        ? 'border-[#B7FFB0] text-[#B7FFB0] bg-[#B7FFB0]/10'
                        : ord.status === 'В дорозі'
                        ? 'border-[#00FFFF] text-[#00FFFF] bg-[#00FFFF]/10'
                        : 'border-[#FF00FF] text-[#FF00FF] bg-[#FF00FF]/10'
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="text-xs text-[#99999F] font-mono mb-3">
                  {ord.items}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1C1C1F]">
                  <span className="text-[10px] text-[#99999F] font-mono uppercase">
                    Сума до сплати:
                  </span>
                  <span className="text-sm font-bold text-[#00FFFF] font-mono">
                    {ord.total} UAH
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-[#343438] text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs text-[#99999F] hover:text-[#00FFFF] font-mono transition-colors uppercase tracking-wider"
            >
              <span>[ Перейти до каталогу мерчу ]</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};
export default UserProfilePage;
