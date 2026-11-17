import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import type { Metadata } from 'next';
import AppNavbar from '@/components/AppNavbar';

export const metadata: Metadata = {
  title: 'Shop-admin POS',
  description: 'Phần mềm bán hàng và quản lý doanh thu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AppNavbar />
        <main className="container-fluid py-3">{children}</main>
      </body>
    </html>
  );
}
