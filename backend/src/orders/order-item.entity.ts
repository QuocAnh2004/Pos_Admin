import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Bảng `order_items` – từng dòng món trong 1 đơn.
 *
 * Vì sao chép lại productName và unitPrice?
 *   Tháng sau chủ shop tăng giá Cà phê từ 25.000 lên 28.000.
 *   Nếu chỉ lưu productId thì doanh thu tháng trước bị tính lại theo giá mới -> SAI.
 *   Nên mỗi dòng phải "chụp" lại tên và giá tại thời điểm bán.
 */
@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO(T-14): thêm các cột
  //   1. order      : @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  //   2. productId  : số nguyên
  //   3. productName: chuỗi 120 ký tự
  //   4. unitPrice  : số nguyên
  //   5. quantity   : số nguyên
}
