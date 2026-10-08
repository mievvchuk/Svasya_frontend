import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('mikhail@gmail.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('********');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      // При реєстрації - автоматично створюється простий користувач
      register({ name, email, phone });
      navigate('/profile');
    } else {
      // При вході - роль користувача визначається в базі даних бекенду
      const userRole = login(email);
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'manager') {
        navigate('/manager');
      } else {
        navigate('/profile');
      }
    }
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
            onClick={() => {
              setMode('login');
              if (!email) setEmail('mikhail@gmail.com');
            }}
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
            onClick={() => {
              setMode('register');
              setEmail('');
            }}
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
          <div className="text-[10px] text-[#B7FFB0] tracking-widest uppercase mb-1 font-mono">
            TERMINAL_AUTH // OPERATOR_CREDENTIALS
          </div>
          <h1 className="text-2xl font-black text-[#F5F5F0] uppercase font-sans">
            {mode === 'login' ? 'АВТОРИЗАЦІЯ В СИСТЕМІ' : 'СТВОРЕННЯ ПРОФІЛЮ'}
          </h1>
          <p className="text-xs text-[#99999F] mt-1 font-mono">
            {mode === 'login'
              ? 'Введіть ваші облікові дані. Система автоматично визначить рівень доступу з бази даних.'
              : 'При реєстрації автоматично створюється обліковий запис покупця.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider font-mono">
                  CUSTOMER_NAME *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Михайло Шевченко"
                  className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider font-mono">
                  PHONE_NUMBER *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380991234567"
                  className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none font-mono"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider font-mono">
              EMAIL_ADDRESS *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider font-mono">
              PASSWORD *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#080808] border border-[#343438] text-xs text-[#F5F5F0] focus:border-[#00FFFF] focus:outline-none font-mono"
            />
          </div>

          <div className="pt-2">
            <button type="submit" className="w-full btn-svasya">
              {mode === 'login' ? 'УВІЙТИ В ПРОФІЛЬ ↗' : 'ЗАРЕЄСТРУВАТИСЯ ↗'}
            </button>
          </div>
        </form>

        {mode === 'login' && (
          <div className="mt-8 pt-4 border-t border-[#1C1C1F] text-[10px] text-[#99999F] font-mono leading-relaxed">
            <span className="text-[#00FFFF]">// ДЕМО-ЗАПИСИ В БД:</span>
            <div className="mt-1 space-y-0.5">
              <div>Адмін: <code className="text-[#F5F5F0]">mikhail@gmail.com</code></div>
              <div>Менеджер: <code className="text-[#F5F5F0]">alex.boyko@gmail.com</code></div>
              <div>Користувач: <code className="text-[#F5F5F0]">ivan.melnyk@gmail.com</code></div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default AuthPage;
