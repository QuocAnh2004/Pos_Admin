import { Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Bảng `orders` – mỗi lần nhân viên bấm "Thanh toán" là 1 dòng.
 * Báo cáo doanh thu = cộng cột total của các đơn trong khoảng thời gian.
 */
@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO(T-14): thêm các cột
  //   1. createdAt    : @CreateDateColumn({ type: 'timestamptz' }) – tự điền giờ tạo đơn
  //   2. total        : số nguyên, tổng tiền đơn (do SERVER tính, không tin số client gửi)
  //   3. cashReceived : số nguyên, tiền khách đưa
  //   4. paymentMethod: @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH })
  //   5. items        : @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
}
