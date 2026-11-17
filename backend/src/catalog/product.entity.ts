import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';

/**
 * Bảng `products` – các món bán trên POS.
 *
 * Quy tắc tiền tệ của dự án: VND không có số lẻ -> lưu bằng số nguyên (integer).
 *   - KHÔNG dùng float/double: 0.1 + 0.2 !== 0.3 trong máy tính.
 *   - KHÔNG dùng bigint: TypeORM + PostgreSQL trả bigint về dạng string.
 */
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO(T-05): thêm các cột sau (tên cột trong DB tự đổi sang snake_case, ví dụ categoryId -> category_id)
  //   1. name      : chuỗi, tối đa 120 ký tự
  //   2. price     : số nguyên (@Column('int'))
  //   3. active    : boolean, mặc định true (món ngừng bán thì ẩn khỏi POS, không xoá để giữ lịch sử)
  //   4. categoryId: số nguyên, khoá ngoại tới categories.id
  //   5. category  : quan hệ nhiều-một tới Category
  //        gợi ý: @ManyToOne(() => Category) + @JoinColumn({ name: 'category_id' })
  //        (giống @ManyToOne + @JoinColumn trong JPA)

  @Column({length: 120, unique:true})
  name: string;

  @Column({type:'int'})
  price: number;
  
  @Column({default: true})
  active: boolean;

  @Column({type:'int'})
  categoryId: number;
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;
  
}
