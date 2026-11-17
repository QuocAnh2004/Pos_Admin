'use client';

import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { formatVnd } from '@/lib/format';
import type { Category, Product } from '@/lib/types';

const EMPTY = { name: '', price: '', categoryId: '', active: true };
type FormState = typeof EMPTY;

// Quản lý sản phẩm (US-01, T-09): bảng + form thêm/sửa
export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  async function load() {
    try {
      const [c, p] = await Promise.all([api.get<Category[]>('/categories'), api.get<Product[]>('/products')]);
      setCategories(c);
      setProducts(p);
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    load();
  }, []);

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({ name: p.name, price: String(p.price), categoryId: String(p.categoryId), active: p.active });
    setSaved(null);
  }

  function reset() {
    setEditingId(null);
    setForm(EMPTY);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      categoryId: Number(form.categoryId),
      active: form.active,
    };
    try {
      if (editingId) await api.put(`/products/${editingId}`, payload);
      else await api.post('/products', payload);
      setSaved(editingId ? 'Đã cập nhật món.' : 'Đã thêm món mới.');
      reset();
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  const categoryName = (id: number) => categories.find((c) => c.id === id)?.name ?? '—';

  return (
    <div className="row g-4">
      <section className="col-lg-4">
        <div className="card shadow-sm">
          <div className="card-header fw-bold">{editingId ? `Sửa món #${editingId}` : 'Thêm món mới'}</div>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Tên món</label>
              <input id="name" className="form-control" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Giá (VND)</label>
              <input id="price" type="number" min={1} step={1000} className="form-control" required value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Danh mục</label>
              <select id="category" className="form-select" required value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Chọn danh mục</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-check mb-3">
              <input id="active" type="checkbox" className="form-check-input" checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })} />
              <label htmlFor="active" className="form-check-label">Đang bán</label>
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-primary flex-grow-1" type="submit">{editingId ? 'Lưu thay đổi' : 'Thêm món'}</button>
              {editingId && <button className="btn btn-light" type="button" onClick={reset}>Huỷ</button>}
            </div>
            {saved && <div className="alert alert-success mt-3 mb-0">{saved}</div>}
          </form>
        </div>
      </section>

      <section className="col-lg-8">
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="table-responsive">
          <table className="table table-hover bg-white align-middle">
            <thead><tr><th>#</th><th>Tên món</th><th>Danh mục</th><th className="text-end">Giá</th><th>Trạng thái</th><th /></tr></thead>
            <tbody>
              {products.length === 0 && <tr><td colSpan={6} className="text-muted">Chưa có món nào.</td></tr>}
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{categoryName(p.categoryId)}</td>
                  <td className="text-end">{formatVnd(p.price)}</td>
                  <td>{p.active ? <span className="badge text-bg-success">Đang bán</span> : <span className="badge text-bg-secondary">Ngừng bán</span>}</td>
                  <td className="text-end"><button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(p)}>Sửa</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
