# Спільний контракт для розробників проекту СВАСЬ

## 1. Структура елемента кошика (Frontend)
```typescript
interface CartItem {
  variantId: number;   // ID конкретного варіанту з таблиці product_variants (обов'язкове!)
  productId: number;   // ID товару з таблиці products
  name: string;        // Назва (напр. "СВАСЬ Hoodie")
  price: number;       // Ціна варіанту в грн (напр. 999)
  color: string;       // Колір (напр. "forest_green")
  size: string;        // Розмір (напр. "L")
  imageUrl: string;    // Посилання на фото
  quantity: number;    // Кількість (>= 1)
}
```

## 2. Маршрути додатку (Routes)
- `/` — Головна сторінка бренду СВАСЬ
- `/products` — Каталог товарів
- `/products/:id` — Сторінка товару (вибір розміру/кольору, додавання в кошик)
- `/cart` — Сторінка кошика (перегляд, зміна кількості, видалення, підрахунок суми)
- `/checkout` — Оформлення замовлення (форма з клієнтськими даними та валідацією)
- `/order-success` — Підтвердження замовлення ("СВАСЬ ВЖЕ В ДОРОЗІ", Замовлення #id, Сума)

## 3. Взаємодія з API
### Створення замовлення:
- **Ендпоінт**: `POST /api/orders`
- **Request Headers**: `Content-Type: application/json`
- **Request Body (Frontend -> Backend)**:
  ```json
  {
    "customer_name": "Михайло",
    "phone": "+380XXXXXXXXX",
    "email": "example@gmail.com",
    "items": [
      {
        "variant_id": 5,
        "quantity": 2
      }
    ]
  }
  ```
  > **Важливо**: Відправляється саме `variant_id` (з поля кошика `variantId`). Поля `price`, `productId`, `name`, `imageUrl` на бекенд НЕ відправляються — бекенд самостійно бере ціни з БД за `variant_id`.

- **Response Body (Backend -> Frontend)**:
  ```json
  {
    "id": 15,
    "status": "new",
    "total_price": 2297,
    "created_at": "2026-10-08T11:32:00"
  }
  ```

## 4. Зв'язки сутностей БД
```
products (1)
   │
   └──< (N) product_variants (1)
               │
               └──< (N) order_items (N) >─── (1) orders
```
- `products.id` → `product_variants.product_id`
- `product_variants.id` → `order_items.product_variant_id`
- `orders.id` → `order_items.order_id`

