import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  User,
  Briefcase,
  Zap,
  ArrowDownRight,
  Check,
  LogOut,
  ArrowRight
} from 'lucide-react';

export const AdminProfilePage: React.FC = () => {
  const {
    currentUser,
    usersList,
    toggleUserRole,
    orders,
    logout,
  } = useAuth();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<string | null>(null);

  const handleToggle = (userId: number, currentRole: string, userName: string) => {
    toggleUserRole(userId);
    const targetRole = currentRole === 'user' ? 'Менеджера' : 'Користувача';
    setNotification(`Роль користувача "${userName}" змінено на: ${targetRole}`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const usersCount = usersList.filter((u) => u.role === 'user').length;
  const managersCount = usersList.filter((u) => u.role === 'manager').length;
  const adminsCount = usersList.filter((u) => u.role === 'admin').length;

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      {/* Верхній навігаційний тулбар */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-[#343438] gap-4">
        <div>
          <div className="text-[10px] text-[#FF00FF] tracking-widest uppercase mb-1 font-mono">
            ROOT_SECURITY // ADMIN_ID: #{currentUser.id.toString().padStart(4, '0')}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F0] tracking-tight uppercase font-sans">
            ПРОФІЛЬ АДМІНІСТРАТОРА
          </h1>
          <p className="text-xs text-[#99999F] font-mono mt-1">
            Адміністратор: <span className="text-[#F5F5F0] font-bold">{currentUser.name}</span> ({currentUser.email})
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
            to="/manager"
            className="px-3 py-1.5 border border-[#343438] bg-[#141416] text-[#99999F] hover:text-[#B7FFB0] hover:border-[#B7FFB0] text-[11px] font-mono tracking-wider transition-colors inline-flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Менеджер</span>
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
        <div className="mb-6 p-4 bg-[#FF00FF]/10 border border-[#FF00FF] text-[#FF00FF] text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4" />
          <span>[ СИСТЕМА ] {notification}</span>
        </div>
      )}

      {/* Метрики системи */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[#141416] border border-[#343438]">
          <div className="text-[10px] text-[#99999F] font-mono uppercase tracking-wider">
            Користувачі
          </div>
          <div className="text-xl font-black text-[#F5F5F0] font-mono mt-1">
            {usersCount}
          </div>
        </div>
        <div className="p-4 bg-[#141416] border border-[#343438]">
          <div className="text-[10px] text-[#99999F] font-mono uppercase tracking-wider">
            Менеджери
          </div>
          <div className="text-xl font-black text-[#B7FFB0] font-mono mt-1">
            {managersCount}
          </div>
        </div>
        <div className="p-4 bg-[#141416] border border-[#343438]">
          <div className="text-[10px] text-[#99999F] font-mono uppercase tracking-wider">
            Адміністратори
          </div>
          <div className="text-xl font-black text-[#FF00FF] font-mono mt-1">
            {adminsCount}
          </div>
        </div>
        <div className="p-4 bg-[#141416] border border-[#343438]">
          <div className="text-[10px] text-[#99999F] font-mono uppercase tracking-wider">
            Замовлень у черзі
          </div>
          <div className="text-xl font-black text-[#00FFFF] font-mono mt-1">
            {orders.length}
          </div>
        </div>
      </div>

      {/* Панель Адміністратора // Керування користувачами (Дизайн зі скріншота із рожевою неоновою рамкою) */}
      <section className="bg-[#141416] border border-[#FF00FF] p-6 sm:p-8 relative">
        <div className="absolute top-2 left-3 text-[#FF00FF] text-xs">⌜</div>
        <div className="absolute bottom-2 right-3 text-[#FF00FF] text-xs">⌟</div>

        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#343438]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#FF00FF]" />
            <h2 className="text-base sm:text-lg font-bold text-[#F5F5F0] uppercase tracking-wider font-mono">
              ПАНЕЛЬ АДМІНІСТРАТОРА // КЕРУВАННЯ КОРИСТУВАЧАМИ
            </h2>
          </div>
          <span className="text-xs text-[#FF00FF] font-mono tracking-widest font-bold">
            [ ADMIN_ACCESS ]
          </span>
        </div>

        <p className="text-xs text-[#99999F] font-mono mb-6">
          Адміністратор може змінювати статус будь-якого простого користувача на менеджера та навпаки:
        </p>

        {/* Список користувачів зі скріншота */}
        <div className="space-y-3">
          {usersList.map((user) => {
            const isAdmin = user.role === 'admin';
            const isManager = user.role === 'manager';

            return (
              <div
                key={user.id}
                className="p-5 bg-[#080808] border border-[#343438] hover:border-[#FF00FF]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#F5F5F0] font-mono">
                      {user.name}
                    </span>
                    <span
                      className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 tracking-wider ${
                        isAdmin
                          ? 'bg-[#FF00FF] text-[#080808]'
                          : isManager
                          ? 'bg-[#B7FFB0] text-[#080808]'
                          : 'bg-[#343438] text-[#F5F5F0]'
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-[#99999F] font-mono">
                    {user.email} • {user.phone}
                  </div>
                </div>

                {/* Дія для адміна: зміна ролі користувача на менеджера і навпаки */}
                <div>
                  {isAdmin ? (
                    <span className="text-[11px] text-[#99999F] font-mono uppercase tracking-wider">
                      [ ГОЛОВНИЙ АДМІНІСТРАТОР ]
                    </span>
                  ) : isManager ? (
                    <button
                      type="button"
                      onClick={() => handleToggle(user.id, user.role, user.name)}
                      className="w-full sm:w-auto px-4 py-2 border border-[#343438] bg-[#141416] hover:border-[#FF4444] text-[#F5F5F0] hover:text-[#FF4444] text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 font-bold"
                    >
                      <ArrowDownRight className="w-3.5 h-3.5" />
                      <span>↳ ЗРОБИТИ КОРИСТУВАЧЕМ</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleToggle(user.id, user.role, user.name)}
                      className="w-full sm:w-auto px-4 py-2 border border-[#B7FFB0] bg-[#141416] hover:bg-[#B7FFB0] text-[#B7FFB0] hover:text-[#080808] text-xs font-mono uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 font-bold"
                    >
                      <Zap className="w-3.5 h-3.5 fill-[#B7FFB0] hover:fill-[#080808]" />
                      <span>⚡ ЗРОБИТИ МЕНЕДЖЕРОМ</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
export default AdminProfilePage;
