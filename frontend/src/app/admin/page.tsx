'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { formatVnd } from '@/lib/format';
import type { TodaySummary } from '@/lib/types';

// Doanh thu hôm nay (US-05, T-19)
export default function AdminPage() {
  const [summary, setSummary] = useState<TodaySummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  function load() {
    setError(null);
    api.get<TodaySummary>('/reports/today').then(setSummary).catch((e: Error) => setError(e.message));
  }
  useEffect(load, []);

  return (
    <div className="mx-auto" style={{ maxWidth: 720 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Doanh thu hôm nay</h1>
        <button className="btn btn-outline-primary" onClick={load}>Làm mới</button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        <div className="col-sm-6">
          <div className="card shadow-sm"><div className="card-body">
            <div className="text-muted">Doanh thu</div>
            <div className="stat-number text-success">{summary ? formatVnd(summary.revenue) : '—'}</div>
          </div></div>
        </div>
        <div className="col-sm-6">
          <div className="card shadow-sm"><div className="card-body">
            <div className="text-muted">Số đơn</div>
            <div className="stat-number">{summary ? summary.orderCount : '—'}</div>
          </div></div>
        </div>
      </div>
      {summary && <p className="text-muted mt-2">Ngày {summary.date}</p>}
      <Link href="/admin/products" className="btn btn-link px-0 mt-2">Quản lý sản phẩm →</Link>
    </div>
  );
}
