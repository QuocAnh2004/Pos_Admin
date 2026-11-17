// Chạy: npm test   – test xanh hết nghĩa là T-11 đạt tiêu chí chấp nhận
import { describe, expect, it } from 'vitest';
import { SAMPLE_PRODUCTS } from './sample-data';
import { filterProducts, removeVietnameseTones } from './search';

describe('removeVietnameseTones (T-11)', () => {
  it('bỏ dấu và viết thường', () => {
    expect(removeVietnameseTones('Trà Đào Cam Sả')).toBe('tra dao cam sa');
  });
  it('xử lý chữ đ', () => {
    expect(removeVietnameseTones('đen đá')).toBe('den da');
  });
});

describe('filterProducts (T-11)', () => {
  it('tab Tất cả + keyword rỗng -> giữ nguyên', () => {
    expect(filterProducts(SAMPLE_PRODUCTS, null, '')).toHaveLength(12);
  });
  it('lọc theo danh mục Trà', () => {
    expect(filterProducts(SAMPLE_PRODUCTS, 2, '')).toHaveLength(4);
  });
  it('gõ không dấu vẫn tìm ra món có dấu', () => {
    const names = filterProducts(SAMPLE_PRODUCTS, null, 'ca phe').map((p) => p.name);
    expect(names).toEqual(['Cà phê đen', 'Cà phê sữa']);
  });
  it('kết hợp danh mục + từ khoá', () => {
    expect(filterProducts(SAMPLE_PRODUCTS, 1, 'tra')).toHaveLength(0);
  });
});
