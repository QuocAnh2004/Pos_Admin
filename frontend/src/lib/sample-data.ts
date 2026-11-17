import type { Category, Product } from './types';

// Dữ liệu mẫu: màn hình POS dùng tạm khi API sản phẩm chưa làm xong (T-07),
// để bạn vẫn thử được lưới món, giỏ hàng, thanh toán ở phía giao diện.
export const SAMPLE_CATEGORIES: Category[] = [
  { id: 1, name: 'Cà phê' },
  { id: 2, name: 'Trà' },
  { id: 3, name: 'Bánh & Đồ ăn' },
];

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: 'Cà phê đen', price: 20000, active: true, categoryId: 1 },
  { id: 2, name: 'Cà phê sữa', price: 25000, active: true, categoryId: 1 },
  { id: 3, name: 'Bạc xỉu', price: 29000, active: true, categoryId: 1 },
  { id: 4, name: 'Cold brew cam sả', price: 45000, active: true, categoryId: 1 },
  { id: 5, name: 'Trà đào cam sả', price: 35000, active: true, categoryId: 2 },
  { id: 6, name: 'Trà vải', price: 35000, active: true, categoryId: 2 },
  { id: 7, name: 'Trà sữa trân châu', price: 30000, active: true, categoryId: 2 },
  { id: 8, name: 'Trà xanh matcha', price: 39000, active: true, categoryId: 2 },
  { id: 9, name: 'Bánh mì thịt', price: 20000, active: true, categoryId: 3 },
  { id: 10, name: 'Croissant bơ', price: 28000, active: true, categoryId: 3 },
  { id: 11, name: 'Bánh flan', price: 15000, active: true, categoryId: 3 },
  { id: 12, name: 'Tiramisu', price: 40000, active: true, categoryId: 3 },
];
