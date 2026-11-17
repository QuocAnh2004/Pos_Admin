# shop-admin-pos

Phần mềm bán hàng (POS) và quản lý doanh thu cho cửa hàng F&B.
Nhân viên chọn món → bấm Thanh toán → đơn được lưu → chủ shop xem doanh thu.

| Lớp | Công nghệ |
|---|---|
| Backend | NestJS 11 + TypeORM (`backend/`, cổng 4000) |
| Frontend | Next.js 15 + Bootstrap 5 (`frontend/`, cổng 3000) |
| Database | PostgreSQL |

## Luồng dữ liệu

```
[Next.js /pos] --POST /api/orders/checkout--> [NestJS OrdersService] --transaction--> [PostgreSQL: orders + order_items]
[Next.js /admin] --GET /api/reports/today--> [NestJS ReportsService] --SUM/COUNT--> [PostgreSQL]
```

## Chạy lần đầu (Windows)

**Cần có:** Node.js 22 LTS và PostgreSQL 16 trở lên (cài bản Windows từ trang chủ PostgreSQL, hoặc dùng `docker compose up -d`).

1. Tạo database `shop_pos` (bằng pgAdmin hoặc `psql -U postgres -c "CREATE DATABASE shop_pos"`).
2. Backend:
   ```bash
   cd backend
   copy .env.example .env      # sửa DB_PASSWORD theo máy bạn
   npm install
   npm run start:dev
   ```
3. Frontend (mở terminal khác):
   ```bash
   cd frontend
   copy .env.example .env.local
   npm install
   npm run dev
   ```
4. Mở http://localhost:3000. Trang chủ báo 3 dòng OK là xong US-00.
5. Làm xong T-05 (Entity) → khởi động lại backend để TypeORM tạo bảng → chạy dữ liệu mẫu:
   ```bash
   psql -U postgres -d shop_pos -f backend/database/seed.sql
   ```

## Phần bạn tự gõ (Sprint 1)

Tìm `TODO(` trong code. Mỗi TODO có mã task khớp với file `Sprint1_Shop-admin_POS.xlsx`.

| Task | File | Kiểm tra bằng |
|---|---|---|
| T-05 | `backend/src/catalog/category.entity.ts`, `product.entity.ts` | Backend khởi động tạo được bảng, chạy được `seed.sql` |
| T-06 | `backend/src/catalog/dto/create-product.dto.ts`, `catalog.service.ts` (createProduct) | Thêm món giá âm phải báo lỗi 400 |
| T-07 | `backend/src/catalog/catalog.service.ts` | `/pos` hết dòng cảnh báo "dữ liệu mẫu" |
| T-11 | `frontend/src/lib/search.ts` | `npm test` |
| T-12, T-13 | `frontend/src/lib/cart.ts` | `npm test` |
| T-14 | `backend/src/orders/order.entity.ts`, `order-item.entity.ts` | Backend tạo được bảng `orders`, `order_items` |
| T-15 | `backend/src/orders/orders.service.ts` | Bấm Thanh toán trên `/pos` ra số đơn và tiền thừa |
| T-17 | `frontend/src/lib/payment.ts` | `npm test` |
| T-18 | `backend/src/reports/reports.service.ts` | `/admin` hiện đúng doanh thu |

Trong thư mục `frontend`, chạy `npm test`: ban đầu 11 test đỏ. Làm xong T-11, T-12, T-13, T-17 thì tất cả chuyển xanh.

## Lộ trình

- **Sprint 1:** bán hàng tiền mặt, sản phẩm, doanh thu hôm nay
- **Sprint 2:** đăng nhập và phân quyền, size/topping, kết ca, deploy + PWA, dashboard realtime (WebSocket)
- **Sprint 3:** VietQR động + webhook xác nhận chuyển khoản, in hoá đơn, quét mã vạch
- **Sprint 4:** kho, giá vốn
- **Sprint 5:** báo cáo lãi/lỗ, xuất Excel/PDF
- **Sprint 6:** nhập hàng bằng ảnh hoá đơn (Vision LLM)
- **Sprint 7:** báo cáo cuối ngày tự gửi Zalo/Telegram (LLM)

## Quy ước

- Tiền VND lưu bằng số nguyên `integer`, không dùng số thực.
- Tổng tiền đơn luôn do backend tính lại từ giá trong database.
- Commit theo Conventional Commits: `feat:`, `fix:`, `docs:`.

---
Batoluxi
