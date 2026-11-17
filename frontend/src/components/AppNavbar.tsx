'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/pos', label: 'Bán hàng' },
  { href: '/admin/products', label: 'Sản phẩm' },
  { href: '/admin', label: 'Doanh thu' },
];

export default function AppNavbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" href="/">
          Shop-admin POS
        </Link>
        <ul className="navbar-nav">
          {LINKS.map((l) => (
            <li className="nav-item" key={l.href}>
              <Link className={`nav-link ${pathname === l.href ? 'active' : ''}`} href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
