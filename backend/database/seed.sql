-- Dữ liệu mẫu để demo (T-08).
-- Chạy SAU KHI đã làm xong T-05 và khởi động backend 1 lần (để TypeORM tạo bảng).
-- Cách chạy: psql -U postgres -d shop_pos -f database/seed.sql

TRUNCATE order_items, orders, products, categories RESTART IDENTITY CASCADE;

INSERT INTO categories (name) VALUES ('Cà phê'), ('Trà'), ('Bánh & Đồ ăn');

INSERT INTO products (name, price, active, category_id) VALUES
  ('Cà phê đen',        20000, true, 1),
  ('Cà phê sữa',        25000, true, 1),
  ('Bạc xỉu',           29000, true, 1),
  ('Cold brew cam sả',  45000, true, 1),
  ('Trà đào cam sả',    35000, true, 2),
  ('Trà vải',           35000, true, 2),
  ('Trà sữa trân châu', 30000, true, 2),
  ('Trà xanh matcha',   39000, true, 2),
  ('Bánh mì thịt',      20000, true, 3),
  ('Croissant bơ',      28000, true, 3),
  ('Bánh flan',         15000, true, 3),
  ('Tiramisu',          40000, true, 3);
