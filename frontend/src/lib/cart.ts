import type { CartItem, Product } from './types';

/*
 * Các hàm giỏ hàng là "pure function": nhận giỏ cũ, TRẢ VỀ GIỎ MỚI, không sửa giỏ cũ.
 * React chỉ vẽ lại màn hình khi state là object/mảng MỚI. Nếu dùng cart.push() thì UI sẽ không cập nhật.
 * Công cụ hay dùng: [...cart, x], cart.map(...), cart.filter(...)
 */

/**
 * Chạm vào 1 món trên lưới.
 * TODO(T-12):
 *   - Món đã có trong giỏ -> tăng quantity thêm 1
 *   - Chưa có -> thêm dòng mới với quantity = 1
 */
export function addToCart(cart: CartItem[], product: Product): CartItem[] {
  console.warn('TODO(T-12): addToCart chưa làm');
  return cart;
}

/** Nút "+" – TODO(T-12) */
export function increaseQty(cart: CartItem[], productId: number): CartItem[] {
  return cart;
}

/**
 * Nút "−"
 * TODO(T-12): giảm quantity đi 1; nếu về 0 thì xoá dòng đó khỏi giỏ
 */
export function decreaseQty(cart: CartItem[], productId: number): CartItem[] {
  return cart;
}

/** Nút "×" – TODO(T-12): xoá hẳn dòng */
export function removeFromCart(cart: CartItem[], productId: number): CartItem[] {
  return cart;
}

/**
 * Tổng tiền = tổng (price × quantity)
 * TODO(T-13): gợi ý cart.reduce(...)
 * Đây chỉ là số để HIỂN THỊ. Backend sẽ tự tính lại khi thanh toán.
 */
export function cartTotal(cart: CartItem[]): number {
  return 0;
}
