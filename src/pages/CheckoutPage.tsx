import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import type { CreateOrderPayload } from '../types/cart';

interface FormState {
  customer_name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  customer_name?: string;
  phone?: string;
  email?: string;
  general?: string;
}

export const CheckoutPage: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormState>({
    customer_name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined, general: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = "ПОЛЕ ОБОВ'ЯЗКОВЕ: ВКАЖІТЬ ІМ'Я";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "ПОЛЕ ОБОВ'ЯЗКОВЕ: ВКАЖІТЬ ТЕЛЕФОН";
    } else if (!/^\+?[0-9\s\-()]{9,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'НЕКОРЕКТНИЙ ФОРМАТ (НАПР. +380991234567)';
    }

    if (!formData.email.trim()) {
      newErrors.email = "ПОЛЕ ОБОВ'ЯЗКОВЕ: ВКАЖІТЬ EMAIL";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'НЕКОРЕКТНИЙ EMAIL (НАПР. EXAMPLE@GMAIL.COM)';
    }

    if (items.length === 0) {
      newErrors.general = 'CART_BUFFER EMPTY. ДОДАЙТЕ ТОВАРИ В КОШИК.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, general: undefined }));

    try {
      // 1. Формуємо мапінг variantId -> variant_id
      const payload: CreateOrderPayload = {
        customer_name: formData.customer_name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        items: items.map((item) => ({
          variant_id: item.variantId,
          quantity: item.quantity,
        })),
      };

      // 2. POST /api/orders
      const response = await createOrder(payload);

      // 3. Очищення cart та localStorage
      clearCart();

      // 4. Перехід на /order-success
      navigate('/order-success', {
        state: {
          order: response,
        },
      });
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        general:
          err.message || 'TRANSMISSION ERROR: НЕ ВДАЛОСЯ ЗВЕРНУТИСЯ ДО СЕРВЕРА',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-16 sm:py-24 text-center">
        <div className="max-w-xl mx-auto p-8 sm:p-12 bg-[#141416] border border-[#343438] relative">
          <div className="absolute top-2 left-3 text-[#B7FFB0] text-xs">⌜</div>
          <div className="absolute bottom-2 right-3 text-[#B7FFB0] text-xs">⌟</div>

          <div className="text-xs text-[#FF00FF] font-semibold mb-3">
            [ CHECKOUT_LOCKED // CART_EMPTY ]
          </div>
          <h2 className="text-2xl font-black text-[#F5F5F0] uppercase mb-4 font-sans">
            КОШИК ПОРОЖНІЙ
          </h2>
          <p className="text-[#99999F] text-xs mb-8">
            Для оформлення замовлення спершу додайте позиції до кошика.
          </p>
          <Link to="/cart" className="btn-svasya">
            [ ПОСИЛАННЯ В КОШИК ↗ ]
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-16">
      <div className="mb-8 flex items-center justify-between pb-4 border-b border-[#343438]">
        <Link
          to="/cart"
          className="inline-flex items-center text-xs text-[#99999F] hover:text-[#00FFFF] transition-colors gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>[ НАЗАД ДО КОШИКА ]</span>
        </Link>
        <span className="text-xs text-[#FF00FF] font-semibold">
          CHECKOUT // STEP_02
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Форма замовника у стилі Figma */}
        <div className="lg:col-span-7 bg-[#141416] p-6 sm:p-10 border border-[#343438] relative">
          <div className="absolute top-2 left-2 text-[#B7FFB0] text-xs">⌜</div>
          <div className="absolute bottom-2 right-2 text-[#B7FFB0] text-xs">⌟</div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#343438]">
            <div>
              <div className="text-xs text-[#B7FFB0] font-semibold uppercase mb-1">
                TRANSMISSION FORM // CRT-CHECKOUT
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#F5F5F0] tracking-tight uppercase font-sans">
                ОФОРМЛЕННЯ ЗАМОВЛЕННЯ
              </h1>
            </div>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  customer_name: 'Михайло',
                  phone: '+380991234567',
                  email: 'example@gmail.com',
                });
                setErrors({});
              }}
              className="btn-svasya-outline text-[11px] self-start sm:self-auto"
            >
              ⚡ АВТОЗАПОВНИТИ ТЕСТ
            </button>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 border border-[#FF00FF] bg-[#FF00FF]/10 text-[#FF00FF] text-xs">
              [ ERROR ]: {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* customer_name */}
            <div>
              <label
                htmlFor="customer_name"
                className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider"
              >
                CUSTOMER_NAME *
              </label>
              <input
                type="text"
                id="customer_name"
                name="customer_name"
                placeholder="Михайло"
                value={formData.customer_name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-[#080808] border text-xs text-[#F5F5F0] transition-all focus:outline-none ${
                  errors.customer_name
                    ? 'border-[#FF00FF] text-[#FF00FF]'
                    : 'border-[#343438] focus:border-[#00FFFF]'
                }`}
              />
              {errors.customer_name && (
                <p className="mt-1.5 text-[11px] text-[#FF00FF]">
                  ↳ {errors.customer_name}
                </p>
              )}
            </div>

            {/* phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider"
              >
                PHONE_NUMBER *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+380XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-[#080808] border text-xs text-[#F5F5F0] transition-all focus:outline-none ${
                  errors.phone
                    ? 'border-[#FF00FF] text-[#FF00FF]'
                    : 'border-[#343438] focus:border-[#00FFFF]'
                }`}
              />
              {errors.phone && (
                <p className="mt-1.5 text-[11px] text-[#FF00FF]">
                  ↳ {errors.phone}
                </p>
              )}
            </div>

            {/* email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[#F5F5F0] mb-2 tracking-wider"
              >
                EMAIL_ADDRESS *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-3 bg-[#080808] border text-xs text-[#F5F5F0] transition-all focus:outline-none ${
                  errors.email
                    ? 'border-[#FF00FF] text-[#FF00FF]'
                    : 'border-[#343438] focus:border-[#00FFFF]'
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-[11px] text-[#FF00FF]">
                  ↳ {errors.email}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-svasya py-4 text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING TO /api/orders...</span>
                  </>
                ) : (
                  <span>CONFIRM & TRANSMIT ORDER ↗</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Короткий вміст замовлення праворуч */}
        <div className="lg:col-span-5 bg-[#141416] p-6 sm:p-8 border border-[#343438] sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-[#343438] text-xs">
            <span className="font-bold text-[#F5F5F0]">BUFFER CONTENT</span>
            <span className="text-[#B7FFB0]">{items.length} POSITIONS</span>
          </div>

          <div className="mt-4 divide-y divide-[#343438] max-h-80 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.variantId} className="py-3 flex items-center gap-3 text-xs">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-12 h-12 border border-[#343438] bg-[#080808] object-cover flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://placehold.co/100x100/101214/B7FFB0?text=СВАСЬ';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[#F5F5F0] truncate font-sans">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-[#99999F]">
                    VARIANT_ID #{item.variantId} / {item.size} / {item.color}
                  </div>
                  <div className="text-[11px] text-[#B7FFB0]">
                    {item.quantity} × {item.price} UAH
                  </div>
                </div>
                <div className="font-bold text-[#F5F5F0] text-right">
                  {(item.price * item.quantity).toLocaleString('uk-UA')} UAH
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-2 border-t border-[#343438] space-y-2 text-xs">
            <div className="flex justify-between text-[#99999F]">
              <span>SUBTOTAL:</span>
              <span className="text-[#F5F5F0] font-semibold">
                {totalAmount.toLocaleString('uk-UA')} UAH
              </span>
            </div>
            <div className="flex justify-between text-[#99999F]">
              <span>SHIPPING (NOVA POSHTA):</span>
              <span className="text-[#B7FFB0]">FREE OVER 3000 UAH</span>
            </div>
            <div className="pt-3 border-t border-[#343438] flex justify-between items-baseline">
              <span className="font-bold text-[#F5F5F0]">TOTAL:</span>
              <span className="text-xl font-black text-[#F5F5F0]">
                {totalAmount.toLocaleString('uk-UA')} UAH
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
