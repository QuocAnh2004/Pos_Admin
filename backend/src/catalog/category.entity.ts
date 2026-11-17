import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Bảng `categories` – các tab danh mục trên màn hình bán hàng (Cà phê, Trà, Bánh...).
 * Tương đương @Entity của JPA.
 */
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO(T-05): thêm cột `name`
  //   - kiểu chuỗi, tối đa 80 ký tự, không được trùng
  //   - gợi ý decorator: @Column({ length: ..., unique: ... })
  @Column({length: 80, unique:true})
  name: string;
}

