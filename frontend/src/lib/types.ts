// Kiểu dữ liệu dùng chung – khớp với Entity bên backend
export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number; // VND, số nguyên
  active: boolean;
  categoryId: number;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export type PaymentMethod = 'CASH' | 'QR' | 'CARD';

export interface CheckoutResult {
  orderId: number;
  total: number;
  cashReceived: number;
  change: number;
}

export interface TodaySummary {
  date: string;
  revenue: number;
  orderCount: number;
}
