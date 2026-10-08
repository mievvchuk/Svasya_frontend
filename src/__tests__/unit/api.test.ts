import { describe, it, expect } from 'vitest';
import { createOrder } from '../../services/api';
import type { CreateOrderPayload } from '../../types/cart';

describe('Unit Test: createOrder API', () => {
  it('повинен успішно створювати замовлення з обов`язковими полями та items', async () => {
    const payload: CreateOrderPayload = {
      customer_name: 'Михайло',
      phone: '+380991234567',
      email: 'test@svas.ua',
      items: [
        {
          variant_id: 5,
          quantity: 2,
        },
      ],
    };

    const response = await createOrder(payload, true);

    expect(response).toBeDefined();
    expect(response.id).toBeGreaterThan(0);
    expect(response.status).toBe('new');
    expect(response.customer_name).toBe('Михайло');
    expect(response.phone).toBe('+380991234567');
    expect(response.email).toBe('test@svas.ua');
  });
});

