import type { Product } from './types';

/**
 * "Trà đào" -> "tra dao"
 * Nhân viên gõ vội thường không bỏ dấu, nên phải so sánh trên chữ không dấu.
 *
 * TODO(T-11):
 *   1. Đổi về chữ thường
 *   2. Tách dấu khỏi chữ: text.normalize('NFD') biến "à" thành "a" + dấu huyền
 *   3. Xoá các dấu: .replace(/[̀-ͯ]/g, '')
 *   4. Riêng chữ "đ" không tách được bằng NFD -> thay thủ công thành "d"
 *   5. Bỏ khoảng trắng thừa 2 đầu
 */
export function removeVietnameseTones(text: string): string {
  return text; // TODO(T-11): thay dòng này
}

/**
 * Lọc món theo tab danh mục và ô tìm kiếm.
 *   - categoryId = null nghĩa là tab "Tất cả"
 *   - keyword rỗng nghĩa là không lọc theo tên
 *
 * TODO(T-11):
 *   1. Chuẩn hoá keyword bằng removeVietnameseTones (làm 1 lần, ngoài vòng lặp)
 *   2. Duyệt mảng products, giữ món thoả CẢ HAI điều kiện:
 *        - đúng danh mục (hoặc categoryId = null)
 *        - tên không dấu chứa keyword không dấu
 *   Gợi ý: products.filter(...)
 *   Độ phức tạp: O(n) với n = số món. 100 món thì lọc tức thì, không cần gì phức tạp hơn.
 */
export function filterProducts(
  products: Product[],
  categoryId: number | null,
  keyword: string,
): Product[] {
  return products; // TODO(T-11): thay dòng này
}
