import type { CreateOrderPayload, OrderResponse } from '../types/cart';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Створення замовлення: POST /api/orders
 */
export async function createOrder(
  payload: CreateOrderPayload,
  useSimulationIfOffline = true
): Promise<OrderResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Помилка сервера: статус ${response.status}`
      );
    }

    const data: OrderResponse = await response.json();
    return data;
  } catch (error: any) {
    console.warn('API /api/orders request failed:', error.message);

    // Якщо це локальний хакатон-тест і бекенд ще не запущений:
    if (useSimulationIfOffline) {
      console.log('--- [DEMO MODE: Без бекенду] ---');
      console.log('📤 Тіло запиту, сформоване фронтендом (POST /api/orders):', payload);
      await new Promise((resolve) => setTimeout(resolve, 600)); // Емуляція затримки мережі
      
      const mockOrder: OrderResponse = {
        id: Math.floor(10 + Math.random() * 90),
        status: 'new',
        total_price: payload.items.reduce((sum, item) => sum + item.quantity * 999, 0),
        created_at: new Date().toISOString(),
        customer_name: payload.customer_name,
        phone: payload.phone,
        email: payload.email,
      };
      console.log('📥 Емульована відповідь сервера:', mockOrder);
      console.log('---------------------------------');
      return mockOrder;
    }

    throw error;
  }
}

