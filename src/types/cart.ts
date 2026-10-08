/**
 * Спільний контракт для кошика та замовлень бренду "СВАСЬ"
 */

export interface CartItem {
  variantId: number;
  productId: number;
  name: string;
  price: number;
  color: string;
  size: string;
  imageUrl: string;
  quantity: number;
}

export interface OrderItemRequest {
  variant_id: number;
  quantity: number;
}

export interface CreateOrderPayload {
  customer_name: string;
  phone: string;
  email: string;
  items: OrderItemRequest[];
}

export interface OrderResponse {
  id: number;
  status: string;
  total_price: number;
  created_at: string;
  customer_name?: string;
  phone?: string;
  email?: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  color: string;
  size: string;
  price: number;
  stock_quantity?: number;
  imageUrl?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  imageUrl: string;
  variants: ProductVariant[];
}

