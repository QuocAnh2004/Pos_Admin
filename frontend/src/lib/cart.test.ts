import { describe, expect, it } from 'vitest';
import { addToCart, cartTotal, decreaseQty, increaseQty, removeFromCart } from './cart';
import { SAMPLE_PRODUCTS } from './sample-data';
import { calcChange } from './payment';

const caPheSua = SAMPLE_PRODUCTS[1]; // 25.000
const banhMi = SAMPLE_PRODUCTS[8]; // 20.000

describe('giỏ hàng (T-12, T-13)', () => {
  it('chạm 2 lần cùng món -> 1 dòng, số lượng 2', () => {
    const cart = addToCart(addToCart([], caPheSua), caPheSua);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(2);
  });
  it('không sửa giỏ cũ (immutable)', () => {
    const before = addToCart([], caPheSua);
    const after = addToCart(before, caPheSua);
    expect(before[0].quantity).toBe(1);
    expect(after).not.toBe(before);
  });
  it('giảm về 0 thì xoá dòng', () => {
    const cart = decreaseQty(addToCart([], banhMi), banhMi.id);
    expect(cart).toHaveLength(0);
  });
  it('tăng và xoá', () => {
    let cart = addToCart([], caPheSua);
    cart = increaseQty(cart, caPheSua.id);
    expect(cart[0].quantity).toBe(2);
    cart = removeFromCart(cart, caPheSua.id);
    expect(cart).toHaveLength(0);
  });
  it('2 cà phê sữa + 1 bánh mì = 70.000', () => {
    const cart = addToCart(addToCart(addToCart([], caPheSua), caPheSua), banhMi);
    expect(cartTotal(cart)).toBe(70000);
  });
});

describe('tiền thừa (T-17)', () => {
  it('khách đưa 100.000 cho đơn 70.000 -> thừa 30.000', () => {
    expect(calcChange(70000, 100000)).toBe(30000);
  });
  it('đưa vừa đủ -> thừa 0', () => {
    expect(calcChange(70000, 70000)).toBe(0);
  });
  it('đưa thiếu -> null', () => {
    expect(calcChange(70000, 50000)).toBeNull();
  });
});
