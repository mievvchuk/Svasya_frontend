import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, type UserRole } from '../context/AuthContext';
import { ArrowLeft, User, ShieldCheck, Briefcase } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('Михайло');
  const [email, setEmail] = useState('mikhail@gmail.com');
  const [phone, setPhone] = useState('+380991234567');
  const [password, setPassword] = useState('********');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      updateProfile({ name, email, phone, role: 'user' });
    }
    login();
    navigate('/profile');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    login(role);
    navigate('/profile');
  };

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-20">
      <div className="mb-6">
        <Link
          to="/cart"
          className="inline-flex items-center text-xs text-[#99999F] hover:text-[#00FFFF] transition-colors gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ НАЗАД ДО КОШИКА ]</span>
        </Link>
      </div>

      <div className="max-w-xl mx-auto bg-[#141416] border border-[#343438] p-6 sm:p-10 relative">
        <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
        <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

        {/* Перемикач вкладок Вхід / Реєстрація */}
        <div className="flex border-b border-[#343438] mb-8">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-all ${
              mode === 'login'
                ? 'text-[#FF00FF] border-b-2 border-[#FF00FF] bg-[#FF00FF]/5'
                : 'text-[#99999F] hover:text-[#F5F5F0]'
            }`}
          >
            [ ВХІД // SIGN IN ]
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-3 text-xs font-bold tracking-widest uppercase transition-all ${
              mode === 'register'
                ? 'text-[#00FFFF] border-b-2 border-[#00FFFF] bg-[#00FFFF]/5'
                : 'text-[#99999F] hover:text-[#F5F5F0]'
            }`}
          >
            [ РЕЄСТРАЦІЯ // SIGN UP ]
          </button>
        </div>

        <div className="mb-6">
          <div className="text-[10px] text-[#B7FFB0] tracking-widest uppercase mb-1">
            TERMINAL_AUTH // OPERATOR_CREDENTIALS
          </div>
          <h1 className="text-2xl font-black text-[#F5F5F0] uppercase font-sans">
            {mode === 'login' ? 'АВТОРИЗАЦІЯ В СИСТЕМІ' : 'СТВОРЕННЯ ПРОФІЛЮ'}
          </h1>
          <p className="text-xs text-[#99999F] mt-1">
            {mode === 'login'
              ? 'Увійдіть для доступу до історії замовлень та особистого кабінету'
              : 'Вкажіть контактні дані для оформлення замовлень та доставки'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider">
                  CUSTOMER_NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Михайло"
                  className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider">
                  PHONE_NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380XXXXXXXXX"
                  className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider">
              EMAIL_ADDRESS *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider">
              PASSWORD *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full btn-svasya">
              {mode === 'login' ? 'УВІЙТИ В ПРОФІЛЬ ↗' : 'ЗАРЕЄСТРУВАТИСЯ ↗'}
            </button>
          </div>
        </form>

        {/* Блок швидкого демо-входу для перевірки ролей */}
        <div className="mt-8 pt-6 border-t border-[#343438] text-center">
          <div className="text-[11px] text-[#99999F] uppercase tracking-wider mb-3">
            ⚡ ШВИДКИЙ ДЕМО-ВХІД ПІД РОЛЛЯМИ (ДЛЯ ПЕРЕВІРКИ):
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('user')}
              className="p-2.5 border border-[#343438] bg-[#080808] hover:border-[#00FFFF] hover:text-[#00FFFF] flex flex-col items-center gap-1 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Користувач</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('manager')}
              className="p-2.5 border border-[#343438] bg-[#080808] hover:border-[#B7FFB0] hover:text-[#B7FFB0] flex flex-col items-center gap-1 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Менеджер</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2.5 border border-[#343438] bg-[#080808] hover:border-[#FF00FF] hover:text-[#FF00FF] flex flex-col items-center gap-1 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Адмін</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

