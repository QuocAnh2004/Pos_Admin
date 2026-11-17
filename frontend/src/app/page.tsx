'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Health {
  status: string;
  database: string;
  time: string;
}

// Trang chủ = trang kiểm tra US-00: frontend gọi được backend, backend nối được database
export default function HomePage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Health>('/health').then(setHealth).catch((e: Error) => setError(e.message));
  }, []);

  const badge = (ok: boolean) => (
    <span className={`badge ${ok ? 'text-bg-success' : 'text-bg-danger'}`}>{ok ? 'OK' : 'Lỗi'}</span>
  );

  return (
    <div className="mx-auto" style={{ maxWidth: 560 }}>
      <h1 className="h3 mb-3">Kiểm tra hệ thống</h1>
      <ul className="list-group mb-4">
        <li className="list-group-item d-flex justify-content-between">Frontend (Next.js) {badge(true)}</li>
        <li className="list-group-item d-flex justify-content-between">
          Backend (NestJS) {health ? badge(true) : error ? badge(false) : <span>Đang kiểm tra…</span>}
        </li>
        <li className="list-group-item d-flex justify-content-between">
          Database (PostgreSQL) {health ? badge(health.database === 'up') : <span>—</span>}
        </li>
      </ul>
      {error && <div className="alert alert-danger">{error}</div>}
      <Link href="/pos" className="btn btn-primary btn-lg w-100">
        Mở màn hình bán hàng
      </Link>
    </div>
  );
}
