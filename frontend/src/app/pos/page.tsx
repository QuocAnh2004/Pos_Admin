'use client';

import { useEffect, useMemo, useState } from 'react';
import CheckoutModal from '@/components/CheckoutModal';
import { api } from '@/lib/api';
import { addToCart, cartTotal, decreaseQty, increaseQty, removeFromCart } from '@/lib/cart';
import { formatVnd } from '@/lib/format';
import { SAMPLE_CATEGORIES, SAMPLE_PRODUCTS } from '@/lib/sample-data';
import { filterProducts } from '@/lib/search';
import type { CartItem, Category, CheckoutResult, Product } from '@/lib/types';

// Màn hình bán hàng (US-02, US-03, US-04). Trái: lưới món. Phải: giỏ hàng.
export default function PosPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [usingSample, setUsingSample] = useState(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [keyword, setKeyword] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  useEffect(() => {
    Promise.all([api.get<Category[]>('/categories'), api.get<Product[]>('/products?activeOnly=true')])
      .then(([c, p]) => {
        setCategories(c);
        setProducts(p);
      })
      .catch(() => {
        // API chưa xong -> dùng dữ liệu mẫu để vẫn thử được giao diện
        setCategories(SAMPLE_CATEGORIES);
        setProducts(SAMPLE_PRODUCTS);
        setUsingSample(true);
      });
  }, []);

  const visibleProducts = useMemo(
    () => filterProducts(products, categoryId, keyword),
    [products, categoryId, keyword],
  );
  const total = cartTotal(cart);

  async function handleConfirm(cashReceived: number) {
    setSubmitting(true);
    try {
      const result = await api.post<CheckoutResult>('/orders/checkout', {
        items: cart.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        paymentMethod: 'CASH',
        cashReceived,
      });
      setCart([]);
      setShowCheckout(false);
      setMessage({
        type: 'success',
        text: `Đã lưu đơn #${result.orderId}. Trả khách ${formatVnd(result.change)}.`,
      });
    } catch (e) {
      setMessage({ type: 'danger', text: (e as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="row g-3">
      <section className="col-lg-8">
        {usingSample && (
          <div className="alert alert-warning py-2">
            Đang dùng dữ liệu mẫu vì API sản phẩm chưa sẵn sàng (T-07).
          </div>
        )}
        <input
          className="form-control form-control-lg mb-3"
          placeholder="Tìm món… (gõ không dấu cũng được)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <ul className="nav nav-pills mb-3 gap-2">
          {[{ id: null, name: 'Tất cả' } as { id: number | null; name: string }, ...categories].map((c) => (
            <li className="nav-item" key={c.id ?? 'all'}>
              <button
                type="button"
                className={`nav-link ${categoryId === c.id ? 'active' : 'bg-white'}`}
                onClick={() => setCategoryId(c.id)}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="pos-grid">
          {visibleProducts.map((p) => (
            <button
              key={p.id}
              type="button"
              className="btn btn-light border shadow-sm pos-product"
              onClick={() => setCart((c) => addToCart(c, p))}
            >
              <span className="fw-semibold">{p.name}</span>
              <span className="price text-primary">{formatVnd(p.price)}</span>
            </button>
          ))}
          {visibleProducts.length === 0 && <p className="text-muted">Không có món phù hợp.</p>}
        </div>
      </section>

      <aside className="col-lg-4">
        <div className="card pos-cart shadow-sm">
          <div className="card-header fw-bold">Đơn hiện tại</div>
          <ul className="list-group list-group-flush">
            {cart.length === 0 && <li className="list-group-item text-muted">Chạm vào món để thêm.</li>}
            {cart.map((item) => (
              <li key={item.productId} className="list-group-item">
                <div className="d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>{formatVnd(item.price * item.quantity)}</span>
                </div>
                <div className="btn-group btn-group-sm mt-1">
                  <button className="btn btn-outline-secondary" onClick={() => setCart((c) => decreaseQty(c, item.productId))}>−</button>
                  <span className="btn btn-outline-secondary disabled">{item.quantity}</span>
                  <button className="btn btn-outline-secondary" onClick={() => setCart((c) => increaseQty(c, item.productId))}>+</button>
                  <button className="btn btn-outline-danger" onClick={() => setCart((c) => removeFromCart(c, item.productId))}>×</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span>Tổng cộng</span>
              <span className="total">{formatVnd(total)}</span>
            </div>
            <button
              type="button"
              className="btn btn-success w-100 btn-checkout"
              disabled={cart.length === 0}
              onClick={() => {
                setMessage(null);
                setShowCheckout(true);
              }}
            >
              Thanh toán
            </button>
            {message && <div className={`alert alert-${message.type} mt-3 mb-0`}>{message.text}</div>}
          </div>
        </div>
      </aside>

      {showCheckout && (
        <CheckoutModal
          total={total}
          submitting={submitting}
          onConfirm={handleConfirm}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
