const vnd = new Intl.NumberFormat('vi-VN');

/** 25000 -> "25.000 đ" */
export function formatVnd(amount: number): string {
  return `${vnd.format(amount)} đ`;
}
